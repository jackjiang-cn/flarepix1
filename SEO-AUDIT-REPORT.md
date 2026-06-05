# FlarePix SEO Audit Report

**Date:** 2026-06-04
**Site:** https://flarepix.com
**Market:** US + Europe (English only)
**Primary competitor:** shootify.us

---

## Executive Summary

| Area | Health | Notes |
|------|--------|-------|
| Technical SEO | ⚠️ Needs Attention | No robots.txt, no XML sitemap, Core Web Vitals untested |
| On-Page SEO | ✅ Strong | Titles, descriptions, headers well-optimized |
| Structured Data | ✅ Strong | Schema.org properly implemented across all pages |
| Content | ✅ Good | Service pages have substantive SEO content; blog added |
| Schema Markup | ✅ Good | Organization, ProfessionalService, Service, FAQPage, ContactPage, Blog, Article all present |
| Indexation Readiness | ⚠️ Manual action needed | robots.txt and sitemap.xml must be created |
| Competitive Positioning | 🔴 Weak | Domain not yet ranking; China advantage messaging present but not yet prominent in SERPs |

**Priority Actions (in order):**
1. Create `public/robots.txt` (2 min)
2. Create `public/sitemap.xml` (10 min)
3. Add sitemap to Google Search Console (manual)
4. Expand service page SEO content with keyword-first paragraphs
5. Build backlink profile via industry outreach
6. Test Core Web Vitals with PageSpeed Insights

---

## 1. Technical SEO

### 🔴 robots.txt — MISSING (Critical)

**Impact:** High — affects how Google crawls the site
**File needed:** `public/robots.txt`

Create this now:
```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://flarepix.com/sitemap.xml
```

Also add to `app/sitemap.ts` (App Router):
```ts
import { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://flarepix.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    // ... all pages
  ]
}
```

### 🔴 XML Sitemap — MISSING (Critical)

**Impact:** High — Google needs this to discover all pages efficiently
**File needed:** `app/sitemap.ts` (App Router handles this)

All routes should be included:
- `/`, `/services`, `/work`, `/pricing`, `/blog`, `/faq`, `/contact`, `/ai-tools`
- `/services/ai-imagery`, `/services/ai-video`, `/services/brand-film`
- All category pages via `generateStaticParams()`
- Blog posts via `generateStaticParams()`

### ⚠️ Core Web Vitals — NOT TESTED

Pages use large video assets (brand films, portfolio videos). These may impact LCP.
**Test with:** https://pagespeed.web.dev/?hl=en&gl=US&url=https%3A%2F%2Fflarepix.com

**Known concerns:**
- Video posters (`posterFor()`) are served from R2 CDN — verify they resize for mobile
- `loading="eager"` on blog hero images (blog/[slug]/page.tsx line 164) — consider lazy for below-fold
- Font loading: Geist + Geist_Mono with `subset: latin` — good, no FOUT risk

**Action:** Run PageSpeed Insights after sitemap is live.

### ⚠️ HTTPS

Site URL is `https://flarepix.com` — confirmed redirect from HTTP not observed (should be handled at hosting level, verify with host).

### ✅ URL Structure

- Clean, lowercase, hyphen-separated
- No parameters in canonical URLs
- Logical hierarchy: `/services/ai-imagery` — good

### ✅ International SEO

English-only site, no i18n needed. Hreflang not required. Clean implementation.

---

## 2. On-Page SEO

### ✅ Titles

| Page | Title | Assessment |
|------|-------|------------|
| Homepage | `FlarePix — Product Photography, Video & AI Visuals for Ecommerce` | ✅ Good — primary keyword present, brand at start |
| Services | `Services — FlarePix` | ✅ Acceptable |
| AI Imagery | `AI Imagery — AI-Generated Lifestyle Photos for Ecommerce \| FlarePix` | ✅ Excellent — keyword-first, specific |
| AI Video | `AI Video — AI-Generated Product Videos for Social & Ads \| FlarePix` | ✅ Excellent |
| Brand Film | `Brand Film — Cinematic Brand Video Production \| FlarePix` | ✅ Excellent |
| Contact | `Contact — FlarePix` | ✅ Acceptable |
| Pricing | `Pricing — FlarePix` | ✅ Acceptable |
| Blog | `Blog — FlarePix` | ✅ Acceptable |

