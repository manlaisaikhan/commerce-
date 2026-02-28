import { HeroSection } from "@/components/home/hero-section";
import { MarqueeStrip } from "@/components/home/marquee-strip";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Categories } from "@/components/home/categories";
import { PromoBanner } from "@/components/home/promo-banner";
import dynamic from "next/dynamic";

const SplineBackground = dynamic(() => import("@/components/spline-scene"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <div className="relative">
      {/* Fixed Spline — visible while scrolling through all sections */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SplineBackground />
        {/* Dark overlay so content stays readable */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

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
