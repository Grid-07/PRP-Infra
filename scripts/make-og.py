"""Build the social share card.

    python scripts/make-og.py

1200x630. A real project render on the right, the navy ground and the PRP
medallion on the left, so the card is made of the same things the site is made
of rather than a separate piece of design.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
BRAND = ROOT / "public" / "images" / "brand"
OUT = ROOT / "public" / "images" / "og-image.jpg"

W, H = 1200, 630
SEAM = 660
FADE = 300
NAVY = (0, 30, 60)
NAVY_DEEP = (0, 18, 37)
COPPER = (220, 160, 120)
COPPER_SOFT = (226, 177, 146)
CREAM = (247, 241, 230)

FONTS = Path("C:/Windows/Fonts")
DISPLAY = FONTS / "georgia.ttf"
SANS = FONTS / "segoeui.ttf"


def panel() -> Image.Image:
    """The navy half, with a soft copper glow behind where the mark sits."""
    p = Image.new("RGB", (SEAM, H), NAVY_DEEP)
    glow = Image.new("RGB", (SEAM, H), NAVY)
    mask = Image.new("L", (SEAM, H), 0)
    d = ImageDraw.Draw(mask)
    for i in range(60):
        r = 340 - i * 5
        if r <= 0:
            break
        a = int(6 + i * 2.2)
        d.ellipse([170 - r, 300 - r, 170 + r, 300 + r], fill=min(a, 90))
    p.paste(glow, (0, 0), mask)
    return p


def render() -> Image.Image:
    """The right half: a project render, cropped to the panel."""
    src = ROOT / "public" / "projects" / "prp-godavari" / "images" / "hero.jpg"
    im = Image.open(src).convert("RGB")
    target_ratio = (W - SEAM) / H
    ratio = im.width / im.height
    if ratio > target_ratio:
        new_w = int(im.height * target_ratio)
        left = (im.width - new_w) // 2
        im = im.crop((left, 0, left + new_w, im.height))
    else:
        new_h = int(im.width / target_ratio)
        top = (im.height - new_h) // 2
        im = im.crop((0, top, im.width, top + new_h))
    im = im.resize((W - SEAM, H), Image.LANCZOS)

    # Fade the render into the navy so the seam is not a hard edge. The mask has
    # to be the size of the panel it is pasted with, so the gradient is drawn
    # into a full-width mask rather than a strip. 300px of fade, eased, because
    # a linear ramp still reads as an edge when the render is this bright.
    pw = W - SEAM
    fade = Image.new("L", (pw, H), 255)
    fd = ImageDraw.Draw(fade)
    for x in range(FADE):
        t = x / FADE
        fd.line([(x, 0), (x, H)], fill=int(255 * (t * t * (3 - 2 * t))))
    p = Image.new("RGB", (pw, H), NAVY_DEEP)
    p.paste(im, (0, 0), fade)

    # Sit the render down into the palette rather than leaving it at full
    # brochure brightness next to a dark panel.
    p = Image.blend(p, Image.new("RGB", (pw, H), NAVY_DEEP), 0.12)
    return p


def main() -> None:
    card = Image.new("RGB", (W, H), NAVY_DEEP)
    card.paste(panel(), (0, 0))
    card.paste(render(), (SEAM, 0))

    mark = Image.open(BRAND / "mark-512.png").convert("RGBA")
    mark = mark.resize((150, 150), Image.LANCZOS)
    card.paste(mark, (78, 96), mark)

    d = ImageDraw.Draw(card)

    # Thin copper rule above the name.
    d.rectangle([78, 300, 138, 302], fill=COPPER)

    f_small = ImageFont.truetype(str(SANS), 17)
    f_title = ImageFont.truetype(str(DISPLAY), 62)
    f_sub = ImageFont.truetype(str(DISPLAY), 30)
    f_meta = ImageFont.truetype(str(SANS), 16)

    d.text((78, 322), "PRP INFRA PROJECT", font=f_small, fill=COPPER_SOFT)
    d.text((78, 352), "Eight addresses.", font=f_title, fill=CREAM)
    d.text((78, 424), "One standard.", font=f_title, fill=COPPER_SOFT)
    d.text((78, 508), "Ranchi, Jharkhand", font=f_sub, fill=(180, 190, 205))

    d.text((78, 566), "+91 79797 21170   ·   prpinfraprojects@gmail.com", font=f_meta, fill=(140, 152, 168))

    card.save(OUT, quality=92, subsampling=0, optimize=True)
    print(f"{OUT.name}  {card.size}  {OUT.stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    main()
