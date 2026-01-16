// src/app/(admin)/frames/page.jsx
import FrameGrid from "@/components/frames/FrameGrid";

export default function AdminFramesPage() {
  return (
    <>
      <h1 className="text-xl font-semibold mb-4">Frames</h1>
      <FrameGrid admin />
    </>
  );
}