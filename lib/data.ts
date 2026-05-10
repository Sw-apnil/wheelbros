import {
  Bike,
  CalendarCheck,
  Headphones,
  HardHat,
  IndianRupee,
  LifeBuoy,
  ShieldCheck,
  Sparkles,
  Upload,
  WalletCards
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CategorySlug = "scooty" | "motorcycles" | "adventure-bikes";

export type Vehicle = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  pricePerDay: number;
  rating: number;
  reviews: number;
  fuel: "Petrol" | "Electric";
  transmission: "Manual" | "Automatic";
  status: "Available" | "Limited" | "Booked";
  image: string;
  imageAlt: string;
  objectPosition: string;
  mood: "urban" | "cafe" | "adventure" | "studio";
  frame: "wide" | "portrait" | "low" | "detail";
  activity: string;
  location: string;
  routeTags: string[];
  shortDescription: string;
  specs: {
    engine: string;
    weight: string;
    range: string;
    seats: string;
  };
  accessories: string[];
};

export type Booking = {
  id: string;
  customer: string;
  vehicle: string;
  dates: string;
  amount: string;
  status: "Pending" | "Accepted" | "Rejected";
  documents: "Verified" | "Review";
};

export type Category = {
  slug: CategorySlug;
  label: string;
  description: string;
  cta: string;
};

export const categories: Category[] = [
  {
    slug: "scooty",
    label: "Scooty",
    description:
      "Compact machines for quiet city exits, coastal errands, and late cafe returns.",
    cta: "View Scooty"
  },
  {
    slug: "motorcycles",
    label: "Motorcycles",
    description:
      "Road-led machines with posture, texture, and enough theatre for a weekend detour.",
    cta: "View Motorcycles"
  },
  {
    slug: "adventure-bikes",
    label: "Adventure Bikes",
    description:
      "Tall, travel-ready machines for fog, broken roads, and longer plans with luggage.",
    cta: "View Adventure"
  }
];

