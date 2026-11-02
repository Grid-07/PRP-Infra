"""Prepare the project imagery from the extracted brochure artwork.

    python scripts/prep-images.py

Reads the RGB PNGs lifted out of the eight brochures and writes web-ready JPEGs
into public/projects/<slug>/images/. Each image is capped at a sensible width
and re-encoded once, at quality 88 with no chroma subsampling, so the renders
keep their edges.

The picks below are not arbitrary: every one was chosen by eye from a contact
sheet of the 91 embedded images, and the names say what the image actually is.
Alpha masks and the brochure's decorative frames were dropped -- several of the
largest embedded images are soft masks, not artwork.
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public" / "projects"

# Where the extracted artwork lives (outside the project).
SRC = Path("C:/Users/Nikak/WorkBuddy AI/Bimla Mangal Garderns/prpwork/rgb")

# slug -> (source file stem, destination name, max width)
PICKS = {
    "amar-villa": [
        ("amar-villa-w__p02_0_2135x1461", "hero", 2000),
        ("amar-villa-w__p04_1_1563x782", "interior", 1400),
        ("amar-villa-w__p03_1_1613x1181", "plan-typical", 1600),
        ("amar-villa-w__p04_0_683x1288", "plan-unit-1", 800),
        ("amar-villa-w__p05_0_1925x1112", "plan-unit-2", 1400),
        ("amar-villa-w__p06_0_1927x1125", "plan-unit-3", 1400),
    ],
    "arpan-enclave": [
        ("arpan-enclave-phase-1-and-phase-2__p01_1_1024x542", "hero", 1400),
        ("arpan-enclave-phase-1-and-phase-2__p03_0_2212x1094", "plan-phase-1", 1600),
        ("arpan-enclave-phase-1-and-phase-2__p04_0_2044x1128", "plan-phase-2", 1600),
        ("arpan-enclave-phase-1-and-phase-2__p05_0_2037x1103", "plan-terrace", 1600),
    ],
    "majestic": [
        ("majestic-w-2__p02_0_3338x1878", "hero", 2200),
        ("majestic-w-2__p03_0_2543x1999", "commercial", 1600),
        ("majestic-w-2__p05_0_1589x1987", "tower", 1100),
        ("majestic-w-2__p04_0_887x817", "plan-shop", 900),
        ("majestic-w-2__p04_1_894x807", "plan-office", 900),
        ("majestic-w-2__p06_0_1046x1842", "plan-flat", 900),
        ("majestic-w-2__p07_1_792x1055", "iso-1", 800),
        ("majestic-w-2__p08_1_816x1087", "iso-2", 800),
    ],
    "nishes-arpan": [
        ("nishes-arpan-w__p01_0_1702x1276", "hero", 1600),
        ("nishes-arpan-w__p02_0_526x1207", "plan-lower", 700),
        ("nishes-arpan-w__p02_1_500x1224", "plan-upper", 700),
    ],
    "arpan-vilash": [
        ("open-open-arpan-vilas-jsvl__p04_0_1740x1247", "hero", 1800),
        ("open-open-arpan-vilas-jsvl__p05_0_870x1247", "tower-a", 900),
        ("open-open-arpan-vilas-jsvl__p15_1_871x1247", "tower-b", 900),
        ("open-open-arpan-vilas-jsvl__p03_2_512x1081", "master-plan", 700),
        ("open-open-arpan-vilas-jsvl__p06_3_405x1021", "plan-block-a", 600),
        ("open-open-arpan-vilas-jsvl__p10_4_743x536", "iso", 800),
    ],
    "palash-arpan": [
        ("palash-arpan-w-2__p01_0_1024x768", "hero", 1400),
        ("palash-arpan-w-2__p02_0_1290x1196", "plan-typical", 1300),
        ("palash-arpan-w-2__p02_1_497x497", "interior", 600),
    ],
    "prp-godavari": [
        ("prp-godavari-w__p02_0_2512x2009", "hero", 2000),
        ("prp-godavari-w__p03_0_2211x1485", "plan-typical", 1600),
        ("prp-godavari-w__p04_0_1102x972", "plan-101", 1000),
        ("prp-godavari-w__p04_1_1198x600", "plan-102", 1100),
    ],
    "rajrappa-arpan": [
        ("rajrapa-arpan-w__p01_0_2139x1504", "hero", 2000),
        ("rajrapa-arpan-w__p04_0_957x539", "terrace", 900),
        ("rajrapa-arpan-w__p04_1_495x330", "lounge", 500),
        ("rajrapa-arpan-w__p03_0_871x1319", "plan-typical", 900),
    ],
}


def main() -> None:
    total = 0
    for slug, items in PICKS.items():
        out = PUB / slug / "images"
        out.mkdir(parents=True, exist_ok=True)
        for stem, name, cap in items:
            src = SRC / f"{stem}.png"
            if not src.exists():
                raise SystemExit(f"missing source: {src}")
            im = Image.open(src).convert("RGB")
            if im.width > cap:
                im = im.resize((cap, round(im.height * cap / im.width)), Image.LANCZOS)
            dst = out / f"{name}.jpg"
            im.save(dst, quality=88, subsampling=0, optimize=True, progressive=True)
            kb = dst.stat().st_size / 1024
            total += kb
            print(f"{slug:16} {name:16} {im.width:5}x{im.height:<5} {kb:7.0f} KB")
    print(f"\n{total / 1024:.1f} MB total")


if __name__ == "__main__":
    main()
