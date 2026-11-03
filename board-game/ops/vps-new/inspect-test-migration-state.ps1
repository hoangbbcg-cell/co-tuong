#requires -Version 5.1
[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)][ValidatePattern('^[0-9a-f]{40}$')][string]$ApprovedMasterCommit,
  [string]$PrivateKey = (Join-Path $HOME '.ssh\cotuong_new_vps'),
  [string]$KnownHosts = (Join-Path $HOME '.ssh\known_hosts'),
  [string]$ReportPath = (Join-Path ([IO.Path]::GetTempPath()) ('cotuong-migration-{0}.json' -f [guid]::NewGuid().ToString('N')))
)
$ErrorActionPreference = 'Stop'
$RepoRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..\..'))
$ConfigPath = Join-Path ([IO.Path]::GetTempPath()) ('cotuong-metadata-{0}.conf' -f [guid]::NewGuid().ToString('N'))
$ExpectedFingerprint = 'SHA256:CJzV7hFpB6mDfGDoBm/ViJvw5D5HlBhR60gmOJGLW74'
$TransportHelper = Join-Path $PSScriptRoot 'ssh-bash-command.ps1'

try {
  & git.exe -C $RepoRoot fetch origin master
  if ($LASTEXITCODE -ne 0) { throw 'Cannot refresh origin/master.' }
  $master = (& git.exe -C $RepoRoot rev-parse refs/remotes/origin/master).Trim()
  if ($LASTEXITCODE -ne 0 -or $master -cne $ApprovedMasterCommit) { throw 'origin/master differs from the reviewed commit; stop for review.' }
  $reviewedPaths = @('board-game/ops/vps-new/inspect-test-migration-state.ps1', 'board-game/ops/vps-new/ssh-bash-command.ps1', 'board-game/ops/vps-new/collect-test-migration-state.py', 'board-game/scripts/inspect-test-migrations.ts', 'board-game/server/repositories/migrationRepository.ts', 'board-game/server/repositories/mysqlPool.ts', 'board-game/server/migrations')
  & git.exe -C $RepoRoot diff --quiet $ApprovedMasterCommit -- @reviewedPaths
  if ($LASTEXITCODE -ne 0) { throw 'Local audit code/migrations differ from approved master.' }
  $changes = & git.exe -C $RepoRoot status --porcelain=v1 -- @reviewedPaths
  if ($LASTEXITCODE -ne 0 -or $changes) { throw 'Local audit code/migrations contain uncommitted or untracked changes.' }
  if (-not (Test-Path -LiteralPath $PrivateKey -PathType Leaf)) { throw 'Pinned SSH identity is missing.' }
  $KnownHosts = [IO.Path]::GetFullPath($KnownHosts)
  if (-not (Test-Path -LiteralPath $KnownHosts -PathType Leaf) -or $KnownHosts -match '["\r\n]') { throw 'Invalid known_hosts path.' }
  $hostKeys = & ssh-keygen.exe -F '103.153.254.184' -f $KnownHosts 2>$null
  if ($LASTEXITCODE -ne 0) { throw 'Pinned host key is missing.' }
  $fingerprints = $hostKeys | & ssh-keygen.exe -lf - 2>$null
  if ($LASTEXITCODE -ne 0 -or ($fingerprints -join "`n") -notmatch ([regex]::Escape($ExpectedFingerprint) + '.*ED25519')) { throw 'Host fingerprint mismatch.' }
  $config = @('Host *', '  IdentitiesOnly yes', '  BatchMode yes', '  StrictHostKeyChecking yes', '  HostKeyAlgorithms ssh-ed25519', ('  UserKnownHostsFile "{0}"' -f $KnownHosts)) -join "`n"
  [IO.File]::WriteAllText($ConfigPath, $config + "`n", [Text.UTF8Encoding]::new($false))
  $probe = [IO.File]::ReadAllText((Join-Path $PSScriptRoot 'collect-test-migration-state.py')).Replace("`r`n", "`n").Replace("`r", "`n")
  . $TransportHelper
  $probeBase64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($probe))
  $bash = @'
set -Eeuo pipefail
[[ "$(id -un)" == 'nhat_hoang' ]]
ip -o -4 addr show scope global | awk '{sub(/\/.*/, "", $4); print $4}' | grep -Fxq '103.153.254.184'
sudo -p $'Sudo password (hidden input):\n' -v
sudo -n python3 -c "import base64; exec(compile(base64.b64decode('__PROBE__'), 'read_only_metadata', 'exec'))"
'@
  $bash = $bash.Replace('__PROBE__', $probeBase64).Replace("`r`n", "`n").Replace("`r", "`n")
  $transport = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($bash))
  $remote = New-CotuongSshBashCommand -Base64Script $transport
  Write-Host 'Read-only metadata inspection of 103.153.254.184. Enter sudo password privately in this terminal if prompted.'
  # Tee keeps PTY output/password prompts visible while retaining the metadata sentinel.
  & ssh.exe -tt -i $PrivateKey -F $ConfigPath 'nhat_hoang@103.153.254.184' $remote | Tee-Object -Variable probeOutput
  if ($LASTEXITCODE -ne 0) { throw 'Read-only SSH/metadata probe failed. No migration was attempted.' }
  $match = [regex]::Match(($probeOutput -join "`n"), '(?m)^COTUONG_MIGRATION_REPORT=([A-Za-z0-9+/=]+)\r?$')
  if (-not $match.Success) { throw 'No metadata report received; do not infer database state from a PASS marker.' }
  $reportBytes = [Convert]::FromBase64String($match.Groups[1].Value)
  $ReportPath = [IO.Path]::GetFullPath($ReportPath)
  $stream = [IO.File]::Open($ReportPath, [IO.FileMode]::CreateNew, [IO.FileAccess]::Write, [IO.FileShare]::None)
  try { $stream.Write($reportBytes, 0, $reportBytes.Length) } finally { $stream.Dispose() }
  Write-Host "Metadata report saved: $ReportPath"
  Push-Location (Join-Path $RepoRoot 'board-game')
  try {
    & node.exe --import tsx scripts/inspect-test-migrations.ts $ReportPath
    if ($LASTEXITCODE -ne 0) { throw 'Journal/checksum comparison failed; preserve the report and do not migrate.' }
  } finally { Pop-Location }
  Write-Host 'READ_ONLY_MIGRATION_INSPECTION=PASS; metadata report retained locally. No helper upload or database mutation performed.'
} finally {
  Remove-Item -LiteralPath $ConfigPath -Force -ErrorAction SilentlyContinue
}
