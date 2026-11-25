export const contact = {
  email: "hello@flarepix.com",
  phone: "+86-156-6682-0406",
  address: "Qingdao, Shandong, China",
} as const;

export const navigation = {
  main: [
    { label: "Services", href: "/services" },
    { label: "Our Work", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
  footer: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "How We Work", href: "/how-we-work" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
