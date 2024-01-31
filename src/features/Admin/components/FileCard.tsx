import Image from "next/image";
import type { DraggableProvided } from "@hello-pangea/dnd";
import { Cross2Icon } from "@radix-ui/react-icons";

type Props = {
  item: unknown;
  provided: DraggableProvided;
  index: number;
  removeImage: (url: string) => void;
};

// const FileInformations = () => {
//   return (
//     <div className="flex items-start justify-between p-4">
//       <div>
//         <h3 className="text-lg font-semibold">File name</h3>
//         <p className="text-sm text-gray-500">PNG - 2500×3209 - 2.3MB</p>
//       </div>
//       <div className="rounded bg-slate-500 p-[2px]">
//         <span className="text-sm font-bold capitalize text-primary">FILE</span>
//       </div>
//     </div>
//   );
// };

export const FileCard = ({ item, provided, index, removeImage }: Props) => {
  return (
    <div
      className="relative h-28 w-28 rounded border border-primary shadow"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Image
        src={item as string}
        width={112}
        height={112}
        alt="product image"
        className="min-h-28 rounded border-b border-primary object-cover"
      />

      <div className="absolute left-2 top-2 rounded bg-tertiary p-1 px-2 text-xs text-white">
        {index + 1}
      </div>

      <div
        className="absolute right-2 top-2 cursor-pointer rounded p-1 "
        onClick={() => removeImage(item as string)}
      >
        <Cross2Icon color="red" />
      </div>

      {/* <FileInformations /> */}
    </div>
  );
};
