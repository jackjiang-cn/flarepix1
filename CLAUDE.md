@AGENTS.md

# FlarePix v2 — Project Guide

> Last updated: 2026-05-29 | **Status: DIRECTION LOCK PHASE — no code yet**

---

## 0. v1 Post-Mortem — Rules This Project Must Follow

From the cagent4 project, confirmed in memory:

### Pre-Build Gates (MANDATORY — do NOT skip)
1. **Design review BEFORE code** — spec walkthrough with visual critique, AI-slop detection, color rhythm check. Use `/plan-design-review` before any component is written.
2. **Market/language locked in writing** — English or Chinese? US/Europe or CN? This decision must be explicit and cannot change mid-stream. Every file, every meta tag, every label follows it.
3. **Mobile spec per-component** — not just breakpoint numbers. Each component states how it collapses at <768px and <640px.
4. **Competitor comparison gate** — compare proposed spec against real competitor sites before building. If it looks like a generic AI template, stop and redesign before code.

### Content Rules
- **English ONLY** for all user-facing content (unless market decision says otherwise)
- **English-only file/directory names** — no Chinese characters in paths (caused ByteString encoding crash in v1)
- **Real portfolio assets only** — no stock photos, no pravatar.cc, no fake avatars
- **No AI-slop patterns**: 3-column icon grids, 01/02/03 numbered steps, centered hero text, blurred decorative circles, fake testimonial grids

### Motion Rules
- `whileInView` stagger: max 2 items, not whole sections
- Prefer CSS transitions over Framer Motion for micro-interactions
- Ask for every animation: "If removed, does UX suffer?" — if no, remove

### Build Rules
- `npm run build` must pass before any commit
- No Pages Router patterns — App Router only
- Server Components by default — `"use client"` only when strictly necessary

---

## 1. Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.2.6 (App Router) |
| Styling | Tailwind CSS v4 + CSS `@theme` |
| Animation | Framer Motion (TBD — install when needed) |
| Icons | lucide-react (TBD — install when needed) |

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

---

## 7. Current Phase: Design Spec

Next steps in order:
1. ~~Lock market/language~~ ✅ English, US+Europe
2. Collect brand assets (logo, real portfolio media) → TBD
3. Design spec walkthrough with visual critique
4. Engineering review
5. Implementation
