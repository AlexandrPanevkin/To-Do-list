import {setErrorAC, setErrorACType, setRequestStatusAC, setRequestStatusACType} from "../app/app-reducer";
import {Dispatch} from "redux";

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, error: string) => {
    dispatch(setRequestStatusAC('failed'))
    dispatch(setErrorAC(error))
}

type ErrorUtilsDispatchType = setRequestStatusACType | setErrorACType