export const vehicles: Vehicle[] = [
  {
    id: "wb-01",
    slug: "royal-enfield-continental-gt-650",
    name: "Continental GT 650",
    brand: "Royal Enfield",
    category: "motorcycles",
    pricePerDay: 2499,
    rating: 4.9,
    reviews: 214,
    fuel: "Petrol",
    transmission: "Manual",
    status: "Available",
    image: "/images/fleet/cafe-editorial.jpg",
    imageAlt: "Royal Enfield Continental GT 650 parked against a stone wall",
    objectPosition: "center 62%",
    mood: "cafe",
    frame: "wide",
    activity: "Booked 2 hours ago",
    location: "Bandra studio",
    routeTags: ["Cafe racer", "Evening loop", "Weekend favorite"],
    shortDescription:
      "A cafe-racer silhouette with twin-cylinder charm, built for low evening light and statement arrivals.",
    specs: {
      engine: "648 cc",
      weight: "214 kg",
      range: "280 km",
      seats: "2"
    },
    accessories: ["Sanitized helmet", "Phone mount", "Riding gloves", "Rain liner"]
  },
  {
    id: "wb-02",
    slug: "triumph-speed-400",
    name: "Speed 400",
    brand: "Triumph",
    category: "motorcycles",
    pricePerDay: 2299,
    rating: 4.8,
    reviews: 132,
    fuel: "Petrol",
    transmission: "Manual",
    status: "Limited",
    image: "/images/fleet/urban-cinematic.jpg",
    imageAlt: "Premium road motorcycle in a cinematic rental card",
    objectPosition: "46% 56%",
    mood: "urban",
    frame: "low",
    activity: "Recently picked up",
    location: "Lower Parel",
    routeTags: ["Matte city", "Short blast", "Concierge prep"],
    shortDescription:
      "Compact, quick, and composed for riders who want refinement without carrying extra bulk.",
    specs: {
      engine: "398 cc",
      weight: "176 kg",
      range: "310 km",
      seats: "2"
    },
    accessories: ["Sanitized helmet", "USB charger", "Tank pad", "City route card"]
  },
  {
    id: "wb-03",
    slug: "jawa-42-bobber",
    name: "42 Bobber",
    brand: "Jawa",
    category: "motorcycles",
    pricePerDay: 2199,
    rating: 4.7,
    reviews: 88,
    fuel: "Petrol",
    transmission: "Manual",
    status: "Available",
    image: "/images/fleet/city-lowroad.jpg",
    imageAlt: "Luxury bobber motorcycle rental presentation",
    objectPosition: "68% 60%",
    mood: "studio",
    frame: "detail",
    activity: "New to fleet",
    location: "Editorial bay",
    routeTags: ["Solo seat", "Night arrival", "Low stance"],
    shortDescription:
      "Low-slung, sculptural, and city-dramatic with a relaxed single-seat posture.",
    specs: {
      engine: "334 cc",
      weight: "185 kg",
      range: "255 km",
      seats: "1"
    },
    accessories: ["Sanitized helmet", "Premium visor", "Rider pouch", "Chain lock"]
  },
  {
    id: "wb-04",
    slug: "vespa-sxl-150",
    name: "SXL 150",
    brand: "Vespa",
    category: "scooty",
    pricePerDay: 899,
    rating: 4.8,
    reviews: 176,
    fuel: "Petrol",
    transmission: "Automatic",
    status: "Available",
    image: "/images/fleet/scooty-city.jpg",
    imageAlt: "Curated premium scooter rental card",
    objectPosition: "36% 58%",
    mood: "studio",
    frame: "portrait",
    activity: "Picked for a shoot",
    location: "Kala Ghoda",
    routeTags: ["Automatic", "Cafe run", "Light luggage"],
    shortDescription:
      "A refined city companion with elegant proportions and an easy automatic rhythm.",
    specs: {
      engine: "149 cc",
      weight: "115 kg",
      range: "210 km",
      seats: "2"
    },
    accessories: ["Sanitized helmet", "Under-seat storage", "Phone holder", "Rain poncho"]
  },
  {
    id: "wb-05",
    slug: "tvs-ntorq-125",
    name: "Ntorq 125",
    brand: "TVS",
    category: "scooty",
    pricePerDay: 749,
    rating: 4.6,
    reviews: 143,
    fuel: "Petrol",
    transmission: "Automatic",
    status: "Available",
    image: "/images/fleet/studio-detail.jpg",
    imageAlt: "Sporty automatic scooter rental card",
    objectPosition: "72% 62%",
    mood: "urban",
    frame: "portrait",
    activity: "3 rides this week",
    location: "Juhu pickup",
    routeTags: ["City agile", "Rain ready", "Daily slot"],
    shortDescription:
      "Sporty, nimble, and relaxed enough for all-day city movement.",
    specs: {
      engine: "125 cc",
      weight: "118 kg",
      range: "225 km",
      seats: "2"
    },
    accessories: ["Sanitized helmet", "Bluetooth assist", "Luggage hook", "First-aid kit"]
  },
  {
    id: "wb-06",
    slug: "ather-450x",
    name: "450X",
    brand: "Ather",
    category: "scooty",
    pricePerDay: 999,
    rating: 4.9,
    reviews: 201,
    fuel: "Electric",
    transmission: "Automatic",
    status: "Limited",
    image: "/images/fleet/electric-studio.jpg",
    imageAlt: "Premium electric scooter rental card",
    objectPosition: "28% 62%",
    mood: "studio",
    frame: "detail",
    activity: "Charge checked",
    location: "BKC drop point",
    routeTags: ["Electric", "Silent torque", "City range"],
    shortDescription:
      "Silent torque, crisp handling, and a polished electric commute for short-range plans.",
    specs: {
      engine: "3.7 kWh",
      weight: "108 kg",
      range: "110 km",
      seats: "2"
    },
    accessories: ["Sanitized helmet", "Charging guide", "Phone mount", "Smart key"]
  },
  {
    id: "wb-07",
    slug: "royal-enfield-himalayan-450",
    name: "Himalayan 450",
    brand: "Royal Enfield",
    category: "adventure-bikes",
    pricePerDay: 2799,
    rating: 4.9,
    reviews: 164,
    fuel: "Petrol",
    transmission: "Manual",
    status: "Available",
    image: "/images/fleet/touring-fog.jpg",
    imageAlt: "Adventure motorcycle prepared for premium travel rental",
    objectPosition: "58% 66%",
    mood: "adventure",
    frame: "wide",
    activity: "Weekend favorite",
    location: "Lonavala route",
    routeTags: ["Fog roads", "Touring kit", "Two-up"],
    shortDescription:
      "A confident adventure machine with touring comfort, luggage readiness, and unhurried power.",
    specs: {
      engine: "452 cc",
      weight: "196 kg",
      range: "330 km",
      seats: "2"
    },
    accessories: ["Sanitized helmet", "Saddle stays", "Bungee kit", "Roadside kit"]
  },
  {
    id: "wb-08",
    slug: "ktm-390-adventure",
    name: "390 Adventure",
    brand: "KTM",
    category: "adventure-bikes",
    pricePerDay: 2899,
    rating: 4.8,
    reviews: 119,
    fuel: "Petrol",
    transmission: "Manual",
    status: "Limited",
    image: "/images/fleet/adventure-wide.jpg",
    imageAlt: "Premium adventure touring motorcycle rental",
    objectPosition: "40% 64%",
    mood: "adventure",
    frame: "low",
    activity: "Limited weekend slots",
    location: "Pune highway",
    routeTags: ["Fast exit", "Broken road", "GPS mount"],
    shortDescription:
      "Sharp, tall, and ready for fast highway exits or broken-road exploration.",
    specs: {
      engine: "373 cc",
      weight: "177 kg",
      range: "300 km",
      seats: "2"
    },
    accessories: ["Sanitized helmet", "Knuckle guards", "Tail bag", "GPS mount"]
  },
  {
    id: "wb-09",
    slug: "bmw-g-310-gs",
    name: "G 310 GS",
    brand: "BMW",
    category: "adventure-bikes",
    pricePerDay: 3199,
    rating: 4.9,
    reviews: 96,
    fuel: "Petrol",
    transmission: "Manual",
    status: "Booked",
    image: "/images/fleet/studio-neutral.jpg",
    imageAlt: "Luxury compact adventure motorcycle rental",
    objectPosition: "64% 55%",
    mood: "cafe",
    frame: "wide",
    activity: "Returning tonight",
    location: "Worli sea face",
    routeTags: ["Premium compact", "Touring posture", "Booked"],
    shortDescription:
      "Premium compact adventure ergonomics for riders who want poise and polish.",
    specs: {
      engine: "313 cc",
      weight: "175 kg",
      range: "285 km",
      seats: "2"
    },
    accessories: ["Sanitized helmet", "Touring visor", "Soft pannier", "Toolkit"]
  }
];

