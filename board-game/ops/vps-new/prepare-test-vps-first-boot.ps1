#requires -Version 5.1
[CmdletBinding()]
param(
  [string]$HostAddress = '103.153.254.184',
  [string]$UserName = 'nhat_hoang',
  [string]$PrivateKey = (Join-Path $HOME '.ssh\cotuong_new_vps'),
  [string]$KnownHosts = (Join-Path $HOME '.ssh\known_hosts'),
  [switch]$Preflight
)

$ErrorActionPreference = 'Stop'
$KnownHosts = [IO.Path]::GetFullPath($KnownHosts)
if ($KnownHosts.Contains('"') -or $KnownHosts.Contains("`r") -or $KnownHosts.Contains("`n")) { throw 'KnownHosts path contains unsupported characters.' }
$sshConfigPath = Join-Path ([IO.Path]::GetTempPath()) ('cotuong-ssh-{0}.conf' -f [guid]::NewGuid().ToString('N'))
$sshConfigLines = @(
  'Host *'
  '  IdentitiesOnly yes'
  '  BatchMode yes'
  '  StrictHostKeyChecking yes'
  ('  UserKnownHostsFile "{0}"' -f $KnownHosts)
)
$sshOptions = @('-F', $sshConfigPath)
$remoteMayExist = $false
$primaryError = $null
$localStage = Join-Path ([IO.Path]::GetTempPath()) ('cotuong-vps-setup-{0}' -f [guid]::NewGuid().ToString('N'))
$localScript = Join-Path $localStage 'prepare-test-vps-first-boot.sh'
$manifest = Join-Path ([IO.Path]::GetTempPath()) ('cotuong-vps-manifest-{0}.txt' -f [guid]::NewGuid().ToString('N'))
$remoteDir = '/home/nhat_hoang/.cotuong-vps-setup-{0}' -f [guid]::NewGuid().ToString('N')

function Invoke-NativeChecked {
  param([Parameter(Mandatory)][string]$FilePath, [Parameter(Mandatory)][string[]]$Arguments, [Parameter(Mandatory)][string]$FailureMessage)
  & $FilePath @Arguments
  $code = $LASTEXITCODE
  if ($code -ne 0) { throw "$FailureMessage (exit $code)." }
}

