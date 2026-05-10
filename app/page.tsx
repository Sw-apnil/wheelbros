import { ArrowRight, Check, Star } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navigation } from "@/components/navigation";
import { SectionReveal } from "@/components/section-reveal";
import { VehicleCard } from "@/components/vehicle-card";
import {
  categories,
  faqs,
  fieldNotes,
  featuredVehicles,
  formatCurrency,
  photoMoods,
  processSteps,
  quickFilters,
  testimonials,
  trustFeatures
} from "@/lib/data";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <Hero />

      <section id="explore" className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionReveal className="grid gap-8 md:grid-cols-[0.78fr_1.22fr] md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-ember">
                Curated fleet
              </p>
              <h2 className="mt-4 font-heading text-4xl font-bold tracking-normal text-ink md:text-6xl">
                Not a catalogue. A small garage with a point of view.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-neutral-600 md:justify-self-end">
              Every machine is framed by where it wants to go: late city roads,
              warm cafe stops, fogged climbs, or quiet electric commutes. The
              fleet stays tight so the choice feels intentional.
            </p>
          </SectionReveal>

          <div className="mt-8 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {quickFilters.map((filter) => (
              <span
                key={filter}
                className="shrink-0 rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-bold text-ink shadow-soft"
              >
                {filter}
              </span>
            ))}
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-[1.05fr_0.95fr_1.12fr]">
            {categories.map((category, index) => (
              <SectionReveal key={category.slug} delay={index * 0.08}>
                <Link
                  href={`/explore/${category.slug}`}
                  className={`group block h-full rounded-[1.35rem] border border-ink/10 bg-ink p-6 text-white shadow-premium transition hover:-translate-y-1 hover:bg-carbon ${
                    index === 1 ? "md:mt-10" : index === 2 ? "md:-mt-5" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <ArrowRight className="transition group-hover:translate-x-1" size={20} />
                  </div>
                  <h3 className="mt-10 font-heading text-3xl font-bold tracking-normal">
                    {category.label}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/62">
                    {category.description}
                  </p>
                  <p className="mt-8 text-sm font-bold text-saddle">{category.cta}</p>
                </Link>
              </SectionReveal>
            ))}
          </div>

          <div className="mt-16 grid auto-rows-auto gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredVehicles.map((vehicle, index) => (
              <SectionReveal
                key={vehicle.id}
                delay={index * 0.04}
                className={index === 0 ? "lg:col-span-2" : index === 4 ? "lg:-mt-10" : ""}
              >
                <VehicleCard vehicle={vehicle} featured={index === 0} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <SectionReveal className="relative overflow-hidden rounded-[1.35rem] bg-ink p-6 text-white shadow-premium md:p-8">
            <div className="absolute inset-0 opacity-45">
              <div className="photo-cafe h-full w-full" />
            </div>
            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-saddle">
                Field notes
              </p>
              <h2 className="mt-5 max-w-xl font-heading text-4xl font-bold leading-tight tracking-normal md:text-6xl">
                The fleet should feel like it is already moving.
              </h2>
              <div className="mt-10 grid gap-3">
                {fieldNotes.map((note) => (
                  <div
                    key={note.title}
                    className="rounded-[1.1rem] border border-white/10 bg-black/24 p-4 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-heading text-xl font-bold">{note.title}</p>
                      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-saddle">
                        {note.meta}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/62">{note.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08} className="lg:pb-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {photoMoods.map((mood, index) => (
                <div
                  key={mood.label}
                  className={`rounded-[1.25rem] border border-ink/10 p-5 shadow-soft ${
                    index === 0
                      ? "photo-urban text-white"
                      : index === 1
                        ? "photo-cafe text-ink"
                        : index === 2
                          ? "photo-adventure text-white"
                          : "photo-studio text-ink"
                  } ${index === 1 ? "sm:mt-8" : index === 2 ? "sm:-mt-4" : ""}`}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] opacity-60">
                    Mood 0{index + 1}
                  </p>
                  <h3 className="mt-8 font-heading text-2xl font-bold">{mood.label}</h3>
                  <p className="mt-3 text-sm leading-6 opacity-70">{mood.description}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      <section id="pricing" className="relative overflow-hidden bg-ink px-5 py-24 text-white md:px-8 md:py-32">
        <div className="absolute inset-y-0 right-0 hidden w-[42vw] opacity-30 md:block">
          <div className="photo-urban h-full w-full" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <SectionReveal className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-saddle">
                Rate clarity
              </p>
              <h2 className="mt-4 font-heading text-4xl font-bold tracking-normal md:text-6xl">
                Clear numbers, no counter theatre.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-white/58">
                Day rates are honest, deposits are explained up front, and
                late-return windows are handled before they become awkward.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Scooty", 749, "City studio slots"],
                ["Motorcycles", 2199, "Evening road presence"],
                ["Adventure", 2799, "Fog and luggage ready"]
              ].map(([label, price, detail]) => (
                <div key={label} className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm">
                  <p className="text-sm font-bold text-white/56">{label}</p>
                  <p className="mt-4 font-heading text-3xl font-bold">
                    {formatCurrency(Number(price))}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-saddle">
                    from / day
                  </p>
                  <p className="mt-5 text-sm text-white/58">{detail}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionReveal className="ml-auto max-w-4xl text-right">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-ember">
              The handoff
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold tracking-normal text-ink md:text-6xl">
              Three quiet steps, then the city opens up.
            </h2>
          </SectionReveal>

          <div className="mt-16 grid gap-5 md:grid-cols-[1.08fr_0.92fr_1.04fr]">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <SectionReveal key={step.title} delay={index * 0.08}>
                  <div
                    className={`h-full rounded-[1.25rem] border border-ink/10 bg-white p-6 shadow-soft ${
                      index === 1 ? "md:mt-12" : index === 2 ? "md:-mt-4" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl bg-ink text-white">
                        <Icon size={22} />
                      </span>
                      <span className="font-heading text-4xl font-bold text-dune">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-8 font-heading text-2xl font-bold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-neutral-600">
                      {step.description}
                    </p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="bg-linen px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionReveal className="grid gap-12 md:grid-cols-[0.72fr_1.28fr] md:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-ember">
                Why it feels different
              </p>
              <h2 className="mt-4 font-heading text-4xl font-bold tracking-normal text-ink md:text-6xl">
                Trust is built in the small, visible details.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {trustFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group rounded-[1.15rem] border border-ink/10 bg-white p-5 shadow-soft transition hover:-translate-y-1"
                  >
                    <Icon size={24} className="text-ember" />
                    <h3 className="mt-5 font-heading text-xl font-bold text-ink">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionReveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-ember">
                Rider notes
              </p>
              <h2 className="mt-4 font-heading text-4xl font-bold tracking-normal text-ink md:text-6xl">
                Riders remember the handoff, not the form.
              </h2>
            </div>
            <Link
              href="/book"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-bold text-white transition hover:bg-ember"
            >
              Reserve quietly
              <ArrowRight size={18} />
            </Link>
          </SectionReveal>

          <div className="mt-16 grid gap-5 md:grid-cols-[1.1fr_0.9fr_1.05fr]">
            {testimonials.map((testimonial, index) => (
              <SectionReveal key={testimonial.name} delay={index * 0.08}>
                <article
                  className={`h-full rounded-[1.25rem] border border-ink/10 bg-white p-6 shadow-soft ${
                    index === 1 ? "md:mt-12" : index === 2 ? "md:-mt-6" : ""
                  }`}
                >
                  <div className="flex items-center gap-1 text-ember">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} size={16} className="fill-ember" />
                    ))}
                  </div>
                  <blockquote className="mt-7 font-heading text-2xl font-semibold leading-9 text-ink">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-5">
                    <div>
                      <p className="font-bold text-ink">{testimonial.name}</p>
                      <p className="text-sm text-neutral-500">{testimonial.route}</p>
                    </div>
                    <span className="rounded-full bg-linen px-3 py-2 text-sm font-bold text-ink">
                      {testimonial.rating}
                    </span>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[0.72fr_1.28fr]">
          <SectionReveal>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-ember">
              FAQ
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold tracking-normal text-ink md:text-6xl">
              The questions worth settling before ignition.
            </h2>
          </SectionReveal>

          <div className="grid gap-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-[1.15rem] border border-ink/10 bg-white p-6 shadow-soft"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-heading text-lg font-bold text-ink">
                  {faq.question}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-white transition group-open:rotate-45">
                    <Check size={16} />
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-neutral-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
