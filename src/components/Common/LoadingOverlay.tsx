// components/LoadingOverlay.tsx
"use client";
import { ClipLoader } from "react-spinners";

interface LoadingOverlayProps {
  show: boolean;
  message?: string | null;
}

export default function LoadingOverlay({ show, message }: LoadingOverlayProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4 bg-white p-6 rounded shadow-lg">
        <ClipLoader color="#2563eb" size={40} />
        <p className="text-gray-700 font-medium">{message ?? "Loading..."}</p>
      </div>
    </div>
  );
}
