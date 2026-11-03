$ErrorActionPreference = 'Stop'
$repo = (Resolve-Path (Join-Path $PSScriptRoot '..\..\..')).Path
$scriptPath = Join-Path $repo 'board-game\ops\vps-new\bootstrap-vps.ps1'
$tokens = $null
$parseErrors = $null
[System.Management.Automation.Language.Parser]::ParseFile($scriptPath, [ref]$tokens, [ref]$parseErrors) | Out-Null
if ($parseErrors.Count -gt 0) {
  throw "bootstrap-vps.ps1 PowerShell parse failed: $($parseErrors[0].Message)"
}
$source = Get-Content -LiteralPath $scriptPath -Raw
foreach ($required in @(
  'StrictHostKeyChecking=yes',
  "'prune-test-local-backups.py'",
  "'run-test-backup.py'",
  "'cotuong-backup-alert.service'",
  'For an already bootstrapped VPS',
  'sudo -k',
  '/usr/local/sbin/cotuong-vps-admin',
  '/usr/local/share/cotuong-vps/prune-test-local-backups.py',
  'No sudo command has been run.'
)) {
  if (-not $source.Contains($required)) { throw "Existing-host backup helper refresh is missing: $required" }
}
if ($source.Contains('sudo systemctl enable --now') -or $source.Contains('sudo /usr/local/sbin/cotuong-local-backup')) {
  throw 'Bootstrap review helper must not activate backup or timer operations.'
}
Write-Output 'TEST_BACKUP_BUNDLE_REFRESH=PASS'
