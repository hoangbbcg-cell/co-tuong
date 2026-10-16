Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;
public static class ReplayCrop {
  public static void Make(string input, string output, int x, int y, int w, int h, int tx, int ty, int tw, int th) {
    using (var source = new Bitmap(input))
    using (var crop = source.Clone(new Rectangle(x,y,w,h), PixelFormat.Format32bppArgb)) {
      if (tw > 0) for (int row=ty; row<ty+th; row++) {
        var left=crop.GetPixel(tx-1,row); var right=crop.GetPixel(tx+tw,row);
        for(int col=tx;col<tx+tw;col++) {
          double t=(double)(col-tx+1)/(tw+1);
          crop.SetPixel(col,row,Color.FromArgb(255,(int)(left.R*(1-t)+right.R*t),(int)(left.G*(1-t)+right.G*t),(int)(left.B*(1-t)+right.B*t)));
        }
      }
      var seen=new bool[w*h]; var queue=new Queue<int>();
      for(int col=0;col<w;col++){queue.Enqueue(col);queue.Enqueue((h-1)*w+col);}
      for(int row=0;row<h;row++){queue.Enqueue(row*w);queue.Enqueue(row*w+w-1);}
      while(queue.Count>0){int p=queue.Dequeue();if(seen[p])continue;seen[p]=true;int col=p%w,row=p/w;var c=crop.GetPixel(col,row);
        int max=Math.Max(c.R,Math.Max(c.G,c.B)),min=Math.Min(c.R,Math.Min(c.G,c.B));
        if(max-min>24 || max<80)continue;
        crop.SetPixel(col,row,Color.Transparent);
        if(col>0)queue.Enqueue(p-1);if(col+1<w)queue.Enqueue(p+1);if(row>0)queue.Enqueue(p-w);if(row+1<h)queue.Enqueue(p+w);
      }
      int l=w,r=-1,t0=h,b=-1;
      for(int row=0;row<h;row++)for(int col=0;col<w;col++)if(crop.GetPixel(col,row).A>0){l=Math.Min(l,col);r=Math.Max(r,col);t0=Math.Min(t0,row);b=Math.Max(b,row);}
      using(var trimmed=crop.Clone(new Rectangle(l,t0,r-l+1,b-t0+1),PixelFormat.Format32bppArgb)){trimmed.Save(output,ImageFormat.Png);Console.WriteLine(System.IO.Path.GetFileName(output)+" "+trimmed.Width+"x"+trimmed.Height);}
    }
  }
}
'@
$source = Join-Path $PSScriptRoot '../src/assets/6c0cdab5-e284-4ae6-ac70-c3119205ed80.png'
$target = Join-Path $PSScriptRoot '../src/assets/history'
[ReplayCrop]::Make($source,(Join-Path $target 'controls-frame-v2.png'),45,297,703,622,0,0,0,0)
[ReplayCrop]::Make($source,(Join-Path $target 'controls-play-v2.png'),788,82,679,182,215,48,255,85)
[ReplayCrop]::Make($source,(Join-Path $target 'controls-back-v2.png'),780,288,194,168,0,0,0,0)
[ReplayCrop]::Make($source,(Join-Path $target 'controls-count-v2.png'),975,303,311,140,72,30,170,79)
[ReplayCrop]::Make($source,(Join-Path $target 'controls-forward-v2.png'),1288,288,199,168,0,0,0,0)
[ReplayCrop]::Make($source,(Join-Path $target 'controls-machine-v2.png'),776,480,705,189,253,59,353,78)
[ReplayCrop]::Make($source,(Join-Path $target 'controls-analysis-v2.png'),790,682,305,276,0,0,0,0)
[ReplayCrop]::Make($source,(Join-Path $target 'controls-hint-v2.png'),1160,682,306,277,0,0,0,0)
$resetSource = Join-Path $PSScriptRoot '../src/assets/0fed4f87-153a-4338-ad9b-a3a0e2e1ff1c.png'
[ReplayCrop]::Make($resetSource,(Join-Path $target 'controls-reset-v2.png'),175,190,905,820,0,0,0,0)
