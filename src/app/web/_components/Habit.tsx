import React from "react";
import { Button } from "@/components/ui/button";
import { habit } from "@/lib/types";

const Habit = ({ data }: { data: habit }) => {
  return (
    <li className="h-14 hover:bg-[#F5F5F5] flex items-center justify-between px-6" draggable="true">
      <div className="flex gap-3">
        <div className="bg-red-200 h-6 w-6 rounded-full"></div>
        <div>{data.title}</div>
      </div>
      <Button variant="outline">Done</Button>
    </li>
  );
};

export default Habit;
