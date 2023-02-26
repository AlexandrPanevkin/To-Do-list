import React from 'react';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {SuperCheckBox} from "./SuperCheckBox";

type PropsType = {
    taskId: string
    taskTitle: string
    isChecked: boolean
    removeTask: (taskId: string) => void
    changeTaskStatus: (eventValue: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}

export const Task = (props: PropsType) => {

    const removeTask = () => {
        props.removeTask(props.taskId)
    }
    const changeTaskStatus = (eventValue: boolean) => {
        props.changeTaskStatus(eventValue)
    }
    const changeTaskTitle = (newTitle: string) => {
        props.changeTaskTitle(props.taskId, newTitle)
    }

    return <div>
        <div key={props.taskId} className={props.isChecked ? "is-done" : ""}>

            <SuperCheckBox checked={props.isChecked}
                           callBack={changeTaskStatus}/>

            <EditableSpan value={props.taskTitle} onChange={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    </div>
}