Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
public static class ProvinceIconAssets {
  public static Rectangle Bounds(Bitmap image) {
    int left=image.Width, top=image.Height, right=-1,bottom=-1;
    for(int y=0;y<image.Height;y++) for(int x=0;x<image.Width;x++) {
      if(image.GetPixel(x,y).A<=8) continue;
      left=Math.Min(left,x); top=Math.Min(top,y); right=Math.Max(right,x); bottom=Math.Max(bottom,y);
    }
    if(right<0) throw new Exception("Empty icon");
    return new Rectangle(left,top,right-left+1,bottom-top+1);
  }
  public static void Prepare(string source,string output) {
    using(var original=new Bitmap(source)) {
      var bounds=Bounds(original);
      using(var cropped=original.Clone(bounds,PixelFormat.Format32bppArgb)) {
        double scale=256.0/Math.Max(cropped.Width,cropped.Height);
        int width=Math.Max(1,(int)Math.Round(cropped.Width*scale));
        int height=Math.Max(1,(int)Math.Round(cropped.Height*scale));
        using(var resized=new Bitmap(width,height,PixelFormat.Format32bppArgb)) {
          using(var graphics=Graphics.FromImage(resized)) {
            graphics.Clear(Color.Transparent);
            graphics.CompositingMode=CompositingMode.SourceCopy;
            graphics.InterpolationMode=InterpolationMode.HighQualityBicubic;
            graphics.PixelOffsetMode=PixelOffsetMode.HighQuality;
            graphics.DrawImage(cropped,new Rectangle(0,0,width,height));
          }
          var finalBounds=Bounds(resized);
          using(var final=resized.Clone(finalBounds,PixelFormat.Format32bppArgb)) {
            for(int y=0;y<final.Height;y++) for(int x=0;x<final.Width;x++) {
              if(final.GetPixel(x,y).A<=8) final.SetPixel(x,y,Color.Transparent);
            }
            final.Save(output,ImageFormat.Png);
            var check=Bounds(final);
            if(check.X!=0 || check.Y!=0 || check.Width!=final.Width || check.Height!=final.Height) throw new Exception("Icon not tight-cropped: "+output);
            bool transparent=false;
            for(int y=0;y<final.Height && !transparent;y++) for(int x=0;x<final.Width;x++) if(final.GetPixel(x,y).A==0) { transparent=true; break; }
            if(!transparent) throw new Exception("Icon has no transparent pixels: "+output);
            Console.WriteLine(System.IO.Path.GetFileName(output)+" "+final.Width+"x"+final.Height);
          }
        }
      }
    }
  }
  public static void Sheet(string[] inputs,string output) {
    using(var sheet=new Bitmap(1536,1536,PixelFormat.Format32bppArgb)) {
      using(var graphics=Graphics.FromImage(sheet)) {
        graphics.Clear(Color.Transparent);
        for(int i=0;i<inputs.Length;i++) using(var icon=new Bitmap(inputs[i])) {
          int x=(i%6)*256+(256-icon.Width)/2, y=(i/6)*256+(256-icon.Height)/2;
          graphics.DrawImageUnscaled(icon,x,y);
        }
      }
      sheet.Save(output,ImageFormat.Png);
    }
  }
}
'@
$root = Split-Path $PSScriptRoot -Parent
$output = Join-Path $root 'src/assets/room-selection/province-icons'
$sources = Join-Path $root 'src/assets/references/uploads/province-icons-generated'
$manifest = Get-Content -LiteralPath (Join-Path $output 'manifest.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$paths = @()
foreach ($icon in $manifest.icons) {
  $source = Join-Path $sources $icon.file
  $target = Join-Path $output $icon.file
  if (!(Test-Path -LiteralPath $source)) { throw "Missing source: $source" }
  [ProvinceIconAssets]::Prepare($source,$target)
  $paths += $target
}
[ProvinceIconAssets]::Sheet([string[]]$paths, (Join-Path $output 'province-icons-sheet.png'))
