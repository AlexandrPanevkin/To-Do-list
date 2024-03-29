import { todolistsReducer, todolistsThunks } from "features/todolistsList/todolists/model/todolists.reducer";
import { tasksReducer } from "features/todolistsList/tasks/model/tasks.reducer";
import { TasksStateType } from "features/todolistsList/todolist-list";
import { TodolistDomainType, TodolistType } from "features/todolistsList/todolists/api/todolists.api.types";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  let todolist: TodolistType = {
    title: "new todolist",
    id: "any id",
    addedDate: "",
    order: 0,
  };

  const action = todolistsThunks.addTodolist.fulfilled({ todolist }, "requestedId", todolist.title);

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
