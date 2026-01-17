// app/api/auth/login/route.js
import { connectDB } from "@/lib/mongodb"
import User from "@/lib/model/userModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req) {
  try {
    const { email, password } = await req.json()
    if (!email || !password)
      return new Response(
        JSON.stringify({ message: "Email and password required" }),
        { status: 400 }
      )

    await connectDB()
    const user = await User.findOne({ email })
    if (!user)
      return new Response(
        JSON.stringify({ message: "Invalid credentials" }),
        { status: 401 }
      )

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return new Response(
        JSON.stringify({ message: "Invalid credentials" }),
        { status: 401 }
      )

    // Create JWT token
    const token = jwt.sign({ 
      id: user._id, 
      email: user.email,
      role: user.role || "user"
    }, JWT_SECRET, { expiresIn: "7d" })

    // ✅ CORRECT WAY: Create response and set cookie header
    const response = new Response(
      JSON.stringify({ 
        message: "Login successful",
        user: { id: user._id, email: user.email }
      }), 
      { status: 200 }
    )

    // Set cookie in response headers
    response.headers.set('Set-Cookie', 
      `token=${token}; ` +
      `HttpOnly; ` +
      `Path=/; ` +
      `Max-Age=${7 * 24 * 60 * 60}; ` +
      `${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}` +
      `SameSite=Strict`
    )

    return response
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 })
  }
}