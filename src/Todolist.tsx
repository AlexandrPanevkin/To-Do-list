import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./Components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [newTitle, setNewTitle] = useState('')
    console.log(newTitle)


    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const removeTaskHandler = (tID: string) => {
        props.removeTask(tID)
    }

    const changeFilterTsarHandler = (FilterValue: FilterValuesType) => {
        props.changeFilter(FilterValue)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onKeyDown={onKeyPressHandler} value={newTitle}
                   onChange={onChangeHandler}/>
            {/*<button onClick={addTaskHandler}>+</button>*/}
            <Button name={'+'} callBack={addTaskHandler}/>
            {/*<button onClick={()=>props.addTask(newTitle)}>+</button>*/}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    // const removeTaskHandler = () => {
                    //     props.removeTask(t.id)
                    // }
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            {/*<button onClick={() => removeTaskHandler(t.id)}>x*/}
                            {/*</button>*/}
                            <Button name={'x'} callBack={() => removeTaskHandler(t.id)}/>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            {/*<button onClick={() => changeFilterTsarHandler('all')*/}
            {/*}>*/}
            {/*    All*/}
            {/*</button>*/}
            {/*<button onClick={() => changeFilterTsarHandler('active')}>*/}
            {/*    Active*/}
            {/*</button>*/}
            {/*<button onClick={() => changeFilterTsarHandler('completed')}>*/}
            {/*    Completed*/}
            {/*</button>*/}
            <Button name={'all'} callBack={() => changeFilterTsarHandler}/>
            <Button name={'active'} callBack={() => changeFilterTsarHandler}/>
            <Button name={'completed'} callBack={() => changeFilterTsarHandler}/>
        </div>
    </div>
}
