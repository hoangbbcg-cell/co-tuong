#requires -Version 5.1
[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^[0-9a-f]{40}$')]
  [string]$ApprovedMasterCommit,
  [string]$HostAddress = '103.153.254.184',
  [string]$UserName = 'nhat_hoang',
  [string]$PrivateKey = (Join-Path $HOME '.ssh\cotuong_new_vps'),
  [string]$KnownHosts = (Join-Path $HOME '.ssh\known_hosts'),
  [switch]$ReadOnlyPreflightOnly
)

$ErrorActionPreference = 'Stop'
$ExpectedHostFingerprint = 'SHA256:CJzV7hFpB6mDfGDoBm/ViJvw5D5HlBhR60gmOJGLW74'
$BackupDirectory = '/var/backups/cotuong-stage'
$Target = "${UserName}@${HostAddress}"
$RepoRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..\..'))
$BackupHelperPath = Join-Path $PSScriptRoot 'cotuong-local-backup'
$ValidatorPath = Join-Path $PSScriptRoot 'validate-test-backup.py'
$BackupHelperRelative = 'board-game/ops/vps-new/cotuong-local-backup'
$ValidatorRelative = 'board-game/ops/vps-new/validate-test-backup.py'
$RunnerRelative = 'board-game/ops/vps-new/run-test-backup-restore-drill.ps1'
$TransportRelative = 'board-game/ops/vps-new/ssh-bash-command.ps1'
$TransportHelper = Join-Path $PSScriptRoot 'ssh-bash-command.ps1'
$LocalStage = Join-Path ([IO.Path]::GetTempPath()) ('cotuong-backup-drill-{0}' -f [guid]::NewGuid().ToString('N'))
$ManifestPath = Join-Path ([IO.Path]::GetTempPath()) ('cotuong-backup-drill-{0}.sha256' -f [guid]::NewGuid().ToString('N'))
$SshConfigPath = Join-Path ([IO.Path]::GetTempPath()) ('cotuong-backup-drill-{0}.conf' -f [guid]::NewGuid().ToString('N'))
$RemoteDirectory = '/home/nhat_hoang/.cotuong-backup-drill-{0}' -f [guid]::NewGuid().ToString('N')
$RemoteDirectoryCreated = $false
$DrillStarted = $false
$DrillCompleted = $false
$BackupPath = $null

function Invoke-NativeChecked {
  param(
    [Parameter(Mandatory)][string]$FilePath,
    [Parameter(Mandatory)][string[]]$Arguments,
    [Parameter(Mandatory)][string]$FailureMessage
  )
  & $FilePath @Arguments
  $exitCode = $LASTEXITCODE
  if ($exitCode -ne 0) { throw "$FailureMessage (exit $exitCode)." }
}

