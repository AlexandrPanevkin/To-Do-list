import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onAddTaskClickHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddTaskClickHandler()
        }
    }
    return (
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? 'error' : ''}
            />
            <button onClick={onAddTaskClickHandler}>+</button>
            {error && <div className={'errorMessage'}>{error}</div>}
        </div>
    );
};
