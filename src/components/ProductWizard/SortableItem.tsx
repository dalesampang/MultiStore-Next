import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative flex items-center justify-center p-2 bg-neutral-100 dark:bg-neutral-700 
                 rounded-lg shadow cursor-grab active:cursor-grabbing">
      {children}
      <span className="absolute top-1 right-1 text-xs text-neutral-500">⠿</span>
    </div>
  );
}
