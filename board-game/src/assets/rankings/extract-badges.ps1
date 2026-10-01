$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$inputPath = 'C:\Users\NHAT HOANG\.codex\generated_images\01a0c1e5-3501-74b0-b565-b89bcd6fd4c5\exec-b4101cc5-ab94-4804-866d-80078e3d297a.png'
$source = [System.Drawing.Bitmap]::FromFile($inputPath)
$names = @('rank-gold-v2.png','rank-silver-v2.png','rank-bronze-v2.png','rank-plain-frame.png')
for ($i=0; $i -lt 4; $i++) {
  $start = [int]($i * $source.Width / 4)
  $end = [int](($i + 1) * $source.Width / 4)
  $left=$end; $right=$start; $top=$source.Height; $bottom=0
  for ($y=0; $y -lt $source.Height; $y++) {
    for ($x=$start; $x -lt $end; $x++) {
      if ($source.GetPixel($x,$y).A -gt 8) {
        $left=[Math]::Min($left,$x); $right=[Math]::Max($right,$x)
        $top=[Math]::Min($top,$y); $bottom=[Math]::Max($bottom,$y)
      }
    }
  }
  $rect=[System.Drawing.Rectangle]::new($left,$top,$right-$left+1,$bottom-$top+1)
  $crop=$source.Clone($rect,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $crop.Save((Join-Path $PSScriptRoot $names[$i]),[System.Drawing.Imaging.ImageFormat]::Png)
  Write-Output "$($names[$i]): $($crop.Width)x$($crop.Height), alpha corner $($crop.GetPixel(0,0).A)"
  $crop.Dispose()
}
$source.Dispose()
