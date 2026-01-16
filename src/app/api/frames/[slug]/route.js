import { connectDB } from "@/lib/mongodb";
import FrameModel from "@/lib/model/FrameModel";
import { NextResponse } from "next/server";

// GET /api/frames/:slug
export async function GET(req) {
  try {
    await connectDB();

    // Extract the slug from the pathname
    // e.g., /api/frames/vintage-gold-frame-4 => split by "/" and get last
    const urlParts = req.nextUrl.pathname.split("/");
    const slug = urlParts[urlParts.length - 1];

    if (!slug) {
      return NextResponse.json({ message: "Slug is required" }, { status: 400 });
    }

    const frame = await FrameModel.findOne({ slug });
    if (!frame) {
      return NextResponse.json({ message: "Frame not found" }, { status: 404 });
    }

    return NextResponse.json(frame);
  } catch (err) {
    console.error("GET /api/frames/:slug error:", err);
    return NextResponse.json({ message: "Failed to fetch frame" }, { status: 500 });
  }
}
