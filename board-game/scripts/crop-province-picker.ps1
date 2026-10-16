Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System.Drawing;
using System.Collections.Generic;
public static class ProvinceArtworkCrop {
  public static void Run(string input, string output, int startY, int endY) {
    using (var image = new Bitmap(input)) {
      int w=image.Width, h=image.Height;
      var visible=new bool[w*h]; var seen=new bool[w*h];
      for(int y=0;y<h;y++) for(int x=0;x<w;x++) visible[y*w+x]=y>=startY && y<endY && image.GetPixel(x,y).A>8;
      var largest=new List<int>();
      for(int start=0;start<w*h;start++) {
        if(!visible[start] || seen[start]) continue;
        var component=new List<int>(); var queue=new Queue<int>();
        queue.Enqueue(start); seen[start]=true;
        while(queue.Count>0) {
          int p=queue.Dequeue(); component.Add(p); int x=p%w,y=p/w;
          for(int dy=-1;dy<=1;dy++) for(int dx=-1;dx<=1;dx++) {
            int nx=x+dx,ny=y+dy;
            if(nx<0 || nx>=w || ny<0 || ny>=h) continue;
            int n=ny*w+nx;
            if(visible[n] && !seen[n]) { seen[n]=true; queue.Enqueue(n); }
          }
        }
        if(component.Count>largest.Count) largest=component;
      }
      int left=w,top=h,right=0,bottom=0;
      foreach(int p in largest) { int x=p%w,y=p/w; left=System.Math.Min(left,x); top=System.Math.Min(top,y); right=System.Math.Max(right,x); bottom=System.Math.Max(bottom,y); }
      using(var result=new Bitmap(right-left+1,bottom-top+1)) {
        foreach(int p in largest) result.SetPixel(p%w-left,p/w-top,image.GetPixel(p%w,p/w));
        result.Save(output,System.Drawing.Imaging.ImageFormat.Png);
        System.Console.WriteLine(output+": crop "+left+","+top+","+result.Width+","+result.Height);
      }
    }
  }
}
'@
$root = Split-Path $PSScriptRoot -Parent
[ProvinceArtworkCrop]::Run((Join-Path $root 'src/assets/references/uploads/72f80581-6af2-490e-b9fa-fcdf2f104da8.png'), (Join-Path $root 'src/assets/room-selection/province-picker-frame.png'), 0, 1088)
[ProvinceArtworkCrop]::Run((Join-Path $root 'src/assets/references/uploads/e05c67be-c3da-4cdb-bece-77e6fdd38dae.png'), (Join-Path $root 'src/assets/room-selection/province-card.png'), 800, 1088)
