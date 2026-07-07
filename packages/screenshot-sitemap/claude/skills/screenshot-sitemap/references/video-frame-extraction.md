# Video Frame Extraction & Dedup

Reference for turning recorded web/app test videos (including PowerPoint
screen recordings) into a deduplicated frame set that joins the screenshot
inventory. Frames are extracted at 1-2 second intervals, near-duplicate
frames are dropped, and every kept frame carries its source video and
timestamp for traceability.

## Supported inputs

- Video files: `mp4`, `mov`, `webm`, `mkv`, `avi`, `wmv`
- PowerPoint decks with embedded recordings: `pptx` — extract the media
  first (below), then treat each embedded video like any other video

## Step 1 — Extract embedded video from PPTX

A `.pptx` is a zip; screen recordings live under `ppt/media/`:

```bash
unzip -o deck.pptx 'ppt/media/*' -d extracted-media/
ls extracted-media/ppt/media/   # media1.mp4, media2.mp4, ...
```

Slide-image exports (`.png`/`.jpg` in `ppt/media/`) can join the
screenshot inventory directly; only the video files continue below.

## Step 2 — Extract frames at a 1-2 s interval

Use 1 fps (1-second interval) by default; drop to 0.5 fps (2-second
interval) for long recordings (>10 min) to keep the frame count sane.

```bash
mkdir -p frames/rec01
ffmpeg -i recording.mp4 -vf fps=1 -start_number 0 frames/rec01/f_%05d.png
# timestamp of f_00042.png = 42 s (index / fps; at fps=0.5, index * 2 s)
```

Record the mapping `frame index -> timestamp` — it goes into the
per-frame provenance and the report.

If `ffmpeg` is missing, say so and ask before installing; do not silently
skip the videos.

## Step 3 — Drop near-duplicate frames

Screen recordings sit on the same screen for many seconds, so most
frames are duplicates. Compare consecutive frames with a difference hash
and keep a frame only when it differs enough from the last *kept* frame:

```python
#!/usr/bin/env python3
"""Keep only frames that differ from the previously kept frame.

Compares consecutive frames against the last KEPT frame (not the previous
raw frame) so slow transitions can't slip through as a chain of small
diffs. Prints kept files; move or list them for the inventory.
"""
import sys
from pathlib import Path
from PIL import Image

def dhash(path, size=8):
    img = Image.open(path).convert("L").resize((size + 1, size))
    px = list(img.tobytes())  # row-major grayscale; getdata is deprecated in Pillow 14
    bits = 0
    for row in range(size):
        for col in range(size):
            i = row * (size + 1) + col
            bits = (bits << 1) | (1 if px[i] > px[i + 1] else 0)
    return bits

def hamming(a, b):
    return bin(a ^ b).count("1")

THRESHOLD = 6  # <= 6 differing bits of 64 -> same screen state

frames = sorted(Path(sys.argv[1]).glob("*.png"))
kept_hash = None
for f in frames:
    h = dhash(f)
    if kept_hash is None or hamming(h, kept_hash) > THRESHOLD:
        print(f)
        kept_hash = h
```

```bash
python3 dedupe_frames.py frames/rec01 > kept-frames.txt
```

Tuning:

- `THRESHOLD 6` treats scroll-position changes on the same page as
  duplicates in most recordings. If distinct screens are being merged
  (e.g. two visually similar list pages), lower it toward 3; if scrolling
  spam survives, raise it toward 10.
- Borderline cases: keep the frame. A few extra frames cost little; a
  silently dropped unique screen breaks the "no screen silently skipped"
  contract.
- Report the numbers: frames extracted, frames dropped as duplicates,
  frames kept. The kept/extracted ratio is itself evidence the dedup ran.

## Step 4 — Join the inventory with provenance

Each kept frame enters the screenshot inventory as:

```text
source: video-frame <video file> @ <mm:ss>
file: frames/rec01/f_00042.png
```

Two extra rules for video-sourced frames:

- **Transition order is evidence.** Consecutive kept frames from one
  recording usually represent a navigation step (click-through, back,
  modal open). Use adjacency as a *supporting* depth/parent signal — a
  frame that appears right after a listing frame and shows one item is
  likely that listing's child. It ranks below breadcrumb/URL/nav signals
  and must never override them; log a conflict if they disagree.
- **Mid-transition frames** (motion blur, half-rendered pages, loading
  states caught mid-animation) are tagged `transition/loading` rather
  than forced into a page type — but a stable loading state (skeleton,
  spinner) IS a taggable finding for the trend audit.
