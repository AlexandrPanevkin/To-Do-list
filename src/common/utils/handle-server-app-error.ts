import { Dispatch } from "redux";
import { appActions } from "app/app-reducer";
import { ResponseType } from "common/types/common.types";

/**
 * Обработчик ошибки на стороне сервера.
 * @template T- тип данных, содержащихся в теле ответа.
 * @param {ResponseType<T>} data - ответ от сервера с данными или ошибкой
 * @param {Dispatch} dispatch - функция для отправки экшенов в Redux Store
 * @param {boolean} [showError=true] - флаг, указывающий, нужно ли показывать сообщение об ошибке
 * @returns {void}
 */

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch, showError: boolean = true) => {
  if (showError) {
    dispatch(appActions.setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }));
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
