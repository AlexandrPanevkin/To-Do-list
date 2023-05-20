import {Dispatch} from 'redux'
import {setErrorAC, setErrorACType, setRequestStatusAC, setRequestStatusACType} from "../../app/app-reducer";
import {authAPI, LoginParamsType, todolistApi} from "../../api/todolist-api";
import {handleServerNetworkError} from "../../utils/error-utils";
import {addTaskAC} from "../TodolistsList/tasks-reducer";


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setRequestStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setRequestStatusAC('succeeded'))
            } else {
                dispatch(setErrorAC(res.data.messages.length ? res.data.messages[0] : 'Error'))
                dispatch(setRequestStatusAC('succeeded'))
            }
        })
        .catch((e) => {
            handleServerNetworkError(dispatch, e)
        })
}

export const initializeAppTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setRequestStatusAC('loading'))
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setRequestStatusAC('succeeded'))
            } else {
                dispatch(setErrorAC(res.data.messages.length ? res.data.messages[0] : 'Error'))
                dispatch(setRequestStatusAC('succeeded'))
            }
        })
        .catch((e) => {
            handleServerNetworkError(dispatch, e)
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | setRequestStatusACType | setErrorACType
