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
            <div>
                <select className='border-[1px] border-[black] p-2 m-1 ml-2'>
                    <option value="All">All</option>
                    <option value="completed">Completed</option>
                    <option value="incompleted.">Incomplete</option>
                </select>

                <input className='border-[1px] border-[black] p-2 m-1' type='text' value={content} name='content' onChange={handleChange} />
                <button type='button' className='' onClick={add}>Add</button>
                {contentError ? <div className='error text-xl m-[15px] text-center'>{contentError}</div> : null}
            </div>
        </div>
    </div>
};

export default AddTodo;
