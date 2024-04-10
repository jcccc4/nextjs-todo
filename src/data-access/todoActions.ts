"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { habit } from "@/lib/types";

export async function getData() {
  const session = await getServerSession();
  const userEmail = session?.user?.email;
  const data = await prisma.habit.findMany({
    where: {
      email: userEmail || "",
    },
    orderBy: {
      order: "asc",
    },
  });
  revalidatePath("/");
  return data;
}

export async function createAction({
  id,
  order,
  email,
  title,
  type,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
}: habit) {
  if (!title?.trim()) {
    return;
  }

  await prisma.habit.create({
    data: {
      id,
      order,
      email,
      title,
      type,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    },
  });
  revalidatePath("/dashboard");
}

export async function editTitleAction(formData: FormData) {
  const id = formData.get("editId") as string;
  const content = formData.get("editValue") as string;

  await prisma.habit.update({
    where: {
      id: id,
    },
    data: {
      title: content,
    },
  });
}

export async function editDescriptionAction(formData: FormData) {
  const id = formData.get("editId") as string;
  const content = formData.get("editValue") as string;

  await prisma.habit.update({
    where: {
      id: id,
    },
    data: {
      title: content,
    },
  });
}

export async function deleteAction(tasks: habit[], task: habit) {
  const batch = tasks.map((single) => {
    return prisma.habit.update({
      where: {
        id: single.id,
      },
      data: {
        order: --single.order,
      },
    });
  });

  await prisma.$transaction([
    prisma.habit.delete({
      where: {
        id: task.id,
      },
    }),
    ...batch,
  ]);

  revalidatePath("/dashboard");
}
