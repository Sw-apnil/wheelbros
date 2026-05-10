"use client";

import {
  Bell,
  Bike,
  Check,
  CircleDollarSign,
  LayoutDashboard,
  ListFilter,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  X
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import {
  adminStats,
  bookings as seedBookings,
  categories,
  emptyVehicle,
  formatCurrency,
  notificationFeed,
  vehicleStatusTone,
  vehicles as seedVehicles,
  type Booking,
  type CategorySlug,
  type Vehicle
} from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase";

type VehicleDraft = typeof emptyVehicle;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function AdminPage() {
  const [vehicles, setVehicles] = useState(seedVehicles);
  const [bookings, setBookings] = useState(seedBookings);
  const [draft, setDraft] = useState<VehicleDraft>(emptyVehicle);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const haystack = `${vehicle.brand} ${vehicle.name} ${vehicle.category}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
  }, [query, vehicles]);

  const categoryHealth = useMemo(() => {
    return categories.map((category) => {
      const categoryVehicles = vehicles.filter((vehicle) => vehicle.category === category.slug);
      return {
        ...category,
        count: categoryVehicles.length,
        available: categoryVehicles.filter((vehicle) => vehicle.status === "Available").length
      };
    });
  }, [vehicles]);

  function resetDraft() {
    setDraft(emptyVehicle);
    setEditingId(null);
  }

  function saveVehicle() {
    if (!draft.name.trim() || !draft.brand.trim()) {
      return;
    }

    if (editingId) {
      setVehicles((current) =>
        current.map((vehicle) =>
          vehicle.id === editingId
            ? {
                ...vehicle,
                ...draft,
                slug: slugify(`${draft.brand}-${draft.name}`)
              }
            : vehicle
        )
      );
    } else {
      const newVehicle: Vehicle = {
        ...draft,
        id: `wb-${Date.now()}`,
        slug: slugify(`${draft.brand}-${draft.name}`),
        image: "/images/fleet/studio-neutral.jpg",
        imageAlt: `${draft.brand} ${draft.name} rental vehicle`,
        objectPosition: "50% 60%",
        shortDescription:
          "A newly added premium fleet vehicle prepared for curated Wheelbros bookings.",
        rating: 4.7,
        reviews: 0,
        specs: {
          engine: draft.fuel === "Electric" ? "EV" : "350 cc",
          weight: "180 kg",
          range: "260 km",
          seats: "2"
        },
        accessories: ["Sanitized helmet", "Phone mount", "Support card", "Vehicle papers"],
        mood: "studio",
        frame: "wide",
        activity: "Newly staged",
        location: "Admin bay",
        routeTags: ["New fleet", "Studio prep", "Manual check"]
      };
      setVehicles((current) => [newVehicle, ...current]);
    }

    resetDraft();
  }

  function editVehicle(vehicle: Vehicle) {
    setEditingId(vehicle.id);
    setDraft({
      name: vehicle.name,
      brand: vehicle.brand,
      category: vehicle.category,
      pricePerDay: vehicle.pricePerDay,
      fuel: vehicle.fuel,
      transmission: vehicle.transmission,
      status: vehicle.status
    });
  }

  function updateBooking(id: string, status: Booking["status"]) {
    setBookings((current) =>
      current.map((booking) => (booking.id === id ? { ...booking, status } : booking))
    );
  }

  function removeVehicle(id: string) {
    setVehicles((current) => current.filter((vehicle) => vehicle.id !== id));
  }

  return (
    <main className="min-h-screen bg-[#f4efe8] text-ink">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="bg-ink px-5 py-6 text-white lg:sticky lg:top-0 lg:h-screen">
          <div className="flex items-center justify-between">
            <BrandMark inverse />
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-saddle">
              Admin
            </span>
          </div>

          <nav className="mt-10 grid gap-2">
            {[
              [LayoutDashboard, "Overview"],
              [Bike, "Vehicles"],
              [ShieldCheck, "Bookings"],
              [Bell, "Alerts"]
            ].map(([Icon, label]) => {
              const NavIcon = Icon as typeof LayoutDashboard;
              return (
                <a
                  href={`#${String(label).toLowerCase()}`}
                  key={String(label)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-white/68 transition hover:bg-white/10 hover:text-white"
                >
                  <NavIcon size={18} />
                  {String(label)}
                </a>
              );
            })}
          </nav>

          <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/10 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">
              Backend status
            </p>
            <p className="mt-3 font-heading text-xl font-bold">
              {isSupabaseConfigured ? "Supabase connected" : "Demo mode"}
            </p>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Vehicle and booking controls are wired as dashboard state with a
              Supabase schema included for persistence.
            </p>
          </div>
        </aside>

        <section className="px-4 py-5 md:px-8 md:py-8">
          <div className="mx-auto max-w-7xl">
            <header className="flex flex-col gap-5 rounded-[2rem] bg-ink p-5 text-white shadow-premium md:flex-row md:items-center md:justify-between md:p-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-saddle">
                  Operations command
                </p>
                <h1 className="mt-2 font-heading text-3xl font-bold tracking-normal md:text-5xl">
                  Fleet, bookings, and alerts.
                </h1>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white/75 transition hover:border-white hover:text-white"
                >
                  View website
                </Link>
                <a
                  href="#vehicles"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink transition hover:bg-saddle"
                >
                  <Plus size={17} />
                  Add vehicle
                </a>
              </div>
            </header>

            <section id="overview" className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {adminStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-soft"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-2xl bg-bone text-ember">
                      {index === 0 ? <Bike size={19} /> : index === 1 ? <ShieldCheck size={19} /> : index === 2 ? <CircleDollarSign size={19} /> : <Bell size={19} />}
                    </span>
                    <span className="rounded-full bg-olive/10 px-3 py-1 text-xs font-bold text-olive">
                      {stat.delta}
                    </span>
                  </div>
                  <p className="mt-6 text-sm font-semibold text-neutral-500">{stat.label}</p>
                  <p className="mt-1 font-heading text-4xl font-bold text-ink">
                    {stat.value}
                  </p>
                </div>
              ))}
            </section>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
              <section id="vehicles" className="rounded-[2rem] border border-ink/10 bg-white p-5 shadow-soft md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-ember">
                      Vehicle management
                    </p>
                    <h2 className="mt-2 font-heading text-3xl font-bold text-ink">
                      Inventory controls
                    </h2>
                  </div>
                  <label className="flex items-center gap-3 rounded-full border border-ink/10 bg-bone px-4 py-3">
                    <Search size={17} className="text-neutral-500" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search fleet"
                      className="w-40 bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-neutral-500"
                    />
                  </label>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="rounded-[1.5rem] bg-bone p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-xl font-bold">
                        {editingId ? "Edit vehicle" : "Add vehicle"}
                      </h3>
                      {editingId ? (
                        <button
                          type="button"
                          onClick={resetDraft}
                          className="rounded-full bg-white p-2 text-ink"
                          aria-label="Cancel edit"
                        >
                          <X size={16} />
                        </button>
                      ) : null}
                    </div>
                    <div className="mt-5 grid gap-3">
                      <label>
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                          Brand
                        </span>
                        <input
                          value={draft.brand}
                          onChange={(event) =>
                            setDraft((current) => ({ ...current, brand: event.target.value }))
                          }
                          className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-ember"
                          placeholder="Royal Enfield"
                        />
                      </label>
                      <label>
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                          Vehicle name
                        </span>
                        <input
                          value={draft.name}
                          onChange={(event) =>
                            setDraft((current) => ({ ...current, name: event.target.value }))
                          }
                          className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-ember"
                          placeholder="Continental GT 650"
                        />
                      </label>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label>
                          <span className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                            Category
                          </span>
                          <select
                            value={draft.category}
                            onChange={(event) =>
                              setDraft((current) => ({
                                ...current,
                                category: event.target.value as CategorySlug
                              }))
                            }
                            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-ember"
                          >
                            {categories.map((category) => (
                              <option key={category.slug} value={category.slug}>
                                {category.label}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label>
                          <span className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                            Price / day
                          </span>
                          <input
                            type="number"
                            value={draft.pricePerDay}
                            onChange={(event) =>
                              setDraft((current) => ({
                                ...current,
                                pricePerDay: Number(event.target.value)
                              }))
                            }
                            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-ember"
                          />
                        </label>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <label>
                          <span className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                            Fuel
                          </span>
                          <select
                            value={draft.fuel}
                            onChange={(event) =>
                              setDraft((current) => ({
                                ...current,
                                fuel: event.target.value as Vehicle["fuel"]
                              }))
                            }
                            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-ember"
                          >
                            <option>Petrol</option>
                            <option>Electric</option>
                          </select>
                        </label>
                        <label>
                          <span className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                            Gear
                          </span>
                          <select
                            value={draft.transmission}
                            onChange={(event) =>
                              setDraft((current) => ({
                                ...current,
                                transmission: event.target.value as Vehicle["transmission"]
                              }))
                            }
                            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-ember"
                          >
                            <option>Manual</option>
                            <option>Automatic</option>
                          </select>
                        </label>
                        <label>
                          <span className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                            Status
                          </span>
                          <select
                            value={draft.status}
                            onChange={(event) =>
                              setDraft((current) => ({
                                ...current,
                                status: event.target.value as Vehicle["status"]
                              }))
                            }
                            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-ember"
                          >
                            <option>Available</option>
                            <option>Limited</option>
                            <option>Booked</option>
                          </select>
                        </label>
                      </div>
                      <label className="rounded-2xl border border-dashed border-ink/20 bg-white px-4 py-4 text-sm font-semibold text-neutral-500">
                        Upload vehicle image
                        <input type="file" className="mt-3 block w-full text-xs" />
                      </label>
                      <button
                        type="button"
                        onClick={saveVehicle}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-ember"
                      >
                        <Plus size={17} />
                        {editingId ? "Save changes" : "Add vehicle"}
                      </button>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[1.5rem] border border-ink/10">
                    <div className="flex items-center justify-between bg-bone px-4 py-3">
                      <div className="flex items-center gap-2 text-sm font-bold text-ink">
                        <ListFilter size={17} />
                        Fleet list
                      </div>
                      <span className="text-xs font-bold text-neutral-500">
                        {filteredVehicles.length} vehicles
                      </span>
                    </div>
                    <div className="max-h-[620px] overflow-y-auto">
                      {filteredVehicles.map((vehicle) => (
                        <div
                          key={vehicle.id}
                          className="grid gap-3 border-t border-ink/10 px-4 py-4 md:grid-cols-[1fr_auto] md:items-center"
                        >
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-heading text-lg font-bold text-ink">
                                {vehicle.brand} {vehicle.name}
                              </p>
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${vehicleStatusTone[vehicle.status]}`}
                              >
                                {vehicle.status}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-neutral-500">
                              {vehicle.category.replace("-", " ")} / {vehicle.fuel} /{" "}
                              {vehicle.transmission} / {formatCurrency(vehicle.pricePerDay)} / day
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setVehicles((current) =>
                                  current.map((item) =>
                                    item.id === vehicle.id
                                      ? {
                                          ...item,
                                          status:
                                            item.status === "Available" ? "Booked" : "Available"
                                        }
                                      : item
                                  )
                                )
                              }
                              className="rounded-full border border-ink/10 px-3 py-2 text-xs font-bold text-ink transition hover:bg-ink hover:text-white"
                            >
                              Toggle
                            </button>
                            <button
                              type="button"
                              onClick={() => editVehicle(vehicle)}
                              className="rounded-full bg-bone p-2 text-ink transition hover:bg-ink hover:text-white"
                              aria-label={`Edit ${vehicle.name}`}
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeVehicle(vehicle.id)}
                              className="rounded-full bg-ember/10 p-2 text-ember transition hover:bg-ember hover:text-white"
                              aria-label={`Remove ${vehicle.name}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <aside id="alerts" className="grid gap-6">
                <section className="rounded-[2rem] border border-ink/10 bg-white p-5 shadow-soft">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.2em] text-ember">
                        Alerts
                      </p>
                      <h2 className="mt-2 font-heading text-2xl font-bold">Notifications</h2>
                    </div>
                    <Bell size={22} className="text-ember" />
                  </div>
                  <div className="mt-5 grid gap-3">
                    {notificationFeed.map((item) => (
                      <div key={item.title} className="rounded-[1.2rem] bg-bone p-4">
                        <p className="font-bold text-ink">{item.title}</p>
                        <p className="mt-1 text-sm text-neutral-500">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[2rem] border border-ink/10 bg-white p-5 shadow-soft">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-ember">
                    Categories
                  </p>
                  <div className="mt-5 grid gap-3">
                    {categoryHealth.map((category) => (
                      <div key={category.slug} className="rounded-[1.2rem] bg-bone p-4">
                        <div className="flex items-center justify-between">
                          <p className="font-heading text-lg font-bold">{category.label}</p>
                          <span className="text-sm font-bold text-olive">
                            {category.available}/{category.count}
                          </span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                          <div
                            className="h-full rounded-full bg-olive"
                            style={{
                              width: `${category.count ? (category.available / category.count) * 100 : 0}%`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </aside>
            </div>

            <section id="bookings" className="mt-6 rounded-[2rem] border border-ink/10 bg-white p-5 shadow-soft md:p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-ember">
                    Booking management
                  </p>
                  <h2 className="mt-2 font-heading text-3xl font-bold text-ink">
                    Requests and status
                  </h2>
                </div>
                <span className="rounded-full bg-bone px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                  Live queue
                </span>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[760px] border-separate border-spacing-y-3 text-left">
                  <thead>
                    <tr className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                      <th className="px-4">Booking</th>
                      <th className="px-4">Customer</th>
                      <th className="px-4">Vehicle</th>
                      <th className="px-4">Dates</th>
                      <th className="px-4">Docs</th>
                      <th className="px-4">Status</th>
                      <th className="px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="bg-bone">
                        <td className="rounded-l-2xl px-4 py-4 font-bold text-ink">
                          {booking.id}
                        </td>
                        <td className="px-4 py-4 text-sm font-semibold">{booking.customer}</td>
                        <td className="px-4 py-4 text-sm text-neutral-600">{booking.vehicle}</td>
                        <td className="px-4 py-4 text-sm text-neutral-600">{booking.dates}</td>
                        <td className="px-4 py-4">
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ink">
                            {booking.documents}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              booking.status === "Accepted"
                                ? "bg-olive/15 text-olive"
                                : booking.status === "Rejected"
                                  ? "bg-ember/10 text-ember"
                                  : "bg-saddle/40 text-ink"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="rounded-r-2xl px-4 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => updateBooking(booking.id, "Accepted")}
                              className="rounded-full bg-olive/15 p-2 text-olive transition hover:bg-olive hover:text-white"
                              aria-label={`Accept ${booking.id}`}
                            >
                              <Check size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => updateBooking(booking.id, "Rejected")}
                              className="rounded-full bg-ember/10 p-2 text-ember transition hover:bg-ember hover:text-white"
                              aria-label={`Reject ${booking.id}`}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
