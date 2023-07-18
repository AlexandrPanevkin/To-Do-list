import React, { FC, memo, useCallback, useEffect } from "react";
import { AddItemForm } from "common/components/AddItemForm/addItemForm";
import { EditableSpan } from "common/components/EditableSpan/editableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Task } from "features/todolistsList/tasks/ui/task/task";
import { TaskStatuses } from "common/enums";
import { TodolistDomainType } from "features/todolistsList/todolists/api/todolists.api.types";
import { tasksThunks } from "features/todolistsList/tasks/model/tasks.reducer";
import { useAppDispatch } from "common/hooks";
import { TaskType } from "features/todolistsList/tasks/api/tasks.api.types";
import { useActions } from "common/hooks/useActions";
import { todolistsActions, todolistsThunks } from "features/todolistsList/todolists/model/todolists.reducer";
import { FilterTasksButtons } from "features/todolistsList/todolists/ui/todolist/filterTasksButtons/filter-tasks-buttons";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: Array<TaskType>;
};

export const Todolist: FC<PropsType> = memo(({ todolist, tasks }) => {
  const { addTask } = useActions(tasksThunks);
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(todolist.id));
  }, []);

  const removeTodolistCallback = useCallback(() => {
    removeTodolist(todolist.id);
  }, [todolist.id]);

  const changeTodolistTitleCallback = useCallback(
    (title: string) => {
      changeTodolistTitle({ id: todolist.id, title });
    },
    [todolist.id, todolist.title]
  );

  const addTaskCallback = (title: string) => {
    addTask({ title, todolistId: todolist.id });
  };

  let tasksForTodolist = tasks;
  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      <h3>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitleCallback} />
        <IconButton disabled={todolist.entityStatus === "loading"} onClick={removeTodolistCallback}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskCallback} />
      <div>
        {tasksForTodolist?.map((t) => {
          return <Task key={t.id} task={t} todolistId={todolist.id} />;
        })}
      </div>
      <div>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  );
});
