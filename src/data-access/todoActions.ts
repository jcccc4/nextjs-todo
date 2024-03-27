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
      order: "asc",
    },
  });
  revalidatePath("/");
  return data;
}

export async function createAction(data: dataProps) {
  if (!data.content?.trim()) {
    return;
  }

  await prisma.post.create({
    data: {
      id: data.id,
      order: data.order,
      email: data.email,
      content: data.content,
      boardName: data.boardName || "",
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

export async function deleteAction(formData: FormData, tasks: dataProps[]) {
  const task = tasks.find(
    (single) => single.id === (formData.get("inputId") as string)
  );
 

  if (task) {
    const batch = tasks
      .filter((single) => single.order > task.order)
      .map((single) =>
        prisma.post.update({
          where: {
            id: single.id,
          },
          data: {
            order: --single.order,
          },
        })
      );

    await prisma.$transaction([
      prisma.post.delete({
        where: {
          id: task?.id,
        },
      }),
      ...batch,
    ]);
  }

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
  task,
  newBoardName,
  newOrder,
  cards,
}: {
  task: dataProps | undefined;
  newBoardName: string;
  newOrder: number;
  cards: dataProps[];
}) {
  const batch = cards
    .filter((single) => {
      return (
        task && task.boardName === task.boardName && single.order > task.order
      );
    })
    .map((data) => {
      return prisma.post.update({
        where: {
          id: data.id,
        },
        data: {
          order: --data.order,
        },
      });
    });
  if (task) {
    await prisma.$transaction([
      prisma.post.update({
        where: {
          id: task.id,
        },
        data: {
          order: newOrder,
          boardName: newBoardName,
        },
      }),
      ...batch,
    ]);
  }
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
