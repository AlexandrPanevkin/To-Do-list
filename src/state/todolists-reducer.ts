import {todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: actionType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            debugger
            return action.todolists.map((td) => ({...td, filter: 'all'}))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.todolistId)
        }
        case "ADD-TODOLIST": {
            return [{
                id: action.todolist.id,
                title: action.todolist.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.todolistId ? {
                ...el,
                title: action.newTodolistTitle
            } : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.todolistId ? {...el, filter: action.filter} : el)
        }
        default:
            return state
    }
}

type actionType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof setTodolistsAC>

export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, newTodolistTitle} as const
}
export const changeFilterAC = (todolistId: string, newFilter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter: newFilter} as const
}

export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistApi.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTodolist(id)
        .then(() => {
            dispatch(removeTodolistAC(id))
        })
}

export const updateTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistApi.updateTodolist(id, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(id, title))
        })
}