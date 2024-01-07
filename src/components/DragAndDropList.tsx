import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
} from "react-beautiful-dnd";

type Props<T> = {
  items: T[];
  setItems: (items: T[]) => void;
  children: (item: T, provided: DraggableProvided) => React.ReactElement;
  className?: string;
};

export const DragAndDrop = <T extends React.Key>({
  items,
  setItems,
  children,
  className,
}: Props<T>) => {
  const reorder = <T,>(
    list: T[],
    startIndex: number,
    endIndex: number,
  ): T[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);

    if (typeof removed === "undefined") {
      throw new Error("No element at startIndex");
    }

    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newtItems = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    setItems(newtItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={className}
          >
            {items.map((item, index) => (
              <Draggable key={item} draggableId={item.toString()} index={index}>
                {(provided) => React.cloneElement(children(item, provided))}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
