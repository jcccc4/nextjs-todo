import { $Enums, HabitFrequencyType } from "@prisma/client";
import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type habit = {
  id: string;
  title: string;
  email: string;
  type: $Enums.HabitFrequencyType;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  order: number;
};

export type optimisticArguments = {
  task: habit;
  action: string;
  newBoardName?: string;
  newOrder?: number;
};

export type addTodoProps = {
  boardName: string;
  setIsHabitModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setOptimisticTasks: (data: optimisticArguments) => void;
  taskLength: number;
};
export type BoardProps = {
  filteredData: habit[];
  setOptimisticTasks: (data: optimisticArguments) => void;
  boardName: string;
  cards: habit[];
};
export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;
