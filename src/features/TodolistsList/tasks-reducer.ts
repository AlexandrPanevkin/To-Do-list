import { TaskStatuses, TaskType, todolistApi, UpdateTaskModelType } from "api/todolist-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "app/store";
import { TasksStateType } from "./TodolistList";
import { handleServerNetworkError } from "utils/error-utils";
import { AxiosError } from "axios";
import { appActions } from "app/app-reducer";

const initialState: TasksStateType = {};

export const tasksReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((el) => el.id !== action.payload.id),
      };
    case "ADD-TASK":
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
      };
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((el) =>
          el.id === action.payload.id
            ? {
                ...el,
                status: action.payload.status,
              }
            : el
        ),
      };
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((el) =>
          el.id === action.payload.id
            ? {
                ...el,
                title: action.payload.newTitle,
              }
            : el
        ),
      };
    case "SET-TODOLISTS": {
      let copyState = { ...state };
      action.todolists.forEach((td: { id: string | number }) => {
        copyState[td.id] = [];
      });
      return copyState;
    }
    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todolist.id]: [],
      };
    case "REMOVE-TODOLIST":
      let copyState = { ...state };
      delete copyState[action.todolistId];
      return copyState;
    case "SET-TASKS": {
      return {
        ...state,
        [action.todolistId]: action.tasks,
      };
    }
    case "CLEAR-TODOS-DATA":
      return {};
    default:
      return state;
  }
};

// actions
export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
  ({ type: "SET-TASKS", todolistId, tasks } as const);
export const removeTaskAC = (id: string, todolistId: string) =>
  ({
    type: "REMOVE-TASK",
    payload: { id, todolistId },
  } as const);
export const addTaskAC = (task: TaskType) => ({ type: "ADD-TASK", task } as const);
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string) =>
  ({
    type: "CHANGE-TASK-STATUS",
    payload: { id, status, todolistId },
  } as const);
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) =>
  ({
    type: "CHANGE-TASK-TITLE",
    payload: { id, newTitle, todolistId },
  } as const);

// thunks
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistApi.getTasks(todolistId).then((res) => {
    dispatch(setTasksAC(todolistId, res.data.items));
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
  });
};
export const removeTasksTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistApi.deleteTask(todolistId, taskId).then(() => {
    dispatch(removeTaskAC(taskId, todolistId));
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
  });
};
export const addTasksTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistApi
    .createTask(todolistId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(addTaskAC(res.data.data.item));
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
          dispatch(changeTaskStatusAC(id, status, todolistId));
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
          dispatch(changeTaskTitleAC(id, newTitle, todolistId));
          dispatch(appActions.setAppStatus({ status: "succeeded" }));
        })
        .catch((e) => {
          handleServerNetworkError(dispatch, e.message);
        });
    }
  };

// types

type ErrorsType = {
  field: string;
  message: string;
};
