"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Fuel, Gauge, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  formatCurrency,
  vehicleStatusTone,
  type Vehicle
} from "@/lib/data";

const moodClass: Record<Vehicle["mood"], string> = {
  urban: "photo-urban",
  cafe: "photo-cafe",
  adventure: "photo-adventure",
  studio: "photo-studio"
};

const frameClass: Record<Vehicle["frame"], string> = {
  wide: "aspect-[1.35/1]",
  portrait: "aspect-[0.88/1]",
  low: "aspect-[1.65/1]",
  detail: "aspect-[1.05/1]"
};

const imageTreatment: Record<Vehicle["mood"], string> = {
  urban: "saturate-[0.78] contrast-[1.12]",
  cafe: "saturate-[1.06] contrast-[1.03]",
  adventure: "saturate-[0.72] contrast-[0.96]",
  studio: "saturate-[0.82] contrast-[0.98]"
};

export function VehicleCard({
  vehicle,
  compact = false,
  featured = false
}: {
  vehicle: Vehicle;
  compact?: boolean;
  featured?: boolean;
}) {
  return (
    <motion.article
      whileHover={{ y: -7, rotate: featured ? -0.35 : 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`group h-full overflow-hidden rounded-[1.35rem] border border-ink/10 bg-white shadow-soft ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <Link href={`/vehicles/${vehicle.slug}`} className="block h-full">
        <div
          className={`relative overflow-hidden ${moodClass[vehicle.mood]} ${
            featured ? "aspect-[1.68/1]" : frameClass[vehicle.frame]
          }`}
        >
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${vehicleStatusTone[vehicle.status]}`}
            >
              {vehicle.status}
            </span>
          </div>
          <div className="absolute right-4 top-4 z-10 rounded-full border border-white/18 bg-black/28 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white/78 backdrop-blur-sm">
            {vehicle.activity}
          </div>
          <Image
            src={vehicle.image}
            alt={vehicle.imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 88vw"
            className={`object-cover mix-blend-multiply transition duration-700 group-hover:scale-[1.07] ${imageTreatment[vehicle.mood]}`}
            style={{ objectPosition: vehicle.objectPosition }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,rgba(255,255,255,0.13),transparent_25%),linear-gradient(180deg,transparent_35%,rgba(17,17,17,0.66))]" />
          <div className="absolute bottom-4 left-4 z-10 max-w-[72%] translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex flex-wrap gap-2">
              {vehicle.routeTags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/18 bg-black/28 px-3 py-1 text-[11px] font-bold text-white/78 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute bottom-4 right-4 z-10 rounded-full bg-white/92 p-3 text-ink shadow-soft backdrop-blur-sm transition group-hover:bg-ink group-hover:text-white">
            <ArrowUpRight size={18} />
          </div>
        </div>

        <div className={`${featured ? "p-6 md:p-7" : "p-5"}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                {vehicle.brand}
              </p>
              <h3 className={`mt-2 font-heading font-bold tracking-normal text-ink ${
                featured ? "text-3xl md:text-4xl" : "text-2xl"
              }`}>
                {vehicle.name}
              </h3>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-linen px-3 py-2 text-sm font-bold text-ink">
              <Star size={15} className="fill-ember text-ember" />
              {vehicle.rating}
            </div>
          </div>

          {!compact ? (
            <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-neutral-600">
              {vehicle.shortDescription}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-neutral-600">
            <span className="inline-flex items-center gap-1 rounded-full bg-bone px-3 py-2">
              <Fuel size={14} />
              {vehicle.fuel}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-bone px-3 py-2">
              <Gauge size={14} />
              {vehicle.transmission}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-bone px-3 py-2">
              {vehicle.location}
            </span>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                From
              </p>
              <p className="font-heading text-2xl font-bold text-ember">
                {formatCurrency(vehicle.pricePerDay)}
                <span className="text-sm font-semibold text-neutral-500"> / day</span>
              </p>
            </div>
            <span className="text-sm font-bold text-ink">View details</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
