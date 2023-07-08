import { AppRootStateType, ThunkDispatchType } from "app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: ThunkDispatchType;
  rejectValue: null;
}>();
