import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'
import {stringify} from "uuid/index";

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
    addTask: (title: string) => void
    changeCheckBox: (taskId: string, eventValue: boolean) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const [activeButton, setActiveButton] = useState<FilterValuesType>('all')

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
        } else {
            setError('Title is required')
        }
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all");
        setActiveButton('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active");
        setActiveButton('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed");
        setActiveButton('completed')
    }

    const onChangeCheckboxHandler = (tId: string, e: boolean) => {
        props.changeCheckBox(tId, e)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? styles.error : ''}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />

            <button onClick={addTask}>+</button>
            {error && <div className={styles.errorMessage}>Title is required</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    // const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     props.changeCheckBox(t.id, e.currentTarget.checked)
                    // }

                    return <li className={t.isDone ? styles.isDone : ''} key={t.id}>
                        <input type="checkbox" onChange={(e) => onChangeCheckboxHandler(t.id, e.currentTarget.checked)}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={activeButton === 'all' ? styles.activeFilter : ''} onClick={onAllClickHandler}>All
            </button>
            <button className={activeButton === 'active' ? styles.activeFilter : ''}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={activeButton === 'completed' ? styles.activeFilter : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
