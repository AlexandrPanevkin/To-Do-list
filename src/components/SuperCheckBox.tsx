import React, {ChangeEvent} from 'react';
import {Simulate} from "react-dom/test-utils";

type onChangeHandlerType = {
    checked: boolean
    callBack: (eventValue: boolean) => void
}

export const SuperCheckBox = (props: onChangeHandlerType) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callBack(event.currentTarget.checked)
    }
    return (
        <input type='checkbox' checked={props.checked} onChange={onChangeHandler}/>
    );
};