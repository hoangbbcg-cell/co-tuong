Add-Type -AssemblyName System.Drawing
$projectRoot = Split-Path $PSScriptRoot -Parent
$sourcePath = Join-Path $projectRoot 'src/assets/references/uploads/messages-options-8109d221.png'
$outputPath = Join-Path $projectRoot 'src/assets/messages/options'
New-Item -ItemType Directory -Path $outputPath -Force | Out-Null
$sourceImage = [System.Drawing.Bitmap]::FromFile($sourcePath)
function Save-Crop($name, $x, $y, $width, $height, $shape = 'rectangle') {
  $bitmap = New-Object System.Drawing.Bitmap($width, $height)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  if ($shape -eq 'octagon') {
    $points = [System.Drawing.Point[]]@(
      (New-Object System.Drawing.Point(11,0)), (New-Object System.Drawing.Point(($width-12),0)),
      (New-Object System.Drawing.Point(($width-1),11)), (New-Object System.Drawing.Point(($width-1),($height-12))),
      (New-Object System.Drawing.Point(($width-12),($height-1))), (New-Object System.Drawing.Point(11,($height-1))),
      (New-Object System.Drawing.Point(0,($height-12))), (New-Object System.Drawing.Point(0,11)))
    $path.AddPolygon($points)
    $graphics.SetClip($path)
  } elseif ($shape -eq 'rounded') {
    $radius = 18
    $path.AddArc(0,0,$radius*2,$radius*2,180,90)
    $path.AddArc($width-$radius*2-1,0,$radius*2,$radius*2,270,90)
    $path.AddArc($width-$radius*2-1,$height-$radius*2-1,$radius*2,$radius*2,0,90)
    $path.AddArc(0,$height-$radius*2-1,$radius*2,$radius*2,90,90)
    $path.CloseFigure()
    $graphics.SetClip($path)
  }
  $graphics.DrawImage($sourceImage,[System.Drawing.Rectangle]::new(0,0,$width,$height),[System.Drawing.Rectangle]::new($x,$y,$width,$height),[System.Drawing.GraphicsUnit]::Pixel)
  if ($shape -eq 'frame') {
    $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $transparent = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::Transparent)
    $graphics.FillRectangle($transparent,31,32,832,948)
    $transparent.Dispose()
    # The screenshot background outside the four ornaments must not be retained.
    for ($row=0; $row -lt $height; $row++) {
      for ($column=0; $column -lt $width; $column++) {
        if (($row -lt 32 -or $row -gt 979 -or $column -lt 31 -or $column -gt 862)) {
          $pixel=$bitmap.GetPixel($column,$row)
          if (($pixel.R -lt 70 -and $pixel.G -lt 65) -or ($row -ge 65 -and $row -lt 930 -and ($column -lt 8 -or $column -gt 883))) { $bitmap.SetPixel($column,$row,[System.Drawing.Color]::Transparent) }
        }
      }
    }
  }
  if ($shape -eq 'rounded' -or $shape -eq 'octagon') {
    $trimmed = $bitmap.Clone([System.Drawing.Rectangle]::new(0,0,$width-1,$height-1),[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $trimmed.Save((Join-Path $outputPath "$name.png"),[System.Drawing.Imaging.ImageFormat]::Png)
    $trimmed.Dispose()
  } else {
    $bitmap.Save((Join-Path $outputPath "$name.png"),[System.Drawing.Imaging.ImageFormat]::Png)
  }
  $graphics.Dispose(); $path.Dispose(); $bitmap.Dispose()
}
Save-Crop 'frame' 278 38 894 1008 'frame'
Save-Crop 'header-left' 309 70 211 97
Save-Crop 'header-center' 520 150 423 14
Save-Crop 'header-right' 943 70 200 97
Save-Crop 'scene' 309 167 834 257
Save-Crop 'body' 340 511 770 14
Save-Crop 'back' 318 73 86 78 'rounded'
Save-Crop 'info' 396 426 316 78 'rounded'
Save-Crop 'nickname' 740 426 318 78 'rounded'
Save-Crop 'block' 325 528 801 86 'octagon'
Save-Crop 'mute' 325 623 801 86 'octagon'
Save-Crop 'delete-chat' 325 719 801 86 'octagon'
Save-Crop 'remove-friend' 325 816 801 86 'octagon'
Save-Crop 'report' 325 912 801 86 'octagon'
$sourceImage.Dispose()
