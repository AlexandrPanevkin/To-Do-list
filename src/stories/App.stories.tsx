import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import App from "../App";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'Example/Todolist/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template1: ComponentStory<typeof App> = (args) => <App/>
export const AppStory = Template1.bind({});
