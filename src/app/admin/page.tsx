export default function AdminHome() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Manage products, categories, and blog posts from here.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="/admin/products"
          className="block rounded-lg border p-4 hover:bg-gray-50">
          <h2 className="font-semibold">Products</h2>
          <p className="text-sm text-gray-500">
            Add, edit, and delete products
          </p>
        </a>

        <a
          href="/admin/categories"
          className="block rounded-lg border p-4 hover:bg-gray-50">
          <h2 className="font-semibold">Categories</h2>
          <p className="text-sm text-gray-500">Organize product categories</p>
        </a>

        <a
          href="/admin/blogs"
          className="block rounded-lg border p-4 hover:bg-gray-50">
          <h2 className="font-semibold">Blog Posts</h2>
          <p className="text-sm text-gray-500">
            Publish and manage blog content
          </p>
        </a>
      </div>
    </div>
  );
}
