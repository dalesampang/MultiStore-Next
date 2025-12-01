// hooks/useLoading.ts
"use client";
import { useState } from "react";

export function useLoading() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const startLoading = (msg?: string) => {
    setMessage(msg ?? "Loading...");
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
    setMessage(null);
  };

  return { loading, message, startLoading, stopLoading };
}
