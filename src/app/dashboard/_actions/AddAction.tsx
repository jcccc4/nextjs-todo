"use client";
import { HabitFrequencyType } from "@prisma/client";
import { createAction } from "@/data-access/todoActions";
import { addTodoProps } from "@/lib/types";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

// 1. Define your form.
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    username: "",
  },
});

export function AddAction({
  boardName,
  setOptimisticTasks,
  taskLength,
}: addTodoProps) {
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default AddAction;

// const { data: session } = useSession();
//   const createTask = async (formData: FormData) => {
//     const id = formData.get("id") as string;
//     const title = formData.get("habit") as string;
//     const email = formData.get("email") as string;
//     const order = taskLength + 1;
//     const task = {
//       id,
//       order,
//       title,
//       type: HabitFrequencyType.DAILY,
//       email,
//       monday: false,
//       tuesday: false,
//       wednesday: false,
//       thursday: false,
//       friday: false,
//       saturday: false,
//       sunday: false,
//     };
//     setOptimisticTasks({
//       action: "addTask",
//       task,
//     });

//     await createAction(task);
//   };

// <Form action={createTask} className="mx-2">
//   <Input name="boardName" type="hidden" value={boardName} />
//   <Input name="id" type="hidden" value={uuidv4()} />
//   <Input name="email" type="hidden" value={session?.user.email || ""} />
//   <Input id="createTask" name="habit" type="text" placeholder="Add Task" />
// </Form>
