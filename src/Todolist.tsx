import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button/Button";
import Checkbox from '@mui/material/Checkbox';


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    updateTodolistTitle: (todolistId: string, newTitle: string) => void
    updateTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {


    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");

    const onRemoveTodolistClickHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const addTask = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const updateTodolistTitle = (newTitle: string) => {
        props.updateTodolistTitle(props.todolistId, newTitle)
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={updateTodolistTitle}/>
            <IconButton aria-label="delete">
                <DeleteIcon onClick={onRemoveTodolistClickHandler}/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    }

                    const updateTaskTitle = (newTitle: string) => {
                        props.updateTaskTitle(props.todolistId, t.id, newTitle)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeHandler}
                                  checked={t.isDone} defaultChecked/>
                        <EditableSpan title={t.title} onChange={updateTaskTitle}/>
                        <IconButton aria-label="delete">
                            <DeleteIcon onClick={onClickHandler}/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "contained"} color="success"
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"} color="error"
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"} color="secondary"
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}