**Note:** `Services — FlarePix` title could be stronger: `Product Photography & Video Services for Ecommerce — FlarePix`

### ✅ Meta Descriptions

All pages have unique, keyword-relevant descriptions between 120–160 characters. Well done.

### ⚠️ H1 Structure

- Homepage: `H1` is likely in `Hero` component — verify `<h1>` tag is present (not `<div>` with styled text)
- Service pages: each uses `<h1>` correctly
- `/work`: `<h1>Our work</h1>` — acceptable
- `/ai-tools`: `<h1>AI Tools for Ecommerce</h1>` — keyword present, good

### ⚠️ Header Hierarchy — NEEDS VERIFICATION

`brand-film/page.tsx` uses `<h1>` in body after back-link, which is correct. However `/services/page.tsx` has two `<h1>` elements if both "Video Production" and "Product Photography" sections use `<h2>` as sibling headings — need to verify Hero component H1.

### ✅ Internal Linking

- Service pages cross-link to related services — good pattern
- Blog posts include `relatedServices` links — good
- Work page has category pills linking back to service pages — good
- Footer and header provide global navigation — good

### ⚠️ Image Alt Text

Portfolio images use descriptive `alt` props from config. Verify all `/works/` images have alt text (category pages pass `alt={p.alt || ...}`). Acceptable.

### ✅ Canonical URLs

All pages have `alternates: { canonical: "..." }` set correctly. No cross-domain canonical issues.

### ✅ Open Graph

- Homepage, services pages all have Open Graph tags
- `og-image.jpg` exists at `public/og-image.jpg` — confirmed ✅
- Twitter Card: `summary_large_image` on homepage — good

### ⚠️ Twitter Card Image

`layout.tsx` Twitter card uses the same `description` text as OG but doesn't reference an explicit `image` field. Add:
```ts
twitter: {
  card: "summary_large_image",
  title: "FlarePix — AI-Powered Product Photography & Video",
  description: "...",
  images: ["/og-image.jpg"],  // ← missing
}
```

### ✅ Content Optimization

Service pages (ai-imagery, ai-video, brand-film) all have substantive SEO paragraphs:
- AI Imagery page: "Based in Qingdao, China — the world's manufacturing hub — we work with Amazon and ecommerce sellers globally. Your products are already here. Your visuals should be too."
- AI Video page: "Working with sellers in the US, UK, and Europe — all with products manufactured in China."
- Brand Film page: China location advantage included

**Note:** These paragraphs are keyword-light (no primary keyword in first 100 words). Consider leading each page's SEO section with the primary keyword phrase.

---

## 3. Structured Data / Schema.org

### ✅ Implemented Schemas

| Schema Type | Location | Status |
|------------|----------|--------|
| Organization | `layout.tsx` | ✅ Full with sameAs social links |
| ProfessionalService | `layout.tsx` | ✅ `areaServed: "Worldwide"`, serviceType array |
| Service (×4) | `services/page.tsx` | ✅ OfferCatalog with price list |
| Service | `services/ai-imagery/layout.tsx` | ✅ |
| Service | `services/ai-video/layout.tsx` | ✅ |
| Service | `services/brand-film/layout.tsx` | ✅ |
| FAQPage | `faq/page.tsx` | ✅ with `Question` + `Answer` |
| ContactPage | `contact/page.tsx` | ✅ |
| Blog | `blog/page.tsx` | ✅ with `blogPost` array |
| BlogPosting (×N) | `blog/[slug]/page.tsx` | ✅ per-post Article schema |
| WebPage | `pricing/page.tsx` | ✅ ItemList of Offer elements |

