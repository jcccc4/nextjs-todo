import { dataProps, optimisticArguments } from "@/lib/types";

export const optimisticChangeBoard = (
  state: dataProps[],
  optimisticState: optimisticArguments
) =>
  state
    .map((data) => {
      if (
        optimisticState.task &&
        optimisticState.newOrder &&
        optimisticState.newBoardName &&
        data.id === optimisticState.task.id
      ) {
        return {
          ...data,
          boardName: optimisticState.newBoardName,
          order: optimisticState.newOrder,
        };
      }

      if (
        optimisticState.task &&
        data.boardName === optimisticState.task.boardName &&
        data.order > optimisticState.task.order
      ) {
        return { ...data, order: --data.order };
      }

      return data;
    })
    .sort((a, b) => a.order - b.order);

export const optimisticAddTask = (
  state: dataProps[],
  optimisticState: optimisticArguments
) => {
  if (optimisticState.task == undefined) {
    return state;
  }
  return [...state, optimisticState.task];
};

export const optimisticDeleteTask = (
  state: dataProps[],
  optimisticState: optimisticArguments
) => {
  const task = state.find((single) => single.id === optimisticState.task?.id);
  console.log(task)
  if (task) {
    return state
      .filter((single) => single.id !== optimisticState.task.id)
      .map((single) => {
        if (
          single.boardName === optimisticState.task.boardName &&
          single.order > task.order
        ) {
          return { ...single, order: --single.order };
        }
        return single
      });
  }

  return state;
};
