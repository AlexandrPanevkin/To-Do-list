import {todolistApi, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {setRequestStatusAC, setRequestStatusACType} from "../../app/app-reducer";

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: todolistActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todolists.map((td) => ({...td, filter: 'all'}))
        case 'REMOVE-TODOLIST':
            return state.filter(td => td.id !== action.todolistId)
        case "ADD-TODOLIST":
            return [{
                id: action.todolist.id,
                title: action.todolist.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
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

//actions
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const)
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId,
    newTodolistTitle
} as const)
export const changeFilterAC = (todolistId: string, newFilter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId,
    filter: newFilter
} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)

//thunks
export const getTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setRequestStatusAC('loading'))
    todolistApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setRequestStatusAC('succeeded'))
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setRequestStatusAC('loading'))
    todolistApi.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setRequestStatusAC('succeeded'))
        })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setRequestStatusAC('loading'))
    todolistApi.deleteTodolist(id)
        .then(() => {
            dispatch(removeTodolistAC(id))
            dispatch(setRequestStatusAC('succeeded'))
        })
}

export const updateTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setRequestStatusAC('loading'))
    todolistApi.updateTodolist(id, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(id, title))
            dispatch(setRequestStatusAC('succeeded'))
        })
}

// types
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type setTodolistsACType = ReturnType<typeof setTodolistsAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type todolistActionType =
    | removeTodolistACType
    | addTodolistACType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | setRequestStatusACType