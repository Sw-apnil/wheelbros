"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { heroHighlights, premiumSignals } from "@/lib/data";
import { MagneticLink } from "@/components/magnetic-link";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const subjectY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);

  return (
    <section
      ref={ref}
      className="grain relative min-h-[96vh] overflow-hidden bg-ink text-white"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110 opacity-60">
        <Image
          src="/images/fleet/cafe-editorial.jpg"
          alt="Stone wall environment behind a Royal Enfield Continental GT"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_38%] saturate-[0.82]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.74)_0%,rgba(17,17,17,0.36)_42%,rgba(17,17,17,0.9)_100%)]" />
      <div className="cinematic-vignette absolute inset-0" />

      <motion.div
        style={{ y: subjectY }}
        className="absolute bottom-[7vh] left-1/2 hidden aspect-[16/9] w-[82vw] max-w-[1180px] -translate-x-[41%] overflow-hidden rounded-[2.2rem] border border-white/10 shadow-[0_42px_120px_rgba(0,0,0,0.46)] md:block"
      >
        <Image
          src="/images/fleet/cafe-editorial.jpg"
          alt="Royal Enfield Continental GT as the hero motorcycle subject"
          fill
          priority
          sizes="82vw"
          className="scale-[1.08] object-cover object-[center_62%]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_52%,rgba(245,235,224,0.18),transparent_28%),linear-gradient(90deg,rgba(17,17,17,0.74),rgba(17,17,17,0.16)_46%,rgba(17,17,17,0.66))]" />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      <div className="absolute left-6 top-32 hidden h-56 w-px bg-gradient-to-b from-transparent via-white/26 to-transparent md:block" />
      <div className="absolute right-8 top-36 hidden max-w-[170px] text-right text-[10px] font-bold uppercase tracking-[0.24em] text-white/38 md:block">
        Studio frame 01 / Mumbai
      </div>

      <div className="relative z-10 mx-auto flex min-h-[96vh] max-w-7xl flex-col justify-end px-5 pb-7 pt-32 md:px-8 md:pb-9">
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <div className="mb-5 inline-flex items-center rounded-full border border-white/18 bg-black/28 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/72 backdrop-blur-sm">
            Premium mobility studio / Est. for city exits
          </div>
          <h1 className="max-w-4xl font-heading text-5xl font-bold leading-[0.93] tracking-normal text-white sm:text-6xl md:text-8xl">
            Machines For The Long Way Out
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 md:text-xl">
            A curated motorcycle and scooty fleet for riders who care about the
            handoff, the route, and the silence before the engine turns over.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticLink
              href="/explore/motorcycles"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold text-ink transition hover:bg-saddle"
            >
              Enter the fleet
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </MagneticLink>
            <MagneticLink
              href="/book"
              className="inline-flex items-center justify-center rounded-full border border-white/28 bg-black/24 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-ink"
            >
              Reserve a machine
            </MagneticLink>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div className="grid grid-cols-3 gap-2 rounded-[1.35rem] border border-white/12 bg-black/28 p-2 backdrop-blur-sm sm:max-w-xl">
            {heroHighlights.map((item) => (
              <div key={item.label} className="rounded-[1rem] bg-white/[0.07] px-3 py-4">
                <div className="font-heading text-2xl font-bold">{item.value}</div>
                <div className="mt-1 text-xs text-white/68">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/65 md:flex">
            <ChevronDown size={16} />
            Scroll
          </div>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {premiumSignals.map((signal) => (
            <span
              key={signal}
              className="shrink-0 rounded-full border border-white/12 bg-black/30 px-4 py-2 text-xs font-semibold text-white/68 backdrop-blur-sm"
            >
              {signal}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
