import { cookies } from "next/headers"

export async function POST() {
  try {
    // ✅ Await cookies() before using
    const cookieStore = await cookies()
    cookieStore.set({
      name: "token",
      value: "",
      httpOnly: true,
      path: "/",
      maxAge: 0 // immediately expire
    })

    return new Response(JSON.stringify({ message: "Logged out" }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 })
  }
}
