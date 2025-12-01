import { useFieldArray, useFormContext } from "react-hook-form";
import UploadImage from "./UploadImage";
import VariantImageUploader from "./VariantImageUploader";

export default function VariantItem({
  index,
  remove,
}: {
  index: number;
  remove: (i: number) => void;
}) {
  const { control, register, setValue } = useFormContext<ProductForm>(); // ✅ now works because of FormProvider

  const {
    fields: images,
    append: addImage,
    remove: removeImage,
    update,
  } = useFieldArray({
    control,
    name: `variants.${index}.images`,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
      <div className="col-span-12 sm:col-span-6">
        <label className="inline-block mb-2">Color</label>

        <input
          {...register(`variants.${index}.color`)}
          placeholder="Color"
          className="border px-3 py-2 w-full rounded"
        />
      </div>
      <div className="col-span-12 sm:col-span-6">
        <label className="inline-block mb-2">Lens</label>

        <input
          {...register(`variants.${index}.lens`)}
          placeholder="Lens"
          className="border px-3 py-2 w-full"
        />
      </div>
      <div className="col-span-12 sm:col-span-6">
        <label className="inline-block mb-2">Price</label>
        <input
          type="number"
          {...register(`variants.${index}.price`, { valueAsNumber: true })}
          placeholder="Price"
          className="border px-3 py-2 w-full"
        />
      </div>
      <div className="col-span-12 sm:col-span-6">
        <label className="inline-block mb-2">Stock</label>
        <input
          type="number"
          {...register(`variants.${index}.stock`, { valueAsNumber: true })}
          placeholder="Stock"
          className="border px-3 py-2 w-full"
        />
      </div>
      <div className="col-span-12">
        <label className="inline-block mb-2">Variant Images</label>
      </div>
      <div className="col-span-12">
        <VariantImageUploader
          index={index}
          images={images}
          addImage={addImage}
          removeImage={removeImage}
          updateImage={update}
        />
        <button
          type="button"
          onClick={() => remove(index)}
          className="btn bg-danger-500 rounded px-3 py-1 text-white mb-2">
          Remove Variant
        </button>
      </div>
    </div>
  );
}
