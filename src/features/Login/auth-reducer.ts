import { Dispatch } from "redux";
import { setErrorAC, setIsInitializedAC, setRequestStatusAC } from "app/app-reducer";
import { authAPI, LoginParamsType } from "api/todolist-api";
import { handleServerNetworkError } from "utils/error-utils";
import { clearTodosDataAC } from "../TodolistsList/todolists-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  dispatch(setRequestStatusAC("loading"));
  authAPI
    .login(data)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
        dispatch(setRequestStatusAC("succeeded"));
      } else {
        dispatch(setErrorAC(res.data.messages.length ? res.data.messages[0] : "Error"));
        dispatch(setRequestStatusAC("succeeded"));
      }
    })
    .catch((e) => {
      handleServerNetworkError(dispatch, e);
    });
};

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setRequestStatusAC("loading"));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
        dispatch(setRequestStatusAC("succeeded"));
        dispatch(clearTodosDataAC());
      } else {
        dispatch(setErrorAC(res.data.messages.length ? res.data.messages[0] : "Error"));
        dispatch(setRequestStatusAC("succeeded"));
      }
    })
    .catch((e) => {
      handleServerNetworkError(dispatch, e);
    });
};

export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(setRequestStatusAC("loading"));
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
        dispatch(setRequestStatusAC("succeeded"));
      } else {
        dispatch(setErrorAC(res.data.messages.length ? res.data.messages[0] : "Error"));
        dispatch(setRequestStatusAC("succeeded"));
      }
    })
    .catch((e) => {
      handleServerNetworkError(dispatch, e);
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true));
    });
};
