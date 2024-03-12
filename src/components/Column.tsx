import React from "react";
import Card from "./Card";
import { dataProps } from "@/lib/types";
import { changeBoard } from "@/data-access/todoActions";
type Props = {
  filteredData: dataProps[];
  setCards: (data: dataProps[]) => void;
  boardName: string | null;
  cards: dataProps[];
};
const Column = ({ filteredData, setCards, boardName, cards }: Props) => {
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const onDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    boardName: string
  ) => {
    let id = e.dataTransfer.getData("id");
    let myList = [...cards];
    await changeBoard(id, boardName);
    setCards(
      myList.map((artwork) => {
        if (artwork.id === Number(id)) {
          return { ...artwork, boardName: boardName };
        } else {
          return artwork;
        }
      })
    ); //
  };

  return (
    <div
      className="w-64 h-96 border border-blue-700"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, boardName || "")}
    >
      <h2 className="mx-1 my-2">{boardName}</h2>
      <ul
        className="flex flex-col gap-2"
        key={`${boardName}-${filteredData.length}`}
      >
        {filteredData.map((item: dataProps) => (
          <Card description={item.content} id={item.id} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default Column;
