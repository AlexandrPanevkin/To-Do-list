import { instance } from "common/api/comon.api";
import { TodolistType } from "features/TodolistsList/todolists/api/todolists.api.types";
import { ResponseType } from "common/types/common.types";

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists");
  },
  createTodolist(title: string) {
    return instance.post<
      ResponseType<{
        item: TodolistType;
      }>
    >("todo-lists", { title });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title });
  },
};
