import HeroSection from "@/components/featchers/home/HeroSection";
import CategoriesSection from "@/components/featchers/home/CategorySection";
import NewArrivalsSection from "@/components/featchers/home/NewArrivalsSection";

export default function HomePage() {
  return (
    <>
      <main className="pb-24 md:pb-0">
        <CategoriesSection />
        <HeroSection />
        <NewArrivalsSection text="تازه های فروشگاه" sort="newest" />
        <NewArrivalsSection text="پرتخفیف های فروشگاه" sort="discount" />
      </main>
    </>
  );
}
