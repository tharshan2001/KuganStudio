import FrameCard from "./FrameCard";

async function getFrames() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/frames`,
    { cache: "no-store" } // SSR
  );

  if (!res.ok) return [];

  return res.json();
}

export default async function FrameGrid() {
  const frames = await getFrames();

  if (!frames.length) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-gray-500">No frames found</p>
      </div>
    );
  }

  return (
    // Max-width container to center the grid with side padding
    <section className="max-w-7xl mx-auto px-6 py-12 md:px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
        {frames.map((frame) => (
          <FrameCard key={frame._id} frame={frame} />
        ))}
      </div>
    </section>
  );
}