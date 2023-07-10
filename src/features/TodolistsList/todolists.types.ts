import { TaskPriorities, TaskStatuses } from "common/enums";
import { UpdateDomainTaskModelType } from "features/TodolistsList/tasks-reducer";
import { RequestStatusType } from "app/app-reducer";

export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type GetTasksResponseType = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

export type UserType = {
  id: string;
  email: string;
  login: string;
};

export type RemoveTaskArgType = {
  todolistId: string;
  taskId: string;
};

export type UpdateTaskArgType = {
  taskId: string;
  domainModel: UpdateDomainTaskModelType;
  todolistId: string;
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
