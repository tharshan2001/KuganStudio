const BlogCard = ({
  heading,
  subHeading,
  titleTop,
  labelOne,
  labelTwo,
  titleBottom,
  description,
  images,
}) => {
  return (
    <section className="max-w-7xl mx-auto py-6 sm:px-6 sm:py-12 md:px-12 md:py-24">
      {/* SECTION HEADER */}
      <div className="text-center mb-20">
        <h2 className="text-5xl font-semibold text-gray-700 tracking-tight">
          {heading}
        </h2>
        <p className="mt-4 text-xl text-gray-500 font-light">
          {subHeading}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* LEFT CONTENT */}
        <div
          className="w-full lg:w-1/3 p-10 prose"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="100"
        >
          <h1 className="text-7xl text-gray-600 leading-tight">{titleTop}</h1>
          <h1 className="text-3xl text-gray-600">{labelOne}</h1>
          <h1 className="text-3xl text-gray-600">{labelTwo}</h1>
          <h1 className="text-7xl text-gray-600">{titleBottom}</h1>
          <p className="text-2xl text-gray-600 font-light mt-8 leading-relaxed">
            {description}
          </p>
        </div>

        {/* RIGHT IMAGE GRID */}
        <div
          className="w-full lg:w-2/3 py-8 px-10 grid grid-cols-4 gap-4"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="100"
        >
          {images.map((img, index) => (
            <div key={index} className={`h-64 relative ${img.colSpan}`}>
              <img
                src={img.src}
                alt={img.alt}
                className={`absolute inset-0 h-full w-full object-cover ${img.rounded}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogCard;
