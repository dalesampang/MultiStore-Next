import { useFormContext, useFieldArray } from "react-hook-form";
import VariantItem from "./VariantItem";

export default function StepVariants({ next, prev }) {
  const { control, register, handleSubmit } = useFormContext<ProductForm>();

  const {
    fields: variants,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "variants",
  });

  return (
    <form onSubmit={handleSubmit(next)} className="space-y-4">
      <div>
        {variants.map((variant, i) => (
          <div key={variant.id}>
            <VariantItem index={i} remove={remove} />
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary text-white px-3 py-1 rounded mt-2"
          onClick={() =>
            append({
              id: crypto.randomUUID(),
              color: "",
              lens: "",
              price: 0,
              stock: 0,
              images: [],
            })
          }>
          Add Variant
        </button>
      </div>
      <div className="col-span-12">
        <div className="form-group flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={prev}
            className="form-wizard-previous-btn btn bg-neutral-400 border-neutral-400 hover:bg-neutral-500 hover:border-neutral-500 text-white px-8">
            Back
          </button>
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
