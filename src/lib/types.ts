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

export type dataProps = {
  id: string;
  order: number;
  content: string;
  email: string;
  boardName: string;
};

export type optimisticArguments = {
  task: dataProps;
  action: string;
  newBoardName?: string;
  newOrder?: number;
};

export type addTodoProps = {
  boardName: string;
  setOptimisticTasks: (data: optimisticArguments) => void;
  taskLength: number;
};
export type BoardProps = {
  filteredData: dataProps[];
  setOptimisticTasks: (data: optimisticArguments) => void;
  boardName: string;
  cards: dataProps[];
};
export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;
