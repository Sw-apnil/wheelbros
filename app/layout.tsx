import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wheelbros | Premium Motorcycle & Scooty Rentals",
  description:
    "A cinematic motorcycle and scooty rental platform for curated city escapes, highway rides, and adventure mobility."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
