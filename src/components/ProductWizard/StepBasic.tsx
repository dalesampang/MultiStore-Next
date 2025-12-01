"use client";
import { useForm, useFormContext } from "react-hook-form";
import UploadImage from "./UploadImage";
import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import DescriptionEditor from "./DescriptionEditor";

export default function StepBasic({ next }: StepProps) {
  const [categories, setCategories] = useState<any[]>([]);
  const { register, handleSubmit, getValues, setValue, watch } =
    useFormContext<ProductForm>();
  const currentData = getValues();
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);
  const baseImage = watch("baseImage");

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setValue("description", editor.getHTML());
    },
  });
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // slugify: lowercase, replace spaces with "-", remove non-alphanumeric
    const slugified = value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    setValue("slug", slugified, { shouldValidate: true });
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = categories.find((c) => c.id === Number(e.target.value));
    setValue("categoryName", selected?.name || "", { shouldValidate: true }); // 👈 bind categoryName
  };

  return (
    <form onSubmit={handleSubmit(next)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-6">
          <label className="inline-block mb-2">Product Name</label>
          <input
            {...register("name")}
            placeholder="Product Name"
            className="border px-3 py-2 w-full rounded"
            onChange={handleNameChange}
          />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <label className="inline-block mb-2">Slug</label>
          <input
            {...register("slug")}
            placeholder="Slug"
            className="border px-3 py-2 w-full rounded"
            readOnly
          />
        </div>

        <DescriptionEditor />

        <div className="col-span-12 sm:col-span-6">
          <label className="inline-block mb-2">Category</label>
          <select
            {...register("categoryId")}
            className="border px-3 py-2 w-full"
            defaultValue={currentData?.categoryId || ""}
            onChange={handleCategoryChange}>
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-12 sm:col-span-6">
          <label className="inline-block mb-2">Version</label>
          <input
            {...register("version")}
            placeholder="Version"
            className="border px-3 py-2 w-full"
          />
        </div>

        {!baseImage && (
          <div className="col-span-12">
            <label className="inline-block mb-2">Thumbnail</label>
            <UploadImage
              folder="products"
              onUpload={(url) => setValue("baseImage", url)}
            />
          </div>
        )}

        {baseImage && (
          <div className="mt-2">
            <img
              src={baseImage}
              alt="Base product image"
              className="w-32 h-32 object-cover mt-2 border"
            />
            <button
              type="button"
              onClick={() => setValue("baseImage", "")}
              className="bg-red rounded px-3 py-1 text-white mt-2">
              Remove
            </button>
          </div>
        )}
        <input type="hidden" {...register("categoryName")} />
        <input type="hidden" {...register("storeId")} value="1" />
      </div>
      <div className="col-span-12">
        <div className="form-group flex items-center justify-end gap-2">
          <button
            type="submit"
            className="form-wizard-next-btn btn btn-primary-600 px-8">
            Next
          </button>
        </div>
      </div>
    </form>
  );
}
