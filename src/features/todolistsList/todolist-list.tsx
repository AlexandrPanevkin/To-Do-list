import React, { useCallback, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components/AddItemForm/addItemForm";
import { Todolist } from "features/todolistsList/todolists/ui/todolist/todolist";
import { useAppSelector } from "app/store";
import { todolistsActions, todolistsThunks } from "features/todolistsList/todolists/model/todolists.reducer";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "features/auth/auth.selectors";
import { selectTodolists } from "features/todolistsList/todolists/model/todolists.selectors";
import { selectTasks } from "features/todolistsList/tasks/model/tasks.selectors";
import { useActions } from "common/hooks/useActions";
import { TaskType } from "features/todolistsList/tasks/api/tasks.api.types";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export const TodolistList = () => {
  const todolists = useAppSelector(selectTodolists);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const tasks = useAppSelector(selectTasks);

  const { fetchTodolists, addTodolist } = useActions(todolistsThunks);

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchTodolists({});
  }, []);

  const createTodolist = useCallback((title: string) => {
    return addTodolist(title).unwrap();
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
                <Todolist key={tl.id} todolist={tl} tasks={tasks[tl.id]} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
