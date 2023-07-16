import { RequestStatusType } from "app/app-reducer";

export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
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
