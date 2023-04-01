import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolists()
            .then((res) => {
                setState(res)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.createTodolist('aaa')
            .then((res) => {
                setState(res.data.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '163e2cf9-ec37-4559-afb1-3f6d1ce0416e'
        todolistApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '163e2cf9-ec37-4559-afb1-3f6d1ce0416e'
        const title = 'react'
        todolistApi.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '69c152d2-80b9-4c00-a25c-6f87f65610c7'
        todolistApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '69c152d2-80b9-4c00-a25c-6f87f65610c7'
        todolistApi.createTask(todolistId, 'aaa')
            .then((res) => {
                setState(res.data.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '69c152d2-80b9-4c00-a25c-6f87f65610c7'
        const taskId = "81cb87c4-538f-4e54-9089-c5cb7038ebc9"
        todolistApi.updateTask(todolistId, taskId, 'bbb')
            .then((res) => {
                setState(res.data.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '69c152d2-80b9-4c00-a25c-6f87f65610c7'
        const taskId = "81cb87c4-538f-4e54-9089-c5cb7038ebc9"
        todolistApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}