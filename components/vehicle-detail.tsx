"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Fuel,
  Gauge,
  ShieldCheck,
  Star,
  Users
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  formatCurrency,
  luxuryBadges,
  vehicleStatusTone,
  type Vehicle
} from "@/lib/data";

const moodClass: Record<Vehicle["mood"], string> = {
  urban: "photo-urban",
  cafe: "photo-cafe",
  adventure: "photo-adventure",
  studio: "photo-studio"
};

const imageTreatment: Record<Vehicle["mood"], string> = {
  urban: "saturate-[0.78] contrast-[1.12]",
  cafe: "saturate-[1.06] contrast-[1.03]",
  adventure: "saturate-[0.72] contrast-[0.96]",
  studio: "saturate-[0.82] contrast-[0.98]"
};

export function VehicleDetail({ vehicle }: { vehicle: Vehicle }) {
  const [activeImage, setActiveImage] = useState(0);
  const gallery = [
    vehicle.objectPosition,
    "38% 58%",
    "62% 60%"
  ];

  return (
    <section className="px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <Link
          href={`/explore/${vehicle.category}`}
          className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-bold text-ink shadow-soft transition hover:bg-ink hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to inventory
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className={`relative aspect-[5/4] overflow-hidden rounded-[1.55rem] shadow-premium ${moodClass[vehicle.mood]}`}
            >
              <Image
                src={vehicle.image}
                alt={vehicle.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className={`object-cover mix-blend-multiply ${imageTreatment[vehicle.mood]}`}
                style={{ objectPosition: gallery[activeImage] }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,rgba(255,255,255,0.14),transparent_24%),linear-gradient(180deg,transparent_38%,rgba(17,17,17,0.68))]" />
              <span
                className={`absolute left-5 top-5 rounded-full px-4 py-2 text-xs font-bold ${vehicleStatusTone[vehicle.status]}`}
              >
                {vehicle.status}
              </span>
              <div className="absolute bottom-5 left-5 max-w-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/56">
                  {vehicle.location}
                </p>
                <p className="mt-2 font-heading text-3xl font-bold text-white">
                  {vehicle.activity}
                </p>
              </div>
            </motion.div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {gallery.map((position, index) => (
                <button
                  type="button"
                  key={position}
                  aria-label={`View ${vehicle.name} angle ${index + 1}`}
                  className={`relative aspect-[4/3] overflow-hidden rounded-[1rem] border transition ${
                    activeImage === index ? "border-ink" : "border-ink/10"
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={vehicle.image}
                    alt=""
                    fill
                    sizes="28vw"
                    className={`object-cover mix-blend-multiply ${imageTreatment[vehicle.mood]}`}
                    style={{ objectPosition: position }}
                  />
                  <div className={`absolute inset-0 ${moodClass[vehicle.mood]} opacity-35`} />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[1.55rem] border border-ink/10 bg-white p-6 shadow-soft md:p-8 lg:mt-10">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-ember">
              {vehicle.brand}
            </p>
            <h1 className="mt-4 font-heading text-5xl font-bold tracking-normal text-ink md:text-6xl">
              {vehicle.name}
            </h1>
            <p className="mt-5 text-base leading-8 text-neutral-600">
              {vehicle.shortDescription}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {vehicle.routeTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink/10 bg-bone px-4 py-2 text-xs font-bold text-neutral-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {luxuryBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-2 rounded-full bg-linen px-4 py-2 text-xs font-bold text-ink"
                  >
                    <Icon size={15} />
                    {badge.label}
                  </span>
                );
              })}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Engine", vehicle.specs.engine, Gauge],
                ["Weight", vehicle.specs.weight, ShieldCheck],
                ["Range", vehicle.specs.range, Fuel],
                ["Seats", vehicle.specs.seats, Users]
              ].map(([label, value, Icon]) => {
                const SpecIcon = Icon as typeof Gauge;
                return (
                  <div key={String(label)} className="rounded-[1.2rem] bg-bone p-4">
                    <SpecIcon size={20} className="text-ember" />
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                      {String(label)}
                    </p>
                    <p className="mt-1 font-heading text-xl font-bold text-ink">
                      {String(value)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] bg-ink p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
                  Price
                </p>
                <p className="mt-3 font-heading text-4xl font-bold">
                  {formatCurrency(vehicle.pricePerDay)}
                  <span className="text-sm font-semibold text-white/60"> / day</span>
                </p>
              </div>
              <div className="rounded-[1.4rem] bg-linen p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                  Rider score
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Star size={20} className="fill-ember text-ember" />
                  <p className="font-heading text-3xl font-bold text-ink">
                    {vehicle.rating}
                  </p>
                  <p className="text-sm text-neutral-500">({vehicle.reviews} reviews)</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="font-heading text-xl font-bold text-ink">Included accessories</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {vehicle.accessories.map((accessory) => (
                  <span
                    key={accessory}
                    className="inline-flex items-center gap-2 rounded-full bg-bone px-4 py-3 text-sm font-semibold text-neutral-700"
                  >
                    <Check size={16} className="text-olive" />
                    {accessory}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`/book?vehicle=${vehicle.slug}`}
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink px-6 py-4 text-sm font-bold text-white transition hover:bg-ember"
            >
              <CalendarDays size={18} />
              Book this ride
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
