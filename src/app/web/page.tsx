import { getData } from "@/data-access/todoActions";
import NoData from "./_components/NoData";

async function Page() {
  const tasks = await getData();

  return (
    <div>
      <h1 className="text-2xl ml-6 mt-6">Habit</h1>
      {!tasks ? <p>test</p> : <NoData />}
    </div>
  );
}

export default Page;
