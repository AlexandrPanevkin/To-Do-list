import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskType[]
}

type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = 'All' | 'Active' | 'Completed'

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    function removeTask(todolistId: string, taskId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    function addTask(titleValue: string, todolistId: string) {
        let newTask = {id: v1(), title: titleValue, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)})
    }

    const updateTask = (todolistId: string, taskId: string, updateTitle: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: updateTitle} : el)
        })
    }

    const updateTodolist = (todolistId: string, updateTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: updateTitle} : el))
    }

    function changeFilter(todolistId: string, filterValue: FilterValueType) {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter: filterValue} : t))
    }

    function removeTodlolist(todolistId: string) {
        setTodolists(todolists.filter(el => el.id !== todolistId))
    }

    function addTodolist(title: string) {
        let newTodolistId = v1()
        let newTodolist: TodolistsType = {id: newTodolistId, title: title, filter: 'All'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(t => {
                    let filteredTasks = tasks[t.id]
                    if (t.filter === 'Active') {
                        filteredTasks = tasks[t.id].filter(el => !el.isDone)
                    }
                    if (t.filter === 'Completed') {
                        filteredTasks = tasks[t.id].filter(el => el.isDone)
                    }
                    return (
                        <Todolist
                            todolistId={t.id}
                            title={t.title}
                            tasks={filteredTasks}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={t.filter}
                            removeTodlolist={removeTodlolist}
                            updateTask={updateTask}
                            updateTodolist={updateTodolist}
                        />
                    )
                })
            }


        </div>
    );
}

export default App;
