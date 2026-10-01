$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;

public static class BoardLightCenterer
{
    private static int Clamp(double value)
    {
        return (int)Math.Max(0, Math.Min(255, Math.Round(value)));
    }

    public static void Apply(string inputPath, string outputPath)
    {
        using (var source = new Bitmap(inputPath))
        using (var output = new Bitmap(source.Width, source.Height, PixelFormat.Format32bppArgb))
        {
            for (int y = 0; y < source.Height; y++)
            for (int x = 0; x < source.Width; x++)
            {
                Color color = source.GetPixel(x, y);
                double nx = (x + 0.5) / source.Width;
                double ny = (y + 0.5) / source.Height;
                double dx = nx - 0.5;
                double centered = Math.Exp(-(dx * dx / 0.095 + (ny - 0.50) * (ny - 0.50) / 0.020));
                double lower = Math.Exp(-(dx * dx / 0.115 + (ny - 0.64) * (ny - 0.64) / 0.018));
                double delta = 10.0 * centered - 5.0 * lower;
                output.SetPixel(x, y, Color.FromArgb(color.A,
                    Clamp(color.R + delta), Clamp(color.G + delta), Clamp(color.B + delta)));
            }
            output.Save(outputPath, ImageFormat.Png);
        }
    }
}
'@

$app = Split-Path $PSScriptRoot -Parent
$input = Join-Path $app 'src/assets/boards/maple-xiangqi-board-v2.png'
$output = Join-Path $app 'src/assets/boards/maple-xiangqi-board-v3-centered-light.png'
[BoardLightCenterer]::Apply($input, $output)
