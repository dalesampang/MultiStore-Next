"use client"; // 👈 add this at the very top

import Wizard from "@/components/ProductWizard/Wizard";

export default function AddProductPage() {
  return (
    <div className="p-6 ">
      <Wizard />
    </div>
  );
}
