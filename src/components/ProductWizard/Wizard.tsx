import { useState } from "react";
import StepBasic from "./StepBasic";
import StepVariants from "./StepVariants";
import StepFeatures from "./StepFeatures";
import StepSpecs from "./StepSpecs";
import Swal from "sweetalert2";
import { FormProvider, useForm } from "react-hook-form";
import { useLoading } from "@/hooks/useLoading";
import LoadingOverlay from "../Common/LoadingOverlay";
import { fixedFeatures } from "../Common/featuresData";

const steps = ["Basic Info", "Variants", "Features", "Specifications"];

export default function Wizard() {
  const { loading, message, startLoading, stopLoading } = useLoading();
  const methods = useForm<ProductForm>({
    defaultValues: {
      name: "",
      description: "",
      storeId: 1,
      categoryId: 0,
      variants: [],
      features: [],
      specs: [],
    },
  });

  const [step, setStep] = useState(0);
  async function saveProduct(data: ProductForm) {
    startLoading("Saving product...");

    try {
      const variantsWithUploadedImages = await Promise.all(
        data.variants.map(async (variant) => {
          const uploadedImages = [];
          let ctr = 1;
          for (const img of variant.images ?? []) {
            if (img.url && img.url.startsWith("http")) {
              uploadedImages.push({ url: img.url, sort: ctr });
              ctr += 1;
              continue;
            }
            const formData = new FormData();
            formData.append("file", img.file);
            formData.append("upload_preset", "your_preset");

            const res = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            });
            const data = await res.json();
            if (data.secure_url) {
              uploadedImages.push({ url: data.secure_url, sort: ctr });
              ctr += 1;
            }
          }

          return {
            ...variant,
            images: uploadedImages,
          };
        })
      );
      const product = {
        ...data,
        features: fixedFeatures.map(({ title, description, mediaUrl }) => ({
          title,
          description,
          mediaUrl,
        })),
        variants: variantsWithUploadedImages,
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to save product");

      const products = await res.json();
      Swal.fire({
        icon: "success",
        title: "Product Saved!",
        text: "Your product has been successfully created.",
      });
    } catch (err) {
      console.error("Prisma error:", err);
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: "There was an error saving your product.",
      });
    } finally {
      stopLoading();
    }
  }

  const StepComponent = [StepBasic, StepVariants, StepFeatures, StepSpecs][
    step
  ];

  return (
    <FormProvider {...methods}>
      <div className="form-wizard-header overflow-x-auto scroll-sm pb-2 mt-8 mb-8">
        <ul className="list-unstyled form-wizard-list">
          {steps.map((label, i) => (
            <li
              key={i}
              className={`form-wizard-list__item ${i === step ? "active" : ""}`}>
              <div className="form-wizard-list__line">
                <span className="count">{i + 1}</span>
              </div>
              <span className="text text-xs font-semibold">{label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6">
        <h1 className="text-base text-neutral-400 mb-3">{steps[step]}</h1>
        <StepComponent
          next={(data: any) => {
            if (step < steps.length - 1) {
              setStep((s) => s + 1);
            } else {
              // ✅ last step → save all values
              saveProduct(methods.getValues());
            }
          }}
          prev={() => setStep((s) => Math.max(s - 1, 0))}
        />
      </div>
      <LoadingOverlay show={loading} message={message} />
    </FormProvider>
  );
}