export const processSteps: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Select Your Machine",
    description:
      "Browse a tight fleet by route mood, pickup point, posture, and weekend availability.",
    icon: Bike
  },
  {
    title: "Verify The Essentials",
    description:
      "Share license and ID details inside a guided flow designed to feel calm, not bureaucratic.",
    icon: Upload
  },
  {
    title: "Collect And Disappear",
    description:
      "Arrive to inspected papers, sanitized gear, clear pricing, and a WhatsApp handoff.",
    icon: CalendarCheck
  }
];

export const trustFeatures: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Sanitized Helmets",
    description: "Cleaned, inspected gear is staged before every handover.",
    icon: HardHat
  },
  {
    title: "Verified Vehicles",
    description: "Inspection logs keep each machine honest before it leaves.",
    icon: ShieldCheck
  },
  {
    title: "Transparent Pricing",
    description: "Deposits, late windows, and day rates stay visible.",
    icon: IndianRupee
  },
  {
    title: "24/7 Support",
    description: "A real concierge stays reachable before and during your ride.",
    icon: Headphones
  },
  {
    title: "Flexible Pickup",
    description: "Hub pickup, assisted delivery, and route-aware timing.",
    icon: WalletCards
  },
  {
    title: "Roadside Assistance",
    description: "Route support and emergency help for longer plans.",
    icon: LifeBuoy
  }
];

