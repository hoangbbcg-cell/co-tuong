param(
  [string]$HostAddress = '103.153.254.184',
  [string]$UserName = 'nhat_hoang',
  [string]$PrivateKey = (Join-Path $HOME '.ssh\cotuong_new_vps')
)
$ErrorActionPreference = 'Stop'
$SshOptions = @('-o', 'IdentitiesOnly=yes', '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes')
$Bundle = $PSScriptRoot
$RemoteDir = "/home/nhat_hoang/cotuong-vps-bootstrap-review-$([guid]::NewGuid().ToString('N'))"
if (-not (Test-Path -LiteralPath $PrivateKey -PathType Leaf)) { throw "SSH key file not found: $PrivateKey" }
if ($HostAddress -ne '103.153.254.184' -or $UserName -ne 'nhat_hoang') { throw 'This bootstrap is pinned to the new VPS and nhat_hoang.' }

ssh -i $PrivateKey @SshOptions "$UserName@$HostAddress" "test ! -e '$RemoteDir' && test ! -L '$RemoteDir' && install -d -m 700 '$RemoteDir'";
if ($LASTEXITCODE -ne 0) { throw 'Could not create the private review directory over SSH.' }
$Files = @(
  'README.md', 'bootstrap-vps.sh', 'cotuong-vps-admin', 'cotuong-vps-admin.sudoers',
  'cotuong-deploy-activate', 'cotuong-deploy.sudoers', 'cotuong.service', 'cotuong-test.conf',
  'cotuong-local-backup', 'cotuong-backup.service', 'cotuong-backup.timer',
  'upload-test-backup-r2.py', 'cotuong-media-backup.py', 'prune-test-r2-backups.py', 'prune-test-local-backups.py', 'cotuong-offsite-backup.service', 'cotuong-r2-retention.service'
)
$SourceFiles = $Files | ForEach-Object { Join-Path $Bundle $_ }
scp -i $PrivateKey @SshOptions @SourceFiles "$UserName@${HostAddress}:$RemoteDir/";
if ($LASTEXITCODE -ne 0) { throw 'Could not upload bootstrap bundle.' }
$HashLines = foreach ($File in $Files) {
  $Hash = (Get-FileHash -Algorithm SHA256 (Join-Path $Bundle $File)).Hash.ToLowerInvariant()
  "$Hash  $RemoteDir/$File"
}
$HashManifest = Join-Path ([System.IO.Path]::GetTempPath()) "cotuong-vps-hashes-$([guid]::NewGuid().ToString('N')).txt"
try {
  $HashLines | Set-Content -LiteralPath $HashManifest -Encoding ascii
  scp -i $PrivateKey @SshOptions $HashManifest "$UserName@${HostAddress}:$RemoteDir/.review-sha256";
  if ($LASTEXITCODE -ne 0) { throw 'Could not upload temporary review manifest.' }
  ssh -i $PrivateKey @SshOptions "$UserName@$HostAddress" "cd '$RemoteDir' && sha256sum -c .review-sha256 && rm -- .review-sha256";
  if ($LASTEXITCODE -ne 0) { throw 'A remote bundle file hash does not match the reviewed local copy.' }
}
finally {
  Remove-Item -LiteralPath $HashManifest -Force -ErrorAction SilentlyContinue
}
Write-Host 'Files uploaded for review only. No sudo command has been run.'
Write-Host "After reviewing the bundle, run this separate command to copy the installer to /root as root-owned, then install the reviewed helpers:"
Write-Host "ssh -tt -i `"$PrivateKey`" -o IdentitiesOnly=yes -o BatchMode=yes -o StrictHostKeyChecking=yes $UserName@$HostAddress 'sudo test ! -e /root/cotuong-vps-bootstrap.sh && sudo test ! -L /root/cotuong-vps-bootstrap.sh && sudo /usr/bin/install -o root -g root -m 0700 $RemoteDir/bootstrap-vps.sh /root/cotuong-vps-bootstrap.sh && sudo /root/cotuong-vps-bootstrap.sh $RemoteDir'"

$BackupRefresh = @(
  @{ Source = 'cotuong-local-backup'; Destination = '/usr/local/share/cotuong-vps/cotuong-local-backup'; Mode = '0750' },
  @{ Source = 'cotuong-backup.service'; Destination = '/usr/local/share/cotuong-vps/cotuong-backup.service'; Mode = '0644' },
  @{ Source = 'cotuong-backup.timer'; Destination = '/usr/local/share/cotuong-vps/cotuong-backup.timer'; Mode = '0644' },
  @{ Source = 'upload-test-backup-r2.py'; Destination = '/usr/local/share/cotuong-vps/upload-test-backup-r2.py'; Mode = '0750' },
  @{ Source = 'cotuong-media-backup.py'; Destination = '/usr/local/share/cotuong-vps/cotuong-media-backup.py'; Mode = '0750' },
  @{ Source = 'prune-test-r2-backups.py'; Destination = '/usr/local/share/cotuong-vps/prune-test-r2-backups.py'; Mode = '0750' },
  @{ Source = 'prune-test-local-backups.py'; Destination = '/usr/local/share/cotuong-vps/prune-test-local-backups.py'; Mode = '0750' },
  @{ Source = 'cotuong-offsite-backup.service'; Destination = '/usr/local/share/cotuong-vps/cotuong-offsite-backup.service'; Mode = '0644' },
  @{ Source = 'cotuong-r2-retention.service'; Destination = '/usr/local/share/cotuong-vps/cotuong-r2-retention.service'; Mode = '0644' },
  @{ Source = 'cotuong-vps-admin'; Destination = '/usr/local/sbin/cotuong-vps-admin'; Mode = '0750' }
)
$RefreshParts = @(
  "test -d /usr/local/sbin && test ! -L /usr/local/sbin && stat -c '%U:%G' /usr/local/sbin | grep -Fx root:root",
  "test -d /usr/local/share/cotuong-vps && test ! -L /usr/local/share/cotuong-vps && stat -c '%U:%G:%a' /usr/local/share/cotuong-vps | grep -Fx root:root:755",
  "test -f '$RemoteDir/cotuong-vps-admin' && test ! -L '$RemoteDir/cotuong-vps-admin'"
)
foreach ($Item in $BackupRefresh) {
  $SourcePath = "$RemoteDir/$($Item.Source)"
  $RefreshParts += "test -f '$SourcePath' && test ! -L '$SourcePath'"
  $RefreshParts += "test ! -L '$($Item.Destination)' && { test ! -e '$($Item.Destination)' || { test -f '$($Item.Destination)' && stat -c '%U:%G' '$($Item.Destination)' | grep -Fx root:root; }; }"
}
$RefreshParts += 'sudo -k'
foreach ($Item in $BackupRefresh) {
  $SourcePath = "$RemoteDir/$($Item.Source)"
  $RefreshParts += "sudo /usr/bin/install -o root -g root -m $($Item.Mode) '$SourcePath' '$($Item.Destination)'"
}
$RefreshParts += 'printf "Reviewed backup helper sources refreshed; no backup, unit reload, timer activation, or sudoers change was run.\n"'
$RefreshCommand = $RefreshParts -join ' && '
Write-Host 'For an already bootstrapped VPS, the following separate command refreshes only the listed root-owned backup sources after their uploaded SHA-256 values have been reviewed.'
Write-Host 'It uses interactive sudo; it does not install backup executables, reload/start units, enable timers, run backup/retention, or modify sudoers.'
Write-Host "ssh -tt -i `"$PrivateKey`" -o IdentitiesOnly=yes -o BatchMode=yes -o StrictHostKeyChecking=yes $UserName@$HostAddress `"$RefreshCommand`""
Write-Host 'After a separately approved config review, the one-time installer command is: sudo -k /usr/local/sbin/cotuong-vps-admin install-local-backup (interactive sudo; no sudoers grant is added).'
