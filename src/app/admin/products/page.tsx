"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Product
      </button>
      <table className="mt-4 w-full border">
        <thead>
          <tr>
            <th className="border px-2">Name</th>
            <th className="border px-2">Price</th>
            <th className="border px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border px-2">{p.name}</td>
              <td className="border px-2">{p.price}</td>
              <td className="border px-2">
                <button className="text-blue-600">Edit</button>
                <button className="text-red-600 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
