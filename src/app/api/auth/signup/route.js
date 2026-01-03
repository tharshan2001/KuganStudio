import { connectDB } from "@/lib/mongodb"
import User from "@/lib/userModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req) {
  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password)
      return new Response(JSON.stringify({ message: "All fields required" }), { status: 400 })

    await connectDB()
    if (await User.findOne({ email }))
      return new Response(JSON.stringify({ message: "User exists" }), { status: 400 })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashedPassword })

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" })

    cookies().set({ name: "token", value: token, httpOnly: true, path: "/", maxAge: 7 * 24 * 60 * 60 })

    return new Response(JSON.stringify({ message: "Signup successful" }), { status: 201 })
  } catch (err) {
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 })
  }
}
