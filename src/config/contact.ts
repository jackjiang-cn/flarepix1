export const contact = {
  email: "hello@flarepix.com",
  phone: "",
  address: "",
  social: {
    youtube: "https://youtube.com/@flarepix",
    instagram: "https://instagram.com/flarepix",
    x: "https://x.com/flarepix",
    linkedin: "https://linkedin.com/company/flarepix",
    tiktok: "https://tiktok.com/@flarepix",
  },
} as const;

export const navigation = {
  main: [
    { label: "Services", href: "/services" },
    { label: "AI Tools", href: "/ai-tools" },
    { label: "Our Work", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
  footer: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
