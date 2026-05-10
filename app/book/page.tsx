import { Suspense } from "react";
import { BookingFlow } from "@/components/booking-flow";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";

export default function BookPage() {
  return (
    <main className="min-h-screen bg-bone">
      <Navigation />
      <Suspense>
        <BookingFlow />
      </Suspense>
      <Footer />
    </main>
  );
}
