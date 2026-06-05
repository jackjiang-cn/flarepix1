@AGENTS.md

# FlarePix v2 — Project Guide

> Last updated: 2026-06-04

---

## 0. Project Rules

### Pre-Build Gates
1. **Design review BEFORE code** — visual critique, AI-slop detection, color rhythm check
2. **Mobile spec per-component** — each component states how it collapses at <768px and <640px

### Content Rules
- **English ONLY** for all user-facing content
- **English-only file/directory names** — no Chinese characters in paths
- **Real portfolio assets only** — no stock photos, no pravatar.cc, no fake avatars
- **No AI-slop patterns**: 3-column icon grids, 01/02/03 numbered steps, centered hero text

### Build Rules
- `npm run build` must pass before any commit
- Server Components by default — `"use client"` only when strictly necessary
- **Push rule**: commit first, but **DO NOT push** until the user confirms the local/dev page looks correct. Wait for the user's explicit "没问题" / "OK to push" before running `git push`.

---

## 1. Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.2.6 (App Router) |
| Styling | Tailwind CSS v4 + CSS `@theme` |
| Icons | Inline SVG only (no icon library) |

---

## 2. Design System

**TBD — will be defined during design spec phase.**

Reference from v1 (do not copy blindly — review during design phase):
- Dark theme base: #0A0A0A → dark-900
- Accent: gold #C9A96E → gold-base
- Light sections for alternating rhythm
- Claymorphism vs flat — DECIDE during design review

---

## 3. File Structure

```
src/
├── app/              # page.tsx, layout.tsx, globals.css + sub-pages
├── components/       # Shared components
├── config/           # contact.ts, cdn.ts, categories.ts
public/
├── logo/             # Logo assets
├── works/            # Portfolio media (video, photo, ai) — NOT in git
```

---

## 3b. Media / CDN (CRITICAL)

**All portfolio media lives in Cloudflare R2 — NOT in the git repo.**

| Item | Value |
|------|-------|
| CDN Base URL | `https://media.flarepix.com` |
| R2 Bucket | Cloudflare R2 |
| local `public/works/` | `.gitignore` — not pushed to GitHub |

**CDN helper:** use `cdnUrl(path)` from `@/config/cdn` — prepends `media.flarepix.com` to any path.
- `cdnUrl("/works/photo/foo.jpg")` → `https://media.flarepix.com/works/photo/foo.jpg`
- `posterFor("/works/video/bar.m4v")` → `/works/posters/bar.jpg`

When writing code that references media (images, videos, posters), **always use `cdnUrl()`** so it points to the CDN, not the missing local files.

### Image Compression for R2 Upload

When replacing/updating images on R2:

1. **Compress images** — use `scripts/compress-hero-images.mjs` or Squoosh
   - target: masonry images < 80KB, AI images < 50KB
2. **Upload to R2** — replace old files with new ones (same filename/path)
3. **Purge CDN cache** — Cloudflare Dashboard → R2 → upload new file to auto-purge old cached version

Compression script location: `scripts/compress-hero-images.mjs`

---

## 4. Contact Config

All contact/social info centralized in `src/config/contact.ts` — never hardcoded in components.

---

## 5. Positioning & Market

| Decision | Locked |
|----------|--------|
| **Product** | Visual service provider for Amazon/ecommerce sellers — photo, video, AI image generation, AI video generation |
| **Market** | US + Europe (English-language) |
| **Language** | English ONLY — all UI, meta, content |
| **Primary competitor** | [shootify.us](https://shootify.us) — traditional product photography studio, Miami-based, WordPress site |
| **Differentiation** | AI image & AI video generation — Shootify has zero AI capability |

### Competitor notes (Shootify)
- Strengths: entity address/phone trust signals, mature Schema SEO, 7 service categories, proven remote model
- Weaknesses: WordPress (design-constrained), no AI, brand feels traditional not tech-forward
- FlarePix must NOT look like a generic AI template — design must be distinctive

---

## 6. SEO

Target keywords will center on: product photography, AI product images, AI video for ecommerce, Amazon listing visuals.

Every page must have: `<title>`, `meta description`, OG tags, Twitter Card tags, Schema structured data.