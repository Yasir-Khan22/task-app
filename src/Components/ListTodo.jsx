import React, { useState } from 'react';
import { AiFillEdit, AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { deleteToDo, editTodo } from '../Reducers/TodoSlicer';
import { toggleComplete } from '../Reducers/TodoSlicer'; // Added import for toggleComplete

const ListTodo = () => {

    const { todoList } = useSelector((state) => state.toDo);
    const dispatch = useDispatch();

    const [isEditing, setEditing] = useState(false);
    const [state, setState] = useState({
        id: '',
        content: "null",
        contentError: null
    });

    const onEditToggle = (id, content) => {
        setEditing(true);
        setState({
            ...state, id, content
        })
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value, [`${e.target.name}Error`]: null });
    }

    const { content, contentError, id } = state;

    const edit = () => {
        if (content === '') {
            setState({ ...state, contentError: 'You must write something!' });
            return;
        }
        dispatch((editTodo({ content, id })));
        setEditing(false);
    }

    // added handle toggle for task.
    const handleToggleComplete = (id, completed) => {
        dispatch(toggleComplete({ id, completed }));
    }

    return (
        <div>
            {isEditing ? (
                <div className='form m-[1.3rem] p-[1.3rem] flex justify-between gap-[1rem] text-center text-3xl bg-gradient-to-r from-custom-black to-custom-red rounded-md'>
                    <h2 className='text-[#f3f4f6]'>Update your plan for today</h2>
                    <input type='text' value={content} name='content' onChange={handleChange}></input>
                    <button className="text-[#f3f4f6]" type='button' onClick={edit}>Edit</button>
                    {contentError ? <div className='error'>{contentError}</div> : null}
                </div>
            ) : (
                <div className='mt-[0.5rem] bg-gray-100 flex flex-col justify-center items-center'>
                    {todoList.map(({ id, content, completed }) => (
                        <div
                            className={`m-[1.3rem] p-[1.3rem] flex justify-between items-center gap-[1rem] text-center text-3xl ${completed ? 'text-[#f3f4f6] bg-gradient-to-r from-custom-black to-custom-red line-through' : 'text-black'
                                } rounded-md`}
                            key={id}
                        >
                            <div>{content}</div>
                            <div className='flex gap-[1rem] text-3xl cursor-pointer'>
                                <AiOutlineCloseCircle
                                    className={`close ${completed ? 'completed' : ''}`}
                                    onClick={() => dispatch(deleteToDo({ id }))}
                                />
                                <AiFillEdit
                                    className={`edit ${completed ? 'completed' : ''}`}
                                    onClick={() => onEditToggle(id, content)}
                                />
                                <input
                                    type='checkbox'
                                    checked={completed}
                                    onChange={() => handleToggleComplete(id, completed)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListTodo;
