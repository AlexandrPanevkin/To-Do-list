import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Button} from './Button';
import {AddItemForm} from "../components/AddItemForm";
import {action} from "@storybook/addon-actions";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {EditableSpan} from "../components/EditableSpan";

export default {
    title: 'Example/Todolist/EditableSpan',
    component: EditableSpan,
    args: {
        value: 'onChange',
        onChange: action('onChange')
    }
} as ComponentMeta<typeof EditableSpan>;

const Template1: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;
export const EditableSpanStory = Template1.bind({});
EditableSpanStory.args = {
    value: 'valueChange'
}
