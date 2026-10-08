#!/usr/bin/env python3
"""Download and adapt ten documented public-domain/CC artworks as local WebP assets.

Usage:
  pip install pillow
  python tools/prepare-iliade-art.py

Artworks are historical depictions, NOT AI-generated archaeological reconstructions.
Sources and licenses are documented in data/iliade-art-sources.json.
"""
from __future__ import annotations
import hashlib
import io
import json
import time
import urllib.parse
import urllib.request
from pathlib import Path
from PIL import Image, ImageOps, ImageFilter, ImageEnhance, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / "assets" / "images" / "iliade-timeline"
SOURCES = json.loads((ROOT / "data" / "iliade-art-sources.json").read_text(encoding="utf-8"))
HEADERS = {"User-Agent": "gbprof-educational-site/1.0 (noncommercial classroom use; https://github.com/gb69prof/I-anno)"}
W, H = 1000, 1280

def download(filename):
    filename = filename.replace(" ", "_")
    encoded = urllib.parse.quote(filename, safe="()_,.-")
    md = hashlib.md5(filename.encode("utf-8")).hexdigest()
    addresses = [
        "https://commons.wikimedia.org/wiki/Special:FilePath/" + encoded + "?width=1400",
        "https://upload.wikimedia.org/wikipedia/commons/" + md[0] + "/" + md[:2] + "/" + encoded
    ]
    errors = []
    for url in addresses:
        for attempt in range(3):
            try:
                req = urllib.request.Request(url, headers=HEADERS)
                with urllib.request.urlopen(req, timeout=55) as response:
                    data = response.read(35_000_000)
                picture = Image.open(io.BytesIO(data))
                picture.load()
                if min(picture.size) < 250:
                    raise ValueError("Image unexpectedly small: " + str(picture.size))
                return picture.convert("RGB")
            except Exception as exc:
                errors.append(str(exc))
                time.sleep(2 * (attempt + 1))
    raise RuntimeError("Unable to fetch " + filename + " " + repr(errors[-4:]))

def make_poster(original):
    # Whole historical composition stays visible; defocused extension fills the tall frame.
    bg = ImageOps.fit(original, (W, H), method=Image.Resampling.LANCZOS)
    bg = bg.filter(ImageFilter.GaussianBlur(35))
    bg = ImageEnhance.Color(bg).enhance(0.58)
    bg = ImageEnhance.Brightness(bg).enhance(0.50)
    contrast = Image.new("RGB", (W, H), "#263a39")
    bg = Image.blend(bg, contrast, 0.27)
    # Keep the composition fully visible, without cropping characters.
    framed = ImageOps.contain(original, (W-90, H-150), method=Image.Resampling.LANCZOS)
    framed = ImageEnhance.Contrast(framed).enhance(1.035)
    x = (W - framed.width)//2
    y = (H - framed.height)//2
    shadow = Image.new("RGBA", (W, H))
    d = ImageDraw.Draw(shadow)
    d.rounded_rectangle((x-8, y-8, x+framed.width+8, y+framed.height+8),
                        radius=2, fill=(13, 21, 20, 140))
    shadow = shadow.filter(ImageFilter.GaussianBlur(16))
    bg = Image.alpha_composite(bg.convert("RGBA"), shadow)
    bg.paste(framed, (x, y))
    return bg.convert("RGB")

def main():
    TARGET.mkdir(parents=True, exist_ok=True)
    seen = set()
    for event in SOURCES:
        i = int(event["number"])
        if i in seen: raise ValueError("Duplicate step: " + str(i))
        seen.add(i)
        img = download(event["filename"])
        poster = make_poster(img)
        dest = TARGET / f"tappa-{i:02d}.webp"
        poster.save(dest, "WEBP", quality=84, method=6)
        if dest.stat().st_size < 8_000: raise ValueError("Truncated image: " + str(dest))
        print(f"{i:02d} {dest.relative_to(ROOT)} from {img.size}, {dest.stat().st_size:,} bytes", flush=True)
    assert len(seen) == 10
    print("All 10 local images created and verified.", flush=True)

if __name__ == "__main__":
    main()
