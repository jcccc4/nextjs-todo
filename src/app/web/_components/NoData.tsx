"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import HabitModal from "./HabitModal";

const NoData = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex flex-col items-center mt-[200px] gap-1">
      <h3 className=" text-[#09090B]">You have no habit listed</h3>
      <p className="text-sm text-[#5E5E5E]">
        Turn wishes into reality. Create habits that last
      </p>
      <Button onClick={handleClick} className="mt-3">
        Add Habit
      </Button>
      {showModal && <p>asdf</p>}
      {showModal && <HabitModal show={showModal} handleClick={handleClick} />}
    </div>
  );
};

export default NoData;
