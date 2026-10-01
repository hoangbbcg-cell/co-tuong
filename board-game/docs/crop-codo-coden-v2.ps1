$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot -Parent
$destination = Join-Path $root 'src/assets/pieces/codo-coden-v2'
New-Item -ItemType Directory -Force -Path $destination | Out-Null
# Source rectangles follow the outside of the wooden body, excluding the board shadow.
$sets = @{
    red = @{ file = 'codo.png'; pieces = @(
        @('rook',46,346,89,92), @('horse',144,346,90,92),
        @('elephant',244,346,90,92), @('advisor',344,346,90,92),
        @('general',444,346,89,92), @('cannon',143,138,90,93),
        @('soldier',46,30,89,93)
    ) }
    black = @{ file = 'coden.png'; pieces = @(
        @('rook',147,20,111,112), @('horse',272,20,112,112),
        @('elephant',398,20,112,112), @('advisor',524,20,112,112),
        @('general',651,20,112,112), @('cannon',272,286,112,114),
        @('soldier',146,418,113,114)
    ) }
}
foreach ($side in @('black','red')) {
    $source = [System.Drawing.Bitmap]::FromFile((Join-Path $root ('src/assets/pieces/coden-codo-v1/' + $sets[$side].file)))
    try {
        foreach ($piece in $sets[$side].pieces) {
            $name,$left,$top,$width,$height = $piece
            $output = New-Object System.Drawing.Bitmap($width,$height,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
            try {
                for ($y=0; $y -lt $height; $y++) {
                    for ($x=0; $x -lt $width; $x++) {
                        # Subpixel ellipse coverage keeps the photographed outer rim smooth.
                        $coverage=0
                        for ($sy=0; $sy -lt 4; $sy++) {
                            for ($sx=0; $sx -lt 4; $sx++) {
                                $dx=($x+($sx+0.5)/4-$width/2)/($width/2)
                                $dy=($y+($sy+0.5)/4-$height/2)/($height/2)
                                if ($dx*$dx+$dy*$dy -le 1) { $coverage++ }
                            }
                        }
                        if ($coverage -gt 0) {
                            $color=$source.GetPixel($left+$x,$top+$y)
                            $output.SetPixel($x,$y,[System.Drawing.Color]::FromArgb([int](255*$coverage/16),$color.R,$color.G,$color.B))
                        }
                    }
                }
                $output.Save((Join-Path $destination "$side-$name-codo-coden-v2.png"),[System.Drawing.Imaging.ImageFormat]::Png)
            } finally { $output.Dispose() }
        }
    } finally { $source.Dispose() }
}
