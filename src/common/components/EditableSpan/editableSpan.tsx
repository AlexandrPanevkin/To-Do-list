import TextField from "@mui/material/TextField/TextField";
import React, {ChangeEvent, FC, useState} from "react";

type PropsType = {
  value: string;
  onChange: (newValue: string) => void;
};

export const EditableSpan: FC<PropsType> = ({onChange, value}) => {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(value);
  };
  const activateViewMode = () => {
    setEditMode(false);
    onChange(title);
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
      <TextField variant="outlined" value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
  ) : (
      <span onDoubleClick={activateEditMode}>{value}</span>
  );
}
