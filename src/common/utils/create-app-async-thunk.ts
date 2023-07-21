import { AppRootStateType, ThunkDispatchType } from "app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseType } from "common/types";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: ThunkDispatchType;
  rejectValue: null | RejectValueType;
}>();

export type RejectValueType = {
  data: ResponseType;
  showGlobalError: boolean;
};
