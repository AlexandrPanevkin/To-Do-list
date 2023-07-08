import { Dispatch } from "redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appActions } from "app/app-reducer";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { handleServerNetworkError } from "common/utils/handle-server-network-error";
import { authAPI, LoginParamsType } from "features/auth/auth.api";

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
  dispatch(appActions.setAppStatus({ status: "loading" }));
  authAPI
    .login(data)
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
    });
};

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        dispatch(clearTasksAndTodolists());
      } else {
        dispatch(appActions.setAppError({ error: res.data.messages.length ? res.data.messages[0] : "Error" }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      }
    })
    .catch((e) => {
      handleServerNetworkError(dispatch, e);
    });
};
