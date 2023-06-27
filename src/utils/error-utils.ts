import { Dispatch } from "redux";
import { ResponseType } from "api/todolist-api";
import { appActions } from "app/app-reducer";

export const handleServerNetworkError = (dispatch: Dispatch, error: string) => {
  dispatch(appActions.setAppStatus({ status: "failed" }));
  dispatch(appActions.setAppError({ error: error }));
};

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setAppError({ error: "Some error occurred" }));
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
