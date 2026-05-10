import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { footerLinks, socialLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer id="contact" className="bg-ink px-5 py-12 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandMark inverse />
          <p className="mt-5 max-w-md text-sm leading-7 text-white/62">
            A premium mobility studio for city exits, weekend roads, and
            thoughtfully staged motorcycle handoffs.
          </p>
          <Link
            href="https://wa.me/919999999999"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink transition hover:bg-saddle"
          >
            <MessageCircle size={18} />
            WhatsApp Concierge
          </Link>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/45">
            Navigation
          </p>
          <div className="mt-5 grid gap-3 text-sm text-white/72">
            {footerLinks.map((link) => (
              <Link
                key={link}
                href={link === "Admin" ? "/admin" : link === "Explore" ? "/explore/motorcycles" : `/#${link.toLowerCase()}`}
                className="transition hover:text-white"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/45">
            Contact
          </p>
          <div className="mt-5 space-y-3 text-sm leading-7 text-white/72">
            <p>Wheelbros Mobility Studio</p>
            <p>Lower Parel, Mumbai</p>
            <p>hello@wheelbros.rent</p>
            <p>+91 99999 99999</p>
          </div>
          <div className="mt-6 flex gap-3">
            {socialLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white/72 transition hover:border-white hover:text-white"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
