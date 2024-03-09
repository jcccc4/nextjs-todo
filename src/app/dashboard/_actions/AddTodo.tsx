"use client";

import { createAction } from "@/data-access/todoActions";

function AddTodo() {
  return (
    <form
      action={createAction}
      className="w-1/2 m-auto"
    >
      <input
        id="createTask"
        name="input"
        type="text"
        className="max-w-sm mx-auto mt-10 mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder="Add Task"
      />
    </form>
  );
}

export default AddTodo;
