"use client";
import { useState } from "react";

export default function UploadImage({
  onUpload,
  folder = "categories", // ✅ pass folder name as prop
}: {
  onUpload: (url: string) => void;
  folder?: string;
}) {
  const [finish, setFinish] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder); // ✅ send folder name

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setLoading(false);
      setFinish(true);
      if (data.secure_url) {
        onUpload(data.secure_url);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setLoading(false);
      setFinish(false);
    }
  }

  return (
    <div>
      {!finish && (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-neutral-200 dark:border-neutral-600 w-full rounded-lg text-xs"
        />
      )}
      {loading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  );
}
