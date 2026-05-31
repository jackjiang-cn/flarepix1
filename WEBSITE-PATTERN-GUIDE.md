# FlarePix Website Pattern Guide

> Reusable patterns and best practices for building FlarePix-style ecommerce visual service websites.
> Last updated: 2026-05-30

---

## 1. Project Structure

```
src/
├── app/
│   ├── services/
│   │   ├── [category]/page.tsx      # Dynamic category page
│   │   ├── ai-imagery/page.tsx      # AI image gallery
│   │   ├── ai-video/page.tsx        # AI video gallery
│   │   └── brand-film/page.tsx      # Brand film gallery
│   │   └── page.tsx                # Services overview
│   └── page.tsx                    # Homepage
├── components/
│   ├── header.tsx                   # Sticky nav + dropdown
│   ├── gallery-lightbox.tsx        # Click-to-expand component
│   └── ...
└── config/
    └── categories.ts               # Centralized category config
public/works/
├── photo/                           # Photo categories
│   ├── womens-fashion/              # category_1.jpg, category_2.jpg...
│   ├── mens/
│   └── ...
├── video/                           # Video categories
│   ├── product-video-01.mp4
│   └── ...
├── ai/
│   ├── images/
│   └── videos/
└── brand-film/                      # Brand film videos
```

---

## 2. Category System

### Two Separate Category Lists

**Photo Categories** (show images):
```typescript
export const photoCategories: Category[] = [
  { slug: "womens-fashion", label: "Women's Fashion", type: "photo" },
  { slug: "mens", label: "Men's Fashion", type: "photo" },
  // ...
];
```

**Video Categories** (show videos):
```typescript
export const videoProductionCategories: Category[] = [
  { slug: "electronics", label: "Electronics", type: "video" },
  { slug: "fashion", label: "Fashion & Apparel", type: "video" },
  // ...
];
```

### Why Separate?
- Same category name (e.g., "Women's Fashion") but different content types
- Photo → image gallery, Video → video gallery
- Different URLs: `/services/womens-fashion` (photo) vs `/services/fashion` (video)

---

## 3. File Naming Convention

| Type | Folder | File Pattern | Example |
|------|--------|--------------|---------|
| Photo | `photo/[category]/` | `[category]_[number].jpg` | `womens-fashion_1.jpg` |
| Video | `video/` | `[prefix]-[number].mp4` | `product-video-01.mp4` |
| AI Image | `ai/images/` | `ai-image-[number].webp` | `ai-image-01.webp` |
| AI Video | `ai/videos/` | `ai-video-[number].mp4` | `ai-video-01.mp4` |
| Brand Film | `brand-film/` | `brand-film-[number].m4v` | `brand-film-01.m4v` |

**Rules:**
- No spaces in folder/file names
- Use lowercase
- Number with leading zero optional (01, 02... or 1, 2...)
- Consistent naming across all assets

---

## 4. Dynamic Category Page Pattern

```typescript
// src/app/services/[category]/page.tsx
"use client";  // Needed for GalleryLightbox interaction

import { photoCategories, videoProductionCategories } from "@/config/categories";
import GalleryLightbox from "@/components/gallery-lightbox";

export default async function CategoryPage({ params }) {
  const { category } = await params;

  // Check both lists
  const photoCat = photoCategories.find(c => c.slug === category);
  const videoCat = videoProductionCategories.find(c => c.slug === category);

  if (!photoCat && !videoCat) notFound();

  const isPhotoCategory = !!photoCat;
  const cat = photoCat ?? videoCat;

  return (
    <>
      {/* Return link with anchor */}
      <Link href={`/services#${isPhotoCategory ? "product-photography" : "video-production"}`}>
        ← All services
      </Link>

      {/* Gallery with masonry for photos, grid for videos */}
      <GalleryLightbox
        items={...}
        masonry={isPhotoCategory}
        columns={isPhotoCategory ? 4 : 3}
      />
    </>
  );
}
```

---

## 5. GalleryLightbox Component

```typescript
// src/components/gallery-lightbox.tsx
"use client";

