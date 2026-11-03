#requires -Version 5.1
$ErrorActionPreference = 'Stop'
$path = Join-Path $PSScriptRoot '..\..\ops\vps-new\inspect-test-migration-state.ps1'
$transportPath = Join-Path $PSScriptRoot '..\..\ops\vps-new\ssh-bash-command.ps1'
$tokens = $null; $errors = $null
$ast = [System.Management.Automation.Language.Parser]::ParseFile([IO.Path]::GetFullPath($path), [ref]$tokens, [ref]$errors)
if ($errors.Count) { throw ($errors | Out-String) }
$transportTokens = $null; $transportErrors = $null
[void][System.Management.Automation.Language.Parser]::ParseFile([IO.Path]::GetFullPath($transportPath), [ref]$transportTokens, [ref]$transportErrors)
if ($transportErrors.Count) { throw ($transportErrors | Out-String) }
. $transportPath
$bashCommand = Get-Command bash.exe -ErrorAction SilentlyContinue
if (-not $bashCommand) {
  $gitBashPath = Join-Path $env:ProgramFiles 'Git\bin\bash.exe'
  if (Test-Path -LiteralPath $gitBashPath -PathType Leaf) { $bashExecutable = $gitBashPath }
} else { $bashExecutable = $bashCommand.Source }
if ([string]::IsNullOrWhiteSpace($bashExecutable)) { throw 'Git Bash (bash.exe) is required to execute the SSH transport regression.' }
$bash = @'
set -Eeuo pipefail
printf 'BASH_TRANSPORT_EXECUTED:%s\n' "$((6 * 7))"
'@
$bash = $bash.Replace("`r`n", "`n")
$encoded = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($bash))
$remoteCommand = New-CotuongSshBashCommand -Base64Script $encoded
$actualOutput = @(& $bashExecutable -c $remoteCommand 2>&1)
$actualExitCode = $LASTEXITCODE
$actualText = ($actualOutput | ForEach-Object { [string]$_ }) -join "`n"
if ($actualExitCode -ne 0) { throw "Bash transport execution failed with exit code $actualExitCode`: $actualText" }
if ($actualText.Trim() -cne 'BASH_TRANSPORT_EXECUTED:42') { throw "Bash did not execute the encoded payload exactly; received: $actualText" }
if ($actualText -match '(?im)^(IFS|PATH|SSH_CLIENT|SSH_CONNECTION|SSH_TTY)=') { throw 'Bash transport printed environment variables instead of the script report.' }
$source = [IO.File]::ReadAllText($path)
foreach ($required in @('Tee-Object -Variable probeOutput', '[IO.FileMode]::CreateNew', 'scripts/inspect-test-migrations.ts', 'COTUONG_MIGRATION_REPORT=', 'sudo -p $''Sudo password (hidden input):\n'' -v', 'StrictHostKeyChecking yes', 'New-CotuongSshBashCommand -Base64Script $transport')) {
  if (-not $source.Contains($required)) { throw "Missing inspector behavior: $required" }
}
if ($source -match 'scp\.exe|db:migrate|db:smoke|systemctl|cotuong-local-backup|\$\(printf') { throw 'Read-only inspector includes an unexpected operational command or unsafe Bash command substitution.' }
Write-Host 'PowerShell 5.1 migration metadata inspector and executed Bash transport: PASS (no SSH/VPS commands executed).'
