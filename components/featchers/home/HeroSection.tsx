import HeroSlider from "./HeroSlider";
import { api } from "@/lib/api";

type Banner = {
  id: string;
  title: string;
  subtitle: string;
  button_text: string;
  button_url: string;
  image_url: string;
};

async function getBanners(): Promise<Banner[]> {
  try {
    return await api.get<Banner[]>("/banners");
  } catch {
    return [];
  }
}

export default async function HeroSection() {
  const banners = await getBanners();

  if (banners.length === 0) return null;

  return <HeroSlider banners={banners} />;
}