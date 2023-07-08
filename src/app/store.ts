import { tasksReducer } from "features/TodolistsList/tasks-reducer";
import { todolistsReducer } from "features/TodolistsList/todolists-reducer";
import { AnyAction, combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { appReducer } from "./app-reducer";
import { authReducer } from "features/auth/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type ThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>;

export const useAppDispatch = () => useDispatch<ThunkDispatchType>();

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

export type AppRootStateType = ReturnType<typeof rootReducer>;
