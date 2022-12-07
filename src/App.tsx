import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
}

type DataType = {
    data: TaskType[]
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: DataType
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: {
            data: [
                {id: v1(), title: "HTML&CSS1111", isDone: true},
                {id: v1(), title: "JS1111", isDone: true}
            ],
            filter: "all"
        },
        [todolistId2]: {
            data: [
                {id: v1(), title: "HTML&CSS22222", isDone: true},
                {id: v1(), title: "JS2222", isDone: true}
            ],
            filter: "all"
        }
    });

    function removeTask(todolistId: string, id: string) {
        setTasks({
            ...tasks,
            [todolistId]: {...tasks[todolistId], data: tasks[todolistId].data.filter(el => el.id !== id)}
        })
    }

    function addTask(todolistId: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: [task, ...tasks[todolistId].data]}})
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({
            ...tasks,
            [todolistId]: {
                ...tasks[todolistId],
                data: tasks[todolistId].data.map(el => el.id === taskId ? {...el, isDone} : el)
            }
        })
    }


    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], filter: value}}
        )
    }


    return (
        <div className="App">
            {
                todolists.map(el => {
                    let tasksForTodolist = tasks[el.id].data;

                    if (tasks[el.id].filter === "active") {
                        tasksForTodolist = tasks[el.id].data.filter(t => !t.isDone);
                    }
                    if (tasks[el.id].filter === "completed") {
                        tasksForTodolist = tasks[el.id].data.filter(t => t.isDone);
                    }
                    return (
                        <Todolist
                            key={el.id}
                            todolistId={el.id}
                            title={el.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tasks[el.id].filter}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
