import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { VehicleDetail } from "@/components/vehicle-detail";
import { getVehicleBySlug, vehicles } from "@/lib/data";

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

export default async function VehiclePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bone">
      <Navigation />
      <VehicleDetail vehicle={vehicle} />
      <Footer />
    </main>
  );
}
