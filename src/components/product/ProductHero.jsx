import React from 'react';

const ProductHero = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <div className="h-96 md:h-[200px] flex items-center bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <h1 className="text-3xl md:text-5xl font-semibold text-white mb-4">
            Frames Collection
          </h1>

          <p className="text-gray-300 max-w-xl">
            Modern, minimal, and crafted to fit every space perfectly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductHero;