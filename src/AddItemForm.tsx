import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: PropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }
    return (
        <div>
            <TextField
                size="small"
                id="outlined-basic"
                label={error ? 'Title is required' : "add text"}
                variant="outlined"
                value={title}
                error={!!error}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <Button
                style={{maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}}
                size="small"
                variant="contained" onClick={addItem}>+</Button>
        </div>
    );
};