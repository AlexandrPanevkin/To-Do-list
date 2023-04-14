import {v1} from "uuid";
import {todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: generalType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.payload.todolists.map((td) => ({...td, filter: 'all'}))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST": {
            return [{
                id: action.payload.todolistId,
                title: action.payload.newTodolistTitle,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.todolistId ? {
                ...el,
                title: action.payload.newTodolistTitle
            } : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state
    }
}

type generalType =
    removeTodolistACType
    | addTodolistAC
    | changeTodolistTitleACType
    | changeFilterACType
    | getTodolistsACType

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export type addTodolistAC = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistTitle,
            todolistId: v1()
        }
    } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            newTodolistTitle
        }
    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistId: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            filter: newFilter
        }
    } as const
}

export type getTodolistsACType = ReturnType<typeof getTodolistsAC>
export const getTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {
            todolists
        }
    } as const
}
export const getTodolistsThunkTC = () => (dispatch: Dispatch) => {
    todolistApi.getTodolists()
        .then(res => {
            dispatch(getTodolistsAC(res.data))
        })
}