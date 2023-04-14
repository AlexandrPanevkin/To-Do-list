import {tasksReducer} from './tasks-reducer'
import {todolistsReducer} from './todolists-reducer'
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {useDispatch} from "react-redux";
import thunk, {ThunkDispatch} from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

type ThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = useDispatch<ThunkDispatchType>()

export type AppRootStateType = ReturnType<typeof rootReducer>