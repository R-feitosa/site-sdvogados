"""
Logos de clientes -> PNG com fundo transparente (sem alterar o desenho).

Para cada logo (JPG em fundo branco):
  1. Remove apenas o branco ligado às bordas (flood fill), preservando brancos internos do desenho.
  2. Suaviza a borda com "unmixing" do branco, evitando halo claro em fundo escuro.
  3. Gera duas versões:
     - <nome>.png       : cores originais, fundo transparente (estado ao passar o mouse)
     - <nome>-mono.png  : tinta branca com opacidade proporcional ao tom (estado padrão, monocromático)
Uso: python3 make_logo_png.py <pasta_client-logos> <pasta_saida>
"""
import os, sys
import numpy as np
from PIL import Image
from scipy import ndimage

SRC, DST = sys.argv[1], sys.argv[2]
os.makedirs(DST, exist_ok=True)
T_BG = 34      # distância máxima do branco para ser considerado fundo
BAND = 3       # faixa (px) de suavização na borda do desenho

for f in sorted(os.listdir(SRC)):
    if f.startswith("logo-placeholder") or not f.lower().endswith((".jpg", ".jpeg", ".png")):
        continue
    name = os.path.splitext(f)[0]
    rgb = np.asarray(Image.open(os.path.join(SRC, f)).convert("RGB")).astype(np.float32)
    dist = (255 - rgb).max(axis=2)                     # 0 = branco puro
    near_white = dist < T_BG
    labels, _ = ndimage.label(near_white)
    border = np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]]))
    bg = np.isin(labels, border[border > 0])

    alpha = np.where(bg, 0.0, 1.0)
    # faixa de transição: pixels de desenho encostados no fundo ganham alfa parcial
    band = ndimage.binary_dilation(bg, iterations=BAND) & ~bg
    a_band = np.clip(dist / 120.0, 0, 1)
    alpha = np.where(band, np.maximum(a_band, 0), alpha)
    # remove o branco misturado na borda (unpremultiply sobre branco)
    a3 = np.clip(alpha, 1e-3, 1)[..., None]
    color = np.where(band[..., None], (rgb - (1 - a3) * 255) / a3, rgb)
    color = np.clip(color, 0, 255)

    rgba = np.dstack([color, alpha * 255]).astype(np.uint8)
    img = Image.fromarray(rgba, "RGBA")
    bbox = img.getchannel("A").point(lambda v: 255 if v > 10 else 0).getbbox()
    img = img.crop(bbox)
    img.thumbnail((320, 160), Image.LANCZOS)
    img.save(os.path.join(DST, f"{name}.png"), optimize=True)

    # versão monocromática (branco). Regra geral: opacidade = escuridão do pixel × alfa.
    # Logos em "selo" (placa escura com letras claras, ex.: Bocca Felice, Pão Mix) usam a regra inversa:
    # a placa some e as letras claras viram a tinta branca, para não parecer um fundo.
    arr = np.asarray(img).astype(np.float32)
    lum = (0.2126 * arr[..., 0] + 0.7152 * arr[..., 1] + 0.0722 * arr[..., 2]) / 255
    a01 = arr[..., 3] / 255
    coverage = (a01 > 0.5).mean()
    mean_lum = float((lum * a01).sum() / max(a01.sum(), 1))
    badge = (coverage > 0.55 and mean_lum < 0.4) or (coverage > 0.7 and mean_lum < 0.75)
    if badge:
        ink = np.clip((lum - 0.35) * 1.8, 0, 1) * a01
    else:
        ink = np.clip((1 - lum) * 1.35, 0, 1) * a01
    mono = np.dstack([np.full(lum.shape, 255), np.full(lum.shape, 255), np.full(lum.shape, 255), ink * 255]).astype(np.uint8)
    Image.fromarray(mono, "RGBA").save(os.path.join(DST, f"{name}-mono.png"), optimize=True)
    print(name, img.size, "selo" if badge else "", f"cobertura={coverage:.2f} lum={mean_lum:.2f}")
