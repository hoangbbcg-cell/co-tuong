#requires -Version 5.1
$ErrorActionPreference = 'Stop'
$boardGame = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..'))
$runnerPath = Join-Path $boardGame 'ops\vps-new\run-test-backup-restore-drill.ps1'
$tokens = $null
$parseErrors = $null
$ast = [System.Management.Automation.Language.Parser]::ParseFile($runnerPath, [ref]$tokens, [ref]$parseErrors)
if ($parseErrors.Count -gt 0) {
  $details = ($parseErrors | ForEach-Object { '{0}:{1} {2}' -f $_.Extent.StartLineNumber, $_.Extent.StartColumnNumber, $_.Message }) -join "`n"
  throw "Runner failed PowerShell 5.1 parsing:`n$details"
}

$assignment = $ast.FindAll({
  param($node)
  $node -is [System.Management.Automation.Language.AssignmentStatementAst] -and
    $node.Left -is [System.Management.Automation.Language.VariableExpressionAst] -and
    $node.Left.VariablePath.UserPath -ceq 'readOnlyPreflight'
}, $true) | Select-Object -First 1
if (-not $assignment) {
  throw 'Could not locate the literal read-only Bash preflight here-string.'
}
$valueAst = $assignment.Right
if ($valueAst -is [System.Management.Automation.Language.CommandExpressionAst]) { $valueAst = $valueAst.Expression }
if ($valueAst -isnot [System.Management.Automation.Language.StringConstantExpressionAst]) {
  throw 'Read-only Bash preflight is not a constant PowerShell here-string.'
}
$bash = $valueAst.Value
$bash = $bash.Replace("`r`n", "`n").Replace("`r", "`n")

function Assert-Contains {
  param([string]$Text, [string]$Expected, [string]$Label)
  if (-not $Text.Contains($Expected)) { throw "$Label is missing from the runner." }
}

Assert-Contains $bash 'sudo -v' 'Interactive sudo authentication'
Assert-Contains $bash 'sudo -n mysql --protocol=socket --user=root' 'Non-prompting read-only MySQL calls after sudo authentication'
Assert-Contains $bash 'READ_ONLY_PREFLIGHT_FAILED step=%s exit=%s' 'Per-step failure diagnostic'
Assert-Contains $bash "SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME='cotuong_stage'" 'Read-only schema inspection'
Assert-Contains $bash 'SHOW GRANTS FOR' 'Read-only grants inspection'
Assert-Contains $bash 'READ_ONLY_PREFLIGHT=PASS' 'Read-only preflight success marker'

if ($bash -match '(?im)^\s*(?:INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|REPLACE)\b') {
  throw 'Read-only preflight contains a data or schema mutation statement.'
}
if ($bash -match '(?i)DB_PASSWORD|MYSQL_PWD|BEGIN PRIVATE KEY|secret') {
  throw 'Read-only preflight appears to contain credential material.'
}

$bytes = [System.Text.Encoding]::UTF8.GetBytes($bash)
$encoded = [Convert]::ToBase64String($bytes)
$decoded = [System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($encoded))
if ($decoded -cne $bash) { throw 'PowerShell 5.1 Base64 transport round-trip changed the remote Bash script.' }

$source = [IO.File]::ReadAllText($runnerPath)
if ($source -match '\$\w+\s*=\s*@\(&\s*ssh\.exe[^\r\n]*\$remotePreflight') {
  throw 'Read-only SSH output is captured, which can hide the sudo password prompt.'
}
Assert-Contains $source "@('-tt', '-i', `$PrivateKey) + `$sshOptions + @(`$Target, `$remotePreflight)" 'Interactive SSH PTY invocation'
Assert-Contains $source '$readOnlyPreflight = $readOnlyPreflight.Replace("`r`n", "`n").Replace("`r", "`n")' 'Windows-to-Unix newline normalization'
Assert-Contains $source '[switch]$ReadOnlyPreflightOnly' 'Read-only-only operator mode'
Assert-Contains $source 'if (-not $ReadOnlyPreflightOnly) {' 'Guard around all remote helper uploads'
Assert-Contains $source 'if ($ReadOnlyPreflightOnly) {' 'Early exit after read-only checks'
if ($source.IndexOf('if ($ReadOnlyPreflightOnly) {') -gt $source.IndexOf("Write-Host 'Ready to perform these actions")) {
  throw 'Read-only-only mode does not exit before the backup/restore confirmation block.'
}
Write-Host 'PowerShell 5.1 backup restore runner regression: PASS (no SSH/VPS command executed).'
