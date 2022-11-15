import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    callBack: (newTitle: string) => void
    title: string
}

export const EditableSpan = (props: PropsType) => {
    let [updateTitle, setUpdateTitle] = useState(props.title)
    const [edit, setEdit] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.callBack(updateTitle);
    }

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        edit && addTask()
    }

    return (
        edit ? <input onChange={onChangeHandler} onBlur={onDoubleClickHandler} autoFocus value={updateTitle}/> :
            <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};
