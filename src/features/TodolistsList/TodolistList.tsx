import React, { useCallback, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "components/AddItemForm";
import { Todolist } from "./Todolist/Todolist";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch, useAppSelector } from "app/store";
import {
  addTodolistTC,
  FilterValuesType,
  getTodolistsTC,
  removeTodolistTC,
  todolistsActions,
  updateTodolistTitleTC,
} from "./todolists-reducer";
import { addTasksTC, removeTasksTC, updateTaskStatusTC, updateTaskTitleTC } from "./tasks-reducer";
import { TaskStatuses, TaskType } from "api/todolist-api";
import { Navigate } from "react-router-dom";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export const TodolistList = () => {
  const todolists = useAppSelector((state) => state.todolists);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(getTodolistsTC());
  }, []);

  const removeTask = useCallback(
    (id: string, todolistId: string) => {
      dispatch(removeTasksTC(id, todolistId));
    },
    [dispatch]
  );

  const addTask = useCallback(
    (title: string, todolistId: string) => {
      dispatch(addTasksTC(todolistId, title));
    },
    [dispatch]
  );

  const changeStatus = useCallback(
    (id: string, status: TaskStatuses, todolistId: string) => {
      dispatch(updateTaskStatusTC(id, status, todolistId));
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    (id: string, newTitle: string, todolistId: string) => {
      dispatch(updateTaskTitleTC(id, newTitle, todolistId));
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
