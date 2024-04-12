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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  id: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  boardname: z.string(),
  email: z.string(),
  title: z.string(),
  frequency: z.nativeEnum(HabitFrequencyType),
});

export function AddAction({
  boardName,
  setIsHabitModalVisible,
  setOptimisticTasks,
  taskLength,
}: addTodoProps) {
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: uuidv4(),
      boardname: boardName,
      email: session?.user.email || "",
      title: "",
    },
  });

  async function onSubmit({
    id,
    title,
    email,
    frequency,
  }: z.infer<typeof formSchema>) {
    const order = taskLength + 1;
    const task = {
      id,
      order,
      title,
      type: frequency,
      email,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    };
    await createAction(task);
    setIsHabitModalVisible(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-gray-300 w-[350px] p-2"
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <Input type="hidden" placeholder="shadcn" {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="boardname"
          render={({ field }) => (
            <FormItem>
              <Input type="hidden" placeholder="shadcn" {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Input type="hidden" placeholder="shadcn" {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={HabitFrequencyType.DAILY}>
                    {HabitFrequencyType.DAILY}
                  </SelectItem>
                  <SelectItem value={HabitFrequencyType.WEEKLY}>
                    {HabitFrequencyType.WEEKLY}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default AddAction;
