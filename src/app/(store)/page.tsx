import { HeroSection } from "@/components/home/hero-section";
import { MarqueeStrip } from "@/components/home/marquee-strip";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Categories } from "@/components/home/categories";
import { PromoBanner } from "@/components/home/promo-banner";
import { SplineBackground } from "@/components/home/spline-background";

export default function Home() {
  return (
    <div className="relative">
      {/* Fixed Spline — visible while scrolling through all sections */}
      <SplineBackground />

      {/* All home sections scroll on top */}
      <div className="relative z-10">
        <HeroSection />
        <MarqueeStrip />
        <FeaturedProducts />
        <Categories />
        <PromoBanner />
      </div>
    </div>
  );
}
