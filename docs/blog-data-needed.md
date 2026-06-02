# FlarePix Blog — Pending Data Checklist

> **Last updated**: 2026-06-02
> **Context**: The 4 blog articles were published in commit `c9534c7` on branch
> `feature/blog-articles-batch-1`. They're competent but Google's "Helpful
> Content" system will flag them as AI-generated until the items below are
> filled in.
>
> When you have any item, just paste it in chat and tell me which post it
> belongs to — I'll plug it in and rebuild.

---

## Why this matters

The 4 articles currently trip the following "AI-generated" signals:

- All benchmark numbers are unsourced ("30-40% higher CTR")
- No real client stories (just "brands" in general)
- Author is generic ("FlarePix Studio")
- No first-hand data from FlarePix's own shoots

Each item below closes one or more of those signals.

---

## 🔴 High priority — biggest impact

### 1. Real client case studies (1-2 short stories per post)

Even one paragraph per post with a specific, anonymized story moves the
content from "competent AI" to "expert with field experience."

**Template** (copy and fill):

> We worked with [category] brand ["a skincare brand" / "Brand X"] on
> [N] SKUs. [What we did — e.g., "shot the main set, then generated
> 20 AI lifestyle variations for paid social"]. [Result — even rough
> numbers help, e.g., "their CTR on sponsored placements went from
> 0.8% to 1.4% after relaunching the gallery"].

**Where to insert each story**:

| Post | File slug | Best section to insert the story |
|------|-----------|-----------------------------------|
| 1 — AI product images | `ai-product-images-convert-better-2026` | "The conversion data" section |
| 2 — Ghost mannequin vs flat lay | `ghost-mannequin-vs-flat-lay` | "Using both in one listing" section |
| 3 — Prep products | `prepare-products-for-photo-shoot` | "Common mistakes to avoid" section |
| 4 — Amazon requirements | `amazon-product-photography-requirements-2026` | "A+ Content and EBC" section |

### 2. Real author identity

Replace the placeholder `"FlarePix Studio"` in `src/config/blog-posts.ts`
(appears 4 times). Pick one of:

- **Option A — Real person**: Name + role + LinkedIn URL
  - Example: `"Jack Jiang"`, `"Studio Lead"`, `"https://linkedin.com/in/..."`
  - Also add a 200×200 headshot at `public/authors/jack-jiang.jpg` (optional)
- **Option B — Studio credentials**: A more specific studio description
  - Example: `"FlarePix"` with role `"200+ Amazon brands photographed since 2022"`
  - Or whatever your real numbers are

Tell me which option (A or B) and the actual values.

### 3. Source citations for benchmark numbers

Three numbers are currently unsourced. For each, either:
- Provide the source (study, year, link) — best
- Or tell me to soften the language to a hedged claim

| Post | Current claim | Needs |
|------|---------------|-------|
| 1 | "30-40% higher click-through on sponsored placements" | Source or hedge |
| 2 | "15-25% conversion lift for hybrid ghost mannequin + flat lay" | Source or hedge |
| 4 | "30-80% higher conversion with video" | Source or hedge |

---

## 🟡 Lower priority — nice to have

### 4. Author headshot
If you go with Option A above, save a square headshot to
`public/authors/[name].jpg` — I'll wire it into the bio card.

### 5. Real CTA offers
The 4 endings currently use generic "contact us" language. If you
have a real free offer (free sample, free audit, free PDF), tell me
and I'll swap them in.

---

## 📋 Other pending work (not blog)

From the 12-item list in
`C:\Users\Administrator\.claude\plans\clever-sparking-blum.md`:

- [ ] **#6 Logo 数量增加 + 放大一倍** — need new logo assets from you
- [ ] **#10 素材优化（视频小、图片增删改）** — need your decisions on
      which images to add/remove/compress, and compressed video files
- [ ] **#11 视频加载慢优化** — depends on #10 finishing first
- [ ] **#12 增加中文版** — planned in i18n memory, start after #1-#11 done

---

## How to use this file

1. **Open it any time** — `docs/blog-data-needed.md` in the repo
2. **Fill in items as you have them** — copy the template, drop in
   real data, save
3. **Tell me in chat** — "I filled in case study for Post 1" or
   "Here are the author details: ..." — and I'll integrate and rebuild
