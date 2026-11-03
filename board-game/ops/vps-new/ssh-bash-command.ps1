# Shared PowerShell 5.1-safe SSH command builder for UTF-8 Bash source.
function New-CotuongSshBashCommand {
  param([Parameter(Mandatory = $true)][string]$Base64Script)
  if ($Base64Script -notmatch '^[A-Za-z0-9+/]+={0,2}$') { throw 'Remote Bash payload must be Base64.' }
  try { [void][Convert]::FromBase64String($Base64Script) } catch { throw 'Remote Bash payload is invalid Base64.' }
  # SSH joins remote command arguments before passing them to the login shell.
  # Single quotes survive PowerShell 5.1 and protect the decode pipeline as one `bash -c` argument.
  # Pipe decoded bytes to a second Bash; never use command substitution as the `-c` command.
  return '/bin/bash -c ''printf %s ' + $Base64Script + ' | base64 --decode | /bin/bash'''
}
