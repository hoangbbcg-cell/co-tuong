Add-Type -AssemblyName System.Drawing
$taskRoot = (Get-Location).Path
$taskSource = [Drawing.Bitmap]::new((Join-Path $taskRoot 'board-game/src/assets/create-room/dialog-skin-v2.png'))
foreach ($taskPart in @(@('time-field',344,286,902,140,26),@('cancel-button',558,764,257,122,20),@('confirm-button',849,764,333,122,20))) {
  $taskRect = [Drawing.Rectangle]::new([int]$taskPart[1],[int]$taskPart[2],[int]$taskPart[3],[int]$taskPart[4])
  $taskCrop = $taskSource.Clone($taskRect,[Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $taskCorner = [int]$taskPart[5]
  for ($taskY=0; $taskY -lt $taskCorner; $taskY++) {
    for ($taskX=0; $taskX -lt $taskCorner; $taskX++) {
      if ($taskX + $taskY -ge $taskCorner - 2) { continue }
      $taskCrop.SetPixel($taskX,$taskY,[Drawing.Color]::Transparent)
      $taskCrop.SetPixel($taskCrop.Width-1-$taskX,$taskY,[Drawing.Color]::Transparent)
      $taskCrop.SetPixel($taskX,$taskCrop.Height-1-$taskY,[Drawing.Color]::Transparent)
      $taskCrop.SetPixel($taskCrop.Width-1-$taskX,$taskCrop.Height-1-$taskY,[Drawing.Color]::Transparent)
    }
  }
  $taskCrop.Save((Join-Path $taskRoot ('board-game/src/assets/create-room/' + $taskPart[0] + '.png')),[Drawing.Imaging.ImageFormat]::Png)
  $taskCrop.Dispose()
}
$taskSource.Dispose()
