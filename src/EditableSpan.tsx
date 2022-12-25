import React, {ChangeEvent, useState} from 'react';

export type PropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = (props: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)

    const editModeClickHandler = () => {
        setEditMode(!editMode)
        props.onChange(newTitle)
    }

    const onChangeClickHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={newTitle} onChange={onChangeClickHandler} onBlur={editModeClickHandler} autoFocus/> :
            <span onDoubleClick={editModeClickHandler}>{props.title}</span>
    );
};