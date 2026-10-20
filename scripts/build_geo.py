"""Gera src/content/geo.ts: matriz de pontos do Brasil, capitais, Sobral e contorno do Ceará com as unidades."""
import json, math, sys
from matplotlib.path import Path
src, out = sys.argv[1], sys.argv[2]
d = json.load(open(src))
LON0, LAT0 = -74.2, 5.6          # canto superior esquerdo
K = math.cos(math.radians(-14))  # correção equiretangular
SCALE = 100 / ((-34.5 - LON0) * K)  # largura total = 100 unidades

def proj(lon, lat):
    return ((lon - LON0) * K * SCALE, (LAT0 - lat) * SCALE)

states = {}
for f in d["features"]:
    uf = f["properties"]["sigla"]
    polys = f["geometry"]["coordinates"] if f["geometry"]["type"] == "MultiPolygon" else [f["geometry"]["coordinates"]]
    states[uf] = [Path([proj(*p) for p in poly[0]]) for poly in polys]

def which_state(x, y):
    for uf, paths in states.items():
        for p in paths:
            if p.contains_point((x, y)):
                return uf
    return None

STEP = 1.75
dots, ce_idx = [], []
y = STEP / 2
H = (LAT0 - (-33.9)) * SCALE
while y < H:
    x = STEP / 2
    row = int(y / STEP)
    while x < 100:
        xx = x + (STEP / 2 if row % 2 else 0)
        uf = which_state(xx, y)
        if uf:
            if uf == "CE": ce_idx.append(len(dots))
            dots.append((round(xx, 2), round(y, 2)))
        x += STEP
    y += STEP

capitals = [
 ("AC","Rio Branco",-9.975,-67.810),("AL","Maceió",-9.666,-35.735),("AP","Macapá",0.035,-51.070),
 ("AM","Manaus",-3.119,-60.022),("BA","Salvador",-12.971,-38.501),("CE","Fortaleza",-3.732,-38.527),
 ("DF","Brasília",-15.794,-47.882),("ES","Vitória",-20.315,-40.312),("GO","Goiânia",-16.686,-49.265),
 ("MA","São Luís",-2.530,-44.303),("MT","Cuiabá",-15.601,-56.097),("MS","Campo Grande",-20.469,-54.620),
 ("MG","Belo Horizonte",-19.917,-43.935),("PA","Belém",-1.456,-48.490),("PB","João Pessoa",-7.115,-34.864),
 ("PR","Curitiba",-25.428,-49.273),("PE","Recife",-8.048,-34.877),("PI","Teresina",-5.089,-42.802),
 ("RJ","Rio de Janeiro",-22.907,-43.173),("RN","Natal",-5.794,-35.211),("RS","Porto Alegre",-30.035,-51.218),
 ("RO","Porto Velho",-8.761,-63.900),("RR","Boa Vista",2.820,-60.672),("SC","Florianópolis",-27.595,-48.548),
 ("SP","São Paulo",-23.551,-46.633),("SE","Aracaju",-10.947,-37.073),("TO","Palmas",-10.184,-48.333),
]
caps = [{"uf": uf, "city": c, "x": round(proj(lon, lat)[0], 2), "y": round(proj(lon, lat)[1], 2)} for uf, c, lat, lon in capitals]
sx, sy = proj(-40.349, -3.689)

# Ceará: contorno simplificado em viewBox próprio
ce_poly = max(states["CE"], key=lambda p: len(p.vertices)).vertices
minx, miny = ce_poly[:,0].min(), ce_poly[:,1].min()
maxx, maxy = ce_poly[:,0].max(), ce_poly[:,1].max()
cs = 100 / (maxx - minx)
def ce(x, y): return ((x - minx) * cs, (y - miny) * cs)
pts = [ce(*v) for v in ce_poly]
# simplificação por distância mínima
simp, last = [], None
for p in pts:
    if last is None or math.hypot(p[0]-last[0], p[1]-last[1]) > 0.8:
        simp.append(p); last = p
ce_path = "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in simp) + " Z"
ce_h = round((maxy - miny) * cs, 1)
units = [("sobral",-40.349,-3.689),("jijoca",-40.512,-2.793),("tiangua",-40.992,-3.732),("camocim",-40.841,-2.902),("fortaleza",-38.527,-3.732)]
unit_pos = {u: tuple(round(v, 1) for v in ce(*proj(lon, lat))) for u, lon, lat in units}

with open(out, "w") as fh:
    fh.write("// Gerado por scripts/build_geo.py a partir da malha de UFs (GeoJSON). Não editar à mão.\n")
    fh.write(f"export const BR_VIEWBOX = \"0 0 100 {round(H,1)}\";\n")
    fh.write("export const BR_DOTS: ReadonlyArray<readonly [number, number]> = " + json.dumps(dots).replace(" ", "") + ";\n")
    fh.write("export const CE_DOT_INDEX = new Set<number>(" + json.dumps(ce_idx).replace(" ", "") + ");\n")
    fh.write("export const CAPITALS = " + json.dumps(caps, ensure_ascii=False) + " as const;\n")
    fh.write(f"export const SOBRAL = {{ x: {sx:.2f}, y: {sy:.2f} }};\n")
    fh.write(f"export const CE_VIEWBOX = \"0 0 100 {ce_h}\";\n")
    fh.write(f"export const CE_PATH = \"{ce_path}\";\n")
    fh.write("export const UNIT_POS: Record<string, { x: number; y: number }> = " + json.dumps({k: {"x": v[0], "y": v[1]} for k, v in unit_pos.items()}) + ";\n")
print("dots", len(dots), "ce", len(ce_idx), "H", H, "ce_h", ce_h, "ce pts", len(simp), unit_pos)
