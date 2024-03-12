"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

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

export async function createAction(formData: FormData) {
  const input = formData.get("input") as string;
  const session = await getServerSession();
  const userEmail = session?.user?.email;

  if (!input.trim()) {
    return;
  }

  await prisma.post.create({
    data: {
      email: userEmail || "",
      content: input,
      isCompleted: false,
      boardName: "Ongoing",
    },
  });
  revalidatePath("/dashboard");
}

export async function editAction(formData: FormData) {
  const id = formData.get("editId") as string;
  const content = formData.get("editValue") as string;

  await prisma.post.update({
    where: {
      id: Number(id),
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
      id: Number(id),
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

export async function changeBoard(id: string, boardName: string) {
  await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      boardName: boardName,
    },
  });
  revalidatePath("/dashboard");
}
