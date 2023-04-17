import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistAC, removeTodolistACType, getTodolistsACType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistApi} from "../api/todolist-api";
import {Dispatch} from "redux";

export type tasksReducerType =
    removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addTodolistAC | removeTodolistACType | getTodolistsACType | setTasksACType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: tasksReducerType) => {
    switch (action.type) {
        case "SET-TASKS": {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }
        case "SET-TODOLISTS": {
            let copyState = {...state}
            action.payload.todolists.forEach(td => {
                copyState[td.id] = []
            })
            return copyState
        }
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id)
            }
        case "ADD-TASK":
            let task = {
                id: v1(), title: action.payload.title, status: TaskStatuses.New,
                todoListId: action.payload.todolistId, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            };
            return {
                ...state,
                [action.payload.todolistId]: [task, ...state[action.payload.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el,
                    status: action.payload.status
                } : el)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
        default:
            return state
    }
}

export type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', payload: {id, todolistId}} as const
}
export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', payload: {title, todolistId}} as const
}
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {id, status, todolistId}} as const
}
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {id, newTitle, todolistId}} as const
}
export type setTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', todolistId, tasks} as const
}

export const getTasksThunkTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.Items))
        })
}