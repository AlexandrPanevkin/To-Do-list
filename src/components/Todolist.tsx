import React, {memo, useCallback} from 'react';
import {FilterValuesType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button} from "@mui/material";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolistId);
    }, [props.removeTodolist, props.todolistId])
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolistId, title);
    }, [props.changeTodolistTitle, props.todolistId])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolistId);
    }, [props.addTask, props.todolistId])
    const changeTaskStatus = useCallback((taskId: string, eventValue: boolean) => {
        props.changeTaskStatus(taskId, eventValue, props.todolistId)
    }, [props.changeTaskStatus, props.todolistId])

    const changeTaskTitle = useCallback((taskId: string, newValue: string) => {
        props.changeTaskTitle(taskId, newValue, props.todolistId);
    }, [props.changeTaskTitle, props.todolistId])

    const removeTask = useCallback((taskId: string) => {
        props.removeTask(taskId, props.todolistId)
    }, [props.removeTask, props.todolistId])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolistId, "all"), [props.changeFilter, props.todolistId])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolistId, "active"), [props.changeFilter, props.todolistId])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolistId, "completed"), [props.changeFilter, props.todolistId])

    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {

                    return <Task key={t.id} taskId={t.id} taskTitle={t.title} isChecked={t.isDone}
                                 removeTask={removeTask}
                                 changeTaskStatus={(e) => changeTaskStatus(t.id, e)}
                                 changeTaskTitle={changeTaskTitle}/>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})