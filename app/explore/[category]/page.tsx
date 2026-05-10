import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { SectionReveal } from "@/components/section-reveal";
import { VehicleCard } from "@/components/vehicle-card";
import {
  categories,
  categoryDescriptions,
  categoryLabels,
  getCategory,
  getVehiclesByCategory,
  type CategorySlug
} from "@/lib/data";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export default async function ExploreCategoryPage({
  params
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryRecord = getCategory(category);

  if (!categoryRecord) {
    notFound();
  }

  const slug = categoryRecord.slug as CategorySlug;
  const inventory = getVehiclesByCategory(slug);

  return (
    <main className="min-h-screen overflow-hidden bg-bone">
      <Navigation />
      <section className="relative overflow-hidden bg-ink px-5 pb-16 pt-32 text-white md:px-8 md:pb-24 md:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(213,189,175,0.18),transparent_32rem),radial-gradient(circle_at_24%_78%,rgba(159,52,40,0.16),transparent_24rem)]" />
        <div className="absolute right-0 top-0 hidden h-full w-[38vw] opacity-35 md:block">
          <div className={slug === "adventure-bikes" ? "photo-adventure h-full" : slug === "scooty" ? "photo-studio h-full" : "photo-cafe h-full"} />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white/78 transition hover:border-white hover:text-white"
          >
            <ArrowLeft size={16} />
            Back home
          </Link>
          <div className="mt-12 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-saddle">
                Curated category
              </p>
              <h1 className="mt-4 font-heading text-5xl font-bold tracking-normal md:text-7xl">
                {categoryLabels[slug]}
              </h1>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/68 md:justify-self-end">
              {categoryDescriptions[slug]} Each machine includes its pickup
              context, route mood, included gear, and current availability.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-ember">
                Curated fleet
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-ink">
                {inventory.length} machines in rotation
              </h2>
            </div>
            <Link
              href="/book"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-ember"
            >
              Reserve from this category
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {inventory.map((vehicle, index) => (
              <SectionReveal
                key={vehicle.id}
                delay={index * 0.05}
                className={index === 0 ? "lg:col-span-2" : index === 2 ? "lg:-mt-12" : ""}
              >
                <VehicleCard vehicle={vehicle} featured={index === 0} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
