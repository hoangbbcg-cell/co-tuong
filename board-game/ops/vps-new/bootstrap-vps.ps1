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
  'cotuong-local-backup', 'cotuong-backup.service', 'cotuong-backup.timer'
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
