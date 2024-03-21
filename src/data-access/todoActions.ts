"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { dataProps } from "@/lib/types";

export async function getData() {
  const session = await getServerSession();
  const userEmail = session?.user?.email;
  const data = await prisma.post.findMany({
    where: {
      email: userEmail || "",
    },
    orderBy: {
      id: "asc",
    },
  });
  revalidatePath("/");
  return data;
}

export async function createAction(
  formData: FormData,
  { email, order }: { email: string; order: number }
) {
  const id = formData.get("id") as string;
  const input = formData.get("input") as string;
  const boardName = formData.get("boardName") as string;

  if (!input.trim()) {
    return;
  }

  await prisma.post.create({
    data: {
      id: id,
      order: order,
      email: email || "",
      content: input,
      boardName: boardName,
    },
  });
  revalidatePath("/dashboard");
}

export async function editAction(formData: FormData) {
  const id = formData.get("editId") as string;
  const content = formData.get("editValue") as string;

  await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      content: content,
    },
  });
  revalidatePath("/dashboard");
}

export async function deleteAction(formData: FormData) {
  const id = formData.get("inputId") as string;

  await prisma.post.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/dashboard");
}

export async function getBoard() {
  const session = await getServerSession(authOptions);

  const todo = await prisma.board.findMany({
    where: {
      email: session?.user?.email || "",
    },
  });
  revalidatePath("/dashboard");
  return todo;
}
export async function changeBoard({
  id,
  boardName,
  formerBoardName,
  order,
  formerOrder,
}: {
  id: string;
  boardName: string;
  formerBoardName: string;
  order: number;
  formerOrder: string;
}) {
  await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      order: order,
      boardName: boardName,
    },
  });
  revalidatePath("/dashboard");
}

export async function createBoard(boardName: string, email: string) {
  await prisma.board.create({
    data: {
      id: uuidv4(),
      boardName,
      email,
    },
  });
  revalidatePath("/dashboard");
}
