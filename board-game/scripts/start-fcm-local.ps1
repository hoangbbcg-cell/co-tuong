& {
    $ErrorActionPreference = 'Stop'

    $root = 'D:\Học\code\code games\Cờ Tướng\board-game'
    $key = Join-Path $HOME 'HOVANG-Private\firebase-admin.json'

    if (!(Test-Path -LiteralPath $key -PathType Leaf)) {
        throw 'Firebase Admin credential missing.'
    }

    Set-Location -LiteralPath $root

    $env:GOOGLE_APPLICATION_CREDENTIALS = $key
    $env:HOVANG_NATIVE_FCM_API = 'enabled'

    # SAFETY: Sending stays disabled until the device test is ready.
    $env:HOVANG_NATIVE_FCM_SEND = 'disabled'

    Write-Host 'HOVANG LOCAL FCM API ENABLED' -ForegroundColor Green
    Write-Host 'FCM REAL SENDING DISABLED'
    Write-Host 'Starting backend on existing local configuration...'

    & npm run dev:server
}