# screenshot-sitemap

Use this command pattern from the main chat:

```text
/screenshot-sitemap <folder-path>
/screenshot-sitemap <folder-path> --videos <video-or-pptx-path>
/screenshot-sitemap <folder-path> --html-docs <docs-path>
```

The main chat should:

1. inventory every image file in `<folder-path>` — none silently skipped
2. when `--videos` is given, run the pipeline in
   `references/video-frame-extraction.md`: unzip `pptx` media, extract
   frames with ffmpeg at a 1-2 s interval, drop near-duplicates with the
   difference-hash script, and add kept frames to the inventory with
   `video-frame <file> @ <mm:ss>` provenance — reporting
   extracted/dropped/kept counts
3. for small sets (roughly <= 15 images), read images directly; for
   larger sets, dispatch `screenshot-sitemap-analyst` in batches of
   8-10 images, keeping frames from one recording contiguous and in
   timestamp order
4. when `--html-docs` is given, read the documents (dispatching
   `html-signal-analyst` in batches if there are many) and match each
   documented page to a screenshot by URL, title, or page name — unmatched
   pages on either side stay listed, never force-paired
5. collect the structured per-image and per-page records from all batches
6. normalize depth across the whole set using the shared tier scale
   (Home -> Section -> Listing -> Detail -> Transactional -> Terminal);
   recording transition order is supporting evidence only
7. assemble the depth-normalized tree (Markdown + Mermaid) — inserting an
   explicit placeholder node for any tier a section has no screenshot for
8. audit every node against `references/trend-checklist.md` and roll up a
   trend alignment summary with node-anchored recommendations
9. when `--html-docs` is given, cross-check visual evidence against HTML
   signals per `references/html-signal-checklist.md` and produce the
   consulting section: executive summary, per-section scorecard
   (visual currency x markup quality), prioritized findings and roadmap —
   every finding citing both a visual cue and quoted markup
10. write the full report and flag any unresolved depth/parent conflicts
    instead of guessing

## Dispatching batches

When the folder has many screenshots, the main chat can dispatch multiple
`screenshot-sitemap-analyst` workers in parallel, one per batch:

```text
/screenshot-sitemap ./shots   -> screenshot-sitemap-analyst (batch 1: files 1-10)
                               -> screenshot-sitemap-analyst (batch 2: files 11-20)
                               -> screenshot-sitemap-analyst (batch 3: files 21-30)
```

Each worker returns its own structured records and `SITEMAP_BATCH_DONE`
sentinel. The main chat waits for all batches before normalizing depth,
since depth tiers are only meaningful when compared across the full set.

HTML doc batches work the same way with `html-signal-analyst`, which
returns per-page signal records and the `HTML_BATCH_DONE` sentinel.
Screenshot batches and doc batches can run in parallel; matching,
cross-checking, and consulting synthesis wait for both.

## Completion report

```text
Folder: <path>
Screenshots: <count> (<count> excluded/unreadable)
Videos: <count> (<frames extracted> -> <frames kept> after dedup)
HTML docs: <count> (<count> pages, <count> unmatched either side)
Batches dispatched: <count image + count doc>
Tree: <written to report>
Conflicts: <count, or "none">
Trend Alignment Summary: <included in report>
Consulting: <finding counts by severity, or "not requested">
Status: completed | partial | blocked
```