try {
  if ($HostAddress -cne '103.153.254.184' -or $UserName -cne 'nhat_hoang') {
    throw 'This script is pinned to nhat_hoang@103.153.254.184.'
  }
  if (-not (Test-Path -LiteralPath $PrivateKey -PathType Leaf)) { throw 'Pinned VPS SSH key not found.' }
  if (-not (Test-Path -LiteralPath $KnownHosts -PathType Leaf)) { throw 'Pinned known_hosts file not found.' }
  $KnownHosts = [IO.Path]::GetFullPath($KnownHosts)
  if ($KnownHosts.Contains('"') -or $KnownHosts.Contains("`r") -or $KnownHosts.Contains("`n")) { throw 'KnownHosts path contains unsupported characters.' }

  foreach ($path in @($BackupHelperPath, $ValidatorPath)) {
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { throw "Required helper is missing: $path" }
  }
  if (-not (Test-Path -LiteralPath $TransportHelper -PathType Leaf)) { throw 'Reviewed SSH Bash transport helper is missing.' }

  Write-Host "Fetching origin/master and requiring approved commit $ApprovedMasterCommit."
  Invoke-NativeChecked -FilePath 'git.exe' -Arguments @('-C', $RepoRoot, 'fetch', 'origin', 'master') -FailureMessage 'Could not update origin/master'
  $masterCommit = (& git.exe -C $RepoRoot rev-parse refs/remotes/origin/master).Trim()
  if ($LASTEXITCODE -ne 0 -or $masterCommit -cne $ApprovedMasterCommit) {
    throw "origin/master is not the approved commit $ApprovedMasterCommit; found $masterCommit. Stop and review the newer master first."
  }

  foreach ($relative in @($RunnerRelative, $TransportRelative, $BackupHelperRelative, $ValidatorRelative)) {
    & git.exe -C $RepoRoot diff --quiet $ApprovedMasterCommit -- $relative
    if ($LASTEXITCODE -ne 0) { throw "Local helper differs from approved master: $relative" }
    $localChanges = & git.exe -C $RepoRoot status --porcelain=v1 -- $relative
    if ($LASTEXITCODE -ne 0 -or $localChanges) { throw "Local helper has uncommitted or untracked changes: $relative" }
  }

  $hostKeyLines = & ssh-keygen.exe -F $HostAddress -f $KnownHosts 2>$null
  if ($LASTEXITCODE -ne 0) { throw 'Pinned VPS host key is absent from known_hosts.' }
  $hostFingerprints = $hostKeyLines | & ssh-keygen.exe -lf - 2>$null
  $expectedFingerprintPattern = [regex]::Escape($ExpectedHostFingerprint) + '.*ED25519'
  if ($LASTEXITCODE -ne 0 -or (($hostFingerprints -join "`n") -notmatch $expectedFingerprintPattern)) {
    throw 'known_hosts does not contain the reviewed ED25519 fingerprint for this VPS.'
  }

  $sshConfigLines = @(
    'Host *'
    '  IdentitiesOnly yes'
    '  BatchMode yes'
    '  StrictHostKeyChecking yes'
    ('  UserKnownHostsFile "{0}"' -f $KnownHosts)
  )
  [IO.File]::WriteAllText($SshConfigPath, (($sshConfigLines -join "`n") + "`n"), [System.Text.UTF8Encoding]::new($false))
  $sshOptions = @('-F', $SshConfigPath)

  if (-not $ReadOnlyPreflightOnly) {
  New-Item -ItemType Directory -Path $LocalStage | Out-Null
  $BackupLogPath = Join-Path $LocalStage 'backup-run.log'
  $stagedFiles = @()
  foreach ($source in @($BackupHelperPath, $ValidatorPath)) {
    $name = [IO.Path]::GetFileName($source)
    $staged = Join-Path $LocalStage $name
    $contents = [IO.File]::ReadAllText($source, [System.Text.Encoding]::UTF8)
    $contents = $contents.Replace("`r`n", "`n").Replace("`r", "`n")
    [IO.File]::WriteAllText($staged, $contents, [System.Text.UTF8Encoding]::new($false))
    $stagedFiles += $staged
  }

  $manifestLines = foreach ($file in $stagedFiles) {
    $hash = (Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash.ToLowerInvariant()
    Write-Host ('Local SHA-256 {0}  {1}' -f $hash, [IO.Path]::GetFileName($file))
    '{0}  {1}' -f $hash, [IO.Path]::GetFileName($file)
  }
  [IO.File]::WriteAllLines($ManifestPath, [string[]]$manifestLines, [System.Text.Encoding]::ASCII)

  $createRemoteDirectory = "test ! -e '$RemoteDirectory' && test ! -L '$RemoteDirectory' && install -d -m 0700 '$RemoteDirectory'"
  Invoke-NativeChecked -FilePath 'ssh.exe' -Arguments (@('-i', $PrivateKey) + $sshOptions + @($Target, $createRemoteDirectory)) -FailureMessage 'Could not create private upload directory'
  $RemoteDirectoryCreated = $true

  Invoke-NativeChecked -FilePath 'scp.exe' -Arguments (@('-i', $PrivateKey) + $sshOptions + $stagedFiles + @("${Target}:$RemoteDirectory/")) -FailureMessage 'Helper upload failed'
  Invoke-NativeChecked -FilePath 'scp.exe' -Arguments (@('-i', $PrivateKey) + $sshOptions + @($ManifestPath, "${Target}:$RemoteDirectory/.sha256")) -FailureMessage 'Hash manifest upload failed'

  $remoteNames = @('cotuong-local-backup', 'validate-test-backup.py', '.sha256')
  $secureCommands = foreach ($name in $remoteNames) {
    $remotePath = "$RemoteDirectory/$name"
    "test -f '$remotePath' && test ! -L '$remotePath' && test `"`$(stat -c %U:%G -- '$remotePath')`" = 'nhat_hoang:nhat_hoang' && chmod 0600 -- '$remotePath'"
  }
  $remoteDirectoryCheck = "test -d '$RemoteDirectory' && test ! -L '$RemoteDirectory' && test `"`$(stat -c %U:%G:%a -- '$RemoteDirectory')`" = 'nhat_hoang:nhat_hoang:700'"
  $verifyUpload = $remoteDirectoryCheck + ' && ' + ($secureCommands -join ' && ') +
    " && stat -c '%U:%G:%a %n' -- '$RemoteDirectory/cotuong-local-backup' '$RemoteDirectory/validate-test-backup.py' '$RemoteDirectory/.sha256' && cd '$RemoteDirectory' && sha256sum --check --status .sha256"
  Invoke-NativeChecked -FilePath 'ssh.exe' -Arguments (@('-i', $PrivateKey) + $sshOptions + @($Target, $verifyUpload)) -FailureMessage 'Remote owner/type/mode/SHA-256 verification failed'
  Write-Host 'Both uploaded helper hashes matched the local manifest; owner, regular-file type, symlink status, and mode checks passed.'
  }

  # Keep the password prompt visible in the same PTY as all cached-sudo read-only queries.
  # Base64 keeps PowerShell 5.1 from re-quoting Bash and SQL punctuation in the SSH command.
  $readOnlyPreflight = @'
set -Eeuo pipefail
step='sudo authentication'
trap 'rc=$?; printf "READ_ONLY_PREFLIGHT_FAILED step=%s exit=%s\n" "$step" "$rc" >&2; exit "$rc"' ERR
printf 'READ_ONLY_STEP=%s\n' "$step"
sudo -v
mysql_ro() { sudo -n mysql --protocol=socket --user=root --batch --skip-column-names "$@"; }

step='cotuong_stage schema count'
schema_count="$(mysql_ro -e "SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME='cotuong_stage'")"
printf 'schema_count=%s\n' "$schema_count"
[[ "$schema_count" == '1' ]]

step='cotuong_stage table count'
table_count="$(mysql_ro -e "SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='cotuong_stage'")"
printf 'table_count=%s\n' "$table_count"
[[ "$table_count" =~ ^[0-9]+$ ]]

step='schema_migrations presence'
journal_exists="$(mysql_ro -e "SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='cotuong_stage' AND TABLE_NAME='schema_migrations'")"
printf 'journal_exists=%s\n' "$journal_exists"
if (( table_count == 0 )); then
  [[ "$journal_exists" == '0' ]]
else
  [[ "$journal_exists" == '1' ]]
  step='schema_migrations status and rows'
  journal_stats="$(mysql_ro -e "SELECT COUNT(*),COALESCE(SUM(status<>'applied'),0) FROM cotuong_stage.schema_migrations")"
  IFS=$'\t' read -r journal_rows not_applied <<< "$journal_stats"
  printf 'journal_rows=%s not_applied=%s\n' "$journal_rows" "$not_applied"
  [[ "$journal_rows" =~ ^[0-9]+$ && "$journal_rows" -gt 0 && "$not_applied" == '0' ]]
  step='schema_migrations version list'
  versions="$(mysql_ro -e "SELECT COALESCE(GROUP_CONCAT(version ORDER BY version SEPARATOR ','),'none') FROM cotuong_stage.schema_migrations")"
  printf 'journal_versions=%s\n' "$versions"
fi

step='application and migrator grants'
mysql_ro -e "SHOW GRANTS FOR 'cotuong_app'@'127.0.0.1'; SHOW GRANTS FOR 'cotuong_migrator'@'127.0.0.1'"

step='backup directory owner and mode'
sudo -n test -d '/var/backups/cotuong-stage'
sudo -n test ! -L '/var/backups/cotuong-stage'
backup_dir_status="$(sudo -n stat -c '%U:%a' -- '/var/backups/cotuong-stage')"
printf 'backup_dir=%s\n' "$backup_dir_status"
[[ "$backup_dir_status" == 'root:700' ]]

step='existing backup inventory'
sudo -n find '/var/backups/cotuong-stage' -mindepth 1 -maxdepth 1 \( -type f -o -type l \) -printf '%y %u:%g %m %s %f\n' | sort
printf 'READ_ONLY_PREFLIGHT=PASS\n'
'@
  $readOnlyPreflight = $readOnlyPreflight.Replace("`r`n", "`n").Replace("`r", "`n")
  $preflightBytes = [System.Text.Encoding]::UTF8.GetBytes($readOnlyPreflight)
  $preflightBase64 = [Convert]::ToBase64String($preflightBytes)
  . $TransportHelper
  $remotePreflight = New-CotuongSshBashCommand -Base64Script $preflightBase64
  Write-Host 'The next SSH step performs read-only schema/journal/grant/backup checks. Sudo will prompt here if required; enter the password in this terminal. No backup or restore will start in this step.'
  Invoke-NativeChecked -FilePath 'ssh.exe' -Arguments (@('-tt', '-i', $PrivateKey) + $sshOptions + @($Target, $remotePreflight)) -FailureMessage 'Read-only VPS preflight failed; inspect the READ_ONLY_STEP diagnostic above'
  if ($ReadOnlyPreflightOnly) {
    Write-Host 'READ_ONLY_PREFLIGHT_ONLY=PASS; no helper upload, backup, restore, migration or deployment was performed.'
    return
  }

  Write-Host ''
  Write-Host 'Ready to perform these actions on the TEST VPS only:'
  Write-Host '  1. Run cotuong-local-backup as root to create a new cotuong_stage SQL backup and SHA-256 sidecar.'
  Write-Host '  2. Verify backup owner/mode, SHA-256, and gzip integrity.'
  Write-Host '  3. Run validate-test-backup.py as root; it restores only to a fresh cotuong_restore_check_* schema and removes that scratch schema on success.'
  Write-Host 'No migration, deployment, service start/restart, Nginx, firewall, DNS, old VPS, or production action will be run.'
  $confirmation = Read-Host 'To continue, type exactly: RUN BACKUP RESTORE cotuong_stage'
  if ($confirmation -cne 'RUN BACKUP RESTORE cotuong_stage') { throw 'Confirmation did not match; no backup or restore was started.' }

  $DrillStarted = $true
  $runBackup = "sudo -v && sudo /bin/bash '$RemoteDirectory/cotuong-local-backup'"
  & ssh.exe -tt -i $PrivateKey @sshOptions $Target $runBackup | Tee-Object -FilePath $BackupLogPath
  $backupExitCode = $LASTEXITCODE
  if ($backupExitCode -ne 0) { throw "Backup helper failed (exit $backupExitCode); stop and inspect the test backup directory." }
  $backupLog = [IO.File]::ReadAllText($BackupLogPath)
  $backupPathMatch = [regex]::Match($backupLog, '(?m)^Created compressed test database backup and SHA-256 sidecar: (?<path>/var/backups/cotuong-stage/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}-[0-9]{2}-[0-9]{2}Z\.sql\.gz)\r?$')
  if (-not $backupPathMatch.Success) {
    throw 'Backup helper returned success without its expected new-backup path; inspect the retained local log and VPS backup directory. No restore was started.'
  }
  $BackupPath = $backupPathMatch.Groups['path'].Value
  Write-Host "Captured the exact path emitted by this backup run: $BackupPath"
  $dumpName = [IO.Path]::GetFileName($BackupPath)
  $sumName = "$dumpName.sha256"
  $quotedBackup = "'$BackupPath'"
  $quotedChecksum = "'$BackupPath.sha256'"
  $backupIntegrity = 'sudo test -f ' + $quotedBackup + ' && sudo test ! -L ' + $quotedBackup +
    ' && sudo test -f ' + $quotedChecksum + ' && sudo test ! -L ' + $quotedChecksum +
    ' && test "$(sudo stat -c %U:%a -- ' + $quotedBackup + ')" = root:600' +
    ' && test "$(sudo stat -c %U:%a -- ' + $quotedChecksum + ')" = root:600' +
    ' && sudo bash -c ''cd /var/backups/cotuong-stage && sha256sum --check "' + $sumName + '" && gzip -t "' + $dumpName + '"'''
  Invoke-NativeChecked -FilePath 'ssh.exe' -Arguments (@('-tt', '-i', $PrivateKey) + $sshOptions + @($Target, $backupIntegrity)) -FailureMessage 'Backup owner/mode/checksum/gzip verification failed; do not restore or migrate'

  $runValidator = "sudo -v && sudo python3 '$RemoteDirectory/validate-test-backup.py' '$BackupPath'"
  Invoke-NativeChecked -FilePath 'ssh.exe' -Arguments (@('-tt', '-i', $PrivateKey) + $sshOptions + @($Target, $runValidator)) -FailureMessage 'Restore drill failed; do not migrate or deploy'
  $DrillCompleted = $true
  Write-Host "Backup and restore drill completed successfully. Preserve $BackupPath and its .sha256 sidecar. No migration or deployment was run."
}
catch {
  Write-Host ("ERROR: " + $_.Exception.Message) -ForegroundColor Red
  if ($DrillStarted -and -not $DrillCompleted) {
    if ($BackupPath) { Write-Warning "Preserve this backup and sidecar for investigation: $BackupPath and $BackupPath.sha256" }
    if ($BackupLogPath -and (Test-Path -LiteralPath $BackupLogPath -PathType Leaf)) { Write-Warning "Backup output log retained locally: $BackupLogPath" }
    Write-Warning "The unique upload directory is retained for investigation: $RemoteDirectory"
  }
  throw
}
finally {
  if ($RemoteDirectoryCreated -and (-not $DrillStarted -or $DrillCompleted)) {
    try {
      if ($RemoteDirectory -notmatch '^/home/nhat_hoang/\.cotuong-backup-drill-[a-f0-9]{32}$') { throw 'Upload cleanup path failed its allowlist.' }
      $cleanup = "test -d '$RemoteDirectory' && test ! -L '$RemoteDirectory' && test `"`$(stat -c %U:%G:%a -- '$RemoteDirectory')`" = 'nhat_hoang:nhat_hoang:700' && rm -f -- '$RemoteDirectory/cotuong-local-backup' '$RemoteDirectory/validate-test-backup.py' '$RemoteDirectory/.sha256' && rmdir -- '$RemoteDirectory' && test ! -e '$RemoteDirectory' && test ! -L '$RemoteDirectory'"
      Invoke-NativeChecked -FilePath 'ssh.exe' -Arguments (@('-i', $PrivateKey) + $sshOptions + @($Target, $cleanup)) -FailureMessage 'Temporary upload cleanup failed; inspect only the unique upload directory'
      Write-Host 'Temporary uploaded helper files and their private directory were removed. Database backup files were not deleted.'
    }
    catch { Write-Warning "Temporary upload cleanup could not be verified. Inspect only $RemoteDirectory. $($_.Exception.Message)" }
  }
  if (-not $DrillStarted -or $DrillCompleted) {
    Remove-Item -LiteralPath $LocalStage -Recurse -Force -Confirm:$false -ErrorAction SilentlyContinue
  }
  foreach ($path in @($ManifestPath, $SshConfigPath)) {
    Remove-Item -LiteralPath $path -Recurse -Force -Confirm:$false -ErrorAction SilentlyContinue
  }
}
