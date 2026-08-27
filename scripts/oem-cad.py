#!/usr/bin/env python3
"""Look 8 / Look 12 enclosure CAD for supplier RFQ.

Units: millimetres. Outputs binary-ish ASCII STL + dimensioned SVG.
These are industrial-design solids for quoting / 3D print / CAM — not
a production STEP with PCB keep-outs."""

from __future__ import annotations

import math
from pathlib import Path

OUT = Path("/workspace/public/oem/cad")
OUT.mkdir(parents=True, exist_ok=True)

LOOK8 = dict(
    name="LOOK-8",
    w=142.0,
    h=292.0,
    d=61.0,
    r=28.0,
    glass_inset=6.0,
    cam_y=22.0,
    cam_r=4.5,
    led_w=90.0,
    led_h=4.0,
    led_y=12.0,
)
LOOK12 = dict(
    name="LOOK-12",
    w=315.0,
    h=220.0,
    d=61.0,
    r=36.0,
    glass_inset=7.0,
    cam_y=20.0,
    cam_r=4.5,
    led_w=180.0,
    led_h=4.0,
    led_y=11.0,
)


def rounded_rect(cx: float, cy: float, w: float, h: float, r: float, n: int = 10):
    r = min(r, w / 2 - 0.2, h / 2 - 0.2)
    pts: list[tuple[float, float]] = []
    corners = [
        (cx + w / 2 - r, cy + h / 2 - r, 0.0, 0.5 * math.pi),
        (cx - w / 2 + r, cy + h / 2 - r, 0.5 * math.pi, math.pi),
        (cx - w / 2 + r, cy - h / 2 + r, math.pi, 1.5 * math.pi),
        (cx + w / 2 - r, cy - h / 2 + r, 1.5 * math.pi, 2.0 * math.pi),
    ]
    for ox, oy, a0, a1 in corners:
        for i in range(n + 1):
            a = a0 + (a1 - a0) * i / n
            pts.append((ox + r * math.cos(a), oy + r * math.sin(a)))
    return pts


def fan_tris(poly: list[tuple[float, float]], z: float, normal: tuple[float, float, float]):
    if len(poly) < 3:
        return []
    c = (
        sum(p[0] for p in poly) / len(poly),
        sum(p[1] for p in poly) / len(poly),
        z,
    )
    tris = []
    n = len(poly)
    for i in range(n):
        a = (poly[i][0], poly[i][1], z)
        b = (poly[(i + 1) % n][0], poly[(i + 1) % n][1], z)
        if normal[2] < 0:
            tris.append((normal, a, b, c))
        else:
            tris.append((normal, a, c, b))
    return tris


def wall_tris(poly: list[tuple[float, float]], z0: float, z1: float, outward=True):
    tris = []
    n = len(poly)
    for i in range(n):
        x0, y0 = poly[i]
        x1, y1 = poly[(i + 1) % n]
        dx, dy = x1 - x0, y1 - y0
        nx, ny = dy, -dx
        L = math.hypot(nx, ny) or 1
        nx, ny = nx / L, ny / L
        if not outward:
            nx, ny = -nx, -ny
        nrm = (nx, ny, 0.0)
        a = (x0, y0, z0)
        b = (x1, y1, z0)
        c = (x1, y1, z1)
        d = (x0, y0, z1)
        tris.append((nrm, a, b, c))
        tris.append((nrm, a, c, d))
    return tris


def write_stl(path: Path, tris: list, name: str):
    lines = [f"solid {name}"]
    for nrm, a, b, c in tris:
        lines.append(f"  facet normal {nrm[0]:.6f} {nrm[1]:.6f} {nrm[2]:.6f}")
        lines.append("    outer loop")
        for p in (a, b, c):
            lines.append(f"      vertex {p[0]:.4f} {p[1]:.4f} {p[2]:.4f}")
        lines.append("    endloop")
        lines.append("  endfacet")
    lines.append(f"endsolid {name}")
    path.write_text("\n".join(lines) + "\n")


def enclosure(spec: dict):
    w, h, d, r = spec["w"], spec["h"], spec["d"], spec["r"]
    outer = rounded_rect(0, 0, w, h, r)
    glass = rounded_rect(0, -4, w - spec["glass_inset"] * 2, h - spec["glass_inset"] * 2 - 10, r - 4)
    tris = []
    tris += fan_tris(outer, d, (0, 0, 1))
    tris += fan_tris(list(reversed(outer)), 0, (0, 0, -1))
    tris += wall_tris(outer, 0, d, True)
    # front glass recess 2mm
    tris += fan_tris(list(reversed(glass)), d - 2.0, (0, 0, -1))
    tris += wall_tris(glass, d - 2.0, d, False)
    return tris


