import React from "react";

// Typography strictly follows BlogCard component
// Assumes Poppins is loaded globally

export default function AboutUsBlogTypography() {
  return (
    <section className="max-w-7xl mx-auto py-6 sm:px-6 sm:py-12 md:px-12 md:py-24 font-[Poppins]">
      {/* SECTION HEADER (same as BlogCard) */}
      <div className="text-center mb-20">
        <h2 className="text-5xl font-semibold text-gray-700 tracking-tight">
          About Our Studio
        </h2>
        <p className="mt-4 text-xl text-gray-500 font-light max-w-3xl mx-auto">
          A visual collection of our most recent work — crafted with intention,
          emotion, and timeless photographic style.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* IMAGE */}
        <div className="w-full lg:w-1/2 px-6">
          <img
            src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
            alt="Studio sample"
            className="rounded-xl w-full h-auto"
          />
        </div>

        {/* TEXT CONTENT (BlogCard-style hierarchy) */}
        <div className="w-full lg:w-1/2 p-10 prose">
          <h1 className="text-7xl text-gray-600 leading-tight">
            Capturing
          </h1>
          <h1 className="text-3xl text-gray-600">Light</h1>
          <h1 className="text-3xl text-gray-600">Emotion</h1>
          <h1 className="text-7xl text-gray-600">
            Stories
          </h1>

          <p className="text-2xl text-gray-600 font-light mt-8 leading-relaxed">
            We are a creative photography studio focused on storytelling through
            imagery. From portraits and weddings to brands and editorials, our
            work blends artistic vision with professional precision.
          </p>

          {/* FEATURES */}
          <div className="flex flex-col gap-8 mt-12">
            <Feature
              icon="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png"
              title="Fast Turnaround"
              description="Efficient workflows delivering premium results on time."
            />
            <Feature
              icon="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png"
              title="Signature Editing"
              description="Clean, cinematic color grading with a timeless feel."
            />
            <Feature
              icon="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png"
              title="Creative Flexibility"
              description="Every shoot is tailored to your vision and story."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded mt-1">
        <img src={icon} alt="" className="w-full h-full" />
      </div>
      <div>
        <h3 className="text-2xl text-gray-600 font-medium">{title}</h3>
        <p className="text-lg text-gray-500 font-light leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
