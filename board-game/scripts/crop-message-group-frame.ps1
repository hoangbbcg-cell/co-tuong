Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System.Drawing;
using System.Collections.Generic;
public static class GroupFrameCrop {
  public static Bitmap Run(Bitmap b) {
    int w=b.Width,h=b.Height; var seen=new bool[w*h]; var largest=new List<int>();
    for(int y=0;y<h;y++) for(int x=0;x<w;x++) {
      int start=y*w+x; if(seen[start] || b.GetPixel(x,y).A==0) continue;
      var component=new List<int>(); var pending=new Queue<int>(); pending.Enqueue(start); seen[start]=true;
      while(pending.Count>0) {
        int p=pending.Dequeue(); component.Add(p); int px=p%w,py=p/w;
        for(int dy=-1;dy<=1;dy++) for(int dx=-1;dx<=1;dx++) {
          int nx=px+dx,ny=py+dy; if(nx<0||nx>=w||ny<0||ny>=h) continue;
          int n=ny*w+nx; if(seen[n]||b.GetPixel(nx,ny).A==0) continue;
          seen[n]=true; pending.Enqueue(n);
        }
      }
      if(component.Count>largest.Count) largest=component;
    }
    int left=w,top=h,right=0,bottom=0;
    var cleaned=new Bitmap(w,h);
    foreach(int p in largest) {int x=p%w,y=p/w; cleaned.SetPixel(x,y,b.GetPixel(x,y)); left=System.Math.Min(left,x);top=System.Math.Min(top,y);right=System.Math.Max(right,x);bottom=System.Math.Max(bottom,y);}
    var rect=new Rectangle(left,top,right-left+1,bottom-top+1);
    var result=cleaned.Clone(rect,System.Drawing.Imaging.PixelFormat.Format32bppArgb);cleaned.Dispose();
    System.Console.WriteLine("Crop: "+rect.ToString());return result;
  }
}
'@
$root = Split-Path $PSScriptRoot -Parent
$source = [Drawing.Bitmap]::FromFile((Join-Path $root 'src/assets/references/uploads/messages-create-group-frame-3b29fb3a.png'))
$cropped = [GroupFrameCrop]::Run($source)
$cropped.Save((Join-Path $root 'src/assets/messages/create-group/frame-background.png'),[Drawing.Imaging.ImageFormat]::Png)
$cropped.Dispose()
$source.Dispose()

