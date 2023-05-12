import {setErrorAC, setErrorACType, setRequestStatusAC, setRequestStatusACType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, error: string) => {
    dispatch(setRequestStatusAC('failed'))
    dispatch(setErrorAC(error))
}

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<ErrorUtilsDispatchType>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setRequestStatusAC('failed'))
}

type ErrorUtilsDispatchType = setRequestStatusACType | setErrorACType
