# Compress source media -> web assets. Idempotent: skips outputs that already exist.
$ErrorActionPreference = "Continue"
$env:PATH = [Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [Environment]::GetEnvironmentVariable("PATH","User")

$root     = "C:\Users\User1\Downloads\birthday-site"
$menuSrc  = "$root\media\menu-vlogs"
$freeSrc  = "$root\media\ANISA"
$menuOut  = "$root\assets\menu"
$freeOut  = "$root\assets\freebie"
New-Item -ItemType Directory -Force -Path $menuOut, $freeOut | Out-Null

# H.264 720p-max, CRF 28, AAC, faststart for progressive web playback.
function Convert-Video {
    param($InPath, $OutPath, $PosterPath)
    if (Test-Path $OutPath) { Write-Output "SKIP (exists): $(Split-Path $OutPath -Leaf)"; return }
    Write-Output "ENCODE: $(Split-Path $InPath -Leaf)"
    & ffmpeg -y -loglevel error -i $InPath `
        -vf "scale=w=1280:h=720:force_original_aspect_ratio=decrease:force_divisible_by=2" `
        -c:v libx264 -crf 28 -preset medium -pix_fmt yuv420p -movflags +faststart `
        -c:a aac -b:a 128k $OutPath
    if (-not (Test-Path $OutPath)) { Write-Output "  FAILED: $(Split-Path $InPath -Leaf)"; return }
    # poster frame ~1s in (fall back to first frame for very short clips)
    & ffmpeg -y -loglevel error -ss 1 -i $OutPath -frames:v 1 -q:v 4 $PosterPath
    if (-not (Test-Path $PosterPath)) {
        & ffmpeg -y -loglevel error -i $OutPath -frames:v 1 -q:v 4 $PosterPath
    }
    $mb = [math]::Round((Get-Item $OutPath).Length/1MB, 1)
    Write-Output "  -> $(Split-Path $OutPath -Leaf) ${mb}MB"
}

# --- menu vlogs (alphabetical = the order they map to menu slots) ---
foreach ($f in Get-ChildItem $menuSrc -File | Where-Object { $_.Extension -match '^\.(mp4|mov|m4v)$' } | Sort-Object Name) {
    $base = [IO.Path]::GetFileNameWithoutExtension($f.Name).ToLower() -replace '[^a-z0-9]+','-' -replace '(^-|-$)',''
    Convert-Video $f.FullName "$menuOut\$base.mp4" "$menuOut\$base.jpg"
}

# --- freebie gallery: photos copied as-is (already small; avoids EXIF/orientation risk) ---
foreach ($f in Get-ChildItem $freeSrc -File | Where-Object { $_.Extension -match '^\.(jpg|jpeg|png)$' } | Sort-Object Name) {
    $dest = "$freeOut\$($f.Name.ToLower())"
    if (-not (Test-Path $dest)) { Copy-Item $f.FullName $dest }
}

# --- freebie videos ---
foreach ($f in Get-ChildItem $freeSrc -File | Where-Object { $_.Extension -match '^\.(mp4|mov|m4v)$' } | Sort-Object Name) {
    $base = [IO.Path]::GetFileNameWithoutExtension($f.Name).ToLower() -replace '[^a-z0-9]+','-' -replace '(^-|-$)',''
    Convert-Video $f.FullName "$freeOut\$base.mp4" "$freeOut\$base.jpg"
}

Write-Output "=== DONE ==="
foreach ($d in @($menuOut, $freeOut)) {
    $s = Get-ChildItem $d -File | Measure-Object -Property Length -Sum
    Write-Output "$d : $($s.Count) files, $([math]::Round($s.Sum/1MB,1))MB"
}
Get-ChildItem $menuOut -File -Filter *.mp4 | Select-Object Name, @{n='MB';e={[math]::Round($_.Length/1MB,1)}} | Format-Table -AutoSize | Out-String