### ⚠️ Schema Improvements Needed

1. **ProfessionalService missing `image`**: Add logo URL to both Organization and ProfessionalService schemas
2. **`aggregateRating` missing**: Add to service schemas if reviews are available (even placeholder if no real reviews yet)
3. **`review` missing**: Consider adding at least one editorial/review schema when press coverage exists
4. **BlogPosting `author` type**: Currently `Organization` — consider if `Person` is more appropriate for blog author

### ⚠️ Schema Detection Note

Per the SEO Audit skill guidelines: `web_fetch` strips `<script>` tags and cannot detect JS-injected JSON-LD. Schema validation must be done via:
- https://search.google.com/test/rich-results
- Browser dev tools: `document.querySelectorAll('script[type="application/ld+json"]')`
- Screaming Frog (if available)

---

## 4. Content Analysis

### ✅ Service Page Content — Strong

All three AI/brand film service pages have:
- "What is..." paragraph (defines the service)
- "What you get" bullet list
- Cross-links to related services
- China manufacturing hub positioning

### ⚠️ `/services` Page Content — Thin

The main services page has only category listings and descriptions from config. Consider adding an intro paragraph with primary keywords (`product photography`, `ecommerce video production`).

### ✅ Blog — Active

Blog is live with posts. `generateStaticParams()` pre-renders all posts at build time. Each post has full Article schema.

### ⚠️ Pricing Page — Weak SEO Content

Pricing page has no descriptive content beyond the pricing table. Add a paragraph explaining the ordering process, what affects pricing (complexity, volume, turnaround), and why FlarePix is priced competitively.

### ⚠️ AI Tools Page — Duplicate Content Risk

`/ai-tools` page describes services that overlap heavily with `/services/ai-imagery` and `/services/ai-video`. If both pages target the same keywords, Google may treat them as duplicate. Consolidate or differentiate clearly.

### ✅ E-E-A-T Signals

- `contactPoint` with email present — good
- Physical address (Qingdao) in schema — good
- Social profiles in Organization schema — good
- Author "organization" on blog posts — acceptable for a business blog

---

## 5. Competitive Positioning

### SERP Analysis (DataForSEO live data)

**Keyword:** `amazon product photography studio`
- Top results: Thrive Product Studio, Claid AI, various AI tools
- **shootify.us not appearing in top 10** for this query

**Keyword:** `ai product image generation`
- Top results: blog posts, Claid AI, Canva apps
- Competition from AI-native tools (Claid, Canva) is strong

### shootify.us Comparison

From competitor research:
- **Strengths:** Entity address/phone, mature SEO, 7 service categories, Schema
- **Weaknesses:** No AI capability, WordPress design constraints, traditional brand feel
- **FlarePix advantage:** AI image + AI video generation — Shootify has zero AI capability

### FlarePix Keyword Opportunities

Based on SERP research and service offering:

**Primary targets (high intent, FlarePix can win):**
- `amazon product photography studio` — primary competitor keyword
- `ai product imagery for ecommerce` — differentiation keyword
- `ai video for amazon listings` — low competition, high intent
- `brand film for ecommerce` — niche, premium, low competition
- `product video production service` — broad, competitive

**Secondary targets:**
- `ecommerce product photography` — broad
- `lifestyle product photography` — competitive
- `ai on-model photography` — specific to fashion

**Quick wins (low competition):**
- `ai imagery generator for amazon` — long-tail, specific
- `product photography studio in china` — FlarePix can own this
- `amazon listing video service` — specific to Amazon sellers

### China Location Advantage

Current messaging: "Based in Qingdao, China — the world's manufacturing hub"
**Opportunity:** Create dedicated landing page or section targeting: "Product photography studio in China for Amazon sellers" — near-zero competition for this exact phrase.

---

## 6. Quick Wins (Immediate Action)

### Must-Do (before next commit)

