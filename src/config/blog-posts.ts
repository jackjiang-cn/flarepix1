import { cdnUrl } from "@/config/cdn";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string; id?: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "video"; src: string; title: string };

export type RelatedService = {
  label: string;
  href: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  heroImage: string; // path under /works/...
  heroAlt: string;
  author: string;
  authorRole: string;
  authorBio: string;
  readTime: string;
  content: ContentBlock[];
  relatedServices: RelatedService[];
  dateUpdated?: string; // YYYY-MM-DD — set when content is refreshed (feeds dateModified)
  faq?: { question: string; answer: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-product-images-vs-traditional-photography-amazon",
    title: "AI Product Images vs Traditional Photography for Amazon",
    date: "2026-07-31",
    excerpt:
      "Use photography for the details shoppers need to trust, then use AI where the setting can change. Here is how we divide the work for Amazon listings.",
    heroImage: "/works/ai/images/ai-image-06.webp",
    heroAlt:
      "AI-generated lifestyle image of a portable power station and solar panels outdoors",
    author: "FlarePix Studio",
    authorRole: "Photo, video, and AI production",
    authorBio:
      "FlarePix is a product visual studio working with ecommerce and Amazon brands. Our team handles studio shoots, product video, AI lifestyle imagery, and AI video from one workflow, with delivery for Amazon, Shopify, and direct-to-consumer channels.",
    readTime: "6 min read",
    relatedServices: [
      { label: "AI Imagery", href: "/services/ai-imagery" },
      { label: "Product Photography", href: "/services" },
      { label: "View Our Work", href: "/work" },
    ],
    content: [
      {
        type: "paragraph",
        text: "Take a portable power station. The screen, charging ports, button layout, handle, and included cables are purchase information. We would photograph them. The mountain setting behind the product is a different problem, and AI may be a sensible way to build it.",
      },
      {
        type: "paragraph",
        text: "That is how we approach the photography versus AI question at FlarePix. We split the listing by what a shopper needs to trust. Some images document the item in the box. Others help the shopper picture using it. They do not need the same production method.",
      },
      {
        type: "heading",
        level: 2,
        text: "One listing, several jobs",
        id: "image-function",
      },
      {
        type: "paragraph",
        text: "The main image has a fairly strict job: show the product clearly and accurately. Detail images prove things that matter at purchase, such as texture, controls, stitching, scale, or what comes in the package. Lifestyle images do something else. They show context.",
      },
      {
        type: "paragraph",
        text: "We usually want a camera involved when an image is evidence. We are more open to AI when the background, season, room, or location is the part that needs to change. Amazon rules vary by marketplace, category, and placement, so we also check the current Seller Central requirements before deciding how an image should be produced.",
      },
      {
        type: "heading",
        level: 2,
        text: "What we would photograph",
        id: "choose-photography",
      },
      {
        type: "paragraph",
        text: "If a small visual difference could cause a return, we photograph it. A fabric that looks smoother than it really is matters. So does a cap that appears taller, a cable that seems to be included, or a control panel with the ports in the wrong order.",
      },
      {
        type: "list",
        items: [
          "The Amazon main image and the main product angle.",
          "Colour, finish, material, texture, and reflective surfaces.",
          "Fit, drape, seams, closures, hardware, and construction.",
          "Labels, screens, controls, measurements, packaging, and included parts.",
          "Any feature a customer might compare with the item that arrives.",
        ],
      },
      {
        type: "paragraph",
        text: "Those photographs also give the AI work a reference. Without them, review becomes subjective. With them, we can put the generated image beside the source and check whether the product survived the process.",
      },
      {
        type: "heading",
        level: 2,
        text: "Where AI earns its place",
        id: "choose-ai",
      },
      {
        type: "paragraph",
        text: "AI becomes useful once the product itself is no longer a mystery. It can put the same verified product into a bright kitchen, a winter campaign, or an outdoor scene without building three physical sets. It can also help us test an art direction before a client commits to a larger shoot.",
      },
      {
        type: "paragraph",
        text: "We would not ask AI to invent the front panel of that power station. We might ask it to change the time of day, the landscape, or the amount of empty space around the product for an ad crop. That boundary sounds conservative. It also saves a lot of time spent correcting attractive images that show the wrong item.",
      },
      {
        type: "paragraph",
        text: "The source files still matter. Marketplace downloads are often compressed, and one front view rarely explains a handle, port, clasp, or repeating pattern. A few good reference angles usually help more than another paragraph of prompting.",
      },
      {
        type: "heading",
        level: 2,
        text: "The category changes the risk",
        id: "category-guide",
      },
      {
        type: "heading",
        level: 3,
        text: "Fashion and accessories",
        id: "fashion-accessories",
      },
      {
        type: "paragraph",
        text: "A changed neckline or strap is not a styling variation. It is a different product. We photograph fit, fabric, construction, colour, and hardware first. AI can help with additional on-model or campaign ideas, but we reject an output when the hem, pocket, clasp, or pattern repeat has moved.",
      },
      {
        type: "heading",
        level: 3,
        text: "Packaging, beauty, food, and wellness",
        id: "packaging-claims",
      },
      {
        type: "paragraph",
        text: "The pack shot needs a real label, real geometry, and the correct contents. Reflected text is a common weak point in generated images, especially on glossy bottles and pouches. AI can build the bathroom, vanity, table, or seasonal setting around the pack. It should not add an ingredient, benefit, serving result, or package claim.",
      },
      {
        type: "heading",
        level: 3,
        text: "Electronics, appliances, and home products",
        id: "hard-goods",
      },
      {
        type: "paragraph",
        text: "We want front, back, side, interface, accessory, and packaging references for electronics. For furniture and home products, dimensions and joinery need the same care. AI can create an office, living room, campsite, or workshop, but a chair cannot grow twenty percent just because the generated room looks better that way.",
      },
      {
        type: "heading",
        level: 2,
        text: "The cheap option can get expensive",
        id: "cost-and-speed",
      },
      {
        type: "paragraph",
        text: "A traditional shoot has obvious costs: sample preparation, studio time, crew, props, models, and retouching. AI removes some of those logistics. Then the cost turns up elsewhere, in reference preparation, generation rounds, product correction, and review.",
      },
      {
        type: "paragraph",
        text: "Simple products in flexible scenes can move quickly. A dark glossy appliance with a screen, six ports, small printed labels, and a hand touching it may take much longer. We have seen enough plausible first generations to know that plausible is not the same as approved.",
      },
      {
        type: "paragraph",
        text: "So we compare the cost of a finished image set, not the cost of pressing the shutter or pressing Generate. A cheap first image is irrelevant if it takes ten rounds to make the product true again.",
      },
      {
        type: "heading",
        level: 2,
        text: "How we run a hybrid job",
        id: "hybrid-workflow",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Plan the listing first. Each image gets a job, destination, crop, and approval standard.",
          "Photograph the product truth. We cover the main angle, alternate views, details, scale, packaging, and included parts.",
          "Generate the flexible layer. Backgrounds, locations, styling, and campaign variations can change while the product reference stays fixed.",
          "Review the product again. We check shape, proportion, colour, material, hardware, labels, shadows, and contact points before preparing final crops.",
        ],
      },
      {
        type: "paragraph",
        text: "We review composition and product accuracy separately. Mixing those decisions is how a beautiful scene gets waved through even though a button has disappeared. Sometimes we reject the prettiest option. That is part of the job.",
      },
      {
        type: "heading",
        level: 2,
        text: "A brief we can actually use",
        id: "production-brief",
      },
      {
        type: "paragraph",
        text: "For a first review, we ask for the current listing or planned image order, original product files from useful angles, verified specifications, packaging artwork, and a list of details that cannot change. We also need to know where the images will run. An Amazon main image, a Shopify banner, and a social ad do not want the same crop or the same amount of context.",
      },
      {
        type: "paragraph",
        text: "Examples you dislike are useful too. A client can spend twenty minutes describing a premium mood, then reject an image because the room feels too polished. Showing us that rejection reference at the start is faster.",
      },
      {
        type: "heading",
        level: 2,
        text: "How we make the call",
        id: "short-answer",
      },
      {
        type: "paragraph",
        text: "One sentence in the brief often settles it. When the shopper needs to inspect a detail, we put that detail in front of a camera. When a client wants the same product in ten locations, we usually photograph it once and build only the contexts that make sense.",
      },
      {
        type: "paragraph",
        text: "The photographs stay attached to the project from the first review to the final export. We use AI around them, then reject anything that changes what the customer will receive. That may leave us with fewer final options. We are fine with that. Every image still has to survive a side-by-side check with the real product.",
      },
    ],
    faq: [
      {
        question: "Are AI-generated product images allowed on Amazon?",
        answer:
          "Requirements vary by marketplace, category, and placement. Check the current Seller Central rules before production and upload. Whatever method you use, the image should not invent features, accessories, claims, or packaging.",
      },
      {
        question: "Should I use AI for my Amazon main image?",
        answer:
          "We usually prefer a photographed and carefully retouched main image because it documents the exact item. AI is more useful for secondary lifestyle and campaign images after the product has a reliable reference set.",
      },
      {
        question: "Is AI product imagery cheaper than photography?",
        answer:
          "It can reduce the cost of locations, sets, travel, or some model work. Complex products may still need substantial correction and review. Compare the cost of the approved image set, not the cost of the first generation.",
      },
    ],
  },
  {
    slug: "how-we-keep-ai-product-images-accurate",
    title: "How We Keep AI Product Images Accurate",
    date: "2026-07-28",
    excerpt:
      "Our AI product image workflow starts with a real product photo and a list of details the model is not allowed to change. Here is how we review the results.",
    heroImage: "/works/ai/images/ai-image-01.webp",
    heroAlt:
      "Accurate AI product image reviewed against the original product photo",
    author: "FlarePix Studio",
    authorRole: "Photo, video, and AI production",
    authorBio:
      "FlarePix is a product visual studio working with ecommerce and Amazon brands. Our team handles studio shoots, product video, AI lifestyle imagery, and AI video from one workflow, with delivery for Amazon, Shopify, and direct-to-consumer channels.",
    readTime: "6 min read",
    relatedServices: [
      { label: "AI Imagery", href: "/services/ai-imagery" },
      { label: "AI Video", href: "/services/ai-video" },
      { label: "Product Photography", href: "/services" },
    ],
    content: [
      {
        type: "paragraph",
        text: "A zipper moves to the wrong side. A matte bottle turns glossy. A small button appears where the real product has no button at all. The image may look convincing at first glance, but it is no longer the same product.",
      },
      {
        type: "paragraph",
        text: "This is the part of AI product images that gets missed in polished demos. Making a good-looking scene is fairly easy now. Keeping the product accurate takes more work, and most of that work happens before and after the model generates anything.",
      },
      {
        type: "heading",
        level: 2,
        text: "A realistic image can still be wrong",
        id: "realistic-but-wrong",
      },
      {
        type: "paragraph",
        text: "We review AI product imagery in two passes. First, does the scene work? Then, is the product still correct? The second question is stricter. We compare the generated image with the source photos and look for changes in shape, color, material, hardware, labels, packaging, and included parts.",
      },
      {
        type: "paragraph",
        text: "Some errors are obvious. Extra fingers and broken text are easy to reject. The expensive mistakes are quieter: a seam shifts by two centimetres, the cap becomes taller, or a fabric loses the texture that separates it from a cheaper competitor. Those images can survive an internal review and still confuse a shopper.",
      },
      {
        type: "heading",
        level: 2,
        text: "Our AI product image workflow starts before generation",
        id: "workflow",
      },
      {
        type: "paragraph",
        text: "Before we open an AI tool, we split the brief into two columns. One contains facts. The other contains creative choices. Product dimensions, materials, colours, controls, included parts, and packaging belong in the first column. Location, lighting, styling, camera angle, and mood belong in the second.",
      },
      {
        type: "paragraph",
        text: "AI can explore the creative column. It cannot guess the facts. If the brief does not say whether an accessory is included, we ask. If the logo file is missing, we do not invent one. That slows the first round down a little, but it saves far more time than correcting a scene built on the wrong product.",
      },
      {
        type: "heading",
        level: 2,
        text: "The source photos do most of the heavy lifting",
        id: "source-photos",
      },
      {
        type: "paragraph",
        text: "A clean white-background photo is a useful start, but one angle is not always enough. Handles, ports, fasteners, translucent parts, reflective surfaces, and repeating patterns often need close-ups. If the product has a shape that is hard to read from the front, we ask for side and back views too.",
      },
      {
        type: "paragraph",
        text: "We prefer original files over images downloaded from an Amazon or Shopify listing. Marketplace compression can soften the exact edge and texture information the model needs. For AI product photography, better references usually improve the result more than a longer prompt.",
      },
      {
        type: "heading",
        level: 2,
        text: "The first round is for finding problems",
        id: "first-round",
      },
      {
        type: "paragraph",
        text: "We rarely treat the first plausible image as a final. The early round tells us where the model struggles. A reflective bottle may keep changing shape. A clothing item may drape well on one model but lose its stitching on another. A package may stay accurate until the camera angle changes.",
      },
      {
        type: "paragraph",
        text: "Once we know the weak points, we stop changing everything at once. We lock the product angle and work on the background, or keep the scene and fix the product. This is slower than pressing generate until something looks good. It is also much easier to review.",
      },
      {
        type: "heading",
        level: 2,
        text: "What makes us reject an image",
        id: "reject-list",
      },
      {
        type: "paragraph",
        text: "Our reject list is not complicated. We discard an image if the silhouette changes, the proportions feel off, the material behaves incorrectly, or a product detail cannot be checked against the source. Logos and labels get a separate close review. So do hands, contact points, shadows, and reflections.",
      },
      {
        type: "paragraph",
        text: "Sometimes an image is beautiful and still gets rejected. That is frustrating, especially after several rounds, but the alternative is worse. A shopper should not receive a product that looks noticeably different from the one shown in the listing.",
      },
      {
        type: "paragraph",
        text: "We also keep samples separate from case studies. An AI sample can show what a visual direction might look like. It does not prove client results, conversion performance, or a production history that never happened.",
      },
      {
        type: "heading",
        level: 2,
        text: "Where AI product imagery works well",
        id: "where-it-works",
      },
      {
        type: "paragraph",
        text: "AI product imagery for ecommerce is useful when the real product is already photographed accurately and the missing piece is context. That may be a lifestyle setting, a seasonal campaign, an on-model variation, or a background for paid social. It is also useful for testing several visual directions before paying for a larger shoot.",
      },
      {
        type: "paragraph",
        text: "The destination matters. Amazon product images, Shopify galleries, email banners, and social ads need different crops and amounts of empty space. We prepare the final files for the agreed placement rather than handing over one large image and leaving the client to make it fit everywhere.",
      },
      {
        type: "heading",
        level: 2,
        text: "When we still choose product photography",
        id: "when-to-use-photography",
      },
      {
        type: "paragraph",
        text: "Traditional ecommerce product photography is still the safer choice when exact colour, scale, surface finish, or construction is the main selling point. It is also our default for clean white-background images that need to represent the product with as little interpretation as possible.",
      },
      {
        type: "paragraph",
        text: "Most projects do not need to choose one method for every image. We often use photography to establish the product truth and AI to build the settings around it. That division is less exciting than claiming AI can replace the studio, but it produces more dependable work.",
      },
      {
        type: "heading",
        level: 2,
        text: "What to send for a first review",
        id: "first-review",
      },
      {
        type: "paragraph",
        text: "Send the highest-resolution product photos you have, the current listing or draft, verified specifications, brand references, and the channels where the images will appear. It also helps to include examples you dislike. A clear rejection reference can tell us more than a mood board full of attractive images.",
      },
    ],
    faq: [
      {
        question: "How do you keep AI product images accurate?",
        answer:
          "We define the product details that cannot change, use original reference photos from several useful angles, generate controlled variations, and compare selected images with the source material. We reject images when a detail cannot be checked or corrected confidently.",
      },
      {
        question: "What photos work best for AI product image generation?",
        answer:
          "High-resolution originals with clean lighting and clear product edges work best. Products with complex shapes, hardware, labels, reflective materials, or fine texture usually need several angles and close-up photos.",
      },
      {
        question: "Can AI product imagery replace ecommerce product photography?",
        answer:
          "It can replace some lifestyle and campaign work, but traditional photography is still safer when exact colour, scale, material, or construction must be shown. Many projects use photography for the product itself and AI for additional settings and variations.",
      },
      {
        question: "Are AI-generated samples the same as client case studies?",
        answer:
          "No. A generated sample demonstrates a creative capability or direction. It should only be described as a client case study when the project, client relationship, and reported results are real and documented.",
      },
    ],
  },
  {
    slug: "ai-product-videos-cannot-be-fully-automated",
    title: "Why AI-Generated Product Videos Can't Be Fully Automated (And Why That Matters for Your Amazon Listing)",
    date: "2026-06-04",
    excerpt:
      "Every AI video tool on the market promises one-click output. The reality is different — and if you're using these tools without a professional review layer, your Amazon listing is probably paying for it.",
    heroImage: "/works/ai/images/ai-image-04.webp",
    heroAlt: "AI-generated product video for Amazon",
    author: "FlarePix Studio",
    authorRole: "Photo, video, and AI production",
    authorBio:
      "FlarePix is a product visual studio working with ecommerce and Amazon brands. Our team handles studio shoots, product video, AI lifestyle imagery, and AI video from one workflow, with delivery for Amazon, Shopify, and direct-to-consumer channels.",
    readTime: "5 min read",
    relatedServices: [
      { label: "AI Video", href: "/services/ai-video" },
      { label: "Brand Film", href: "/services/brand-film" },
      { label: "AI Imagery", href: "/services/ai-imagery" },
    ],
    content: [
      {
        type: "paragraph",
        text: "Search for 'AI product video' and you'll find a list of tools that promise to transform your product images into listing-ready video in minutes. Upload a photo, click generate, download the result. It sounds efficient. It sounds affordable. And if you've used one of these tools, you probably noticed the output looks like everyone else's output.",
      },
      {
        type: "paragraph",
        text: "That's not a coincidence. It's a structural problem with treating AI video as a self-serve tool rather than a production process.",
      },
      {
        type: "heading",
        level: 2,
        text: "What 'one-click AI video' actually produces",
        id: "output",
      },
      {
        type: "paragraph",
        text: "The output from a self-serve AI video tool has a recognizable look: slightly unnatural motion (products that float rather than move, backgrounds that drift without physics), visual artifacts around the product edge, generic scene transitions, and a feel that experienced online shoppers immediately register as AI-generated. This isn't just an aesthetic issue — it's a conversion issue. Shoppers in 2026 are increasingly sophisticated about AI content, and products that look AI-generated can actively hurt brand credibility.",
      },
      {
        type: "heading",
        level: 2,
        text: "Why the model can't fix this itself",
        id: "model",
      },
      {
        type: "paragraph",
        text: "AI video models are trained on large datasets of motion, product presentations, and scene transitions. They know what video 'looks like' in a general sense. But they don't know what your product looks like, what your brand voice is, what aspect ratio performs best on your specific category, or what motion would actually communicate your product's value. The model works from prompts and reference inputs — if those inputs are generic, the output is generic.",
      },
      {
        type: "paragraph",
        text: "The gap between a usable AI video and a professional one is entirely in the human layer: prompt design, reference curation, product alignment review, artifact correction, and format optimization for each destination platform. Without that layer, the AI model is doing its best — and its best isn't good enough for a listing competing against sellers who are using the same model.",
      },
      {
        type: "heading",
        level: 2,
        text: "The specific failure modes on Amazon",
        id: "amazon",
      },
      {
        type: "paragraph",
        text: "Amazon's detail page video plays automatically — muted, in the main image slot — for shoppers who have autoplay enabled. A video that starts with 2 seconds of generic floating-motion, visible seams between product and background, or an obviously AI aesthetic sends a signal before the product's benefits have been communicated. The scroll stops, but the add-to-cart doesn't follow.",
      },
      {
        type: "list",
        items: [
          "Visual artifacts: product edges that don't blend cleanly into generated scenes",
          "Generic motion: product rotations and transitions that look templated",
          "Wrong product emphasis: the AI model's interpretation of the product, not the seller's",
          "Format mismatch: video optimized for a general aspect ratio, not Amazon's player",
          "No brand continuity: the output doesn't match the aesthetic of the rest of the listing",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "What professional AI video production looks like",
        id: "professional",
      },
      {
        type: "paragraph",
        text: "At FlarePix, AI video generation is a managed production process — not a self-serve tool. When you send us your product, here's what happens: we review your actual product image to define the geometry and color profile for accurate placement, design prompts that describe your specific scene and motion intent rather than generic defaults, run the generation with multiple variations, review every output for product accuracy and visual artifacts, correct issues before delivery, and deliver in the formats required by Amazon, Meta, TikTok, and any other platform in your plan.",
      },
      {
        type: "paragraph",
        text: "The extra steps add time (2-5 business days for most AI video projects) and cost ($100-300 per video depending on complexity and volume). But the output is a finished video — not a draft that needs to be reviewed, iterated on, and potentially rejected.",
      },
      {
        type: "heading",
        level: 2,
        text: "How to evaluate an AI video vendor",
        id: "evaluate",
      },
      {
        type: "paragraph",
        text: "Before you sign with any AI video vendor — FlarePix included — ask these questions: Who reviews the outputs, and what are their qualifications? What happens if the output has artifacts or product inaccuracy — is there a revision process, and what's the timeline? Do they deliver in Amazon's required format, or do you have to re-export? Do they have examples in your specific product category? A vendor that can't answer all four with specificity is probably reselling a model API with no production layer.",
      },
      {
        type: "paragraph",
        text: "If you want to see what professional AI video production looks like for your product category, send us one product photo and we'll generate 3-4 sample scenes within 48 hours. No contract, no commitment. The samples show you exactly what the output looks like before you commit to a full project.",
      },
    ],
  },
  {
    slug: "hybrid-production-behind-the-scenes",
    title: "How We Shot a Real Amazon Product Video: A Behind-the-Scenes Look at Our Hybrid Production Process",
    date: "2026-06-04",
    excerpt:
      "A real Amazon product video for a GE body fat scale — from brief to delivery. How hybrid production (real footage + AI scene extension) works in practice, and why the AI layer exists to solve a real studio constraint, not to replace real filming.",
    heroImage: cdnUrl("/works/Case screenshots/ai-1-compressed.jpg"),
    heroAlt: "GE body fat scale product video — real footage with AI-enhanced scene",
    author: "FlarePix Studio",
    authorRole: "Photo, video, and AI production",
    authorBio:
      "FlarePix is a product visual studio working with ecommerce and Amazon brands. Our team handles studio shoots, product video, AI lifestyle imagery, and AI video from one workflow, with delivery for Amazon, Shopify, and direct-to-consumer channels.",
    readTime: "6 min read",
    relatedServices: [
      { label: "Brand Film", href: "/services/brand-film" },
      { label: "AI Video", href: "/services/ai-video" },
      { label: "Pricing", href: "/pricing" },
    ],
    content: [
      {
        type: "paragraph",
        text: "Most product video portfolios show the finished result. This post shows the actual production — a real project for a GE body fat scale, from the brief we received to the final delivery. The numbers are real. The process is real. The only thing we cleaned up was the studio floor between takes.",
      },
      {
        type: "heading",
        level: 2,
        text: "The brief",
        id: "brief",
      },
      {
        type: "paragraph",
        text: "GE's product team needed a product video for their Smart Scale body fat monitor — a premium 8-electrode body composition scale with Bluetooth sync and full body composition analysis. The listing already had strong photography. What it needed was a video that showed the product in use: the step-on experience, the handle display reading, the app sync in action. 30 seconds, clean and premium. Timeline: 5 business days. Budget: $2,500.",
      },
      {
        type: "video",
        src: "https://media.flarepix.com/works/brand-film/brand-film-08.m4v",
        title: "GE Smart Scale — FlarePix Hybrid Production",
      },
      {
        type: "paragraph",
        text: "You can also view the finished video on Amazon: https://www.amazon.com/dp/B0G1YVWXL5/",
      },
      {
        type: "heading",
        level: 2,
        text: "The studio constraint",
        id: "constraint",
      },
      {
        type: "paragraph",
        text: "Our Qingdao studio is large, but we didn't have a full living room set built for this specific product context. For a body composition scale — the kind with a large base and handle attachment — showing it in a real living room setting required a wider shot than our current set could provide. We had two options: build out a new set, or use the space we had and extend it digitally.",
      },
      {
        type: "paragraph",
        text: "We chose the second option — not because AI generation is faster or cheaper, but because for this specific shot, it was the most honest way to show the product in the intended environment without compromising on what we actually filmed.",
      },
      {
        type: "heading",
        level: 2,
        text: "What we actually filmed",
        id: "filmed",
      },
      {
        type: "paragraph",
        text: "One day in the studio. Sony A7IV for product detail, a second camera for wider context. We filmed the scale at ground level to show the base profile and electrode surface, the step-on moment with feet making contact, the handle display reading out composition data, and the Bluetooth sync animation on a phone screen held beside the product. Clean white background, controlled lighting, real product.",
      },
      {
        type: "paragraph",
        text: "The wide shot — the one that needed the expanded scene — showed the scale in a partial living room environment. We had the product, the light, and about 40% of the background we needed. AI scene extension filled the rest: the same floor material extended, the same wall tone carried through, the same light source providing context. What the viewer sees is a real studio product shot, not an AI-generated scene with a product dropped in.",
      },
      {
        type: "heading",
        level: 2,
        text: "When AI scene extension works — and when it doesn't",
        id: "when-ai",
      },
      {
        type: "paragraph",
        text: "AI scene extension is not a replacement for a good studio setup. It's a tool for solving a specific spatial constraint: you have the right product, the right lighting, and the right angle — but not enough room to show the intended environment. In this case, the viewer needed to understand this scale belongs in a home setting, not a lab. The AI extension made that legible without forcing us to find and rent a full living room set.",
      },
      {
        type: "paragraph",
        text: "It doesn't work when you have the wrong product shot to begin with. A product shot with inaccurate color, wrong proportions, or poor lighting will produce an AI extension that amplifies those problems rather than solving them. The AI layer requires accurate source material — it extends what's there, it doesn't fix what's wrong.",
      },
      {
        type: "heading",
        level: 2,
        text: "Delivery and client response",
        id: "result",
      },
      {
        type: "paragraph",
        text: "Final delivery: one 30-second Amazon listing video (16:9, 4K H.264 MP4), formatted for Amazon's player. Total production time: 5 business days from brief confirmation. Price: $2,500.",
      },
      {
        type: "paragraph",
        text: "The client was satisfied with the production quality — so satisfied that they referred us to at least three other product teams within their organization. That's the metric we find most meaningful: not a conversion rate claim, but a client who trusted the output enough to recommend us to colleagues.",
      },
      {
        type: "heading",
        level: 2,
        text: "When hybrid production makes sense",
        id: "when-hybrid",
      },
      {
        type: "list",
        items: [
          "Product video for Amazon listings — when you need a real product shot with a contextual environment you can't physically access",
          "High-volume catalog work — multiple SKUs, same studio setup, AI extends the scene library without additional shoots",
          "Scale-phase creative — when you're testing multiple lifestyle contexts before committing to a full production",
          "Products where the real environment is impractical to film in (outdoor gear in actual outdoor conditions, large furniture in actual living rooms)",
        ],
      },
      {
        type: "paragraph",
        text: "When full production is the better call: cinematic brand films with complex talent and location work, products where physical scale and texture are the entire selling proposition, or anytime you need a specific real-world location that AI can't convincingly replicate. AI scene extension is not a substitute for a great studio shoot — it's a complement for the constraints that make a great studio shoot impractical.",
      },
    ],
  },
  {
    slug: "ai-product-images-convert-better-2026",
    title: "AI Product Images: Why They Convert Better in 2026",
    date: "2026-06-02",
    excerpt:
      "AI product images now match studio-shot lifestyle photography on conversion. When AI imagery works, when it doesn't, and how to combine both in a 7-image Amazon listing.",
    heroImage: "/works/ai/images/ai-image-03.webp",
    heroAlt: "AI-generated lifestyle product image",
    author: "FlarePix Studio",
    authorRole: "Photo, video, and AI production",
    authorBio:
      "FlarePix is a product visual studio working with ecommerce and Amazon brands. Our team handles studio shoots, product video, AI lifestyle imagery, and AI video from one workflow, with delivery for Amazon, Shopify, and direct-to-consumer channels.",
    readTime: "7 min read",
    relatedServices: [
      { label: "AI Imagery", href: "/services/ai-imagery" },
      { label: "Product Photography", href: "/services#product-photography" },
      { label: "Pricing", href: "/pricing" },
    ],
    dateUpdated: "2026-07-08",
    faq: [
      {
        question: "Are AI-generated product images allowed on Amazon?",
        answer:
          "Yes — for secondary gallery images, A+ Content, and ads. Amazon's main image must still be a real photograph of the actual product on pure white, and the imagery must not misrepresent the product. AI-generated lifestyle imagery belongs in the secondary slots (images 2-7), where lifestyle context and scene variation live. We keep the main image as a real studio shot and use AI for the lifestyle and campaign slots where it converts.",
      },
      {
        question: "How much do AI product images cost?",
        answer:
          "Less than an equivalent lifestyle shoot, because there's no studio build, location, model booking, or shipping. We price per project based on SKU count, number of scenes, and delivery formats rather than a fixed per-image rate — and the cost per usable lifestyle image drops sharply once you're generating multiple scenes from a single reference photo. Send a brief and we'll return a tailored proposal within 24 hours.",
      },
      {
        question: "Do AI product images convert better than real photography?",
        answer:
          "On lifestyle metrics — click-through on sponsored placements and add-to-cart rate on galleries with multiple lifestyle images — AI-generated lifestyle scenes now match studio-shot lifestyle scenes. They don't beat a real main image, and they shouldn't replace it. The lift comes from combining the two: a real studio main image for trust, AI lifestyle scenes for context and variation.",
      },
      {
        question: "What's the difference between AI product images and AI product photography?",
        answer:
          "Mostly terminology. 'AI product photography' is the broader term people search for the service; 'AI product images' refers to the output. Both describe the same workflow: start from a real photo of your product, then generate lifestyle scenes, on-model shots, or campaign visuals around it while preserving the product's real geometry, color, and labeling.",
      },
    ],
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
        text: "Industry research over the past several years points in the same direction: lifestyle imagery outperforms pure white-background shots on engagement. The exact lift varies by category and study, but published benchmarks routinely place sponsored-placement click-through gains in the tens of percent, and add-to-cart lift for galleries that include at least three lifestyle images. The comparison that matters here is the source comparison: AI-generated lifestyle images now match studio-shot lifestyle images on those same metrics. The gap is no longer about whether the scene was generated or photographed — it's about creative quality, scene relevance, and how fast you can iterate.",
      },
      {
        type: "paragraph",
        text: "From the production side, we see the same pattern as a demand signal. Sellers who replace a white-background-only gallery with a mixed set that adds AI lifestyle scenes tend to come back to expand — more SKUs, more scenes, more channels — rather than treating it as a one-off. We don't publish per-client conversion numbers, because once files are handed off we can't verify what happens inside a seller's Amazon Brand Analytics. The honest proxy we rely on is repeat work: clients reorder when the imagery performs.",
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
        text: "Curious how AI handles your specific product? Most studios test a sample set first — we send 4-6 lifestyle scenes from one photo in 48 hours, free, no contract. If the look fits your brand, we scale from there. Reach out via the contact form and we'll run a sample on your actual product.",
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
    author: "FlarePix Studio",
    authorRole: "Photo, video, and AI production",
    authorBio:
      "FlarePix is a product visual studio working with ecommerce and Amazon brands. Our team handles studio shoots, product video, AI lifestyle imagery, and AI video from one workflow, with delivery for Amazon, Shopify, and direct-to-consumer channels.",
    readTime: "5 min read",
    relatedServices: [
      { label: "Product Photography", href: "/services#product-photography" },
      { label: "AI Imagery", href: "/services/ai-imagery" },
      { label: "Pricing", href: "/pricing" },
    ],
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
        text: "For a 50+ SKU catalog, format choice is the biggest lever on returns. We offer a free per-SKU audit — forward your line sheet to hello@flarepix.com and we'll mark each product as ghost mannequin, flat lay, or on-model, with bundled pricing. Standard turnaround on audits is one business day.",
      },
    ],
  },
  {
    slug: "prepare-products-for-photo-shoot",
    title: "How to Prepare Your Products for a Photo Shoot",
    date: "2026-05-15",
    excerpt:
      "Most shoot delays come from products arriving unprepared. A pre-shipment checklist from a studio that's seen every common mistake twice.",
    heroImage: "/works/photo/products/products_1.jpg",
    heroAlt: "Products prepared for photo shoot",
    author: "FlarePix Studio",
    authorRole: "Photo, video, and AI production",
    authorBio:
      "FlarePix is a product visual studio working with ecommerce and Amazon brands. Our team handles studio shoots, product video, AI lifestyle imagery, and AI video from one workflow, with delivery for Amazon, Shopify, and direct-to-consumer channels.",
    readTime: "5 min read",
    relatedServices: [
      { label: "Product Photography", href: "/services#product-photography" },
      { label: "Brand Film", href: "/services/brand-film" },
      { label: "Contact", href: "/contact" },
    ],
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
        text: "A well-prepared shipment is the difference between a 5-day shoot and a 10-day shoot. The full prep checklist (PDF) covers apparel, electronics, beauty, and multi-piece kits — request it via the contact form when you book. If you'd rather skip the prep work, our product photography service includes in-house steaming, tag removal, and minor cleanup before the shoot.",
      },
    ],
  },
  {
    slug: "amazon-product-video-requirements-guide",
    title: "Amazon Product Video Requirements: What Every Seller Needs to Know Before Hiring a Studio",
    date: "2026-06-04",
    excerpt:
      "Technical specs, creative best practices, and the questions most sellers forget to ask before committing to a product video studio. A practical guide to getting a video that actually converts.",
    heroImage: "/works/photo/products/products_1.jpg",
    heroAlt: "Amazon product video production",
    author: "FlarePix Studio",
    authorRole: "Photo, video, and AI production",
    authorBio:
      "FlarePix is a product visual studio working with ecommerce and Amazon brands. Our team handles studio shoots, product video, AI lifestyle imagery, and AI video from one workflow, with delivery for Amazon, Shopify, and direct-to-consumer channels.",
    readTime: "5 min read",
    relatedServices: [
      { label: "AI Video", href: "/services/ai-video" },
      { label: "Brand Film", href: "/services/brand-film" },
      { label: "Pricing", href: "/pricing" },
    ],
    content: [
      {
        type: "paragraph",
        text: "Most sellers know they need a product video. Fewer know what separates a video that converts from one that looks like every other listing in their category. The difference isn't budget — it's preparation. This guide covers the technical requirements, the creative questions most sellers forget to ask, and the mistakes we see most often when reviewing a new client's brief.",
      },
      {
        type: "heading",
        level: 2,
        text: "Amazon's technical requirements for 2026",
        id: "technical",
      },
      {
        type: "list",
        items: [
          "Format: MP4 (H.264 codec) — most studios deliver this by default",
          "Resolution: minimum 480p, recommended 1080p or 4K",
          "Aspect ratio: 16:9 (Amazon's player is optimized for this), though 1:1 and 9:16 are accepted",
          "Maximum file size: 5GB (far above what any listing video will be)",
          "Length: 30 seconds minimum, 10 minutes maximum — most brand films are 60-90 seconds",
          "Color space: sRGB (Amazon's player converts other color spaces, but results vary)",
          "Audio: AAC, 44100 Hz sample rate — some sellers forget this if they have a voiceover",
          "File naming: no special characters, underscores or hyphens only",
        ],
      },
      {
        type: "paragraph",
        text: "The most common technical mistake we see: studios that deliver ProRes or MOV files, or that export at a non-standard frame rate (23.976fps instead of 29.97fps). Amazon accepts these in some regions but rejects them in others — usually right before a product launch, when there's no time to fix it.",
      },
      {
        type: "heading",
        level: 2,
        text: "The creative questions most sellers forget to ask",
        id: "questions",
      },
      {
        type: "paragraph",
        text: "Before you brief any studio — FlarePix included — answer these five questions: What is the single most important thing this video needs to communicate? (If you can't answer this in one sentence, the brief isn't ready.) Which platforms will this run on, and do they need different aspect ratios? (Amazon, Meta, and TikTok all have different player specs.) Who is the target viewer — a parent looking for a kitchen tool, a fitness enthusiast, a gift buyer? (Different audiences respond to different visual language.) What does your product do that the current listing photos can't show as effectively? (Motion communicates function better than any static image for most products.) What is the production timeline — and does it fit your launch date?",
      },
      {
        type: "paragraph",
        text: "Studios that ask these questions before quoting are studios that understand how to produce something that converts. Studios that quote without asking are studios that are selling a service, not solving a business problem.",
      },
      {
        type: "heading",
        level: 2,
        text: "The production types and when each fits",
        id: "types",
      },
      {
        type: "paragraph",
        text: "Not all product videos are the same. Understanding the production type you need before you start getting quotes prevents scope creep, budget surprises, and videos that don't fit your listing.",
      },
      {
        type: "list",
        items: [
          "Studio product video: product on white or simple background, shot in a studio, 30-60 seconds. Best for: products where the physical form is the primary purchase driver, utility products, kitchen tools, electronics. Cost range: $150-500.",
          "Lifestyle product video: product in a real setting, often with talent or staging. Best for: apparel, beauty, home goods where context matters as much as the product. Cost range: $500-2,000.",
          "AI-generated product video: product placed into AI-generated scenes or given AI-assisted motion. Best for: high-volume catalogs, products where lifestyle shooting is impractical, rapid creative iteration. Cost range: $100-300 per video.",
          "Brand film / hero video: cinematic production with creative direction, script, and full post-production. Best for: flagship products, brand launches, premium positioning. Cost range: $2,000-10,000+.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Mistakes that kill the video before it launches",
        id: "mistakes",
      },
      {
        type: "list",
        items: [
          "No brief or vague brief: 'make it look professional' doesn't give the studio enough to work with",
          "Wrong aspect ratio for the platform: delivering 9:16 for an Amazon listing, or 16:9 for a TikTok ad",
          "Audio issues: voiceover recorded without a noise floor, music that exceeds Amazon's loudness limits",
          "Color profile mismatch: CMYK export instead of sRGB, or branded assets delivered in the wrong color space",
          "Not specifying delivery formats: the studio delivers one master file instead of platform-specific exports",
          "Timeline mismatch: quoting a 2-week turnaround for a project that needs 4 weeks",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "What to ask any studio before signing",
        id: "ask",
      },
      {
        type: "paragraph",
        text: "Ask for examples in your specific product category. A studio that makes excellent electronics product videos may not have the lifestyle video expertise your apparel brand needs. Ask what delivery formats they include — you want Amazon MP4, Meta-ready H.264, and if applicable TikTok-ready files in a single project. Ask about their revision policy. Most studios include 1-2 rounds; if you need more, clarify the cost before the project starts. Ask who reviews the final output — and whether that review includes Amazon compliance. A studio that doesn't understand Amazon's spec can produce a beautiful video that gets rejected from your listing.",
      },
      {
        type: "paragraph",
        text: "If you'd like a pre-brief consultation on your product video project — no commitment — send us your product details and launch timeline to hello@flarepix.com. We'll tell you directly whether our production capability fits your brief, or recommend a better fit if it doesn't.",
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
    author: "FlarePix Studio",
    authorRole: "Photo, video, and AI production",
    authorBio:
      "FlarePix is a product visual studio working with ecommerce and Amazon brands. Our team handles studio shoots, product video, AI lifestyle imagery, and AI video from one workflow, with delivery for Amazon, Shopify, and direct-to-consumer channels.",
    readTime: "6 min read",
    relatedServices: [
      { label: "Product Photography", href: "/services#product-photography" },
      { label: "AI Imagery", href: "/services/ai-imagery" },
      { label: "Pricing", href: "/pricing" },
    ],
    content: [
      {
        type: "paragraph",
        text: "Amazon updates its product image requirements every year, sometimes more often. Most sellers don't notice the changes until their listings get suppressed or their search rank drops. What follows is the current 2026 spec for main image, secondary gallery, A+ Content, and video — including the rejection reasons we see most often and the creative choices that move buy box share.",
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
        text: "Amazon's automated image check rejects more listings in 2026 than in any prior year. If you want a free compliance review of your current gallery, send one product link to hello@flarepix.com — we audit the main image and secondary set within a day, no charge.",
      },
    ],
  },
  {
    slug: "arboleaf-product-video-case-study",
    title: "Arboleaf Body Composition Scale — Product Video Case Study",
    date: "2026-06-06",
    excerpt:
      "A second body composition scale project for a product brand under the same parent company as our GE Smart Scale case — same production workflow, same quality standard, different product context.",
    heroImage: cdnUrl("/works/Case screenshots/Arboleaf-Smart-Scale-compressed.jpg"),
    heroAlt: "Arboleaf body composition scale product video",
    author: "FlarePix Studio",
    authorRole: "Photo, video, and AI production",
    authorBio:
      "FlarePix is a product visual studio working with ecommerce and Amazon brands. Our team handles studio shoots, product video, AI lifestyle imagery, and AI video from one workflow, with delivery for Amazon, Shopify, and direct-to-consumer channels.",
    readTime: "5 min read",
    relatedServices: [
      { label: "AI Video", href: "/services/ai-video" },
      { label: "Brand Film", href: "/services/brand-film" },
      { label: "Pricing", href: "/pricing" },
    ],
    content: [
      {
        type: "paragraph",
        text: "This is the second project we completed for a product brand under the same parent company as our GE Smart Scale case study. After the first project, the client came back with a different SKU — an Arboleaf dual-frequency body composition scale.",
      },
      {
        type: "paragraph",
        text: "Both projects came from the same source: a client who was satisfied with the first delivery and returned for a second product. That's the kind of result we find most meaningful — not a one-time transaction, but a recurring production relationship.",
      },
      {
        type: "heading",
        level: 2,
        text: "Project brief",
        id: "brief",
      },
      {
        type: "paragraph",
        text: "Arboleaf dual-frequency body composition scale — a premium 8-electrode bathroom scale with dual-frequency analysis technology, Bluetooth connectivity, and a full-body composition readout. Similar product category to the GE Smart Scale, but different enough in design language and technical specification to require its own visual treatment.",
      },
      {
        type: "paragraph",
        text: "Production scope: product video, Amazon listing format, 5-day turnaround. Price: $600 for video (simpler production, fewer deliverables). Photography billed separately.",
      },
      {
        type: "video",
        src: "https://media.flarepix.com/works/Case%20screenshots/Arboleaf%20Smart%20Scale.mp4",
        title: "Arboleaf Smart Scale — FlarePix Product Video",
      },
      {
        type: "paragraph",
        text: "You can also view the finished video on Amazon: https://www.amazon.com/Arboleaf-8-Electrode-Dual-Frequency-Bathroom-Composition/dp/B0GKNGT58N",
      },
      {
        type: "heading",
        level: 2,
        text: "What we produced",
        id: "produced",
      },
      {
        type: "paragraph",
        text: "The production ran exactly as the first project did: one day in our Qingdao studio, Sony A7IV for product detail work, clean white background for the video, additional angles for the photography set. The scale was filmed at ground level, showing the electrode surface, the display panel, and the handle attachment in context.",
      },
      {
        type: "paragraph",
        text: "No AI scene extension was needed for this project — the studio set we used for the Arboleaf was a living room environment we already had access to, which matched the product's intended use context more directly than what we could have generated.",
      },
      {
        type: "heading",
        level: 2,
        text: "The recurring client relationship",
        id: "relationship",
      },
      {
        type: "paragraph",
        text: "The Arboleaf project came in after the client had already seen our work on the GE Smart Scale. They knew what they were getting: a structured production process, a single day of filming, and delivery in Amazon-ready formats within a week.",
      },
      {
        type: "paragraph",
        text: "For us, recurring clients like this are the clearest signal that the production model is working. We're not winning every project we bid on — we're winning the ones where the brief matches what we actually do well.",
      },
      {
        type: "heading",
        level: 2,
        text: "What this means for your project",
        id: "your-project",
      },
      {
        type: "paragraph",
        text: "If you have multiple SKUs in the same category — body composition scales, kitchen appliances, fitness devices — working with the same production team across all of them means each project benefits from what we learned on the last one. We know your brief format, your preferred delivery formats, and your product category context. That's less back-and-forth and a faster timeline.",
      },
      {
        type: "paragraph",
        text: "If you'd like to discuss a multi-SKU production plan, reach out at hello@flarepix.com with your product list and current timeline. We can usually put together a production sequence that runs multiple SKUs through the same shoot day.",
      },
    ],
  },
];

export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);

export const getRelatedPosts = (slug: string, limit = 3) =>
  blogPosts.filter((p) => p.slug !== slug).slice(0, limit);
