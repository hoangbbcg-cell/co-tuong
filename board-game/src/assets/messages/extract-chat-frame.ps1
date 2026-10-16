$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$sourcePath = Join-Path $PSScriptRoot '../references/uploads/messages-ff79830f.png'
$source = [System.Drawing.Bitmap]::FromFile($sourcePath)
# Preserve the original frame/scenery pixels; clip only the surrounding blurred background.
$outline = @(
  91,57, 98,47, 112,43, 115,31, 127,31, 121,21, 135,24, 139,12,
  146,27, 153,10, 158,25, 175,23, 171,28, 188,28, 170,33,
  163,46, 533,46, 528,37, 527,29, 551,33, 562,28, 575,31,
  583,42, 598,46, 1344,46, 1335,31, 1352,34, 1357,19, 1366,30,
  1375,22, 1379,38, 1395,35, 1409,30, 1422,35, 1425,44,
  1438,49, 1445,62, 1445,74, 1439,86, 1438,94, 1438,944,
  1442,953, 1444,965, 1438,979, 1425,988, 1420,1001, 1408,1009,
  1394,1009, 1381,1001, 1366,1004, 1343,1007, 1350,998, 1331,996,
  193,996, 207,1002, 188,1005, 169,1003, 151,1009, 137,1007,
  126,1000, 118,991, 102,986, 92,975, 90,961, 94,950, 99,941,
  99,101, 94,90, 90,78
)
$points = for ($i = 0; $i -lt $outline.Count; $i += 2) {
  [System.Drawing.PointF]::new($outline[$i], $outline[$i + 1])
}
$path = [System.Drawing.Drawing2D.GraphicsPath]::new()
$path.AddPolygon([System.Drawing.PointF[]]$points)
$masked = [System.Drawing.Bitmap]::new($source.Width, $source.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($masked)
$graphics.SetClip($path)
$graphics.DrawImageUnscaled($source, 0, 0)
$graphics.Dispose()
$minX = $masked.Width; $minY = $masked.Height; $maxX = -1; $maxY = -1
for ($y = 0; $y -lt $masked.Height; $y++) {
  for ($x = 0; $x -lt $masked.Width; $x++) {
    if ($masked.GetPixel($x, $y).A -gt 0) {
      $minX = [Math]::Min($minX, $x); $minY = [Math]::Min($minY, $y)
      $maxX = [Math]::Max($maxX, $x); $maxY = [Math]::Max($maxY, $y)
    }
  }
}
$crop = $masked.Clone([System.Drawing.Rectangle]::new($minX, $minY, $maxX - $minX + 1, $maxY - $minY + 1), [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$crop.Save((Join-Path $PSScriptRoot 'chat-frame.png'), [System.Drawing.Imaging.ImageFormat]::Png)
Write-Output "chat-frame.png $($crop.Width)x$($crop.Height); source bbox $minX,$minY,$maxX,$maxY; corner alpha $($crop.GetPixel(0,0).A)"
function Save-Panel($name, $startX, $panelWidth) {
  $panelMinX = $panelWidth; $panelMinY = $crop.Height; $panelMaxX = -1; $panelMaxY = -1
  for ($y = 0; $y -lt $crop.Height; $y++) {
    for ($x = 0; $x -lt $panelWidth; $x++) {
      if ($crop.GetPixel($startX + $x, $y).A -gt 0) {
        $panelMinX = [Math]::Min($panelMinX, $x); $panelMinY = [Math]::Min($panelMinY, $y)
        $panelMaxX = [Math]::Max($panelMaxX, $x); $panelMaxY = [Math]::Max($panelMaxY, $y)
      }
    }
  }
  $panel = $crop.Clone([System.Drawing.Rectangle]::new($startX + $panelMinX, $panelMinY, $panelMaxX - $panelMinX + 1, $panelMaxY - $panelMinY + 1), [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $panel.Save((Join-Path $PSScriptRoot $name), [System.Drawing.Imaging.ImageFormat]::Png)
  Write-Output "$name $($panel.Width)x$($panel.Height); panel bbox $panelMinX,$panelMinY,$panelMaxX,$panelMaxY"
  $panel.Dispose()
}
Save-Panel 'conversation-list-frame.png' 0 465
Save-Panel 'conversation-chat-frame.png' 465 890
$crop.Dispose(); $masked.Dispose(); $path.Dispose(); $source.Dispose()