try {
  [IO.File]::WriteAllText($sshConfigPath, ($sshConfigLines -join "`n") + "`n", [System.Text.UTF8Encoding]::new($false))
  if ($HostAddress -cne '103.153.254.184' -or $UserName -cne 'nhat_hoang') { throw 'This script is pinned to nhat_hoang@103.153.254.184.' }
  if (-not (Test-Path -LiteralPath $PrivateKey -PathType Leaf)) { throw "SSH private key file not found: $PrivateKey" }
  if (-not (Test-Path -LiteralPath $KnownHosts -PathType Leaf)) { throw "Pinned known_hosts file not found: $KnownHosts" }
  $hostKeyLines = & ssh-keygen.exe -F $HostAddress -f $KnownHosts 2>$null
  if ($LASTEXITCODE -ne 0) { throw 'The pinned host is absent from known_hosts.' }
  $hostFingerprints = $hostKeyLines | & ssh-keygen.exe -lf - 2>$null
  if ($LASTEXITCODE -ne 0 -or (($hostFingerprints -join "`n") -notmatch 'SHA256:CJzV7hFpB6mDfGDoBm/ViJvw5D5HlBhR60gmOJGLW74.*ED25519')) {
    throw 'known_hosts does not contain the verified ED25519 fingerprint for the pinned VPS.'
  }

  if ($Preflight) {
    New-Item -ItemType Directory -Path $localStage | Out-Null
    $preflightCommand = 'id -un && hostname -I'
    Invoke-NativeChecked -FilePath 'ssh.exe' -Arguments (@('-i', $PrivateKey) + $sshOptions + @("$UserName@$HostAddress", $preflightCommand)) -FailureMessage 'Read-only SSH preflight failed'
    $hostnameProbe = Join-Path $localStage 'hostname'
    Invoke-NativeChecked -FilePath 'scp.exe' -Arguments (@('-i', $PrivateKey) + $sshOptions + @("${UserName}@${HostAddress}:/etc/hostname", $hostnameProbe)) -FailureMessage 'Read-only SCP preflight failed'
    if (-not (Test-Path -LiteralPath $hostnameProbe -PathType Leaf) -or -not (Get-Content -LiteralPath $hostnameProbe -Raw).Trim()) { throw 'Read-only SCP preflight returned no hostname data.' }
    Write-Host 'Read-only SSH and SCP preflight passed. Strict host-key checking remained enabled; no remote file or service was changed.'
    return
  }

  $bashSource = Join-Path $PSScriptRoot 'prepare-test-vps-first-boot.sh'
  $adminSource = Join-Path $PSScriptRoot 'cotuong-vps-admin'
  $activationSource = Join-Path $PSScriptRoot 'cotuong-deploy-activate'
  $unitSource = Join-Path $PSScriptRoot 'cotuong.service'
  $sourceFiles = @($bashSource, $adminSource, $activationSource, $unitSource)
  foreach ($file in $sourceFiles) {
    if (-not (Test-Path -LiteralPath $file -PathType Leaf)) { throw "Required reviewed source file is missing: $file" }
  }

  New-Item -ItemType Directory -Path $localStage | Out-Null
  $utf8NoBom = [System.Text.UTF8Encoding]::new($false)
  $files = @()
  foreach ($source in @($bashSource, $adminSource, $activationSource, $unitSource)) {
    $name = [IO.Path]::GetFileName($source)
    $staged = Join-Path $localStage $name
    $text = [IO.File]::ReadAllText($source, [System.Text.Encoding]::UTF8)
    $text = $text.Replace("`r`n", "`n").Replace("`r", "`n")
    [IO.File]::WriteAllText($staged, $text, $utf8NoBom)
    $files += $staged
  }
  $manifestLines = foreach ($file in $files) {
    $hash = (Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash.ToLowerInvariant()
    $name = [IO.Path]::GetFileName($file)
    "$hash  $name"
  }
  Set-Content -LiteralPath $manifest -Value $manifestLines -Encoding ascii
  $remoteManifest = Join-Path $remoteDir '.sha256'
  $remoteBash = Join-Path $remoteDir 'prepare-test-vps-first-boot.sh'
  $remoteCommand = "test ! -e '$remoteDir' && test ! -L '$remoteDir' && install -d -m 0700 '$remoteDir'"
  $remoteMayExist = $true
  Invoke-NativeChecked -FilePath 'ssh.exe' -Arguments (@('-i', $PrivateKey) + $sshOptions + @("$UserName@$HostAddress", $remoteCommand)) -FailureMessage 'Could not create the unique private upload directory'

  $remoteFiles = $files
  Invoke-NativeChecked -FilePath 'scp.exe' -Arguments (@('-i', $PrivateKey) + $sshOptions + $remoteFiles + @("${UserName}@${HostAddress}:$remoteDir/")) -FailureMessage 'SCP failed'
  Invoke-NativeChecked -FilePath 'scp.exe' -Arguments (@('-i', $PrivateKey) + $sshOptions + @($manifest, "${UserName}@${HostAddress}:$remoteManifest")) -FailureMessage 'Checksum manifest SCP failed'

  $checkCommand = "cd '$remoteDir' && sha256sum --check --status .sha256 && bash -n prepare-test-vps-first-boot.sh cotuong-vps-admin cotuong-deploy-activate"
  Invoke-NativeChecked -FilePath 'ssh.exe' -Arguments (@('-i', $PrivateKey) + $sshOptions + @("$UserName@$HostAddress", $checkCommand)) -FailureMessage 'Remote checksum or Bash syntax check failed'

  Write-Host 'Upload hashes and Bash syntax verified. The next command will request your sudo password in this PowerShell terminal; it is not saved or printed.'
  $sudoCommand = "sudo -v && sudo /bin/bash '$remoteBash' '$remoteDir'"
  Invoke-NativeChecked -FilePath 'ssh.exe' -Arguments (@('-tt', '-i', $PrivateKey) + $sshOptions + @("$UserName@$HostAddress", $sudoCommand)) -FailureMessage 'VPS first-boot preparation failed'
}
catch {
  $primaryError = $_
}
finally {
  if ($remoteMayExist) {
    try {
      if ($remoteDir -notmatch '^/home/nhat_hoang/\.cotuong-vps-setup-[a-f0-9]{32}$') { throw 'Generated remote cleanup path failed its allowlist.' }
      $cleanupCommand = "rm -rf -- '$remoteDir' && test ! -e '$remoteDir' && test ! -L '$remoteDir'"
      & ssh.exe -i $PrivateKey @sshOptions "$UserName@$HostAddress" $cleanupCommand
      $cleanupExit = $LASTEXITCODE
      if ($cleanupExit -ne 0) { Write-Warning "Remote cleanup could not be verified (exit $cleanupExit); only this unique path may remain: $remoteDir" }
      else { $remoteMayExist = $false }
    }
    catch { Write-Warning "Remote cleanup failed; only this unique path may remain: $remoteDir" }
  }
  foreach ($path in @($localStage, $manifest)) {
    Remove-Item -LiteralPath $path -Recurse -Force -Confirm:$false -ErrorAction SilentlyContinue
  }
  Remove-Item -LiteralPath $sshConfigPath -Force -Confirm:$false -ErrorAction SilentlyContinue
}

if ($null -ne $primaryError) { throw $primaryError }
Write-Host 'Preparation finished. No migration, service start, release activation, deployment, Nginx, DNS, or firewall change was performed.'
