import { todolistsApi } from "features/todolistsList/todolists/api/todolists.api";

import { RequestStatusType } from "app/app.reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils";
import {
  FilterValuesType,
  TodolistDomainType,
  TodolistType,
  UpdateTodolistTitleArgType,
} from "features/todolistsList/todolists/api/todolists.api.types";
import { clearTasksAndTodolists } from "common/actions";
import { ResultCode } from "common/enums";

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(
  "todolists/fetchTodolists",
  async () => {
    const res = await todolistsApi.getTodolists();
    return { todolists: res.data };
  }
);

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
  "todolists/addTodolist",
  async (title, { rejectWithValue }) => {
    const res = await todolistsApi.createTodolist(title);
    if (res.data.resultCode === ResultCode.Success) {
      return { todolist: res.data.data.item };
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: false });
    }
  }
);

const removeTodolist = createAppAsyncThunk<{ id: string }, string>(
  "todolists/removeTodolist",
  async (id, { dispatch, rejectWithValue }) => {
    dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: "loading" }));
    const res = await todolistsApi.deleteTodolist(id);
    if (res.data.resultCode === ResultCode.Success) {
      return { id };
    } else {
      return rejectWithValue(null);
    }
  }
);

const changeTodolistTitle = createAppAsyncThunk<UpdateTodolistTitleArgType, UpdateTodolistTitleArgType>(
  "todolists/changeTodolistTitle",
  async (arg, { rejectWithValue }) => {
    const res = await todolistsApi.updateTodolist(arg.id, arg.title);
    if (res.data.resultCode === ResultCode.Success) {
      return arg;
    } else {
      return rejectWithValue(null);
    }
  }
);

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state[index].filter = action.payload.filter;
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((td) => ({ ...td, filter: "all", entityStatus: "idle" }));
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        const newTodolist: TodolistDomainType = {
          ...action.payload.todolist,
          filter: "all",
          entityStatus: "idle",
        };
        state.unshift(newTodolist);
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) state.splice(index, 1);
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) state[index].title = action.payload.title;
      })
      .addCase(clearTasksAndTodolists.type, () => {
        return [];
      });
  },
});

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = {
  fetchTodolists,
  addTodolist,
  removeTodolist,
  changeTodolistTitle,
};
