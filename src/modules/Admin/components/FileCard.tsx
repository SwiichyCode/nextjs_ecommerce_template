import { DraggableProvided } from "@hello-pangea/dnd";

type Props = {
  item: unknown;
  provided: DraggableProvided;
};

export const FileCard = ({ item, provided }: Props) => {
  return (
    <div
      className="border-primary w-full rounded border shadow"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <img
        src={item as string}
        className="border-primary max-h-40 w-full rounded-t border-b object-cover"
      />

      <div className="flex items-start justify-between p-4">
        <div>
          <h3 className="text-lg font-semibold">File name</h3>
          <p className="text-sm text-gray-500">PNG - 2500×3209 - 2.3MB</p>
        </div>
        <div className="rounded bg-slate-500 p-[2px]">
          <span className="text-primary text-sm font-bold capitalize">
            FILE
          </span>
        </div>
      </div>
    </div>
  );
};
