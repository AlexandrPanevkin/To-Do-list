import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {Task} from "../components/Task";

export default {
    title: 'Example/Todolist/Task',
    component: Task,
    args: {
        taskId: '123',
        taskTitle: 'title',
        isChecked: false,
        removeTask: action('removeTask'),
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle')
    }
} as ComponentMeta<typeof Task>;

const Template1: ComponentStory<typeof Task> = (args) => <Task {...args} />;
export const TaskIsNotDoneStory = Template1.bind({});
TaskIsNotDoneStory.args = {}

const Template2: ComponentStory<typeof Task> = (args) => <Task {...args} />;
export const TaskIsDoneStory = Template2.bind({});
TaskIsDoneStory.args = {
    isChecked: true,
}