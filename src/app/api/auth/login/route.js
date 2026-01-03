import { connectDB } from "@/lib/mongodb"
import User from "@/lib/userModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req) {
  try {
    const { email, password } = await req.json()
    if (!email || !password)
      return new Response(JSON.stringify({ message: "Email and password required" }), { status: 400 })

    await connectDB()
    const user = await User.findOne({ email })
    if (!user) return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 })

    if (!(await bcrypt.compare(password, user.password)))
      return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 })

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" })

    cookies().set({ name: "token", value: token, httpOnly: true, path: "/", maxAge: 7 * 24 * 60 * 60 })

    return new Response(JSON.stringify({ message: "Login successful" }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 })
  }
}
