import { useFieldArray, useFormContext } from "react-hook-form";
import UploadImage from "./UploadImage";

export default function SpecGroupItem({
  index,
  remove,
}: {
  index: number;
  remove: (i: number) => void;
}) {
  const { control, register, setValue } = useFormContext();

  // ✅ Hook is always called once per SpecGroupItem
  const {
    fields: specs,
    append: addSpec,
    remove: removeSpec,
  } = useFieldArray({
    control,
    name: `specGroups.${index}.specs`,
  });

  return (
    <div className="border p-3 rounded space-y-2 ">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="col-span-12">
          <label className="inline-block mb-2">Title</label>
          <input
            {...register(`specGroups.${index}.title`)}
            placeholder="Group Title"
            className="border px-3 py-2 w-full"
          />
        </div>
        <div className="col-span-12">
          <label className="inline-block mb-2">Description</label>
          <textarea
            {...register(`specGroups.${index}.description`)}
            placeholder="Group Description"
            className="border px-3 py-2 w-full"
          />
        </div>
      </div>

      <UploadImage
        folder="products/specs"
        onUpload={(url) => setValue(`specGroups.${index}.imageUrl`, url)}
      />

      <h4 className="text-sm font-medium mt-2">Specs</h4>
      {specs.map((s, j) => (
        <div key={s.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6">
            <label className="inline-block mb-2">Label</label>
            <input
              {...register(`specGroups.${index}.specs.${j}.label`)}
              placeholder="Label"
              className="border px-3 py-2 w-full"
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <label className="inline-block mb-2">Value</label>
            <input
              {...register(`specGroups.${index}.specs.${j}.value`)}
              placeholder="Value"
              className="border px-3 py-2 w-full"
            />
          </div>

          <div className="col-span-12">
            <button
              type="button"
              onClick={() => removeSpec(j)}
              className="btn bg-danger-600 hover:bg-danger-700 text-white rounded px-3 py-1">
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addSpec({ label: "", value: "" })}
        className="btn btn-primary px-3 py-1 rounded mt-2">
        Add Spec
      </button>

      <button
        type="button"
        onClick={() => remove(index)}
        className="bg-red text-white px-3 py-1 rounded ml-2 mt-2">
        Remove Group
      </button>
    </div>
  );
}
