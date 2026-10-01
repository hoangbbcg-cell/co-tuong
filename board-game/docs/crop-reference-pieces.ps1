param([switch]$BlackOnly)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
public static class ReferenceCutout {
 public static void Save(string source, string target, double cx, double cy, double rx, double ry) {
  using(var input = new Bitmap(source)) {
   int left=(int)Math.Floor(cx-rx), top=(int)Math.Floor(cy-ry);
   int width=(int)Math.Ceiling(cx+rx)-left, height=(int)Math.Ceiling(cy+ry)-top;
   using(var result=new Bitmap(width,height,PixelFormat.Format32bppArgb)) {
    for(int y=0;y<height;y++) for(int x=0;x<width;x++) {
     int inside=0;
     for(int sy=0;sy<8;sy++) for(int sx=0;sx<8;sx++) {
      double dx=(left+x+(sx+0.5)/8-cx)/rx, dy=(top+y+(sy+0.5)/8-cy)/ry;
      if(dx*dx+dy*dy<=1) inside++;
     }
     Color c=input.GetPixel(left+x,top+y);
     result.SetPixel(x,y,inside==0 ? Color.FromArgb(0,0,0,0) : Color.FromArgb((inside*255+32)/64,c.R,c.G,c.B));
    }
    result.Save(target,ImageFormat.Png);
   }
  }
 }
}
'@
$app = Split-Path $PSScriptRoot -Parent
$source = Join-Path $app 'src/assets/c7ad3098-859f-443b-819c-e9f9a521b7b6.png'
$out = Join-Path $app 'src/assets/pieces'
# Coordinates in the original 941 x 1672 board image; body only, shadow rendered by UI.
$pieces = @(
 @('black','rook',55,101,52,59),
 @('black','horse',160,101,52,59),
 @('black','elephant',266,101,52,59),
 @('black','advisor',372,101,52,59),
 @('black','general',478,101,52,59),
 @('black','cannon',160,388,53,59),
 @('black','soldier',471,529,53,59),
 @('red','rook',55,1394,52,59),
 @('red','horse',160,1394,52,59),
 @('red','elephant',265,1394,52,59),
 @('red','advisor',371,1394,52,59),
 @('red','general',477,1394,52,59),
 @('red','cannon',160,1113,53,59),
 @('red','soldier',471,965,53,59)
)
foreach($p in $pieces) {
 if($BlackOnly -and $p[0] -ne 'black') { continue }
 $version = if($p[0] -eq 'black') { 'v2' } else { 'v1' }
 $target=Join-Path $out ("{0}-{1}-source-cut-{2}.png" -f $p[0],$p[1],$version)
 # Pull the black mask's left edge inward 3 source pixels; retain the right edge.
 $inset = if($p[0] -eq 'black') { 1.5 } else { 0 }
 [ReferenceCutout]::Save($source,$target,($p[2]+$inset),$p[3],($p[4]-$inset),$p[5])
}
