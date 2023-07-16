import { TaskPriorities, TaskStatuses } from "common/enums";
import { UpdateDomainTaskModelType } from "features/TodolistsList/tasks/tasks-reducer";
import { RequestStatusType } from "app/app-reducer";

export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};
export type UserType = {
  id: string;
  email: string;
  login: string;
};

export type UpdateTodolistTitleArgType = {
  id: string;
  title: string;
};

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
