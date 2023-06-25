import { Dispatch } from "redux";
import { authAPI, LoginParamsType } from "api/todolist-api";
import { handleServerNetworkError } from "utils/error-utils";
import { clearTodosDataAC } from "../TodolistsList/todolists-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appActions } from "app/app-reducer";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  dispatch(appActions.setStatus({ status: "loading" }));
  authAPI
    .login(data)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
        dispatch(appActions.setStatus({ status: "succeeded" }));
      } else {
        dispatch(appActions.setAppError({ error: res.data.messages.length ? res.data.messages[0] : "Error" }));
        dispatch(appActions.setStatus({ status: "succeeded" }));
      }
    })
    .catch((e) => {
      handleServerNetworkError(dispatch, e);
    });
};

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(appActions.setStatus({ status: "loading" }));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
        dispatch(appActions.setStatus({ status: "succeeded" }));
        dispatch(clearTodosDataAC());
      } else {
        dispatch(appActions.setAppError({ error: res.data.messages.length ? res.data.messages[0] : "Error" }));
        dispatch(appActions.setStatus({ status: "succeeded" }));
      }
    })
    .catch((e) => {
      handleServerNetworkError(dispatch, e);
    });
};
