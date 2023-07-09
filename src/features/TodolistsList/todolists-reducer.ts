import { todolistsApi } from "features/TodolistsList/todolists.api";
import { Dispatch } from "redux";

import { appActions, RequestStatusType } from "app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils";
import { TodolistType } from "features/TodolistsList/todolists.types";
import { clearTasksAndTodolists } from "common/actions";

export const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(
  "todolists/fetchTodolists",
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistsApi.getTodolists();
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { todolists: res.data };
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }
);

// export const getTodolistsTC = () => (dispatch: any) => {
//   todolistsApi
//       .getTodolists()
//       .then((res) => {
//         // dispatch(todolistsActions.setTodolists({ todolists: res.data }));
//
//         return res.data;
//       })
//       .then((res) => {
//         res.forEach((tl) => {
//           dispatch(tasksThunk.fetchTasks(tl.id));
//         });
//       });
// };

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
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((td) => ({ ...td, filter: "all", entityStatus: "idle" }));
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
};

// types
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