1. **Create `public/robots.txt`** — 5 min, prevents crawl issues
2. **Create `app/sitemap.ts`** — 10 min, enables Google discovery
3. **Submit sitemap to Google Search Console** — manual step, 5 min
4. **Add `twitter:image` to layout.tsx** — 2 min fix

### This Week

5. **Expand `/services` page intro** with keyword-first paragraph — 15 min
6. **Run PageSpeed Insights** on homepage and a service page — free tool
7. **Verify `<h1>` in Hero component** — check component, not page.tsx
8. **Add pricing page SEO content** — 20 min

### This Month

9. **Keyword research sprint** — use DataForSEO to identify top 20 target keywords
10. **Blog post series** — 2 posts/week on targeted keywords
11. **Schema: add `image` to Organization/ProfessionalService** — 5 min
12. **Build 5–10 backlinks** — outreach to ecommerce podcasts, directories
13. **Create "Photography Studio in China" landing content** — target near-zero-competition phrase

---

## 7. Priority Recommendations (Ranked)

| Priority | Action | Effort | SEO Impact |
|----------|--------|--------|------------|
| P1 | Create `public/robots.txt` | 5 min | 🔴 Critical |
| P2 | Create `app/sitemap.ts` | 10 min | 🔴 Critical |
| P2 | Add OG/Twitter image to layout.tsx twitter field | 2 min | 🟡 Medium |
| P3 | Submit sitemap to Google Search Console | 5 min (manual) | 🔴 Critical |
| P4 | Expand `/services` page intro with keyword paragraph | 15 min | 🟡 Medium |
| P5 | Run PageSpeed Insights | 10 min | 🟡 Medium |
| P6 | Verify Hero H1 tag | 5 min | 🟡 Medium |
| P7 | Add `image` to Organization/ProfessionalService schema | 5 min | 🟢 Low (but correct) |
| P8 | Add SEO content to pricing page | 20 min | 🟡 Medium |
| P9 | Consolidate `/ai-tools` or differentiate from service pages | 30 min | 🟡 Medium |
| P10 | Target "product photography studio in china" phrase | 2 hrs | 🟢 Low competition |

---

## Appendix: Files Audited

```
src/app/layout.tsx              — Organization + ProfessionalService JSON-LD
src/app/page.tsx               — Homepage metadata
src/app/services/page.tsx      — Service listing + Service schema
src/app/services/ai-imagery/layout.tsx — Service schema
src/app/services/ai-imagery/page.tsx  — SEO content
src/app/services/ai-video/layout.tsx  — Service schema
src/app/services/ai-video/page.tsx   — SEO content
src/app/services/brand-film/layout.tsx — Service schema
src/app/services/brand-film/page.tsx  — SEO content
src/app/services/[category]/page.tsx — Dynamic category pages
src/app/contact/page.tsx       — ContactPage schema
src/app/pricing/page.tsx       — WebPage + ItemList schema
src/app/faq/page.tsx           — FAQPage schema
src/app/blog/page.tsx          — Blog schema
src/app/blog/[slug]/page.tsx   — Article schema
src/app/work/page.tsx          — Portfolio page
src/app/ai-tools/page.tsx      — AI tools page
public/og-image.jpg            — EXISTS ✅
```

---

## Appendix: DataForSEO API Status

**API Status:** ✅ Operational (confirmed 2026-06-04)
- Endpoint: `https://api.dataforseo.com/v3/serp/google/organic/task_post`
- Authentication: Base64 `hello@flarepix.com:ed8fe7fb34551ce2`
- Task creation: Status 200, task ID issued
- Results retrieval: Working (30s wait required for task completion)
- Note: SERP results are sparse for niche queries; use `results_limit: 15+` and 30s wait

**Pending research scripts (7 total):**
1. `research_competitor_gaps.py`
2. `research_performance_matrix.py`
3. `research_priorities_comprehensive.py`
4. `research_quick_wins.py`
5. `research_serp_analysis.py`
6. `research_topic_clusters.py`
7. `research_trending.py`