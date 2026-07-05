# screenshot-sitemap

Use this command pattern from the main chat:

```text
/screenshot-sitemap <folder-path>
```

The main chat should:

1. inventory every image file in `<folder-path>` — none silently skipped
2. for small folders (roughly <= 15 images), read screenshots directly; for
   larger folders, dispatch `screenshot-sitemap-analyst` in batches of
   8-10 images
3. collect the structured per-image records from all batches
4. normalize depth across the whole set using the shared tier scale
   (Home -> Section -> Listing -> Detail -> Transactional -> Terminal)
5. assemble the depth-normalized tree (Markdown + Mermaid) — inserting an
   explicit placeholder node for any tier a section has no screenshot for
6. audit every node against `references/trend-checklist.md` and roll up a
   trend alignment summary with node-anchored recommendations
7. write the full report and flag any unresolved depth/parent conflicts
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

## Completion report

```text
Folder: <path>
Screenshots: <count> (<count> excluded/unreadable)
Batches dispatched: <count>
Tree: <written to report>
Conflicts: <count, or "none">
Trend Alignment Summary: <included in report>
Status: completed | partial | blocked
```
