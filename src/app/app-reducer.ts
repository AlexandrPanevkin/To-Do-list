import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { authAPI } from "api/todolist-api";
import { handleServerNetworkError } from "utils/error-utils";
import { authActions } from "features/Login/auth-reducer";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type AppInitialStateType = typeof initialState;

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as null | string,
  isInitialized: false,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      } else {
        dispatch(appActions.setAppError({ error: res.data.messages.length ? res.data.messages[0] : "Error" }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      }
    })
    .catch((e) => {
      handleServerNetworkError(dispatch, e);
    })
    .finally(() => {
      dispatch(appActions.setIsInitialized({ isInitialized: true }));
    });
};
