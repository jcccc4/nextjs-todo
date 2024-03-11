"use client";
import React from "react";

function Card({ number }: { number: number }) {
  const dragOver = (e: any) => {
    e.preventDefault();
    console.log("dragOver");
  };

  return (
    <div
      className="min-h-96 min-w-64 bg-orange-400"
      draggable="true"
      onDragOver={dragOver}
    >
      {number}
    </div>
  );
}

export default Card;
