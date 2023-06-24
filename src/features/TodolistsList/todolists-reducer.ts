import { todolistApi, TodolistType } from "../../api/todolist-api";
import { Dispatch } from "redux";
import {
  RequestStatusType,
  setErrorAC,
  setErrorACType,
  setRequestStatusAC,
  setRequestStatusACType,
} from "app/app-reducer";
import { handleServerAppError } from "../../utils/error-utils";
import { getTasksTC } from "./tasks-reducer";

const initialState: TodolistDomainType[] = [];

export const todolistsReducer = (
  state: TodolistDomainType[] = initialState,
  action: todolistActionType
): TodolistDomainType[] => {
  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.map((td) => ({ ...td, filter: "all", entityStatus: "idle" }));
    case "REMOVE-TODOLIST":
      return state.filter((td) => td.id !== action.todolistId);
    case "ADD-TODOLIST":
      return [
        {
          id: action.todolist.id,
          title: action.todolist.title,
          filter: "all",
          addedDate: "",
          order: 0,
          entityStatus: "idle",
        },
        ...state,
      ];
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((el) =>
        el.id === action.todolistId
          ? {
              ...el,
              title: action.newTodolistTitle,
            }
          : el
      );
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((el) => (el.id === action.todolistId ? { ...el, filter: action.filter } : el));
    }
    case "SET-ENTITY-STATUS":
      return state.map((el) => (el.id === action.todolistId ? { ...el, entityStatus: action.entityStatus } : el));
    case "CLEAR-TODOS-DATA":
      return [];
    default:
      return state;
  }
};

//actions
export const addTodolistAC = (todolist: TodolistType) => ({ type: "ADD-TODOLIST", todolist } as const);
export const removeTodolistAC = (todolistId: string) => ({ type: "REMOVE-TODOLIST", todolistId } as const);
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) =>
  ({
    type: "CHANGE-TODOLIST-TITLE",
    todolistId,
    newTodolistTitle,
  } as const);
export const changeFilterAC = (todolistId: string, newFilter: FilterValuesType) =>
  ({
    type: "CHANGE-TODOLIST-FILTER",
    todolistId,
    filter: newFilter,
  } as const);
export const setTodolistsAC = (todolists: TodolistType[]) => ({ type: "SET-TODOLISTS", todolists } as const);
export const setEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) =>
  ({
    type: "SET-ENTITY-STATUS",
    todolistId,
    entityStatus,
  } as const);
export const clearTodosDataAC = () =>
  ({
    type: "CLEAR-TODOS-DATA",
  } as const);

//thunks
export const getTodolistsTC = () => (dispatch: any) => {
  dispatch(setRequestStatusAC("loading"));
  todolistApi
    .getTodolists()
    .then((res) => {
      dispatch(setTodolistsAC(res.data));
      dispatch(setRequestStatusAC("succeeded"));
      return res.data;
    })
    .then((res) => {
      res.forEach((tl) => {
        dispatch(getTasksTC(tl.id));
      });
    });
};

export const addTodolistTC = (title: string) => (dispatch: Dispatch<todolistActionType>) => {
  dispatch(setRequestStatusAC("loading"));
  todolistApi.createTodolist(title).then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(addTodolistAC(res.data.data.item));
      dispatch(setRequestStatusAC("succeeded"));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  });
};

export const removeTodolistTC = (id: string) => (dispatch: Dispatch<todolistActionType>) => {
  dispatch(setRequestStatusAC("loading"));
  dispatch(setEntityStatusAC(id, "loading"));
  todolistApi
    .deleteTodolist(id)
    .then(() => {
      dispatch(removeTodolistAC(id));
      dispatch(setRequestStatusAC("succeeded"));
    })
    .catch((e) => {
      dispatch(setRequestStatusAC("failed"));
      dispatch(setEntityStatusAC(id, "failed"));
      dispatch(setErrorAC(e.message));
    });
};

export const updateTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<todolistActionType>) => {
  dispatch(setRequestStatusAC("loading"));
  todolistApi.updateTodolist(id, title).then(() => {
    dispatch(changeTodolistTitleAC(id, title));
    dispatch(setRequestStatusAC("succeeded"));
  });
};

// types
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export type setTodolistsACType = ReturnType<typeof setTodolistsAC>;
export type addTodolistACType = ReturnType<typeof addTodolistAC>;
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>;
export type clearTodosDataACType = ReturnType<typeof clearTodosDataAC>;
type todolistActionType =
  | removeTodolistACType
  | addTodolistACType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof setEntityStatusAC>
  | setRequestStatusACType
  | setErrorACType
  | clearTodosDataACType;
