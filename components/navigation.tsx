"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { categories } from "@/lib/data";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" }
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-4 z-50 px-4">
      <nav className="fine-border mx-auto flex max-w-7xl items-center justify-between rounded-[1.65rem] border border-white/55 bg-[#f7f2ea]/88 px-3 py-2.5 shadow-[0_18px_55px_rgba(17,17,17,0.13)] backdrop-blur-md md:px-5">
        <BrandMark />

        <div className="hidden items-center gap-7 text-[13px] font-bold text-graphite md:flex">
          {navLinks.slice(0, 1).map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-ember">
              {link.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setExploreOpen(true)}
            onMouseLeave={() => setExploreOpen(false)}
          >
            <button
              type="button"
              className="focus-ring transition hover:text-ember"
              onClick={() => setExploreOpen((open) => !open)}
            >
              Explore
            </button>
            <AnimatePresence>
              {exploreOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 top-10 w-80 -translate-x-1/2 rounded-[1.4rem] border border-ink/10 bg-[#f7f2ea]/96 p-2 shadow-premium backdrop-blur-md"
                >
                  {categories.map((category) => (
                    <Link
                      href={`/explore/${category.slug}`}
                      key={category.slug}
                      className="block rounded-[1rem] px-4 py-3 transition hover:bg-white/82"
                    >
                      <span className="font-heading text-base font-semibold text-ink">
                        {category.label}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-neutral-600">
                        {category.description}
                      </span>
                    </Link>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {navLinks.slice(1).map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-ember">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/admin"
            className="rounded-full border border-ink/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-ink transition hover:border-ink hover:bg-ink hover:text-white"
          >
            Admin
          </Link>
          <Link
            href="/book"
            className="rounded-full bg-ink px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-ember active:translate-y-0"
          >
            Book Now
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="focus-ring rounded-full bg-ink p-3 text-white md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24 }}
            className="mx-auto mt-3 max-w-7xl rounded-[1.5rem] border border-ink/10 bg-[#f7f2ea]/96 p-4 shadow-premium backdrop-blur-md md:hidden"
          >
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-2xl px-4 py-3 text-sm font-bold text-ink transition hover:bg-bone"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/explore/${category.slug}`}
                  className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-ink"
                  onClick={() => setMenuOpen(false)}
                >
                  Explore {category.label}
                </Link>
              ))}
              <Link
                href="/book"
                className="rounded-full bg-ink px-4 py-3 text-center text-sm font-bold text-white"
                onClick={() => setMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
