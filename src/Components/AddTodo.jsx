import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToDo } from '../Reducers/TodoSlicer';

const AddTodo = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        content: '',
        contentError: null
    });

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value, [`${e.target.name}Error`]: null });
    }

    const add = () => {
        if (content === '') {
            setState({ ...state, contentError: 'You must write something!' });
            return;
        }

        dispatch(addToDo({ newContent: content }));
        setState({ ...state, content: '' });
    }
    const { content, contentError } = state;
    return <div className='form'>
        <div className='text-center'>
            <h2 className="text-center font-bold text-5xl m-[1rem] p-[1rem]">GM, What're your Plans today.</h2>
            <input type='text' value={content} name='content' onChange={handleChange} />
            <button type='button' className='' onClick={add}>Add</button>
            {contentError ? <div className='error'>{contentError}</div> : null}
        </div>
    </div>
};

export default AddTodo;
