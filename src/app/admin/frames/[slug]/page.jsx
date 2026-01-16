// src/app/(admin)/frames/[id]/page.jsx
import FrameForm from "@/components/admin/FrameForm";

export default function EditFramePage({ params }) {
  return <FrameForm frameId={params.id} />;
}