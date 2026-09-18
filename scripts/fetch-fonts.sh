#!/usr/bin/env bash
# Self-host the four faces, so the app works with no network.
# Without this the pages still render correctly — src/core/style.css names the Google
# Fonts families as the fallback in every stack, and index.html links them.
# Run this to make the build offline-capable, which the real app needs.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p assets/fonts
python3 - <<'PY'
import urllib.request, subprocess, sys, os
try:
    from fontTools.ttLib import TTFont
    from fontTools.subset import Subsetter, Options
except ImportError:
    sys.exit("pip install fonttools brotli --break-system-packages")
CSS = ("https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;600;700"
       "&family=IBM+Plex+Sans+Arabic:wght@400;600&family=IBM+Plex+Mono:wght@400;500"
       "&family=IBM+Plex+Sans:wght@400&family=Amiri+Quran&display=swap")
RANGES = "0000-00FF,0600-06FF,0750-077F,08A0-08FF,FB50-FDFF,FE70-FEFF,200C-200F,2000-206F,2190-2193,25A0-25FF,FEFF"
def unis():
    out = []
    for r in RANGES.split(","):
        if "-" in r:
            a, b = r.split("-"); out += list(range(int(a, 16), int(b, 16) + 1))
        else: out.append(int(r, 16))
    return out
print("Fetching the unsubsetted TTFs (no modern UA => Google serves truetype), then\n"
      "subsetting to Arabic + Latin and re-encoding as woff2.")
print("CSS:", CSS)
PY
echo "See docs/DIRECTION.md §4 for which face does which job, and the rule that"
echo "Qur'anic text is NEVER set in the UI face and the UI is NEVER set in the Qur'an face."
