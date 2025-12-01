"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Load categories
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  // Add category
  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();

    let imageUrl = "";
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "categories");
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();
      imageUrl = uploadData.secure_url; // ✅ Cloudinary URL
    }

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug, imageUrl }),
    });
    const newCategory = await res.json();
    setCategories((prev) => [...prev, newCategory]);
    setName("");
    setSlug("");
    setFile(null);
  }

  // Start editing
  function startEdit(c: any) {
    setEditingId(c.id);
    setEditName(c.name);
    setEditSlug(c.slug);
  }

  // Save edit
  async function handleSaveEdit(id: number) {
    const res = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName, slug: editSlug }),
    });
    const updated = await res.json();
    setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
    setEditingId(null);
  }

  // Delete category with SweetAlert2
  async function handleDelete(id: number) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the category.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "bg-red text-white px-4 py-2 rounded",
        cancelButton: "bg-gray text-black px-4 py-2 rounded",
      },
      buttonsStyling: false, // ✅ disables default SweetAlert styling
    });

    if (result.isConfirmed) {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        Swal.fire("Deleted!", "Category has been removed.", "success");
      } else {
        Swal.fire("Error", "Failed to delete category.", "error");
      }
    }
  }

  // Cancel edit
  function cancelEdit() {
    setEditingId(null);
    setEditName("");
    setEditSlug("");
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Manage Categories</h1>

      {/* Add Category Form */}
      <form
        onSubmit={handleAddCategory}
        className="mb-6 flex flex-col gap-3 max-w-md">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border rounded px-3 py-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded bg-blue">
          Add Category
        </button>
      </form>

      {/* Categories Table */}
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Slug</th>
            <th className="border px-2 py-1">Image</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td className="border px-2 py-1">
                {editingId === c.id ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  c.name
                )}
              </td>
              <td className="border px-2 py-1">
                {editingId === c.id ? (
                  <input
                    value={editSlug}
                    onChange={(e) => setEditSlug(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  c.slug
                )}
              </td>
              <td className="border px-2 py-1">
                {c.imageUrl ? (
                  <img
                    src={c.imageUrl}
                    alt={c.name}
                    className="h-12 w-12 object-cover"
                  />
                ) : (
                  "—"
                )}
              </td>

              <td className="border px-2 py-1">
                {editingId === c.id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(c.id)}
                      className="text-white mr-2 bg-blue px-4 py-2 rounded">
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-white bg-red px-4 py-2 rounded mr-2">
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => startEdit(c)}
                    className="text-white mr-2 px-4 py-2 rounded bg-blue">
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-white px-4 py-2 rounded bg-red">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
