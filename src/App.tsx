import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';


type TodoListsType = {
    id: string
    title: string
}
type TasksStateType = {
    [key: string]: InTasksType
}

type InTasksType = {
    data: DataType[]
    filter: FilterValuesType

}

type DataType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

export function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistId_1, title: "What to learn"},
        {id: todolistId_2, title: "What to buy"},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: {
            data: [
                {id: v1(), title: "HTML & CSS", isDone: true},
                {id: v1(), title: "JS & ES6", isDone: false},
            ],
            filter: 'all'
        },
        [todolistId_2]: {
            data: [
                {id: v1(), title: "COLA", isDone: false},
                {id: v1(), title: "MILK", isDone: true},
            ],
            filter: 'all'
        }
    })

    function removeTask(todolistID: string, taskId: string) {
        setTasks({
            ...tasks,
            [todolistID]: {...tasks[todolistID], data: tasks[todolistID].data.filter(el => el.id !== taskId)}
        })
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: {...tasks[todolistID], data: [newTask, ...tasks[todolistID].data]}})
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({
            ...tasks,
            [todolistID]: {
                ...tasks[todolistID],
                data: tasks[todolistID].data.map(el => el.id === taskId ? {...el, isDone} : el)
            }
        })
    }


    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTasks({...tasks, [todolistID]: {...tasks[todolistID], filter: value}})
    }

    function removeTodolist(todolistID: string) {
        setTodoLists(todoLists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }


    return (
        <div className="App">
            {todoLists.map(el => {
                let tasksForTodolist = tasks[el.id].data;

                if (tasks[el.id].filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                }
                if (tasks[el.id].filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                }
                return (
                    <Todolist
                        key={el.id}
                        todolistID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tasks[el.id].filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

