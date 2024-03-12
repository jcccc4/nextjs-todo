"use client";
import React, { useState } from "react";
import Column from "./Column";
import { board, dataProps } from "@/lib/types";

const Board = ({ board, tasks }: { board: board[]; tasks: dataProps[] }) => {
  const [cards, setCards] = useState<dataProps[]>(tasks);
  const filterArray = (item: dataProps, boardName: string) =>
    item.boardName === boardName;

  return (
    <div className="ml-4 flex gap-4">
      <Column
        filteredData={cards.filter((item) => filterArray(item, "Ongoing"))}
        setCards={setCards}
        boardName={"Ongoing"}
        cards={cards}
      />
      <Column
        filteredData={cards.filter((item) => filterArray(item, "Completed"))}
        setCards={setCards}
        boardName={"Completed"}
        cards={cards}
      />
      {/* {board.map((board: board) => (
        <Column
          filteredData={cards.filter((item) => filterArray(item, "done"))}
          setCards={setCards}
          boardName={board.boardName}
          cards={cards}
        />
      ))} */}
    </div>
  );
};

export default Board;
