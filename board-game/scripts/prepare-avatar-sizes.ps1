$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$assetDirectory = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../src/assets/shop/avatars'))
$outputDirectory = Join-Path $assetDirectory 'small'
New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null
$sizes = @(96, 128, 136, 160, 192, 200, 256, 272, 320, 384, 408, 480)
foreach ($name in @('nu-kiem-khach', 'lao-quan-su', 'nam-tuong-quan')) {
  $source = [Drawing.Bitmap]::FromFile((Join-Path $assetDirectory "$name-v2.png"))
  try {
    foreach ($size in $sizes) {
      $result = [Drawing.Bitmap]::new($size, $size, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
      $graphics = [Drawing.Graphics]::FromImage($result)
      $attributes = [Drawing.Imaging.ImageAttributes]::new()
      try {
        $graphics.CompositingMode = [Drawing.Drawing2D.CompositingMode]::SourceCopy
        $graphics.CompositingQuality = [Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.PixelOffsetMode = [Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $attributes.SetWrapMode([Drawing.Drawing2D.WrapMode]::TileFlipXY)
        $rectangle = [Drawing.Rectangle]::new(0, 0, $size, $size)
        $graphics.DrawImage($source, $rectangle, 0, 0, $source.Width, $source.Height, [Drawing.GraphicsUnit]::Pixel, $attributes)
        $result.Save((Join-Path $outputDirectory "$name-$size.png"), [Drawing.Imaging.ImageFormat]::Png)
      } finally { $attributes.Dispose(); $graphics.Dispose(); $result.Dispose() }
    }
  } finally { $source.Dispose() }
}
Write-Output 'Prepared 36 small avatar PNGs, original square composition preserved.'
