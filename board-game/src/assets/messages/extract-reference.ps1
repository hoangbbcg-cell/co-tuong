$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$source = [System.Drawing.Bitmap]::FromFile((Join-Path $PSScriptRoot '../references/uploads/messages-01f4e691.png'))
function Save-Crop($name, $x, $y, $w, $h, $circle = $false, $radius = 0) {
  $crop = $source.Clone([System.Drawing.Rectangle]::new($x,$y,$w,$h),[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  if ($circle) {
    for ($cy=0; $cy -lt $h; $cy++) { for ($cx=0; $cx -lt $w; $cx++) {
      $distance = [Math]::Sqrt([Math]::Pow(($cx+0.5-$w/2)/($w/2),2)+[Math]::Pow(($cy+0.5-$h/2)/($h/2),2))
      if ($distance -gt 1) { $crop.SetPixel($cx,$cy,[System.Drawing.Color]::Transparent) }
    }}
  }
  if ($radius -gt 0) {
    for ($cy=0; $cy -lt $h; $cy++) { for ($cx=0; $cx -lt $w; $cx++) {
      $nearestX=[Math]::Max($radius,[Math]::Min($w-$radius,$cx+0.5))
      $nearestY=[Math]::Max($radius,[Math]::Min($h-$radius,$cy+0.5))
      if ([Math]::Pow($cx+0.5-$nearestX,2)+[Math]::Pow($cy+0.5-$nearestY,2) -gt $radius*$radius) { $crop.SetPixel($cx,$cy,[System.Drawing.Color]::Transparent) }
    }}
  }
  $crop.Save((Join-Path $PSScriptRoot $name),[System.Drawing.Imaging.ImageFormat]::Png)
  Write-Output "$name $($crop.Width)x$($crop.Height), corner alpha=$($crop.GetPixel(0,0).A)"
  $crop.Dispose()
}
Save-Crop 'avatar-picolozz.png' 64 309 86 86 $true
Save-Crop 'avatar-khoi.png' 65 413 82 82 $true
Save-Crop 'avatar-an.png' 64 507 82 82 $true
Save-Crop 'avatar-computer.png' 65 599 82 82 $true
Save-Crop 'avatar-dung.png' 65 691 82 82 $true
Save-Crop 'avatar-tuan.png' 65 784 82 82 $true
Save-Crop 'avatar-han.png' 65 877 82 82 $true
Save-Crop 'avatar-phat.png' 65 969 82 82 $true
Save-Crop 'send.png' 1292 937 95 95 $true
Save-Crop 'more.png' 1234 158 51 51 $true
Save-Crop 'contact.png' 1309 158 53 53 $true
Save-Crop 'group-button.png' 64 150 427 63 $false 19
$source.Dispose()
$title = [System.Drawing.Bitmap]::FromFile((Join-Path $PSScriptRoot '../rankings/ranking-title-transparent.png'))
$blank = $title.Clone([System.Drawing.Rectangle]::new(0,0,$title.Width,$title.Height),[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($blank)
$graphics.DrawImage($title,[System.Drawing.Rectangle]::new(555,42,1115,193),[System.Drawing.Rectangle]::new(520,42,195,193),[System.Drawing.GraphicsUnit]::Pixel)
$graphics.Dispose()
$blank.Save((Join-Path $PSScriptRoot 'title-frame.png'),[System.Drawing.Imaging.ImageFormat]::Png)
$blank.Dispose(); $title.Dispose()
