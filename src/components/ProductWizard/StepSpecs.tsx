import {
  useForm,
  FormProvider,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import SpecGroupItem from "./SpecGroupItem";

export default function StepSpecs({ next, prev }: any) {
  const { control, register, handleSubmit } = useFormContext<ProductForm>();
  const {
    fields: specs,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "specs",
  });

  return (
    <form onSubmit={handleSubmit(next)} className="space-y-4">
      <h2 className="text-lg font-semibold">Product Specifications</h2>
      {specs.map((group, i) => (
        <SpecGroupItem key={group.id} index={i} remove={remove} />
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            id: crypto.randomUUID(),
            title: "",
            description: "",
            imageUrl: "",
            specs: [],
          })
        }
        className="btn btn-primary px-3 py-1 rounded">
        Add Spec Group
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
            Finish
          </button>
        </div>
      </div>
    </form>
  );
}