def drawing_svg(spec: dict) -> str:
    w, h, d, r = spec["w"], spec["h"], spec["d"], spec["r"]
    name = spec["name"]
    sx, sy = 2.0, 2.0
    ox, oy = 80, 60
    fw, fh = w * sx, h * sy

    def rr(x, y, ww, hh, rad, extra=""):
        return (
            f'<rect x="{x:.1f}" y="{y:.1f}" width="{ww:.1f}" height="{hh:.1f}" '
            f'rx="{rad * sx:.1f}" ry="{rad * sy:.1f}" {extra}/>'
        )

    dim = f"""
    <g font-family="Barlow Condensed, Arial Narrow, sans-serif" font-size="13" fill="#111">
      <line x1="{ox}" y1="{oy + fh + 28}" x2="{ox + fw}" y2="{oy + fh + 28}" stroke="#111" />
      <text x="{ox + fw / 2}" y="{oy + fh + 46}" text-anchor="middle">{w:.0f} mm</text>
      <line x1="{ox - 28}" y1="{oy}" x2="{ox - 28}" y2="{oy + fh}" stroke="#111" />
      <text x="{ox - 40}" y="{oy + fh / 2}" text-anchor="middle" transform="rotate(-90 {ox - 40} {oy + fh / 2})">{h:.0f} mm</text>
    </g>
    """
    side_x = ox + fw + 90
    side = f"""
    <rect x="{side_x}" y="{oy + fh - d * sy * 2}" width="{d * sx * 1.4}" height="{d * sy * 2}"
          rx="6" fill="#1a1a1a" stroke="#FF0074" stroke-width="2"/>
    <text x="{side_x + d * sx * 0.7}" y="{oy + fh + 46}" text-anchor="middle">{d:.0f} mm depth</text>
    """
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 780">
  <rect width="980" height="780" fill="#f4f4f4"/>
  <text x="80" y="36" font-family="Barlow Condensed, Arial Narrow, sans-serif"
        font-size="28" font-weight="700" fill="#FF0074">KORKU LOOK · {name} · RFQ</text>
  <text x="80" y="56" font-family="Arial, sans-serif" font-size="12" fill="#444">
    Cast / CNC aluminum · IP65 target · front glass · PoE rear · units millimetres ±0.3
  </text>
  <g transform="translate(0,0)">
    {rr(ox, oy, fw, fh, r, 'fill="#111" stroke="#FF0074" stroke-width="2"')}
    {rr(ox + spec["glass_inset"] * sx, oy + spec["glass_inset"] * sy + 8,
        fw - spec["glass_inset"] * 2 * sx, fh - spec["glass_inset"] * 2 * sy - 28,
        max(r - 6, 8), 'fill="#1c1c1c"')}
    <rect x="{ox + fw / 2 - spec["led_w"] * sx / 2:.1f}" y="{oy + spec["led_y"] * sy:.1f}"
          width="{spec["led_w"] * sx:.1f}" height="{spec["led_h"] * sy:.1f}" fill="#FFB3D4" rx="3"/>
    <circle cx="{ox + fw / 2:.1f}" cy="{oy + spec["cam_y"] * sy:.1f}" r="{spec["cam_r"] * sx:.1f}" fill="#333" stroke="#888"/>
    <text x="{ox + fw / 2}" y="{oy + fh - 18}" text-anchor="middle"
          font-family="Barlow Condensed, Arial Narrow, sans-serif" font-size="16" fill="#fff">KORKU LOOK</text>
  </g>
  {dim}
  {side}
  <g font-family="Arial, sans-serif" font-size="12" fill="#222">
    <text x="80" y="700">Corner radius R{r:.0f} mm · wall ~3.0 mm · glass 2 mm recess</text>
    <text x="80" y="718">Rear: M4 bosses, PoE gland Ø12, 2× dry-contact relay, 12–24 V option</text>
    <text x="80" y="736">Finish: black anodize + silver rim · LED bar light-pink · logo laser-etch bottom</text>
    <text x="80" y="754">This drawing is for quoting. Production STEP after first-article sign-off.</text>
  </g>
</svg>
"""


def main():
    for spec in (LOOK8, LOOK12):
        stl = OUT / f"{spec['name'].lower()}.stl"
        svg = OUT / f"{spec['name'].lower()}-drawing.svg"
        write_stl(stl, enclosure(spec), spec["name"])
        svg.write_text(drawing_svg(spec))
        print("wrote", stl, "bytes", stl.stat().st_size)
        print("wrote", svg)


if __name__ == "__main__":
    main()