export default function GalleryLightbox({
  items,           // { src, type: "image"|"video", alt?, title? }[]
  columns = 3,     // Grid columns for non-masonry
  masonry = false // Use columns layout instead of grid
}) {
  const [selected, setSelected] = useState(null);

  if (masonry) {
    return (
      <div className="[column-fill:_balance] columns-2 sm:columns-3 lg:columns-4 gap-4">
        {/* Items with break-inside-avoid */}
      </div>
    );
  }

  return (
    <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-${columns}`}>
      {/* Items with aspect-video or aspect-[4/3] */}
    </div>
  );
}
```

### When to Use Each Layout

| Layout | Use For | Classes |
|--------|---------|---------|
| Masonry (columns) | Photo galleries, preview thumbnails | `columns-2 sm:columns-3 lg:columns-4` |
| Grid (fixed aspect) | Video galleries, featured content | `grid gap-4 sm:grid-cols-2 lg:grid-cols-3 aspect-video` |

---

## 6. Navigation Dropdown & Anchor Links

### Header Dropdown
```typescript
const serviceLinks = [
  { label: "Video production", href: "/services#video-production" },
  { label: "Product photography", href: "/services#product-photography" },
  { label: "AI Imagery", href: "/services/ai-imagery" },
  // ...
];
```

### Services Page Sections
```typescript
<section className="mt-16 scroll-mt-24" id="video-production">
  <h2>Video Production</h2>
  {/* ... */}
</section>

<section className="mt-16 scroll-mt-24" id="product-photography">
  <h2>Product Photography</h2>
  {/* ... */}
</section>

<section className="mt-8" id="ai-imagery">
  <h2>AI Imagery</h2>
  {/* ... */}
</section>
```

### Return Links in Detail Pages
```typescript
// For photo categories
<Link href="/services#product-photography">← All services</Link>

// For video categories
<Link href="/services#video-production">← All services</Link>

// For AI sections
<Link href="/services#ai-imagery">← All services</Link>
```

**Note:** `scroll-mt-24` prevents header from covering section title when scrolling.

---

## 7. Preview Images for Service Cards

### Services Page Preview Map
```typescript
const imageMap: Record<string, string> = {
  "womens-fashion": "/works/photo/womens-fashion/womens-fashion_19.jpg",
  "mens": "/works/photo/mens/mens_9.jpg",
  "kids": "/works/photo/kids/kids_1.jpg",
  // ...
};

const previewImg = imageMap[cat.slug] || "/works/photo/other/other_1.jpg";
```

### Card Layout
```typescript
<div className="[column-fill:_balance] columns-2 sm:columns-3 lg:columns-4 gap-4">
  {categories.map(cat => (
    <Link href={`/services/${cat.slug}`}>
      {/* Image - no fixed aspect, preserves original ratio */}
      <img src={previewImg} className="w-full h-auto" />

      {/* Text content */}
      <div className="p-4">
        <h3>{cat.label}</h3>
        <p>{cat.description}</p>
      </div>
    </Link>
  ))}
</div>
```

---

## 8. Server vs Client Components

### Rule: `"use client"` Required When
- Using `useState`, `useEffect`, event handlers
- Using GalleryLightbox component
- Any interactive elements

### Rule: Server Component Required When
- Exporting `metadata`
- Using `async/await` for data fetching
- Reading from filesystem

### Common Pattern: Client Wrapper
```typescript
// page.tsx - Server Component (can export metadata)
import ClientGallery from "./ClientGallery";

export const metadata = { ... };

export default function Page() {
  return (
    <>
      <Header />
      <ClientGallery /> {/* "use client" inside */}
      <Footer />
    </>
  );
}
```

---

## 9. Build & Deployment Checklist

- [ ] All category slugs are unique
- [ ] Photo categories point to photo galleries
- [ ] Video categories point to video galleries
- [ ] Preview images exist and are accessible
- [ ] Masonry layout for photo sections
- [ ] Grid layout for video sections
- [ ] Return links point to correct anchor sections
- [ ] `npm run build` passes without errors
- [ ] Test on mobile viewport (375px, 768px)

---

## 10. Common Issues & Solutions

### Issue: "Cannot find module"
**Solution:** Check `.next` cache. Run `rm -rf .next && npm run dev`

### Issue: Images not displaying
**Solution:** Verify file path matches exactly. Check file extension (.jpg vs .jpeg)

### Issue: Layout breaks on mobile
**Solution:** Use responsive classes: `columns-2 sm:columns-3 lg:columns-4`

### Issue: Header covers anchor target
**Solution:** Add `scroll-mt-24` (or appropriate margin) to section

### Issue: Video shows as image
**Solution:** Category slug in wrong list. Photo categories should not be in videoProductionCategories

---

## 11. Asset Organization Example

```
public/works/
├── photo/
│   ├── womens-fashion/      ← 20 images, 1920x2880 portrait
│   ├── mens/               ← 11 images
│   ├── kids/                ← 12 images
│   ├── accessories/        ← 9 images
│   ├── products/           ← 5 images
│   ├── other/              ← 8 images (Home & Lifestyle)
│   ├── womens-underwear/   ← 5 images
│   └── sports/             ← 5 images
├── video/
│   ├── product-video-01.mp4 ← Electronics
│   ├── product-video-07.mp4 ← Fashion
│   └── ...
├── ai/
│   ├── images/              ← ai-image-01.webp to 06.webp
│   └── videos/              ← ai-video-01.mp4 to 04.mp4
└── brand-film/
    └── brand-film-01.m4v   ← brand-film-01.m4v to 12.m4v
```