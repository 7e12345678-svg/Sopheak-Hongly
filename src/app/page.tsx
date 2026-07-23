import NotificationProvider from "@/components/notifications";

import Hero from "@/components/home/Hero";
import FlashSale from "@/components/home/FlashSale";
import PopularGames from "@/components/home/PopularGames";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import LiveOrders from "@/components/home/LiveOrders";
import Payment from "@/components/home/Payment";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <div className="bg-slate-950 text-white">
      <NotificationProvider />

      <Hero />
      <FlashSale />
      <PopularGames />
      <WhyChooseUs />
      <LiveOrders />
      <Payment />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}