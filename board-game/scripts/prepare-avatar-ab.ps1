$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
public static class AvatarAB {
  static Color[,] cached;
  static double Kernel(double x) { x=Math.Abs(x); if(x<1e-8)return 1; if(x>=3)return 0; return Math.Sin(Math.PI*x)*Math.Sin(Math.PI*x/3)/(Math.PI*Math.PI*x*x/3); }
  public static void Save(Bitmap src,int n,string path) {
    int w=src.Width,h=src.Height;
    if(cached==null){cached=new Color[h,w];for(int y=0;y<h;y++)for(int x=0;x<w;x++)cached[y,x]=src.GetPixel(x,y);}
    double[,,] horizontal=new double[h,n,3];
    double ratio=(double)w/n, radius=3*Math.Max(1,ratio);
    for(int x=0;x<n;x++) {
      double center=(x+.5)*ratio-.5;
      int lo=Math.Max(0,(int)Math.Ceiling(center-radius)),hi=Math.Min(w-1,(int)Math.Floor(center+radius));
      double sum=0; double[] weights=new double[hi-lo+1];
      for(int i=lo;i<=hi;i++){double k=Kernel((i-center)/Math.Max(1,ratio));weights[i-lo]=k;sum+=k;}
      for(int y=0;y<h;y++)for(int i=lo;i<=hi;i++){Color c=cached[y,i];double k=weights[i-lo]/sum;horizontal[y,x,0]+=c.R*k;horizontal[y,x,1]+=c.G*k;horizontal[y,x,2]+=c.B*k;}
    }
    double[,,] pixels=new double[n,n,3];ratio=(double)h/n;radius=3*Math.Max(1,ratio);
    for(int y=0;y<n;y++) {
      double center=(y+.5)*ratio-.5;int lo=Math.Max(0,(int)Math.Ceiling(center-radius)),hi=Math.Min(h-1,(int)Math.Floor(center+radius));double sum=0;
      for(int i=lo;i<=hi;i++)sum+=Kernel((i-center)/Math.Max(1,ratio));
      for(int i=lo;i<=hi;i++){double k=Kernel((i-center)/Math.Max(1,ratio))/sum;for(int x=0;x<n;x++)for(int c=0;c<3;c++)pixels[y,x,c]+=horizontal[i,x,c]*k;}
    }
    using(Bitmap output=new Bitmap(n,n))for(int y=0;y<n;y++)for(int x=0;x<n;x++){
      int[] rgb=new int[3];for(int c=0;c<3;c++){
        double blur=0;int[] g={1,2,1};for(int dy=-1;dy<=1;dy++)for(int dx=-1;dx<=1;dx++)blur+=pixels[Math.Max(0,Math.Min(n-1,y+dy)),Math.Max(0,Math.Min(n-1,x+dx)),c]*g[dy+1]*g[dx+1]/16.0;
        rgb[c]=(int)Math.Round(Math.Max(0,Math.Min(255,pixels[y,x,c]+.2*(pixels[y,x,c]-blur))));
      }output.SetPixel(x,y,Color.FromArgb(rgb[0],rgb[1],rgb[2]));
      if(x==n-1&&y==n-1)output.Save(path,System.Drawing.Imaging.ImageFormat.Png);
    }
  }
}
'@
$root = Join-Path $PSScriptRoot '../src/assets/shop/avatars'
$target = Join-Path $root 'ab-test'
New-Item -ItemType Directory -Force $target | Out-Null
$source = [Drawing.Bitmap]::FromFile((Join-Path $root 'lao-quan-su-v2.png'))
try {
  # Exact integer CSS sizes 48..160, with native 1x and 2x sources.
  $sizes = @(48..160) + @(48..160 | ForEach-Object { $_ * 2 }) | Sort-Object -Unique
  foreach ($size in $sizes) { [AvatarAB]::Save($source,$size,(Join-Path $target "lao-quan-su-$size.png")) }
} finally { $source.Dispose() }
Write-Output 'B: Lanczos3 antialiased downsample, then Gaussian 3x3 unsharp mask amount 0.20.'
