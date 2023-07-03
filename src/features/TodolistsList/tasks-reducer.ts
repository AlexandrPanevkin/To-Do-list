import { TaskStatuses, TaskType, todolistApi, UpdateTaskModelType } from "api/todolist-api";
import { Dispatch } from "redux";
import { AppRootStateType, ThunkDispatchType } from "app/store";
import { TasksStateType } from "./TodolistList";
import { handleServerNetworkError } from "utils/error-utils";
import { AxiosError } from "axios";
import { appActions } from "app/app-reducer";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistsActions } from "features/TodolistsList/todolists-reducer";
import { clearTasksAndTodolists } from "common/common.actions";

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    removeTask: (state, action: PayloadAction<{ id: string; todolistId: string }>) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) tasks.splice(index, 1);
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      state[action.payload.task.todoListId].unshift(action.payload.task);
    },
    changeTaskTitle: (state, action: PayloadAction<{ id: string; newTitle: string; todolistId: string }>) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        tasks[index].title = action.payload.newTitle;
      }
    },
    changeTaskStatus: (state, action: PayloadAction<{ id: string; status: TaskStatuses; todolistId: string }>) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        tasks[index].status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(todolistsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsActions.removeTodolist, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((td) => {
          state[td.id] = [];
        });
      })
      .addCase(clearTasksAndTodolists.type, () => {
        return {};
      });
  },
});

type AsyncThunkConfig = {
  state?: unknown;
  dispatch?: Dispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

// thunks
const fetchTasks = createAsyncThunk<
  { tasks: TaskType[]; todolistId: string },
  string,
  { state: AppRootStateType; dispatch: ThunkDispatchType; rejectValue: null }
>("tasks/fetchTasks", async (todolistId, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await todolistApi.getTasks(todolistId);
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
    return { todolistId, tasks: res.data.items };
  } catch (e: any) {
    handleServerNetworkError(dispatch, e);
    return rejectWithValue(null);
  }
});

export const removeTasksTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistApi.deleteTask(todolistId, taskId).then(() => {
    dispatch(tasksActions.removeTask({ id: taskId, todolistId }));
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
  });
};
export const addTasksTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistApi
    .createTask(todolistId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(tasksActions.addTask({ task: res.data.data.item }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      } else {
        dispatch(appActions.setAppError({ error: res.data.messages.length ? res.data.messages[0] : "Error" }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      }
    })
    .catch((e: AxiosError<ErrorsType>) => {
      const errorMessage = e.response ? e.response?.data.message : e.message;
      handleServerNetworkError(dispatch, errorMessage);
    });
};
export const updateTaskStatusTC =
  (id: string, status: TaskStatuses, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const task = getState().tasks[todolistId].find((el) => el.id === id);
    if (task) {
      const model: UpdateTaskModelType = {
        title: task.title,
        status,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
      };
      todolistApi
        .updateTask(todolistId, id, model)
        .then(() => {
          dispatch(tasksActions.changeTaskStatus({ id, status, todolistId }));
          dispatch(appActions.setAppStatus({ status: "succeeded" }));
        })
        .catch((e: AxiosError) => {
          handleServerNetworkError(dispatch, e.message);
        });
    }
  };
export const updateTaskTitleTC =
  (id: string, newTitle: string, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find((el) => el.id === id);
    if (task) {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const model: UpdateTaskModelType = {
        title: newTitle,
        status: task.status,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
      };
      todolistApi
        .updateTask(todolistId, id, model)
        .then(() => {
          dispatch(tasksActions.changeTaskTitle({ id, newTitle, todolistId }));
          dispatch(appActions.setAppStatus({ status: "succeeded" }));
        })
        .catch((e) => {
          handleServerNetworkError(dispatch, e.message);
        });
    }
  };

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunk = { fetchTasks };

// types

type ErrorsType = {
  field: string;
  message: string;
};
