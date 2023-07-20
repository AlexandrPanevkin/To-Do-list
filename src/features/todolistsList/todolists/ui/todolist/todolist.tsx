import React, { FC, memo, useEffect } from "react";
import { AddItemForm } from "common/components/AddItemForm/addItemForm";
import { TodolistDomainType } from "features/todolistsList/todolists/api/todolists.api.types";
import { tasksThunks } from "features/todolistsList/tasks/model/tasks.reducer";
import { useAppDispatch } from "common/hooks";
import { TaskType } from "features/todolistsList/tasks/api/tasks.api.types";
import { useActions } from "common/hooks/useActions";
import { FilterTasksButtons } from "features/todolistsList/todolists/ui/todolist/filterTasksButtons/filter-tasks-buttons";
import { Tasks } from "features/todolistsList/todolists/ui/todolist/tasks/tasks";
import { TodolistTitle } from "features/todolistsList/todolists/ui/todolist/todolist-title/todolist-title";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: Array<TaskType>;
};

export const Todolist: FC<PropsType> = memo(({ todolist, tasks }) => {
  const { addTask } = useActions(tasksThunks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(todolist.id));
  }, []);

  const addTaskCallback = (title: string) => {
    return addTask({ title, todolistId: todolist.id }).unwrap();
  };

  return (
    <div>
      <h3>
        <TodolistTitle todolist={todolist} />
      </h3>
      <AddItemForm addItem={addTaskCallback} />
      <div>
        <Tasks todolist={todolist} tasks={tasks} />
      </div>
      <div>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  );
});
