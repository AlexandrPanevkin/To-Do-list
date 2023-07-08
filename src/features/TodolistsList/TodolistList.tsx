import React, { useCallback, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { Todolist } from "./Todolist/Todolist";
import { useAppDispatch, useAppSelector } from "app/store";
import {
  addTodolistTC,
  FilterValuesType,
  getTodolistsTC,
  removeTodolistTC,
  todolistsActions,
  updateTodolistTitleTC,
} from "./todolists-reducer";
import { tasksThunk } from "./tasks-reducer";
import { TaskType } from "features/TodolistsList/todolists.api";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "features/auth/auth.selectors";
import { selectTodolists } from "features/TodolistsList/todolists.selectors";
import { selectTasks } from "features/TodolistsList/tasks.selectors";
import { TaskStatuses } from "common/enums";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export const TodolistList = () => {
  const todolists = useAppSelector(selectTodolists);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const tasks = useAppSelector(selectTasks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(getTodolistsTC());
  }, []);

  const removeTask = useCallback(
    (taskId: string, todolistId: string) => {
      dispatch(tasksThunk.removeTask({ taskId, todolistId }));
    },
    [dispatch]
  );

  const addTask = useCallback(
    (title: string, todolistId: string) => {
      dispatch(tasksThunk.addTask({ todolistId, title }));
    },
    [dispatch]
  );

  const changeStatus = useCallback(
    (taskId: string, status: TaskStatuses, todolistId: string) => {
      dispatch(tasksThunk.updateTask({ taskId, domainModel: { status }, todolistId }));
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    (taskId: string, title: string, todolistId: string) => {
      dispatch(tasksThunk.updateTask({ taskId, domainModel: { title }, todolistId }));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (id: string, filter: FilterValuesType) => {
      dispatch(todolistsActions.changeTodolistFilter({ id, filter }));
    },
    [dispatch]
  );

  const removeTodolist = useCallback(
    (id: string) => {
      dispatch(removeTodolistTC(id));
    },
    [dispatch]
  );

  const changeTodolistTitle = useCallback(
    (id: string, title: string) => {
      dispatch(updateTodolistTitleTC(id, title));
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch]
  );

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
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
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  filter={tl.filter}
                  removeTodolist={removeTodolist}
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
