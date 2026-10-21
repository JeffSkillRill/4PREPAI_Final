"""Screenshot routes of a running app: python3 shoot.py OUTDIR WIDTH route1 route2 ..."""
import sys, os
from playwright.sync_api import sync_playwright
out, width, routes = sys.argv[1], int(sys.argv[2]), sys.argv[3:]
os.makedirs(out, exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": width, "height": 900}, device_scale_factor=1)
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
    for r in routes:
        errs.clear()
        resp = pg.goto("http://localhost:3100" + r, wait_until="networkidle")
        pg.wait_for_timeout(300)
        name = (r.strip("/").replace("/", "_") or "home") + f"_{width}.png"
        pg.screenshot(path=os.path.join(out, name), full_page=True)
        print(r, resp.status if resp else "?", ("ERR: " + " | ".join(errs[:3])) if errs else "")
    b.close()
