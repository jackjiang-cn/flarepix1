export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string; id?: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string; cite?: string };

export type BlogPost = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  heroImage: string; // path under /works/...
  heroAlt: string;
  author: string;
  readTime: string;
  content: ContentBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-product-images-convert-better-2026",
    title: "Why AI Product Images Convert Better in 2026",
    date: "2026-06-02",
    excerpt:
      "AI-generated lifestyle imagery is outperforming traditional product photos. Here's what the data shows and how to use it for your Amazon listings.",
    heroImage: "/works/ai/images/ai-image-03.webp",
    heroAlt: "AI-generated lifestyle product image",
    author: "FlarePix Team",
    readTime: "6 min read",
    content: [
      {
        type: "paragraph",
        text: "Ecommerce imagery in 2026 looks nothing like it did five years ago. The white-background catalog shot that ruled Amazon a decade ago is now table stakes — not a differentiator. What separates top-converting listings today is lifestyle context, scene variation, and the ability to test creative quickly. AI-generated imagery delivers all three, and the conversion data is hard to ignore.",
      },
      {
        type: "heading",
        level: 2,
        text: "The ceiling of traditional product photography",
        id: "ceiling",
      },
      {
        type: "paragraph",
        text: "Studio photography is the gold standard for accuracy. A skilled photographer can match the exact color, texture, and proportions of a real product. The problem isn't quality — it's cost, time, and flexibility. A single studio shoot produces a fixed set of images. Adding a new lifestyle scene means another shoot, another location fee, another round of model bookings. For brands running paid social or A/B testing creative, this loop is too slow to keep up with.",
      },
      {
        type: "paragraph",
        text: "By 2026, the brands winning on Amazon, Shopify, and TikTok Shop aren't just producing more photos — they're producing more variations per product. A listing that ships with 30 lifestyle images (5 scenes × 3 angles × 2 model options) is realistic now. Five years ago it wasn't.",
      },
      {
        type: "heading",
        level: 2,
        text: "What AI imagery does differently",
        id: "different",
      },
      {
        type: "paragraph",
        text: "Modern AI pipelines start with a real product photo — the same studio shot you'd use for the main Amazon image — and place that product into any scene you can describe. A coffee mug on a marble kitchen counter. A water bottle on a hiking trail at golden hour. Sneakers in a Tokyo street at night. The product geometry, color, and labeling are preserved; everything else is generated.",
      },
      {
        type: "list",
        items: [
          "Lifestyle scenes without shipping products to a location",
          "On-model imagery without model bookings or fittings",
          "Seasonal variations (summer beach, winter snow) from a single product photo",
          "Multiple aspect ratios for different ad placements from one source image",
          "Unlimited A/B testing variations in days instead of weeks",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "The conversion data",
        id: "data",
      },
      {
        type: "paragraph",
        text: "Aggregated industry benchmarks consistently show lifestyle imagery outperforming pure white-background shots on engagement metrics: 30-40% higher click-through on sponsored placements, and measurable lift in add-to-cart rates for products with at least three lifestyle images in the gallery. AI-generated lifestyle images match studio-shot lifestyle images on these metrics — the gap is no longer about source, it's about creative quality and iteration speed.",
      },
      {
        type: "quote",
        text: "The brands that win on Amazon in 2026 aren't the ones with the best single image. They're the ones with the most relevant image for each search context.",
      },
      {
        type: "heading",
        level: 2,
        text: "When to use AI and when to use real photos",
        id: "when",
      },
      {
        type: "paragraph",
        text: "AI imagery isn't a replacement for studio photography — it's an extension. The main Amazon image should still be a real studio shot of the actual product. That's the trust signal shoppers expect. AI excels for secondary images: lifestyle context, seasonal creative, demographic variation, ad creative. Use it where context matters more than pixel-perfect accuracy.",
      },
      {
        type: "paragraph",
        text: "There are also categories where AI is still the wrong tool: highly technical products where exact geometry matters (industrial parts, jewelry with stones, watches with mechanical detail), and any category where regulatory accuracy is required (medical, food supplements, children's products with specific labeling rules). For everything else — apparel, beauty, home goods, electronics, sports equipment — AI imagery is a fit.",
      },
      {
        type: "heading",
        level: 2,
        text: "How to combine both for a complete listing",
        id: "combine",
      },
      {
        type: "paragraph",
        text: "The optimal setup for a 7-image Amazon listing in 2026 looks like this: image 1 is a studio shot on pure white (required by Amazon, also the highest-trust image); images 2-3 are studio shots at angles or with detail highlights; images 4-5 are AI-generated lifestyle scenes; image 6 is an infographic with feature callouts; image 7 is a size/scale or comparison chart. The first three anchor trust; the AI imagery carries the conversion lift.",
      },
      {
        type: "paragraph",
        text: "If you're scaling a brand across multiple SKUs and ad channels, the time savings compound. A traditional studio shoot might deliver 5-10 usable images per SKU. A combined studio + AI workflow delivers 25-40, with most of the additional ones being lifestyle variations you can deploy across Meta, TikTok, and Pinterest without a second production cycle.",
      },
      {
        type: "paragraph",
        text: "Want to see what AI imagery looks like for your products? Send us one product photo and we'll generate a free sample set of lifestyle variations — usually 4-6 scenes within 48 hours.",
      },
    ],
  },
  {
    slug: "ghost-mannequin-vs-flat-lay",
    title: "Ghost Mannequin vs Flat Lay: Which One for Your Brand?",
    date: "2026-05-25",
    excerpt:
      "Both are essential for apparel brands, but they serve different purposes. A practical guide to choosing the right format for each product type.",
    heroImage: "/works/photo/womens-fashion/womens-fashion_1.jpg",
    heroAlt: "Apparel product photography",
    author: "FlarePix Team",
    readTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text: "If you sell clothing online, you've seen both — the hollow-looking garment shot where you can see the inside of the collar (ghost mannequin) and the laid-flat overhead view of the same piece (flat lay). They look like simple alternatives to the same problem, but they actually serve different jobs. Picking the right one for each product is the difference between a listing that converts and one that gets returned.",
      },
      {
        type: "heading",
        level: 2,
        text: "What is ghost mannequin photography",
        id: "ghost",
      },
      {
        type: "paragraph",
        text: "Ghost mannequin (also called invisible mannequin or hollow man) is a technique where the garment is photographed on a mannequin, then the mannequin is removed in post-production. The result looks like the clothing is being worn by an invisible person — three-dimensional shape, natural drape, but no visible body or face.",
      },
      {
        type: "paragraph",
        text: "It's the standard for premium apparel on Amazon, Net-a-Porter, and most high-end DTC sites. The 3D shape communicates fit and silhouette far better than a flat image can. For structured garments (blazers, dresses, coats, suits) it's almost always the right choice.",
      },
      {
        type: "heading",
        level: 2,
        text: "What is flat lay photography",
        id: "flatlay",
      },
      {
        type: "paragraph",
        text: "Flat lay is exactly what it sounds like: the garment is laid flat on a surface (usually white or light gray) and photographed from directly above. No mannequin, no model, no depth. The benefit is consistency, speed, and cost — flat lay is roughly half the production time of ghost mannequin and works well for items where shape and silhouette matter less than detail.",
      },
      {
        type: "paragraph",
        text: "It's the default for t-shirts, basics, accessories, and most casual wear. It's also the format used for size charts and back-of-garment detail shots. The overhead angle lets the customer see the entire garment at a glance, which is helpful for evaluating prints, patterns, and overall design.",
      },
      {
        type: "heading",
        level: 2,
        text: "When ghost mannequin wins",
        id: "ghost-wins",
      },
      {
        type: "list",
        items: [
          "Structured garments: blazers, suits, coats, dresses with shape",
          "Items where fit and silhouette are the primary purchase driver",
          "Premium positioning (the 3D shape signals quality)",
          "Categories where returns are high — better fit communication reduces returns",
          "Products with hoods, collars, or design details that read better in 3D",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "When flat lay wins",
        id: "flatlay-wins",
      },
      {
        type: "list",
        items: [
          "T-shirts, tank tops, and casual basics",
          "Accessories: scarves, hats, bags, jewelry",
          "Items with all-over prints or patterns that need to be seen in full",
          "High-volume product catalogs where cost per SKU matters",
          "Size chart and detail shots (always flat, regardless of main format)",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Using both in one listing",
        id: "combine",
      },
      {
        type: "paragraph",
        text: "Most successful apparel brands don't pick one or the other — they use both, with intent. The standard 7-image setup: image 1 ghost mannequin front (the hero), image 2 ghost mannequin back or side, image 3 ghost mannequin detail shot, image 4 flat lay full view (shows the whole garment laid out), image 5 flat lay with styling (folded with accessories or styled props), image 6 size chart (always flat), image 7 infographic with feature callouts.",
      },
      {
        type: "paragraph",
        text: "This combination gives the shopper everything they need: shape and fit from the ghost mannequin shots, full design visibility from the flat lay, and size confidence from the chart. Conversion data consistently shows this hybrid setup outperforms single-format listings by 15-25%.",
      },
      {
        type: "heading",
        level: 2,
        text: "Cost and turnaround",
        id: "cost",
      },
      {
        type: "paragraph",
        text: "Ghost mannequin takes roughly twice as long per garment as flat lay because of the mannequin setup, the post-production work to remove the mannequin, and the additional retouching. As a rough rule of thumb, ghost mannequin runs $8-15 per image and flat lay runs $4-8 per image. For a 7-image listing, the hybrid approach lands in the $50-80 range for most US-based studios — slightly more than flat-lay-only, but the conversion lift usually pays for itself within the first month.",
      },
      {
        type: "paragraph",
        text: "Need help deciding which format fits your catalog? Send us your SKU list and we'll recommend the right format for each product type — usually within a day.",
      },
    ],
  },
  {
    slug: "prepare-products-for-photo-shoot",
    title: "How to Prepare Your Products for a Photo Shoot",
    date: "2026-05-15",
    excerpt:
      "Shipping products to a studio? Here's a checklist to make sure your items arrive ready to photograph — no delays, no reshoots.",
    heroImage: "/works/photo/products/products_1.jpg",
    heroAlt: "Products prepared for photo shoot",
    author: "FlarePix Team",
    readTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text: "Most photo shoot delays and reshoots aren't caused by the photographer or the studio. They're caused by the products arriving in a state that isn't ready to shoot. A tag left on, a smudge on the surface, a missing piece in the kit, a wrinkled garment that needs extra steaming. These issues multiply — a one-day delay in prep can push a 3-day shoot into a 5-day shoot. Here's the checklist to avoid all of it.",
      },
      {
        type: "heading",
        level: 2,
        text: "Before you ship",
        id: "before",
      },
      {
        type: "paragraph",
        text: "Every product that arrives at the studio should be ready to wear, ready to assemble, or ready to display. The studio doesn't have time (or in most cases, the obligation) to clean, repair, or assemble products. This is your last chance to make sure each item looks the way you want it to look in the final images.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Remove all tags, stickers, and labels — including the ones on the inside of clothing and on the bottom of products",
          "Wipe down all surfaces with a microfiber cloth to remove dust, fingerprints, and shipping residue",
          "For apparel: steam or iron each garment; folded creases show up in photos",
          "For multi-piece products: include all parts and a packing list so nothing gets separated",
          "For electronics: include the product only, no packaging unless specifically requested (chargers, cables, manuals usually don't get photographed)",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Shipping to the studio",
        id: "shipping",
      },
      {
        type: "paragraph",
        text: "Use a carrier with tracking and insurance. For shipments under $500 in product value, USPS Priority or UPS Ground usually suffice. Above that, add insurance. The studio is not responsible for products lost in transit, and even with insurance, a lost shipment adds 5-10 days to your timeline.",
      },
      {
        type: "list",
        items: [
          "Double-box fragile items (the original retail box goes inside a shipping box with padding)",
          "Use poly bags or tissue paper between garments to prevent transfer prints and snags",
          "Ship to the studio address provided in your quote — not the photographer's home or PO box",
          "Email the tracking number the same day you ship",
          "Keep a separate record of every SKU shipped with quantities and condition notes",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Reference images and creative direction",
        id: "creative",
      },
      {
        type: "paragraph",
        text: "The most common cause of reshoots isn't a bad product — it's a vague brief. 'Make it look nice' is not a creative direction. The studio needs to know what success looks like: the angle, the lighting, the styling, the background, the mood. Send 3-5 reference images of the look you're going for, ideally from competitor listings or your own best-performing current imagery.",
      },
      {
        type: "paragraph",
        text: "For AI-generated lifestyle imagery, the reference is even more important. The AI model uses your reference to define scene, lighting, and overall mood. Without it, you get generic output. With it, you get imagery that matches your brand.",
      },
      {
        type: "heading",
        level: 2,
        text: "Communication during the shoot",
        id: "communication",
      },
      {
        type: "paragraph",
        text: "Most studios send a proof gallery within 24-48 hours of the shoot. Review it the same day — every day the proof sits in your inbox is a day added to your timeline. Mark up the images that need changes (be specific: 'lighter on the left side,' 'color is too warm,' 'crop tighter'). Vague feedback like 'doesn't look right' forces the studio to guess, which usually means a second round of revisions.",
      },
      {
        type: "paragraph",
        text: "Decide up front how many revision rounds are included in your quote (most studios include 1-2). If you need more, expect an hourly rate for additional time.",
      },
      {
        type: "heading",
        level: 2,
        text: "Common mistakes to avoid",
        id: "mistakes",
      },
      {
        type: "list",
        items: [
          "Shipping products with retail packaging on (the Amazon main image requires no packaging)",
          "Forgetting to include the product variants (size, color) you need photographed",
          "Sending dirty or used-looking products as 'new'",
          "Not specifying image dimensions or aspect ratios upfront",
          "Approving the proof on a phone screen — always review proofs on a calibrated monitor if possible",
        ],
      },
      {
        type: "paragraph",
        text: "A well-prepared shipment can save you a week of back-and-forth. Most of our clients who follow this checklist have their final images within 5-7 business days of shipping. Ready to start? Send us your product list and we'll send back a quote and prep checklist tailored to your specific products.",
      },
    ],
  },
  {
    slug: "amazon-product-photography-requirements-2026",
    title: "Amazon Product Photography Requirements in 2026",
    date: "2026-05-05",
    excerpt:
      "Amazon's image guidelines keep evolving. Stay compliant and optimize your listings with the latest technical and creative requirements.",
    heroImage: "/works/photo/accessories/accessories_1.jpg",
    heroAlt: "Amazon-ready product photography",
    author: "FlarePix Team",
    readTime: "6 min read",
    content: [
      {
        type: "paragraph",
        text: "Amazon updates its product image requirements every year, sometimes more often. Most sellers don't notice the changes until their listings get suppressed or their search rank drops. Here's a current, accurate rundown of what Amazon expects in 2026, plus the creative best practices that go beyond minimum compliance to actually win the buy box.",
      },
      {
        type: "heading",
        level: 2,
        text: "Main image requirements",
        id: "main",
      },
      {
        type: "paragraph",
        text: "The main image (the one shown in search results) has the strictest requirements. Amazon enforces these with an automated check before you can save your listing.",
      },
      {
        type: "list",
        items: [
          "Pure white background (RGB 255, 255, 255) — not off-white, not cream, not light gray",
          "Product fills at least 85% of the frame",
          "Minimum 1000 × 1000 pixels (we recommend 2000 × 2000 for zoom functionality)",
          "No text, logos, badges, watermarks, or inset images on the main photo",
          "Product must be fully visible — no cropped edges, no partial views",
          "No mannequins or models in the main image for most categories (exceptions for apparel on a ghost mannequin)",
          "File format: JPEG, PNG, TIFF, or GIF; sRGB color space",
        ],
      },
      {
        type: "paragraph",
        text: "Common rejection reasons we see: off-white backgrounds (creamy or warm tones), products too small in the frame, and visible price tags. Tag removal is part of our standard prep workflow.",
      },
      {
        type: "heading",
        level: 2,
        text: "Secondary and lifestyle images",
        id: "secondary",
      },
      {
        type: "paragraph",
        text: "Images 2 through 7 (or 8 for some categories) have much more creative freedom. They can use lifestyle backgrounds, include text overlays, show the product in use, or display infographics. Amazon's only rules for secondary images: no promotional language (no 'free shipping,' no 'best seller,' no prices), and no Amazon logos or competitor references.",
      },
      {
        type: "paragraph",
        text: "The most effective secondary images in 2026 follow a pattern: image 2 shows the product at a different angle (back, side, top), image 3 highlights a key feature with a callout, image 4 shows the product in lifestyle context, image 5 is an infographic with dimensions or specs, image 6 addresses a common objection (size comparison, durability demo, what's-in-the-box), and image 7 is a brand story or differentiator graphic.",
      },
      {
        type: "heading",
        level: 2,
        text: "A+ Content and EBC",
        id: "aplus",
      },
      {
        type: "paragraph",
        text: "Brand-registered sellers can add A+ Content (formerly Enhanced Brand Content) below the product description. A+ modules let you add comparison charts, lifestyle imagery, and brand storytelling. The image requirements for A+ are looser than for the main gallery, but the resolution recommendations are higher — Amazon recommends 970 × 600 minimum for standard modules and 600 × 300 for comparison charts.",
      },
      {
        type: "paragraph",
        text: "The brands that win with A+ Content treat it as a sales tool, not a brochure. A useful A+ section answers the questions a shopper has after seeing the product images but before adding to cart: how does it compare to the alternatives, what's it made of, how do I use it, what if something goes wrong.",
      },
      {
        type: "heading",
        level: 2,
        text: "Video requirements",
        id: "video",
      },
      {
        type: "paragraph",
        text: "Brand-registered sellers can upload a product video in the main image slot. Amazon's video specs in 2026: minimum 480p, recommended 1080p, H.264 codec, MP4 format, maximum file size 5GB, length 30 seconds to 10 minutes. The video should auto-play muted in search results and should communicate the product's main benefit within the first 3 seconds.",
      },
      {
        type: "paragraph",
        text: "Listings with video consistently outperform listings without — 30-80% higher conversion depending on category. The video doesn't need to be cinematic; a clean, well-lit 30-second product demo shot on a static camera is enough to capture the lift. For higher budgets, lifestyle video with motion graphics tends to perform even better.",
      },
      {
        type: "heading",
        level: 2,
        text: "Common rejection reasons in 2026",
        id: "rejection",
      },
      {
        type: "list",
        items: [
          "Off-white or cream backgrounds (Amazon's automated check is strict)",
          "Visible product tags or stickers in any image",
          "Cropped product edges or partial views",
          "Low resolution (under 1000 × 1000)",
          "Text or promotional language on the main image",
          "Watermarks from third-party services (the watermark that comes from a stock photo, a competitor, or a former vendor)",
          "Color profile issues (CMYK instead of sRGB, or untagged profiles)",
        ],
      },
      {
        type: "paragraph",
        text: "If your images are getting rejected, the studio that shot them should be your first call — they can usually re-export at the correct spec in under an hour. If you're shooting in-house, a simple sRGB export at 2000 × 2000 against an RGB 255, 255, 255 background solves most issues.",
      },
      {
        type: "paragraph",
        text: "Need Amazon-ready images? We shoot and export to Amazon's exact specs — main image compliance, lifestyle gallery, video, and A+ modules. Send us a sample product and we'll return a test set within 48 hours.",
      },
    ],
  },
];

export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);

export const getRelatedPosts = (slug: string, limit = 3) =>
  blogPosts.filter((p) => p.slug !== slug).slice(0, limit);
