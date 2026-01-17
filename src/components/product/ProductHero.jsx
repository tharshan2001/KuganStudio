import Image from "next/image";
import frameImg from "../../assets/photo-frames.jpg";

const ProductHero = () => {
  return (
    <div className="bg-gray-50">
      <div className="h-[180px] md:h-80 flex items-center bg-[#E3E3E3] relative">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <h1 className="text-4xl md:text-5xl font text-black mb-4">
            Frames Collection
          </h1>

          <p className="text-black-300 max-w-xl mb-6 pr-20">
            Create custom photo frames online with Zoomin to beautifully display
            your memories. Choose from classic, coloured, designer and premium
            wall photo frames.
          </p>

          <div className="absolute right-20 top-0 z-20 translate-y-16">
            <Image
              src={frameImg}
              alt="Frames collection"
              className="rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHero;
