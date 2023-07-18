import React, { FC, memo, useCallback, useEffect } from "react";
import { AddItemForm } from "common/components/AddItemForm/addItemForm";
import { EditableSpan } from "common/components/EditableSpan/editableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Task } from "features/todolistsList/tasks/ui/task/task";
import { RequestStatusType } from "app/app.reducer";
import { TaskStatuses } from "common/enums";
import { FilterValuesType } from "features/todolistsList/todolists/api/todolists.api.types";
import { tasksThunks } from "features/todolistsList/tasks/model/tasks.reducer";
import { useAppDispatch } from "common/hooks";
import { TaskType } from "features/todolistsList/tasks/api/tasks.api.types";
import { useActions } from "common/hooks/useActions";
import { todolistsActions, todolistsThunks } from "features/todolistsList/todolists/model/todolists.reducer";

type PropsType = {
  todolistId: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export const Todolist: FC<PropsType> = memo(({ todolistId, title, filter, tasks, entityStatus }) => {
  const { addTask } = useActions(tasksThunks);
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);
  const { changeTodolistFilter } = useActions(todolistsActions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(todolistId));
  }, []);

  const removeTodolistCallback = useCallback(() => {
    removeTodolist(todolistId);
  }, [todolistId]);

  const changeTodolistTitleCallback = useCallback(
    (title: string) => {
      changeTodolistTitle({ id: todolistId, title });
    },
    [todolistId, title]
  );

  const addTaskCallback = (title: string) => {
    addTask({ title, todolistId });
  };

  const onAllClickHandler = useCallback(
    () =>
      changeTodolistFilter({
        id: todolistId,
        filter: "all",
      }),
    [todolistId]
  );
  const onActiveClickHandler = useCallback(
    () =>
      changeTodolistFilter({
        id: todolistId,
        filter: "active",
      }),
    [todolistId]
  );
  const onCompletedClickHandler = useCallback(
    () =>
      changeTodolistFilter({
        id: todolistId,
        filter: "completed",
      }),
    [todolistId]
  );

  let tasksForTodolist = tasks;
  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleCallback} />
        <IconButton disabled={entityStatus === "loading"} onClick={removeTodolistCallback}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskCallback} />
      <div>
        {tasksForTodolist?.map((t) => {
          return <Task key={t.id} task={t} todolistId={todolistId} />;
        })}
      </div>
      <div>
        <Button variant={filter === "all" ? "outlined" : "text"} onClick={onAllClickHandler} color={"inherit"}>
          All
        </Button>
        <Button variant={filter === "active" ? "outlined" : "text"} onClick={onActiveClickHandler} color={"primary"}>
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
