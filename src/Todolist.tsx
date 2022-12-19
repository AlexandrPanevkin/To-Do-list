import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type propsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filterValue: FilterValueType) => void
    addTask: (titleValue: string, todolistId: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValueType
    removeTodlolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, updateTitle: string) => void
    updateTodolist: (todolistId: string, updateTitle: string) => void
}

export function Todolist(props: propsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }


    const onRemoveTaskClickHandler = (taskId: string) => {
        props.removeTask(props.todolistId, taskId)
    }

    const onChangeCheckBoxHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.todolistId, taskId, e.currentTarget.checked)
    }

    const onRemoveTodolistClickHandler = () => {
        props.removeTodlolist(props.todolistId)
    }

    const onAllClickHandler = () => props.changeFilter(props.todolistId, 'All')
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, 'Active')
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, 'Completed')
    const updateTodolistHandler = (updateTitle: string) => {
        props.updateTodolist(props.todolistId, updateTitle)
    }
    return <div>
        <h3>{props.title}
            <EditableSpan title={props.title} callBack={updateTodolistHandler}/>
            <button onClick={onRemoveTodolistClickHandler}>X</button>
        </h3>
        <div>
            <AddItemForm addItem={addTask}/>
        </div>
        <ul>
            {props.tasks.map(t => {
                const updateTaskHandler = (updateTitle: string) => {
                    props.updateTask(props.todolistId, t.id, updateTitle)
                }
                return (

                    <li><input className={t.isDone ? 'isDone' : ''} type="checkbox" checked={t.isDone}
                               onChange={(e) => onChangeCheckBoxHandler(t.id, e)}/>
                        <EditableSpan callBack={updateTaskHandler} title={t.title}/>
                        <button onClick={() => onRemoveTaskClickHandler(t.id)}>X</button>
                    </li>
                )
            })}
        </ul>
        <div>
            <button className={props.filter === 'All' ? 'activeFilter' : ''} onClick={onAllClickHandler}
            >All
            </button>
            <button className={props.filter === 'Active' ? 'activeFilter' : ''} onClick={onActiveClickHandler}
            >Active
            </button>
            <button className={props.filter === 'Completed' ? 'activeFilter' : ''} onClick={onCompletedClickHandler}
            >Completed
            </button>
        </div>
    </div>
}
