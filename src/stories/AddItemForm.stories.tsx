import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Button} from './Button';
import {AddItemForm} from "../components/AddItemForm";
import {action} from "@storybook/addon-actions";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

export default {
    title: 'Example/Todolist/AddItemForm',
    component: AddItemForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        addItem: {
            description: 'Button clicked inside form'
        }
    },
} as ComponentMeta<typeof AddItemForm>;

const Template1: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;
export const AddItemFormStory = Template1.bind({});
AddItemFormStory.args = {
    addItem: action('Button clicked inside form')
}


const Template2: ComponentStory<typeof AddItemForm> = (args) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>("Title is required")

    const addItem = () => {
        if (title.trim() !== "") {
            args.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
        />
        <IconButton color="primary" onClick={addItem}>
            <AddBox/>
        </IconButton>
    </div>
}
export const AddItemFormStoryError = Template2.bind({});
AddItemFormStoryError.args = {
    addItem: action('Button clicked inside form')
}