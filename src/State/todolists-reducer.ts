import {TodolistType} from "../App";

export const TodolistsReducer = (state: Array<TodolistType>, action: any) => {
    switch (action.type) {
        case 'xxx': {
            return state
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId: todolistId
        }
    } as const
}