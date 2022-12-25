import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {ButtonAppBar} from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {Paper} from "@mui/material";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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


    function removeTask(todolistId: string, id: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})
    }

    function addTask(todolistId: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [task, ...tasks[todolistId]]})
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }


    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter: value} : t))
    }

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(t => t.id !== todolistId))
    }

    function addTodolist(title: string) {
        let newTodolistId = v1()
        let newTodolist: TodolistsType = {id: newTodolistId, title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    function updateTodolistTitle(todolistId: string, newTitle: string) {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, title: newTitle} : t))
    }

    function updateTaskTitle(todolistId: string, taskId: string, newTitle: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }


    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '12px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let tasksForTodolist = tasks[tl.id];

                            if (tl.filter === "active") {
                                tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                            }
                            return (
                                <Grid item>
                                    <Paper elevation={3} style={{padding: '10px'}}>
                                        <Todolist
                                            key={tl.id}
                                            todolistId={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            updateTodolistTitle={updateTodolistTitle}
                                            updateTaskTitle={updateTaskTitle}
                                        />
                                    </Paper>

                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>


        </div>
    );
}

export default App;
