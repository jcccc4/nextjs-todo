import { getData } from "@/data-access/todoActions";
import NoData from "./_components/NoData";
import Habit from "./_components/Habit";

async function Page() {
  const tasks = await getData();
  return (
    <div>
      <h1 className="text-lg ml-4 mt-2">Habit</h1>
      {tasks ? tasks.map((data) => <Habit data={data}/>) : <NoData />}
    </div>
  );
}

export default Page;
