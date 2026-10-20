"""Gera versões web (WebP) dos assets usados no novo site, sem alterar o conteúdo das fotos."""
import os, sys
from PIL import Image, ImageOps
SRC = sys.argv[1]; DST = sys.argv[2]
os.makedirs(DST, exist_ok=True)
jobs = {
  # nome_saida: (arquivo_origem, largura_max, qualidade)
  "hero-night.webp": ("hero-background-new.jpg", 1920, 82),
  "facade-day.webp": ("office-facade.jpg", 1920, 82),
  "team-history.webp": ("team-history-photo.jpg", 1000, 82),
  "team.webp": ("team-photo.jpg", 1600, 80),
  "office-plaque.webp": ("office-plaque.jpg", 1100, 80),
  "partner-roneely.webp": ("partner-roneely.jpg", 900, 80),
  "partner-tayse.webp": ("partner-tayse.jpg", 900, 80),
  "partner-fabio.webp": ("partner-fabio.jpg", 900, 80),
  "silk.webp": ("mission-waves-bg.jpg", 1920, 84),
  "services-bg.webp": ("services-bg-modern.jpg", 1920, 84),
  "mission-bg.webp": ("mission-values-bg.jpg", 1920, 84),
}
for out, (src, w, q) in jobs.items():
    im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, src)))
    im = im.convert("RGB")
    if im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(os.path.join(DST, out), "WEBP", quality=q, method=6)
    print(out, im.size, os.path.getsize(os.path.join(DST, out)) // 1024, "KB")

# Logos: recorta o espaço vazio (mantém o desenho intacto)
def trim(im, bg_white=False):
    if im.mode == "RGBA" and not bg_white:
        bbox = im.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox()
    else:
        g = im.convert("L").point(lambda v: 255 if v < 238 else 0)
        bbox = g.getbbox()
    return im.crop(bbox) if bbox else im

# Logos de clientes: ver scripts/make_logo_png.py (PNG com fundo transparente)

grp_dst = os.path.join(DST, "group"); os.makedirs(grp_dst, exist_ok=True)
for f in sorted(os.listdir(os.path.join(SRC, "rf-group-logos"))):
    im = Image.open(os.path.join(SRC, "rf-group-logos", f)).convert("RGBA")
    t = trim(im)
    t.thumbnail((640, 300), Image.LANCZOS)
    t.save(os.path.join(grp_dst, os.path.splitext(f)[0] + ".png"), optimize=True)
    print("group", f, t.size)

aw_dst = os.path.join(DST, "awards"); os.makedirs(aw_dst, exist_ok=True)
for f in sorted(os.listdir(os.path.join(SRC, "awards"))):
    im = Image.open(os.path.join(SRC, "awards", f)).convert("RGBA")
    t = trim(im); t.thumbnail((520, 300), Image.LANCZOS)
    t.save(os.path.join(aw_dst, f), optimize=True); print("award", f, t.size)

for f, w in [("logo-header.png", 900), ("logo.png", 600), ("rf-logo-icon.png", 209)]:
    im = Image.open(os.path.join(SRC, f)).convert("RGBA")
    t = trim(im); 
    if t.width > w: t = t.resize((w, round(t.height * w / t.width)), Image.LANCZOS)
    t.save(os.path.join(DST, f.replace(".png", "-trim.png")), optimize=True); print(f, t.size)
