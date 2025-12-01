import { useForm, useFieldArray, useFormContext } from "react-hook-form";
import UploadImage from "./UploadImage";

export default function StepFeatures({ data, next, prev }: any) {
  const { control, register, handleSubmit, setValue } =
    useFormContext<ProductForm>();

  const {
    fields: features,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "features",
  });

  return (
    <form onSubmit={handleSubmit(next)} className="space-y-4">
      <h2 className="text-lg font-semibold mb-2">Product Features</h2>
      <div className="">
        {features.map((f, i) => (
          <div key={f.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <h3 className="text-lg font-semibold mb-2">Feature #{i + 1}</h3>
            <div className="col-span-12">
              <label className="inline-block mb-2">Title</label>
              <input
                {...register(`features.${i}.title`)}
                placeholder="Feature Title"
                className="border px-3 py-2 w-full"
              />
            </div>
            <div className="col-span-12">
              <label className="inline-block mb-2">Description</label>
              <textarea
                {...register(`features.${i}.description`)}
                placeholder="Description"
                className="border px-3 py-2 w-full"
              />
            </div>
            <UploadImage
              folder="products/features"
              onUpload={(url) => setValue(`features.${i}.mediaUrl`, url)}
            />
            <div className="col-span-12">
              <button
                type="button"
                onClick={() => remove(i)}
                className="btn bg-danger-500 rounded px-3 py-1 text-white">
                Remove Feature
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          append({
            id: crypto.randomUUID(),
            title: "",
            description: "",
            mediaUrl: "",
          })
        }
        className="btn btn-primary px-3 py-1 rounded">
        Add Feature
      </button>
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
