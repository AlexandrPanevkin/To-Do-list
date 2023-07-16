import { AxiosResponse } from "axios";

import { instance } from "common/api/comon.api";
import { UserType } from "features/TodolistsList/todolists/todolists.types";
import { ResponseType } from "common/types/common.types";

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<
      ResponseType<{ userId: number }>,
      AxiosResponse<ResponseType<{ id: number }>>,
      LoginParamsType
    >("auth/login", data);
  },
  logout() {
    return instance.delete<ResponseType>("auth/login");
  },
  me() {
    return instance.get<ResponseType<UserType>>("auth/me");
  },
};

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
