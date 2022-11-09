import React, {useState} from 'react'
import './App.css'
import TodoList from "./TodoList"
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"
// Create +
// Read => +, filtration
// Update +
// Delete +
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {
    // BLL:
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS & ES6", isDone: true},
            {id: v1(), title: "REACT & TS", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "COLA", isDone: true},
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "WATER", isDone: false},
        ]
    })
    //

    const removeTask = (taskId: string, todoListId: string) => {
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const resultOfUpdate: Array<TaskType> = tasksForUpdate.filter(t => t.id !== taskId)
        const copyTasks: TasksStateType = {...tasks}
        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)
        //
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)
        })
    }
    const addTask = (title: string, todoListId: string) => {
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const resultOfUpdate: Array<TaskType> = [...tasksForUpdate, newTask]
        const copyTasks: TasksStateType = {...tasks}
        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)
        //
        setTasks({...tasks, [todoListId]: tasks[todoListId].concat(newTask)})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const resultOfUpdate: Array<TaskType> = tasksForUpdate.map(t => t.id === taskId
            ? {...t, isDone: isDone} : t)
        const copyTasks: TasksStateType = {...tasks}
        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)
        //
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {
                ...t,
                isDone
            } : t)
        })
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {
            ...tl,
            filter: filter
        } : tl))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filterValue: FilterValuesType) => {
        let filteredTasks = tasks
        if (filterValue === "active") {
            filteredTasks = tasks.filter(t => !t.isDone)
        }
        if (filterValue === "completed") {
            filteredTasks = tasks.filter(t => t.isDone)
        }
        return filteredTasks
    }


    const todoListsComponents = todoLists.length
        ? todoLists.map(tl => {
                const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
                return (
                    <TodoList
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={filteredTasks}

                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeTaskStatus={changeTaskStatus}
                        changeTodoListFilter={changeTodoListFilter}
                    />
                )
            }
        )
        : <span>Create your first todoList!!!</span>

    //GUI:
    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;

