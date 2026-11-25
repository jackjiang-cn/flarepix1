import { premiumAiVideo } from "./ai-video-pricing";

export const aiVideoPricingFaq = {
  q: "What is the difference between Standard and Premium AI Video?",
  a: `Standard AI Video is $12 per finished second for a clear brief and straightforward scenes. Premium AI Video starts at ${premiumAiVideo.startingPrice} for ${premiumAiVideo.startingScope}. ${premiumAiVideo.proposalNote}`,
} as const;

export const faqGroups = [
  {
    id: "projects-and-pricing",
    number: "01",
    title: "Projects & Pricing",
    intro: "What we make and how to start a project.",
    questions: [
      {
        q: "What do you produce?",
        a: "We create commercials and brand films, advertising creatives, product videos and demonstrations, AI video, and product photography for consumer and ecommerce brands.",
      },
      {
        q: "Can we work together if my brand is outside China?",
        a: "Yes. Our team is based in Qingdao, China, and works with clients remotely. We agree the brief, production plan, reviews, and delivery online.",
      },
      {
        q: "What do you need to prepare a quote?",
        a: "Tell us about your product, audience, intended channels, deliverables, references, and target date. We’ll confirm the scope and price before production begins.",
      },
      {
        q: "How much does a project cost?",
        a: "Our Pricing page shows starting budgets. The final quote depends on the creative scope, shoot requirements, deliverables, and usage needs.",
      },
    ],
  },
  {
    id: "production-and-delivery",
    number: "02",
    title: "Production & Delivery",
    intro: "The practical steps from samples to final files.",
    questions: [
      {
        q: "Do I need to ship a product sample?",
        a: "Physical filming and photography usually require an agreed sample. For AI video, approved product photos and brand references may be enough. We confirm what to send before production.",
      },
      {
        q: "How long does production take?",
        a: "Timing depends on the scope, sample arrival, and feedback schedule. We include production and review milestones in your proposal.",
      },
      {
        q: "Can I review the work and request changes?",
        a: "Yes. We agree on review points and included revision rounds before production. Your team can then send consolidated feedback at each review stage.",
      },
      {
        q: "What file formats will I receive?",
        a: "We agree on aspect ratios, resolution, and file types for your intended channels before production. The final deliverables are listed in your proposal.",
      },
      {
        q: "Can I use the finished content in advertising?",
        a: "Your proposal sets out the intended usage and any terms for music, talent, or other licensed assets.",
      },
    ],
  },
  {
    id: "ai-video-and-photography",
    number: "03",
    title: "AI Video & Photography",
    intro: "Choosing the right production approach for your brief.",
    questions: [
      aiVideoPricingFaq,
      {
        q: "How do you check AI video for product accuracy?",
        a: "We review generated scenes against the product references you provide. When exact product details or functions need to be shown, we may recommend filming the real product.",
      },
      {
        q: "What does the $10 product photography price include?",
        a: "It is the starting price for one finished white-background image of one product from one angle, with basic color correction. Lifestyle, model, and complex shoots are quoted separately.",
      },
    ],
  },
] as const;

export const featuredFaqs = [
  faqGroups[0].questions[1],
  faqGroups[1].questions[0],
  faqGroups[0].questions[3],
  faqGroups[1].questions[1],
] as const;
