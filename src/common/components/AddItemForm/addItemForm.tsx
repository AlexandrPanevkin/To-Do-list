import React, { ChangeEvent, FC, KeyboardEvent, memo, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import { ResponseType } from "common/types";

type PropsType = {
  addItem: (title: string) => Promise<any>;
};

export const AddItemForm: FC<PropsType> = memo(({ addItem }) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addItemCallback = () => {
    if (title.trim() !== "") {
      addItem(title)
        .then(() => {
          setTitle("");
        })
        .catch((reason: ResponseType) => {
          setError(reason.messages[0]);
        });
    } else {
      setError("Title is required");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.key === "Enter") {
      addItemCallback();
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
        label="Title"
        helperText={error}
      />
      <IconButton color="primary" onClick={addItemCallback}>
        <AddBox />
      </IconButton>
    </div>
  );
});
