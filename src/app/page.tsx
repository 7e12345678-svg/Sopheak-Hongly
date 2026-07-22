import Hero from "@/components/home/Hero";
import PopularGames from "@/components/home/PopularGames";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PopularPackages from "@/components/home/PopularPackages";
import LiveOrders from "@/components/home/LiveOrders";
import PaymentMethods from "@/components/home/PaymentMethods";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/home/Footer";


export default function Home() {
  return (
    <main id="home" className="bg-slate-950">
      <Hero />

      <PopularGames />

      <WhyChooseUs />

      <PopularPackages />

      <LiveOrders />

      <PaymentMethods />

      <Testimonials />

      <FAQ />

      <Footer />
      
    </main>
  );
}