export const testimonials = [
  {
    name: "Aarav Mehta",
    route: "Bandra to Alibaug",
    quote:
      "The GT felt like it had been staged for the route. Quiet paperwork, clean gear, and a handoff that felt considered.",
    rating: "4.9"
  },
  {
    name: "Naina Kapoor",
    route: "Fort cafe loop",
    quote:
      "I booked a Vespa for a client shoot day. It felt more like borrowing from a design studio than renting from a counter.",
    rating: "4.8"
  },
  {
    name: "Kabir Sethi",
    route: "Lonavala morning run",
    quote:
      "Helmet, mount, papers, route notes, everything was waiting. The weekend started before we even left the city.",
    rating: "5.0"
  }
];

export const faqs = [
  {
    question: "Is a security deposit required?",
    answer:
      "Yes. The deposit depends on the vehicle category and is fully refundable after inspection at return."
  },
  {
    question: "Which ID proof do I need?",
    answer:
      "A valid driving license and one government ID are required before confirmation."
  },
  {
    question: "Can I cancel a booking?",
    answer:
      "Free cancellation is available up to 24 hours before pickup. Closer changes are handled by support."
  },
  {
    question: "Where do I pick up the vehicle?",
    answer:
      "You can pick up from the Wheelbros hub or request delivery in supported city zones."
  },
  {
    question: "What is the fuel policy?",
    answer:
      "Vehicles are handed over with a logged fuel level and should be returned at the same level."
  },
  {
    question: "What happens on late returns?",
    answer:
      "Late returns are billed hourly after a short grace window, with clear alerts sent on WhatsApp."
  }
];

