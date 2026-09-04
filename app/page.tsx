import Header from "@/components/layout/Header";

import HeroSection from "@/components/featchers/home/HeroSection";
import CategoriesSection from "@/components/featchers/home/CategorySection";
import NewArrivalsSection from "@/components/featchers/home/NewArrivalsSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-24 md:pb-0">
        <CategoriesSection />
        <HeroSection />
        <NewArrivalsSection />
      </main>
    </>
  );
}
