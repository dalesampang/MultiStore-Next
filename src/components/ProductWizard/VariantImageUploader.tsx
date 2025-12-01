import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

export default function VariantImageUploader({
  index,
  images,
  addImage,
  removeImage,
  updateImage,
}: {
  index: number;
  images: { id: string; url?: string; file?: File; sort?: Number }[];
  addImage: (img: any) => void;
  removeImage: (index: number) => void;
  updateImage: (index: number, value: any) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }, // prevents accidental drag on click
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file, idx) => {
      addImage({ file, url: URL.createObjectURL(file), order: idx });
    });
    e.currentTarget.value = "";
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((img) => img.id === active.id);
    const newIndex = images.findIndex((img) => img.id === over.id);
    const reordered = arrayMove(images, oldIndex, newIndex);

    reordered.forEach((img, i) => updateImage(i, img));
  };

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          document.getElementById("variant-upload-" + index)?.click()
        }
        className="px-4 py-2 btn btn-primary text-white rounded">
        Upload Images
      </button>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        id={`variant-upload-${index}`}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}>
        <SortableContext
          items={images.map((img) => img.id)}
          strategy={rectSortingStrategy}>
          <ul className="grid grid-cols-2 sm:grid-cols-6 gap-4 mt-4">
            {images.map((img, index) => (
              <SortableItem key={img.id} id={img.id}>
                <div className="relative">
                  <img
                    src={img.url}
                    alt=""
                    className="hover-scale-img__img w-full h-full object-fit-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                    ✕
                  </button>
                </div>
              </SortableItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}
