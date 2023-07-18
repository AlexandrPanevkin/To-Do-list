import React, { FC } from "react";
import { Button } from "@mui/material";
import { FilterValuesType, TodolistDomainType } from "features/todolistsList/todolists/api/todolists.api.types";
import { useActions } from "common/hooks/useActions";
import { todolistsActions } from "features/todolistsList/todolists/model/todolists.reducer";

type PropsType = {
  todolist: TodolistDomainType;
};

export const FilterTasksButtons: FC<PropsType> = ({ todolist }) => {
  const { changeTodolistFilter } = useActions(todolistsActions);

  const onClickFilterHandler = (filter: FilterValuesType) => {
    changeTodolistFilter({
      id: todolist.id,
      filter,
    });
  };
  return (
    <>
      <Button
        variant={todolist.filter === "all" ? "outlined" : "text"}
        onClick={() => onClickFilterHandler("all")}
        color={"inherit"}
      >
        All
      </Button>
      <Button
        variant={todolist.filter === "active" ? "outlined" : "text"}
        onClick={() => onClickFilterHandler("active")}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={todolist.filter === "completed" ? "outlined" : "text"}
        onClick={() => onClickFilterHandler("completed")}
        color={"secondary"}
      >
        Completed
      </Button>
    </>
  );
};
