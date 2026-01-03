"use client"
import { useEffect, useState } from "react"

export default function Page() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1>Products</h1>

      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} - ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  )
}
