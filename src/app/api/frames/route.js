// src/app/api/frames/route.js
import { connectDB } from "@/lib/mongodb";
import FrameModel from "../../../lib/model/FrameModel";
import { NextResponse } from "next/server";
import slugify from "slug";
import { verifyToken } from "@/lib/auth";

// ---------------- CRUD Handlers ----------------

// GET: fetch all frames (public)
export async function GET() {
  try {
    await connectDB();
    const frames = await FrameModel.find().sort({ "metadata.createdAt": -1 });
    return NextResponse.json(frames);
  } catch (err) {
    console.error("GET /api/frames error:", err);
    return NextResponse.json(
      { message: "Failed to fetch frames" },
      { status: 500 }
    );
  }
}

// GET by slug: fetch a single frame (public)
export async function getBySlug(slug) {
  try {
    await connectDB();
    if (!slug)
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );

    const frame = await FrameModel.findOne({ slug });
    if (!frame)
      return NextResponse.json({ message: "Frame not found" }, { status: 404 });

    return NextResponse.json(frame);
  } catch (err) {
    console.error("GET /api/frames/:slug error:", err);
    return NextResponse.json(
      { message: "Failed to fetch frame" },
      { status: 500 }
    );
  }
}

// ---------------- POST: create a frame (protected) ----------------
export async function POST(req) {
  try {
    const user = await verifyToken();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();
    const body = await req.json();

    const name = body.name?.toString().trim();
    if (!name)
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );

    // Generate unique slug
    let baseSlug = slugify(name, { lower: true });
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (await FrameModel.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    const frame = await FrameModel.create({
      name,
      slug: uniqueSlug,
      category: body.category || "",
      brand: body.brand || "",
      description: body.description || "",
      sizes: Array.isArray(body.sizes)
        ? body.sizes
        : JSON.parse(body.sizes || "[]"),
      displayTypes: Array.isArray(body.displayTypes)
        ? body.displayTypes
        : JSON.parse(body.displayTypes || "[]"),
      matTypes: Array.isArray(body.matTypes)
        ? body.matTypes
        : JSON.parse(body.matTypes || "[]"),
      images: Array.isArray(body.images) ? body.images : [],
      pricing: {
        currentPrice:
          typeof body.currentPrice === "number"
            ? body.currentPrice
            : parseFloat(body.currentPrice) || null,
        discountPrice:
          typeof body.discountPrice === "number"
            ? body.discountPrice
            : parseFloat(body.discountPrice) || null,
      },
      specifications:
        typeof body.specifications === "object"
          ? body.specifications
          : JSON.parse(body.specifications || "{}"),
      availability: {
        inStock: body.inStock === true || body.inStock === "true",
        customizable:
          body.customizable === true || body.customizable === "true",
      },
      // fCode generated automatically in schema
    });

    return NextResponse.json(frame, { status: 201 });
  } catch (err) {
    console.error("POST /api/frames error:", err);
    return NextResponse.json(
      { message: "Failed to create frame" },
      { status: 500 }
    );
  }
}

// ---------------- PUT: update frame by ID (protected) ----------------
export async function PUT(req) {
  try {
    const user = await verifyToken();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { id, updates } = await req.json();
    if (!id)
      return NextResponse.json(
        { message: "Frame ID is required" },
        { status: 400 }
      );

    if (updates.name) {
      let baseSlug = slugify(updates.name, { lower: true });
      let uniqueSlug = baseSlug;
      let counter = 1;
      while (await FrameModel.findOne({ slug: uniqueSlug, _id: { $ne: id } })) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
      }
      updates.slug = uniqueSlug;
    }

    if (updates.fCode) delete updates.fCode;

    const frame = await FrameModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!frame)
      return NextResponse.json({ message: "Frame not found" }, { status: 404 });

    return NextResponse.json(frame);
  } catch (err) {
    console.error("PUT /api/frames error:", err);
    return NextResponse.json(
      { message: "Failed to update frame" },
      { status: 500 }
    );
  }
}

// ---------------- DELETE: delete frame by ID (protected) ----------------
export async function DELETE(req) {
  try {
    const user = await verifyToken();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { id } = await req.json();
    if (!id)
      return NextResponse.json(
        { message: "Frame ID is required" },
        { status: 400 }
      );

    const frame = await FrameModel.findByIdAndDelete(id);
    if (!frame)
      return NextResponse.json({ message: "Frame not found" }, { status: 404 });

    return NextResponse.json({ message: "Frame deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/frames error:", err);
    return NextResponse.json(
      { message: "Failed to delete frame" },
      { status: 500 }
    );
  }
}
