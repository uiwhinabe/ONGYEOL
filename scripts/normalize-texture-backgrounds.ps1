# Catalog-only background copies. Original assets and foreground pixels outside
# the edge-connected background mask remain untouched; no global color filter.
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
public static class TextureBackground {
  public static int Save(string source, string target) {
    using (var input = new Bitmap(source))
    using (var image = new Bitmap(input.Width, input.Height, PixelFormat.Format32bppArgb)) {
      using (var graphics = Graphics.FromImage(image)) {
        graphics.CompositingMode=System.Drawing.Drawing2D.CompositingMode.SourceCopy;
        graphics.DrawImage(input,new Rectangle(0,0,input.Width,input.Height),0,0,input.Width,input.Height,GraphicsUnit.Pixel);
      }
      int w=image.Width, h=image.Height, n=w*h;
      var rect=new Rectangle(0,0,w,h);
      var data=image.LockBits(rect,ImageLockMode.ReadWrite,PixelFormat.Format32bppArgb);
      int stride=data.Stride;
      var pixels=new byte[stride*h]; Marshal.Copy(data.Scan0,pixels,0,pixels.Length);
      var corners=new double[4,3];
      int patch=Math.Max(2,Math.Min(w,h)/40);
      for(int c=0;c<4;c++) {
        int count=0;
        for(int y=0;y<patch;y++) for(int x=0;x<patch;x++) {
          int px=(c%2==0?x:w-1-x), py=(c<2?y:h-1-y), p=py*stride+px*4;
          for(int k=0;k<3;k++) corners[c,k]+=pixels[p+k]; count++;
        }
        for(int k=0;k<3;k++) corners[c,k]/=count;
      }
      var eligible=new bool[n];
      for(int y=0;y<h;y++) for(int x=0;x<w;x++) {
        int p=y*stride+x*4; double u=(double)x/(w-1),v=(double)y/(h-1),distance=0;
        for(int k=0;k<3;k++) {
          double bg=(corners[0,k]*(1-u)+corners[1,k]*u)*(1-v)+(corners[2,k]*(1-u)+corners[3,k]*u)*v;
          distance=Math.Max(distance,Math.Abs(pixels[p+k]-bg));
        }
        // Conservative tolerance keeps texture edges and contact shadows intact.
        int variation=0;
        for(int dy=-2;dy<=2;dy++)for(int dx=-2;dx<=2;dx++){
          int xx=Math.Max(0,Math.Min(w-1,x+dx)),yy=Math.Max(0,Math.Min(h-1,y+dy)),other=yy*stride+xx*4;
          for(int k=0;k<3;k++)variation=Math.Max(variation,Math.Abs(pixels[p+k]-pixels[other+k]));
        }
        eligible[y*w+x]=distance<=8 && variation<=4 && Math.Min(pixels[p],Math.Min(pixels[p+1],pixels[p+2]))>=225;
      }
      var mask=new bool[n]; var queue=new int[n]; int head=0,tail=0;
      for(int y=0;y<h;y++) for(int x=0;x<w;x++) if(x==0||y==0||x==w-1||y==h-1) {
        int p=y*w+x; if(eligible[p]&&!mask[p]) {mask[p]=true;queue[tail++]=p;}
      }
      while(head<tail) {
        int p=queue[head++],x=p%w,y=p/w;
        for(int d=0;d<4;d++) {
          int q=d==0?p-1:d==1?p+1:d==2?p-w:p+w;
          if((d==0&&x==0)||(d==1&&x==w-1)||(d==2&&y==0)||(d==3&&y==h-1))continue;
          if(eligible[q]&&!mask[q]){mask[q]=true;queue[tail++]=q;}
        }
      }
      // Feather inside the background mask only; never alter its foreground side.
      int feather=Math.Max(2,Math.Min(w,h)/100),changed=0;
      var distances=new int[n];
      for(int p=0;p<n;p++) distances[p]=mask[p]?feather:0;
      for(int y=0;y<h;y++) for(int x=0;x<w;x++) {
        int p=y*w+x; if(x>0)distances[p]=Math.Min(distances[p],distances[p-1]+1);
        if(y>0)distances[p]=Math.Min(distances[p],distances[p-w]+1);
      }
      for(int y=h-1;y>=0;y--)for(int x=w-1;x>=0;x--){
        int p=y*w+x;if(x<w-1)distances[p]=Math.Min(distances[p],distances[p+1]+1);
        if(y<h-1)distances[p]=Math.Min(distances[p],distances[p+w]+1);
      }
      for(int y=0;y<h;y++)for(int x=0;x<w;x++) {
        int q=y*w+x,p=y*stride+x*4;if(!mask[q])continue;
        double amount=(double)distances[q]/feather;
        amount=amount*amount*(3-2*amount);
        for(int k=0;k<3;k++)pixels[p+k]=(byte)Math.Round(pixels[p+k]+(255-pixels[p+k])*amount);
        changed++;
      }
      Marshal.Copy(pixels,0,data.Scan0,pixels.Length);image.UnlockBits(data);
      image.Save(target,ImageFormat.Png);return changed;
    }
  }
}
'@
$root = Split-Path $PSScriptRoot -Parent
$destination = Join-Path $root 'src/assets/products/catalog-textures'
New-Item -ItemType Directory -Force -Path $destination | Out-Null
Get-ChildItem (Join-Path $root 'src/assets/products/*-texture.png') |
  Where-Object { $_.Name -notlike 'dakyeolmae-*' } | ForEach-Object {
    $count = [TextureBackground]::Save($_.FullName, (Join-Path $destination $_.Name))
    Write-Output ($_.Name + ': ' + $count + ' background pixels')
  }
