import React, { useCallback, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components/AddItemForm/addItemForm";
import { Todolist } from "features/TodolistsList/todolists/ui/Todolist/todolist";
import { useAppSelector } from "app/store";
import { todolistsActions, todolistsThunks } from "features/TodolistsList/todolists/model/todolists.reducer";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "features/auth/auth.selectors";
import { selectTodolists } from "features/TodolistsList/todolists/model/todolists.selectors";
import { selectTasks } from "features/TodolistsList/tasks/model/tasks.selectors";
import { TaskStatuses } from "common/enums";
import { FilterValuesType } from "features/TodolistsList/todolists/api/todolists.api.types";
import { tasksThunks } from "features/TodolistsList/tasks/model/tasks.reducer";
import { useActions } from "common/hooks/useActions";
import { TaskType } from "features/TodolistsList/tasks/api/tasks.api.types";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export const TodolistList = () => {
  const todolists = useAppSelector(selectTodolists);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const tasks = useAppSelector(selectTasks);

  const {
    fetchTodolists,
    removeTodolist,
    changeTodolistTitle: changeTodolistTitleThunk,
    addTodolist,
  } = useActions(todolistsThunks);
  const { removeTask, addTask, updateTask } = useActions(tasksThunks);
  const { changeTodolistFilter } = useActions(todolistsActions);

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchTodolists({});
  }, []);

  const deleteTask = useCallback((taskId: string, todolistId: string) => {
    removeTask({ taskId, todolistId });
  }, []);

  const createTask = useCallback((title: string, todolistId: string) => {
    addTask({ todolistId, title });
  }, []);

  const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
    updateTask({ taskId, domainModel: { status }, todolistId });
  }, []);

  const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
    updateTask({ taskId, domainModel: { title }, todolistId });
  }, []);

  const changeFilter = useCallback((id: string, filter: FilterValuesType) => {
    changeTodolistFilter({ id, filter });
  }, []);

  const deleteTodolist = useCallback((id: string) => {
    removeTodolist(id);
  }, []);

  const changeTodolistTitle = useCallback((id: string, title: string) => {
    changeTodolistTitleThunk({ id, title });
  }, []);

  const createTodolist = useCallback((title: string) => {
    addTodolist(title);
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={createTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          return (
            <Grid key={tl.id} item>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  key={tl.id}
                  todolistId={tl.id}
                  entityStatus={tl.entityStatus}
                  title={tl.title}
                  tasks={tasks[tl.id]}
                  removeTask={deleteTask}
                  changeFilter={changeFilter}
                  addTask={createTask}
                  changeTaskStatus={changeStatus}
                  filter={tl.filter}
                  removeTodolist={deleteTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
