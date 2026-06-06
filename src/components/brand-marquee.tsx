import Image from "next/image";
import { cdnUrl } from "@/config/cdn";

const logos = [
  { src: "/works/clients/anker.png", alt: "Anker" },
  { src: "/works/clients/baseus.png", alt: "Baseus" },
  { src: "/works/clients/bluetti.png", alt: "Bluetti" },
  { src: "/works/clients/dreame.png", alt: "Dreame" },
  { src: "/works/clients/ecoflow.png", alt: "EcoFlow" },
  { src: "/works/clients/fitbit.png", alt: "Fitbit" },
  { src: "/works/clients/havit.png", alt: "Havit" },
  { src: "/works/clients/insta360.png", alt: "Insta360" },
  { src: "/works/clients/instant_pot.png", alt: "Instant Pot" },
  { src: "/works/clients/jabra.png", alt: "Jabra" },
  { src: "/works/clients/jackery.png", alt: "Jackery" },
  { src: "/works/clients/oxo.png", alt: "OXO" },
  { src: "/works/clients/roborock.png", alt: "Roborock" },
  { src: "/works/clients/stanley.png", alt: "Stanley" },
  { src: "/works/clients/therabody.png", alt: "Therabody" },
  { src: "/works/clients/tribit.png", alt: "Tribit" },
  { src: "/works/clients/ugreen.png", alt: "Ugreen" },
  { src: "/works/clients/zendure.png", alt: "Zendure" },
];

export default function BrandMarquee() {
  return (
    <section className="overflow-hidden bg-[var(--surface)] py-16">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Trusted by leading ecommerce brands
        </h2>
      </div>
      <div className="mt-10 flex gap-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
        <div className="flex animate-marquee gap-16 whitespace-nowrap">
          {[...logos, ...logos].map((logo, i) => (
            <Image
              key={`${logo.alt}-${i}`}
              src={cdnUrl(logo.src)}
              alt={logo.alt}
              width={80}
              height={32}
              className="h-8 w-auto object-contain opacity-50 invert brightness-0"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
