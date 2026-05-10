"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  FileUp,
  MessageCircle,
  ShieldCheck,
  UserRound
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  bookingIncludes,
  bookingSteps,
  formatCurrency,
  getVehicleBySlug,
  vehicles
} from "@/lib/data";

export function BookingFlow() {
  const searchParams = useSearchParams();
  const requestedVehicle = searchParams.get("vehicle");
  const initialVehicle = requestedVehicle
    ? getVehicleBySlug(requestedVehicle)?.slug ?? vehicles[0].slug
    : vehicles[0].slug;

  const [step, setStep] = useState(0);
  const [vehicleSlug, setVehicleSlug] = useState(initialVehicle);
  const [dates, setDates] = useState({ start: "", end: "" });
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    pickup: "Wheelbros Lower Parel Studio"
  });

  const selectedVehicle = useMemo(
    () => getVehicleBySlug(vehicleSlug) ?? vehicles[0],
    [vehicleSlug]
  );

  const totalDays = dates.start && dates.end ? 2 : 1;
  const estimate = selectedVehicle.pricePerDay * totalDays;

  const nextStep = () => setStep((current) => Math.min(current + 1, bookingSteps.length - 1));
  const prevStep = () => setStep((current) => Math.max(current - 1, 0));

  return (
    <section className="px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-bold text-ink shadow-soft transition hover:bg-ink hover:text-white"
        >
          <ArrowLeft size={16} />
          Back home
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.72fr_0.28fr]">
          <div className="rounded-[2rem] border border-ink/10 bg-white p-5 shadow-premium md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-ember">
                  Reservation flow
                </p>
                <h1 className="mt-4 font-heading text-4xl font-bold tracking-normal text-ink md:text-6xl">
                  Reserve without the counter noise.
                </h1>
              </div>
              <div className="rounded-[1.5rem] bg-ink px-5 py-4 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                  Estimate
                </p>
                <p className="mt-2 font-heading text-3xl font-bold">
                  {formatCurrency(estimate)}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {bookingSteps.map((label, index) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => setStep(index)}
                  className={`rounded-2xl px-3 py-3 text-left text-xs font-bold transition ${
                    step === index
                      ? "bg-ink text-white"
                      : index < step
                        ? "bg-olive/15 text-olive"
                        : "bg-bone text-neutral-500"
                  }`}
                >
                  <span className="block text-[10px] uppercase tracking-[0.16em] opacity-70">
                    Step {index + 1}
                  </span>
                  <span className="mt-1 block">{label}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 min-h-[390px] overflow-hidden rounded-[1.7rem] bg-bone p-5 md:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.28 }}
                >
                  {step === 0 ? (
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="grid size-11 place-items-center rounded-2xl bg-ink text-white">
                          <ShieldCheck size={20} />
                        </span>
                        <div>
                          <h2 className="font-heading text-2xl font-bold text-ink">
                            Select Your Machine
                          </h2>
                          <p className="text-sm text-neutral-600">
                            Choose by route mood, pickup point, and current availability.
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 grid gap-3 md:grid-cols-2">
                        {vehicles.map((vehicle) => (
                          <button
                            type="button"
                            key={vehicle.id}
                            onClick={() => setVehicleSlug(vehicle.slug)}
                            className={`rounded-[1.4rem] border p-4 text-left transition ${
                              vehicleSlug === vehicle.slug
                                ? "border-ink bg-white shadow-soft"
                                : "border-ink/10 bg-white/60 hover:bg-white"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                                  {vehicle.brand}
                                </p>
                                <p className="mt-1 font-heading text-xl font-bold text-ink">
                                  {vehicle.name}
                                </p>
                              </div>
                              <p className="text-sm font-bold text-ember">
                                {formatCurrency(vehicle.pricePerDay)}
                              </p>
                            </div>
                            <p className="mt-3 text-xs font-semibold text-neutral-500">
                              {vehicle.location} / {vehicle.fuel} / {vehicle.status}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {step === 1 ? (
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="grid size-11 place-items-center rounded-2xl bg-ink text-white">
                          <CalendarDays size={20} />
                        </span>
                        <div>
                          <h2 className="font-heading text-2xl font-bold text-ink">
                            Set The Window
                          </h2>
                          <p className="text-sm text-neutral-600">
                            Pick a simple pickup and return window.
                          </p>
                        </div>
                      </div>
                      <div className="mt-8 grid gap-4 md:grid-cols-2">
                        <label className="block">
                          <span className="text-sm font-bold text-ink">Pickup date</span>
                          <input
                            type="date"
                            value={dates.start}
                            onChange={(event) =>
                              setDates((current) => ({ ...current, start: event.target.value }))
                            }
                            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-4 text-sm font-semibold text-ink outline-none transition focus:border-ember"
                          />
                        </label>
                        <label className="block">
                          <span className="text-sm font-bold text-ink">Return date</span>
                          <input
                            type="date"
                            value={dates.end}
                            onChange={(event) =>
                              setDates((current) => ({ ...current, end: event.target.value }))
                            }
                            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-4 text-sm font-semibold text-ink outline-none transition focus:border-ember"
                          />
                        </label>
                      </div>
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="grid size-11 place-items-center rounded-2xl bg-ink text-white">
                          <FileUp size={20} />
                        </span>
                        <div>
                          <h2 className="font-heading text-2xl font-bold text-ink">
                            Verify Your ID
                          </h2>
                          <p className="text-sm text-neutral-600">
                            License and ID proof are checked before the handoff is confirmed.
                          </p>
                        </div>
                      </div>
                      <label className="mt-8 flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-[1.7rem] border border-dashed border-ink/25 bg-white px-5 text-center transition hover:border-ember">
                        <FileUp size={34} className="text-ember" />
                        <span className="mt-4 font-heading text-2xl font-bold text-ink">
                          Drop license or ID proof
                        </span>
                        <span className="mt-2 text-sm text-neutral-500">
                          PDF, JPG, or PNG supported
                        </span>
                        <input type="file" className="sr-only" />
                      </label>
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="grid size-11 place-items-center rounded-2xl bg-ink text-white">
                          <UserRound size={20} />
                        </span>
                        <div>
                          <h2 className="font-heading text-2xl font-bold text-ink">
                            Add Rider Details
                          </h2>
                          <p className="text-sm text-neutral-600">
                            Add contact details and pickup preferences.
                          </p>
                        </div>
                      </div>
                      <div className="mt-8 grid gap-4">
                        {[
                          ["Full name", "name", "text"],
                          ["WhatsApp number", "phone", "tel"],
                          ["Pickup preference", "pickup", "text"]
                        ].map(([label, key, type]) => (
                          <label key={key} className="block">
                            <span className="text-sm font-bold text-ink">{label}</span>
                            <input
                              type={type}
                              value={details[key as keyof typeof details]}
                              onChange={(event) =>
                                setDetails((current) => ({
                                  ...current,
                                  [key]: event.target.value
                                }))
                              }
                              className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-4 text-sm font-semibold text-ink outline-none transition focus:border-ember"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {step === 4 ? (
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="grid size-11 place-items-center rounded-2xl bg-ink text-white">
                          <Check size={20} />
                        </span>
                        <div>
                          <h2 className="font-heading text-2xl font-bold text-ink">
                            Review The Handoff
                          </h2>
                          <p className="text-sm text-neutral-600">
                            Review the machine, pickup point, and estimated total.
                          </p>
                        </div>
                      </div>
                      <div className="mt-8 grid gap-3">
                        {[
                          ["Vehicle", `${selectedVehicle.brand} ${selectedVehicle.name}`],
                          ["Dates", dates.start && dates.end ? `${dates.start} to ${dates.end}` : "Date pending"],
                          ["Pickup", details.pickup || selectedVehicle.location],
                          ["Estimated total", formatCurrency(estimate)]
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-4"
                          >
                            <span className="text-sm font-semibold text-neutral-500">
                              {label}
                            </span>
                            <span className="text-right text-sm font-bold text-ink">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {step === 5 ? (
                    <div className="flex min-h-[330px] flex-col items-center justify-center text-center">
                      <span className="grid size-16 place-items-center rounded-full bg-olive text-white">
                        <MessageCircle size={30} />
                      </span>
                      <h2 className="mt-6 font-heading text-4xl font-bold text-ink">
                        Ready for the WhatsApp handoff.
                      </h2>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-600">
                        Send the summary to the Wheelbros concierge for document
                        verification, deposit details, and pickup slot confirmation.
                      </p>
                      <Link
                        href={`https://wa.me/919999999999?text=Hi%20Wheelbros%2C%20I%20want%20to%20book%20${encodeURIComponent(
                          `${selectedVehicle.brand} ${selectedVehicle.name}`
                        )}.`}
                        className="mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-4 text-sm font-bold text-white transition hover:bg-ember"
                      >
                        <MessageCircle size={18} />
                        Confirm on WhatsApp
                      </Link>
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-bold text-ink transition hover:bg-ink hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={step === bookingSteps.length - 1}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-ember disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <aside className="h-fit rounded-[2rem] border border-ink/10 bg-ink p-6 text-white shadow-premium">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-saddle">
              Selected machine
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold">
              {selectedVehicle.name}
            </h2>
            <p className="mt-2 text-sm text-white/55">{selectedVehicle.brand}</p>
            <div className="mt-6 rounded-[1.4rem] bg-white/10 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">
                Daily rate
              </p>
              <p className="mt-2 font-heading text-3xl font-bold">
                {formatCurrency(selectedVehicle.pricePerDay)}
              </p>
            </div>
            <div className="mt-6 grid gap-3">
              {bookingIncludes.map((item) => (
                <span key={item} className="inline-flex items-center gap-3 text-sm text-white/72">
                  <Check size={16} className="text-saddle" />
                  {item}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
