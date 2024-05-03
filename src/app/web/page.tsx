import { getData } from "@/data-access/todoActions";
import NoData from "./_components/NoData";

async function Page() {
  const tasks = await getData();

  return (
    <div>
      <h1 className="text-lg ml-4 mt-2">Habit</h1>
      {!tasks ? <p>test</p> : <NoData />}
    </div>
  );
}

export default Page;
