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
    <div className="flex flex-col items-center mt-[180px] gap-1">
      <h3 className="text-2xl text-[#09090B]">You have no habit listed</h3>
      <p className="text-xl text-[#696969]">
        Turn wishes into reality. Create habits that last
      </p>
      <Button onClick={handleClick} className="mt-4">
        Add Habit
      </Button>
      {showModal && <p>asdf</p>}
      {showModal && <HabitModal show={showModal} handleClick={handleClick} />}
    </div>
  );
};

export default NoData;
