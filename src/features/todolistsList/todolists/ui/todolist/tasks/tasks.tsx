import React, { FC } from "react";
import { Task } from "features/todolistsList/tasks/ui/task/task";
import { TaskStatuses } from "common/enums";
import { TodolistDomainType } from "features/todolistsList/todolists/api/todolists.api.types";
import { TaskType } from "features/todolistsList/tasks/api/tasks.api.types";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: Array<TaskType>;
};

export const Tasks: FC<PropsType> = ({ todolist, tasks }) => {
  let tasksForTodolist = tasks;
  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <>
      {tasksForTodolist?.map((t) => {
        return <Task key={t.id} task={t} todolistId={todolist.id} />;
      })}
    </>
  );
};
