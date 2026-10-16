Add-Type -AssemblyName System.Drawing
$source = Join-Path $PSScriptRoot '../src/assets/references/uploads/63e5f151-292a-42f2-aaf6-87a98eb66220.png'
$target = Join-Path $PSScriptRoot '../src/assets/computer-setup/training-banner.png'
$bitmap = [System.Drawing.Bitmap]::new((Resolve-Path $source).Path)
try {
  $image = $bitmap.Clone([System.Drawing.Rectangle]::new(20,188,2132,348), [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  try {
    # Remove stray pixels beyond the rounded frame without changing its artwork.
    $radius = 24
    for ($y = 0; $y -lt $image.Height; $y++) {
      for ($x = 0; $x -lt $image.Width; $x++) {
        $dx = [Math]::Max($radius - $x - 0.5, $x + 0.5 - ($image.Width - $radius))
        $dy = [Math]::Max($radius - $y - 0.5, $y + 0.5 - ($image.Height - $radius))
        if ($dx -gt 0 -and $dy -gt 0 -and ($dx*$dx + $dy*$dy) -gt $radius*$radius) {
          $image.SetPixel($x,$y,[System.Drawing.Color]::Transparent)
        }
      }
    }
    $image.Save($target,[System.Drawing.Imaging.ImageFormat]::Png)
  } finally { $image.Dispose() }
} finally { $bitmap.Dispose() }
