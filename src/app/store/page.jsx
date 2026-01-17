import FrameGrid from "@/components/frames/FrameGrid";
import ProductHero from "@/components/product/ProductHero";

export default function StorePage() {
  return (
    <div className="mt-28">
      <ProductHero />
      <div className="p-15">
        <FrameGrid />
      </div>
    </div>
  );
}
