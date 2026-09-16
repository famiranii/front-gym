import HeroSlider from "./HeroSlider";

type Banner = {
  id: string;
  title: string;
  subtitle: string;
  button_text: string;
  button_url: string;
  image_url: string;
};

async function getBanners(): Promise<Banner[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function HeroSection() {
  const banners = await getBanners();
  if (banners.length === 0) return null;
  return <HeroSlider banners={banners} />;
}