"""Cut the PRP medallion out of the brochure and build the site's logo assets.

    python scripts/make-logo.py

The source is `scripts/medallion-source.png` -- an 8x render of the badge as it
appears on the cover of the Rajrappa Arpan brochure, which carries the largest
copy of it in the set. It is a *photographic* render: the medallion sits on top
of a building photograph, so the corners of the square contain the building and
have to be masked away.

Geometry was measured off the render rather than guessed. Scanning through the
centre gave the dark ring's outer edge at radius 866px around (991, 892.5); the
inner copper disc ends at radius 523.5px. Those two numbers are the whole of the
masking problem, so they are recorded here as constants.

Writes into public/images/brand/:

    mark-1024.png    the full medallion, transparent outside the circle
    mark-512.png     the same, half size
    disc-512.png     the copper disc and monogram only -- the text ring is
                     unreadable below about 64px, so the tab icon uses this

and into public/ (the site root, because that is where the browser and the
manifest look for them):

    favicon.ico      16/32/48 frames, from disc-512
    favicon-32.png   the browser tab
    favicon-192.png  home screen
    favicon-512.png  PWA / share
    apple-touch-icon.png

The artwork is not redrawn. Nothing here is traced, approximated or re-set in a
font: the badge is the company's own pixels, masked and resampled.
"""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
BRAND = PUB / "images" / "brand"
SOURCE = ROOT / "scripts" / "medallion-source.png"

# Measured on the 2032px source render.
CENTRE = (991.0, 892.5)
RING_R = 866.0        # outer edge of the dark ring
DISC_R = 523.5        # outer edge of the inner copper disc

# A hair beyond the ring, so the thin pale rim is kept rather than clipped.
OUTER = 1.014
# The badge sits on a photograph; one pixel of feather hides the seam.
FEATHER = 1.2


def circular_mask(size: int, radius: float) -> Image.Image:
    """A hard circle with a sub-pixel feathered edge, drawn 4x and reduced."""
    ss = 4
    big = Image.new("L", (size * ss, size * ss), 0)
    d = ImageDraw.Draw(big)
    c = size * ss / 2
    d.ellipse(
        [c - radius * ss, c - radius * ss, c + radius * ss, c + radius * ss],
        fill=255,
    )
    return big.resize((size, size), Image.LANCZOS)


def cut(radius_px: float, out_px: int) -> Image.Image:
    """Crop a circle of `radius_px` from the source and resample to out_px."""
    src = Image.open(SOURCE).convert("RGB")
    cx, cy = CENTRE
    box = (
        round(cx - radius_px),
        round(cy - radius_px),
        round(cx + radius_px),
        round(cy + radius_px),
    )
    art = src.crop(box)
    side = art.width

    art = art.resize((out_px, out_px), Image.LANCZOS)
    art = art.convert("RGBA")
    # The mask is built at the output size, so the feather is one output pixel
    # regardless of how far the source was scaled.
    art.putalpha(circular_mask(out_px, out_px / 2 - FEATHER))
    return art


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"missing source: {SOURCE}")
    BRAND.mkdir(parents=True, exist_ok=True)

    full = cut(RING_R * OUTER, 1024)
    full.save(BRAND / "mark-1024.png")
    full.resize((512, 512), Image.LANCZOS).save(BRAND / "mark-512.png")

    # The disc, with a little breathing room so the monogram is not touching
    # the edge once it is 16px.
    disc = cut(DISC_R * 1.03, 512)
    disc.save(BRAND / "disc-512.png")

    disc.resize((512, 512), Image.LANCZOS).save(PUB / "favicon-512.png")
    disc.resize((192, 192), Image.LANCZOS).save(PUB / "favicon-192.png")
    disc.resize((180, 180), Image.LANCZOS).save(PUB / "apple-touch-icon.png")
    f32 = disc.resize((32, 32), Image.LANCZOS)
    f16 = disc.resize((16, 16), Image.LANCZOS)
    f48 = disc.resize((48, 48), Image.LANCZOS)
    f32.save(PUB / "favicon-32.png")
    f32.save(
        PUB / "favicon.ico",
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[f16, f32, f48],
    )

    # Anything the previous run left in the brand folder that is not a mark.
    for stale in list(BRAND.glob("favicon*")) + [BRAND / "apple-touch-icon.png"]:
        if stale.exists():
            stale.unlink()

    for f in sorted(list(BRAND.glob("*")) + list(PUB.glob("favicon*")) + [PUB / "apple-touch-icon.png"]):
        if f.suffix.lower() in (".png", ".ico") and f.exists():
            print(f"  {str(f.relative_to(ROOT)):34} {f.stat().st_size / 1024:7.1f} KB")


if __name__ == "__main__":
    main()
