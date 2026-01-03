import { connectDB } from "@/lib/mongodb"
import Product from "@/lib/model/productModel"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectDB()
    const products = await Product.find()
      .populate("category")
      .populate("subCategory")
      .sort({ createdAt: -1 })
    return NextResponse.json(products)
  } catch {
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const { name, price, description, category, subCategory, discount, images } = await req.json()
    await connectDB()

    const product = await Product.create({ name, price, description, category, subCategory, discount, images })

    return NextResponse.json(product, { status: 201 })
  } catch {
    return NextResponse.json({ message: "Failed to create product" }, { status: 500 })
  }
}
