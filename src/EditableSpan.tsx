import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    let [updateTitle, setUpdateTitle] = useState(props.title)
    const [edit, setEdit] = useState(false)

    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
        edit ? <input value={updateTitle} autoFocus onBlur={onDoubleClickHandler} onChange={onChangeValueHandler}/> :
            <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};
