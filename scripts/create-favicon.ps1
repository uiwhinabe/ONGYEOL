Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot -Parent
$original = [System.Drawing.Bitmap]::FromFile((Join-Path $root 'artifacts/favicon/figma-source.png'))
# Match node 94:137's image crop: width 137.30%, left -24.82%, top -9.13%.
$scale = (705 * 1.373) / $original.Width
$crop = New-Object System.Drawing.RectangleF((705 * 0.2482 / $scale), (658 * 0.0913 / $scale), (705 / $scale), (658 / $scale))
$source = $original.Clone($crop, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$original.Dispose()
$left = $source.Width; $top = $source.Height; $right = 0; $bottom = 0
for ($y = 0; $y -lt $source.Height; $y++) {
    for ($x = 0; $x -lt $source.Width; $x++) {
        if ($source.GetPixel($x, $y).A -ge 128) {
            $left = [Math]::Min($left, $x); $right = [Math]::Max($right, $x)
            $top = [Math]::Min($top, $y); $bottom = [Math]::Max($bottom, $y)
        }
    }
}
$width = $right - $left + 1; $height = $bottom - $top + 1
# Two source pixels protect the antialiased edge; preserve the original aspect ratio.
$side = [Math]::Max($width, $height) + 4
$canvas = New-Object System.Drawing.Bitmap($side, $side)
$offsetX = [int][Math]::Floor(($side - $width) / 2)
$offsetY = [int][Math]::Floor(($side - $height) / 2)
for ($y = 0; $y -lt $side; $y++) {
    for ($x = 0; $x -lt $side; $x++) {
        $sx = $x - $offsetX + $left; $sy = $y - $offsetY + $top
        if ($sx -ge 0 -and $sx -lt $source.Width -and $sy -ge 0 -and $sy -lt $source.Height) {
            $alpha = [int]$source.GetPixel($sx, $sy).A
            if ($alpha -le 8) { $alpha = 0 }
            $canvas.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 0, 0, 0))
        }
    }
}
$png = New-Object System.IO.MemoryStream
$canvas.Save($png, [System.Drawing.Imaging.ImageFormat]::Png)
$base64 = [Convert]::ToBase64String($png.ToArray())
$svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + $side + '" height="' + $side + '" viewBox="0 0 ' + $side + ' ' + $side + '"><!-- Original Figma PNG embedded to preserve logo geometry without tracing. --><image width="' + $side + '" height="' + $side + '" href="data:image/png;base64,' + $base64 + '"/></svg>'
[IO.File]::WriteAllText((Join-Path $root 'public/favicon.svg'), $svg, (New-Object Text.UTF8Encoding($false)))
$sizes = @(16, 32, 48, 64, 128, 256)
$frames = @()
foreach ($size in $sizes) {
    $bitmap = New-Object System.Drawing.Bitmap($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.Clear([System.Drawing.Color]::Transparent)
    $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.DrawImage($canvas, 0, 0, $size, $size)
    $stream = New-Object IO.MemoryStream
    $bitmap.Save($stream, [System.Drawing.Imaging.ImageFormat]::Png)
    $frames += ,$stream.ToArray()
    $graphics.Dispose(); $bitmap.Dispose(); $stream.Dispose()
}
$file = [IO.File]::Create((Join-Path $root 'public/favicon.ico'))
$writer = New-Object IO.BinaryWriter($file)
$writer.Write([uint16]0); $writer.Write([uint16]1); $writer.Write([uint16]$sizes.Count)
$offset = 6 + 16 * $sizes.Count
for ($i = 0; $i -lt $sizes.Count; $i++) {
    $dimension = $sizes[$i] % 256
    $writer.Write([byte]$dimension); $writer.Write([byte]$dimension)
    $writer.Write([byte]0); $writer.Write([byte]0)
    $writer.Write([uint16]1); $writer.Write([uint16]32)
    $writer.Write([uint32]$frames[$i].Length); $writer.Write([uint32]$offset)
    $offset += $frames[$i].Length
}
foreach ($frame in $frames) { $writer.Write([byte[]]$frame) }
$writer.Dispose(); $file.Dispose(); $png.Dispose(); $source.Dispose(); $canvas.Dispose()
Write-Output "Created square ${side}x${side} SVG and ICO sizes: $sizes"
