import React, { FC } from "react";
import { EditableSpan } from "common/components";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { TodolistDomainType } from "features/todolistsList/todolists/api/todolists.api.types";
import { useActions } from "common/hooks/useActions";
import { todolistsThunks } from "features/todolistsList/todolists/model/todolists.reducer";

type PropsType = {
  todolist: TodolistDomainType;
};

export const TodolistTitle: FC<PropsType> = ({ todolist }) => {
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  const removeTodolistCallback = () => {
    removeTodolist(todolist.id);
  };

  const changeTodolistTitleCallback = (title: string) => {
    changeTodolistTitle({ id: todolist.id, title });
  };

  return (
    <>
      <EditableSpan value={todolist.title} onChange={changeTodolistTitleCallback} />
      <IconButton disabled={todolist.entityStatus === "loading"} onClick={removeTodolistCallback}>
        <Delete />
      </IconButton>
    </>
  );
};
