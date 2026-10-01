param(
    [string]$BlankFile = 'sources\piece-skin-tone-blank-v4.png',
    [string]$OutputSuffix = '-skin-tone-v4'
)

Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$piecesDirectory = Join-Path $projectRoot 'src\assets\pieces'
$blankPath = Join-Path $piecesDirectory $BlankFile
$blank = [System.Drawing.Bitmap]::FromFile($blankPath)

try {
    Get-ChildItem -LiteralPath $piecesDirectory -Filter '*-maple-v3.png' | ForEach-Object {
        $source = [System.Drawing.Bitmap]::FromFile($_.FullName)
        $output = New-Object System.Drawing.Bitmap($source.Width, $source.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        $graphics = [System.Drawing.Graphics]::FromImage($output)

        try {
            $graphics.Clear([System.Drawing.Color]::Transparent)
            $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
            $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
            $graphics.DrawImage($blank, 0, 0, $source.Width, $source.Height)
        }
        finally {
            $graphics.Dispose()
        }

        $isRed = $_.BaseName.StartsWith('red-')
        $centerX = ($source.Width - 1) / 2
        $centerY = ($source.Height - 1) / 2
        $radiusScale = [Math]::Min($source.Width, $source.Height) / 2

        for ($pixelY = 0; $pixelY -lt $source.Height; $pixelY++) {
            for ($pixelX = 0; $pixelX -lt $source.Width; $pixelX++) {
                $sourceColor = $source.GetPixel($pixelX, $pixelY)
                if ($sourceColor.A -eq 0) { continue }

                $normalizedX = ($pixelX - $centerX) / $radiusScale
                $normalizedY = ($pixelY - $centerY) / $radiusScale
                $distance = [Math]::Sqrt($normalizedX * $normalizedX + $normalizedY * $normalizedY)
                if ($distance -gt 0.79) { continue }

                $hue = $sourceColor.GetHue()
                $saturation = $sourceColor.GetSaturation()
                $brightness = $sourceColor.GetBrightness()

                if ($isRed) {
                    $isInk = (($hue -le 24) -or ($hue -ge 336)) -and $saturation -ge 0.42 -and $brightness -le 0.62
                }
                else {
                    $average = ($sourceColor.R + $sourceColor.G + $sourceColor.B) / 3
                    $isInk = $brightness -le 0.31 -or ($brightness -le 0.43 -and $saturation -le 0.36 -and $average -le 112)
                }

                if ($isInk) {
                    $output.SetPixel($pixelX, $pixelY, $sourceColor)
                }
            }
        }

        $minimumX = $output.Width
        $minimumY = $output.Height
        $maximumX = -1
        $maximumY = -1
        for ($pixelY = 0; $pixelY -lt $output.Height; $pixelY++) {
            for ($pixelX = 0; $pixelX -lt $output.Width; $pixelX++) {
                $outputColor = $output.GetPixel($pixelX, $pixelY)
                if ($outputColor.A -le 2) {
                    $output.SetPixel($pixelX, $pixelY, [System.Drawing.Color]::Transparent)
                    continue
                }
                if ($pixelX -lt $minimumX) { $minimumX = $pixelX }
                if ($pixelY -lt $minimumY) { $minimumY = $pixelY }
                if ($pixelX -gt $maximumX) { $maximumX = $pixelX }
                if ($pixelY -gt $maximumY) { $maximumY = $pixelY }
            }
        }

        $cropWidth = $maximumX - $minimumX + 1
        $cropHeight = $maximumY - $minimumY + 1
        $cropped = New-Object System.Drawing.Bitmap($cropWidth, $cropHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        $cropGraphics = [System.Drawing.Graphics]::FromImage($cropped)
        try {
            $cropGraphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
            $destinationRectangle = New-Object System.Drawing.Rectangle(0, 0, $cropWidth, $cropHeight)
            $sourceRectangle = New-Object System.Drawing.Rectangle($minimumX, $minimumY, $cropWidth, $cropHeight)
            $cropGraphics.DrawImage($output, $destinationRectangle, $sourceRectangle, [System.Drawing.GraphicsUnit]::Pixel)
        }
        finally {
            $cropGraphics.Dispose()
        }

        $destination = Join-Path $piecesDirectory ($_.BaseName.Replace('-maple-v3', $OutputSuffix) + '.png')
        try {
            $cropped.Save($destination, [System.Drawing.Imaging.ImageFormat]::Png)
        }
        finally {
            $cropped.Dispose()
            $output.Dispose()
            $source.Dispose()
        }
    }
}
finally {
    $blank.Dispose()
}
