# Wheelbros

Premium motorcycle and scooty rental platform built with Next.js App Router,
Tailwind CSS, Framer Motion, and Supabase-ready data modeling.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Key Routes

- `/` customer website with cinematic hero, inventory previews, trust sections,
  testimonials, FAQ, and footer.
- `/explore/scooty`, `/explore/motorcycles`, `/explore/adventure-bikes`
  category inventory pages.
- `/vehicles/[slug]` vehicle detail pages with gallery, specs, accessories,
  pricing, availability, and booking CTA.
- `/book` step-based booking flow with ID upload UI and WhatsApp confirmation.
- `/admin` responsive SaaS-style dashboard for vehicle, booking, alert, and
  inventory management.

## Supabase

Set the values in `.env.local` using `.env.example`, then run the SQL in
`supabase/schema.sql` inside your Supabase SQL editor. The current UI works in
demo state, and the schema is ready for vehicles, bookings, notifications, row
level security, and admin operations.
