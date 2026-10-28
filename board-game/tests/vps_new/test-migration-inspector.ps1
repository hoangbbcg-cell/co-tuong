#requires -Version 5.1
$ErrorActionPreference = 'Stop'
$path = Join-Path $PSScriptRoot '..\..\ops\vps-new\inspect-test-migration-state.ps1'
$tokens = $null; $errors = $null
$ast = [System.Management.Automation.Language.Parser]::ParseFile([IO.Path]::GetFullPath($path), [ref]$tokens, [ref]$errors)
if ($errors.Count) { throw ($errors | Out-String) }
$assignment = $ast.FindAll({ param($n) $n -is [System.Management.Automation.Language.AssignmentStatementAst] -and $n.Left.VariablePath.UserPath -ceq 'bash' }, $true) | Select-Object -First 1
$value = $assignment.Right
if ($value -is [System.Management.Automation.Language.CommandExpressionAst]) { $value = $value.Expression }
if ($value -isnot [System.Management.Automation.Language.StringConstantExpressionAst]) { throw 'Expected literal Bash transport.' }
$bash = $value.Value.Replace('__PROBE__', [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes('print("metadata only")'))).Replace("`r`n", "`n")
if (-not $bash.Contains('sudo -p $''Sudo password (hidden input):\n'' -v')) { throw 'Piped SSH must use a newline-terminated visible sudo prompt.' }
$encoded = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($bash))
if ([Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($encoded)) -cne $bash) { throw 'PowerShell 5.1 changed remote script transport.' }
$source = [IO.File]::ReadAllText($path)
foreach ($required in @('Tee-Object -Variable probeOutput', '[IO.FileMode]::CreateNew', 'scripts/inspect-test-migrations.ts', 'COTUONG_MIGRATION_REPORT=', 'StrictHostKeyChecking yes')) {
  if (-not $source.Contains($required)) { throw "Missing inspector behavior: $required" }
}
if ($source -match 'scp\.exe|db:migrate|db:smoke|systemctl|cotuong-local-backup') { throw 'Read-only inspector includes an unexpected operational command.' }
Write-Host 'PowerShell 5.1 migration metadata inspector: PASS (no SSH/VPS commands executed).'
