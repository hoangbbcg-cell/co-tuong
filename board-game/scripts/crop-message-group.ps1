Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System.Drawing;
using System.Collections.Generic;
public static class FrameCleanup {
  public static void Run(Bitmap b) {
    int w=b.Width,h=b.Height; var seen=new bool[w*h];
    for(int y=0;y<h;y++) for(int x=0;x<w;x++) {
      int start=y*w+x; if(seen[start] || b.GetPixel(x,y).A==0) continue;
      var component=new List<int>(); var pending=new Queue<int>();
      pending.Enqueue(start); seen[start]=true;
      while(pending.Count>0) {
        int p=pending.Dequeue(); component.Add(p); int px=p%w,py=p/w;
        for(int dy=-1;dy<=1;dy++) for(int dx=-1;dx<=1;dx++) {
          int nx=px+dx,ny=py+dy; if(nx<0||nx>=w||ny<0||ny>=h) continue;
          int n=ny*w+nx; if(seen[n]||b.GetPixel(nx,ny).A==0) continue;
          seen[n]=true; pending.Enqueue(n);
        }
      }
      if(component.Count<200) foreach(int p in component) b.SetPixel(p%w,p/w,Color.Transparent);
    }
  }
}
'@
$root = Split-Path $PSScriptRoot -Parent
$sourcePath = Join-Path $root 'src/assets/references/uploads/messages-create-group-03cff998.png'
$output = Join-Path $root 'src/assets/messages/create-group'
New-Item -ItemType Directory -Path $output -Force | Out-Null
$source = [Drawing.Bitmap]::FromFile($sourcePath)
function Crop($name, $x, $y, $w, $h, $shape = 'rect') {
  $b = New-Object Drawing.Bitmap($w, $h)
  $g = [Drawing.Graphics]::FromImage($b)
  if ($shape -eq 'circle') { $p = New-Object Drawing.Drawing2D.GraphicsPath; $p.AddEllipse(0,0,$w,$h); $g.SetClip($p) }
  $g.DrawImage($source, [Drawing.Rectangle]::new(0,0,$w,$h), [Drawing.Rectangle]::new($x,$y,$w,$h), [Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  if ($shape -eq 'frame') {
    for($iy=0;$iy -lt $h;$iy++){for($ix=0;$ix -lt $w;$ix++){
      if(($ix -ge 30 -and $ix -lt ($w-30) -and $iy -ge 28 -and $iy -lt ($h-30)) -or (($ix -lt 19 -or $ix -ge ($w-19)) -and $iy -gt 65 -and $iy -lt ($h-65)) -or (($iy -lt 12 -or $iy -gt ($h-10)) -and $ix -gt 80 -and $ix -lt ($w-80))){$b.SetPixel($ix,$iy,[Drawing.Color]::Transparent)}
      elseif(($ix -lt 20 -or $ix -gt ($w-20) -or $iy -lt 18 -or $iy -gt ($h-18))){$c=$b.GetPixel($ix,$iy);if($c.R -lt 90 -or $c.G -lt 45 -or $c.B -gt $c.G*0.88){$b.SetPixel($ix,$iy,[Drawing.Color]::Transparent)}}
    }}
    [FrameCleanup]::Run($b)
  }
  $b.Save((Join-Path $output "$name.png"),[Drawing.Imaging.ImageFormat]::Png)
  $b.Dispose()
}
Crop 'frame' 295 13 944 997 'frame'
Crop 'title' 486 49 562 78
Crop 'back' 354 56 72 71 'circle'
Crop 'avatar' 680 130 176 176 'circle'
Crop 'body' 338 312 192 55
$source.Dispose()

