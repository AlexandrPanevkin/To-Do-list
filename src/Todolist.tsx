import React, {useState} from 'react';
import {FilterValueType} from "./App";

type TodolistPropsType = {
    title?: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    // filteredTasks: (filterValue: FilterValueType) => void
    removeAllTasks: () => void
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    let [filterValue, setFilteredValue] = useState<FilterValueType>("All")

    const filteredTasks = (filterValue: FilterValueType) => {
        setFilteredValue(filterValue)
    }
    let afterFilterTasks = props.tasks;
    if (filterValue === "Active") {
        afterFilterTasks = props.tasks.filter(el => el.isDone)
    } else if (filterValue === "Completed") {
        afterFilterTasks = props.tasks.filter(el => !el.isDone)
    } else if (filterValue === "three") {
        afterFilterTasks = props.tasks.filter(el => el.id < 4)
    }
    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+
                    </button>
                </div>
                <ul>
                    {afterFilterTasks.map((el) => {
                        return (
                            <li key={el.id}>
                                <button onClick={() => {
                                    props.removeTask(el.id)
                                }}>X
                                </button>
                                <input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={() => {
                        filteredTasks("All")
                    }}>All
                    </button>
                    <button onClick={() => {
                        filteredTasks("Active")
                    }}>Active
                    </button>
                    <button onClick={() => {
                        filteredTasks("Completed")
                    }}>Completed
                    </button>
                </div>
                <div>
                    <button onClick={props.removeAllTasks}>
                        DELETE ALL TASKS
                    </button>
                    <div>
                        <button onClick={() => {
                            filteredTasks("three")
                        }}>
                            First three tasks
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}