import { todolistsApi, TodolistType } from "features/TodolistsList/todolists.api";
import { Dispatch } from "redux";

import { tasksThunk } from "./tasks-reducer";
import { appActions, RequestStatusType } from "app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { handleServerAppError } from "common/utils";

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      const newTodolist: TodolistDomainType = { ...action.payload.todolist, filter: "all", entityStatus: "idle" };
      state.unshift(newTodolist);
    },
    changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state[index].title = action.payload.title;
    },
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state[index].filter = action.payload.filter;
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus;
    },
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      return action.payload.todolists.map((td) => ({ ...td, filter: "all", entityStatus: "idle" }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearTasksAndTodolists.type, () => {
      return [];
    });
  },
});

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;

//thunks
export const getTodolistsTC = () => (dispatch: any) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(todolistsActions.setTodolists({ todolists: res.data }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return res.data;
    })
    .then((res) => {
      res.forEach((tl) => {
        dispatch(tasksThunk.fetchTasks(tl.id));
      });
    });
};

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistsApi.createTodolist(title).then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  });
};

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: "loading" }));
  todolistsApi
    .deleteTodolist(id)
    .then(() => {
      dispatch(todolistsActions.removeTodolist({ id }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    })
    .catch((e) => {
      dispatch(appActions.setAppStatus({ status: "failed" }));
      dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: "failed" }));
      dispatch(appActions.setAppError({ error: e.message }));
    });
};

export const updateTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistsApi.updateTodolist(id, title).then(() => {
    dispatch(todolistsActions.changeTodolistTitle({ id, title }));
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
  });
};

// types
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
