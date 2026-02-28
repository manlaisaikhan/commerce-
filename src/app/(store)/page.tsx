import { HeroSection } from "@/components/home/hero-section";
import { MarqueeStrip } from "@/components/home/marquee-strip";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Categories } from "@/components/home/categories";
import { PromoBanner } from "@/components/home/promo-banner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <FeaturedProducts />
      <Categories />
      <PromoBanner />
    </>
  );
}
