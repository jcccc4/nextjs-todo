import React, { useState } from "react";
import { getData } from "@/data-access/todoActions";
import { Button } from "@/components/ui/Button";
import { set } from "zod";
import HabitModal from "./_components/HabitModal";

async function Page() {
  const tasks = await getData();
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(!showModal);
  };

  // return <Board tasks={tasks} />;
  return (
    <div>
      <h1 className="text-2xl ml-6 mt-6">Habit</h1>
      {!tasks ? (
        <p>test</p>
      ) : (
        <div className="flex flex-col items-center mt-[180px] gap-1">
          <h3 className="text-2xl text-[#09090B]">You have no habit listed</h3>
          <p className="text-xl text-[#696969]">
            Turn wishes into reality. Create habits that last
          </p>
          <Button onClick={handleClick} className="mt-4">
            Add Habit
          </Button>
          {showModal && <HabitModal show={showModal} onClick={handleClick} />}
        </div>
      )}
    </div>
  );
}

export default Page;