export const bookings: Booking[] = [
  {
    id: "BK-2048",
    customer: "Ishaan Rao",
    vehicle: "Continental GT 650",
    dates: "12 May - 14 May",
    amount: "Rs. 7,497",
    status: "Pending",
    documents: "Verified"
  },
  {
    id: "BK-2047",
    customer: "Mira D'Souza",
    vehicle: "Ather 450X",
    dates: "11 May",
    amount: "Rs. 999",
    status: "Accepted",
    documents: "Verified"
  },
  {
    id: "BK-2046",
    customer: "Dev Malhotra",
    vehicle: "Himalayan 450",
    dates: "15 May - 17 May",
    amount: "Rs. 8,397",
    status: "Pending",
    documents: "Review"
  },
  {
    id: "BK-2045",
    customer: "Rhea Shah",
    vehicle: "Vespa SXL 150",
    dates: "10 May",
    amount: "Rs. 899",
    status: "Rejected",
    documents: "Review"
  }
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getVehiclesByCategory(category: CategorySlug) {
  return vehicles.filter((vehicle) => vehicle.category === category);
}

export function getVehicleBySlug(slug: string) {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

export const premiumSignals = [
  "Lower Parel handoffs",
  "Verified fleet papers",
  "WhatsApp concierge",
  "Sanitized gear staged"
];

export const adminStats = [
  { label: "Active fleet", value: "42", delta: "+8%" },
  { label: "Bookings this week", value: "128", delta: "+18%" },
  { label: "Utilization", value: "86%", delta: "+5%" },
  { label: "Alerts", value: "7", delta: "Live" }
];

export const notificationFeed = [
  {
    title: "New booking request",
    detail: "Continental GT 650 / Bandra studio / 12 May",
    tone: "warm"
  },
  {
    title: "Document review needed",
    detail: "Himalayan 450 / Lonavala route / BK-2046",
    tone: "ember"
  },
  {
    title: "Fleet update",
    detail: "Ather 450X charge checked at BKC",
    tone: "olive"
  },
  {
    title: "Return window",
    detail: "Vespa SXL 150 returning from Kala Ghoda at 7:30 PM",
    tone: "warm"
  }
];

export const bookingSteps = [
  "Select Machine",
  "Choose Dates",
  "Verify ID",
  "Rider Details",
  "Review",
  "WhatsApp Handoff"
];

export const categoryLabels: Record<CategorySlug, string> = {
  scooty: "Scooty",
  motorcycles: "Motorcycles",
  "adventure-bikes": "Adventure Bikes"
};

export const categoryDescriptions: Record<CategorySlug, string> = {
  scooty: "Compact automatic machines for cafe loops, errands, and quiet city movement.",
  motorcycles: "Expressive road machines for city exits, coastal loops, and evening returns.",
  "adventure-bikes": "Touring-ready motorcycles for fog, luggage, and longer open-road plans."
};

export const featuredVehicles = vehicles.slice(0, 6);

export const heroHighlights = [
  { value: "4.9/5", label: "Rider rating" },
  { value: "42", label: "Verified vehicles" },
  { value: "24/7", label: "Ride support" }
];

export const quickFilters = [
  "Cafe racer editorial",
  "Automatic city slot",
  "Weekend touring",
  "Electric studio prep"
];

export const bookingIncludes = [
  "Sanitized helmet staged",
  "Verified registration copy",
  "WhatsApp pickup notes",
  "Roadside support line"
];

export const adminInventoryCategories = [
  { label: "Scooty", count: 14, available: 11 },
  { label: "Motorcycles", count: 18, available: 14 },
  { label: "Adventure Bikes", count: 10, available: 7 }
];

export const footerLinks = ["Explore", "Pricing", "About", "Contact", "Admin"];

export const socialLinks = ["Instagram", "YouTube", "X"];

export const bookingStatusTone: Record<Booking["status"], string> = {
  Pending: "bg-saddle/25 text-ink",
  Accepted: "bg-olive/15 text-olive",
  Rejected: "bg-ember/10 text-ember"
};

export const vehicleStatusTone: Record<Vehicle["status"], string> = {
  Available: "bg-white text-olive",
  Limited: "bg-saddle/80 text-ink",
  Booked: "bg-ember text-white"
};

export const emptyVehicle: Omit<Vehicle, "id" | "slug" | "image" | "imageAlt" | "objectPosition" | "mood" | "frame" | "activity" | "location" | "routeTags" | "shortDescription" | "specs" | "accessories" | "rating" | "reviews"> = {
  name: "",
  brand: "",
  category: "motorcycles",
  pricePerDay: 1800,
  fuel: "Petrol",
  transmission: "Manual",
  status: "Available"
};

export const luxuryBadges = [
  { icon: ShieldCheck, label: "Verified documents" },
  { icon: Sparkles, label: "Clean gear" },
  { icon: Headphones, label: "Concierge support" }
];

export const fieldNotes = [
  {
    title: "Bandra studio",
    detail: "Cafe racers leave from a quieter lane behind the market.",
    meta: "4 pickups today"
  },
  {
    title: "Lonavala weather",
    detail: "Fog reported near the second climb. Adventure fleet gets rain liners.",
    meta: "Updated 18 min ago"
  },
  {
    title: "Weekend demand",
    detail: "GT 650, Himalayan, and 450X are moving fastest for Friday slots.",
    meta: "Limited availability"
  }
];

export const photoMoods = [
  {
    label: "Urban cinematic",
    description: "Dark road crops, matte contrast, and a low city horizon."
  },
  {
    label: "Cafe racer editorial",
    description: "Warm stone, chrome detail, and lifestyle-led framing."
  },
  {
    label: "Touring atmosphere",
    description: "Fogged edges, luggage-ready notes, and larger route context."
  },
  {
    label: "Minimal studio",
    description: "Neutral surfaces, quieter typography, and product-first restraint."
  }
];
