import React, { useState } from 'react';
import { AiFillEdit, AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { deleteToDo, editTodo } from '../Reducers/TodoSlicer';

const ListTodo = () => {

    const { todoList } = useSelector((state) => state.toDo);
    const dispatch = useDispatch();
    const [isEditing, setEditing] = useState(false);
    const [state, setState] = useState({
        id: '',
        content: '',
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

    return <div>
        {
            isEditing ?
                <div className='form m-[1.3rem] p-[1.3rem] flex justify-between gap-[1rem] text-center text-3xl  bg-gradient-to-r from-custom-black to-custom-red rounded-md'>
                    <h2 className='text-[#f3f4f6]'>Update your plan for today</h2>
                    <input type='text' value={content} name='content' onChange={handleChange}></input>
                    <button className="text-[#f3f4f6]" type='button' onClick={edit}>Edit</button>
                    {contentError ? <div className='error'>{contentError}</div> : null}
                </div>
                :
                <div className='mt-[0.5rem] bg-gray-100 flex flex-col justify-center items-center'>
                    {
                        todoList.map(({ id, content }) => {
                            return <div className='m-[1.3rem] p-[1.3rem] flex justify-between  items-center gap-[1rem] text-center text-3xl text-[#f3f4f6] bg-gradient-to-r from-custom-black to-custom-red rounded-md' key={id}>
                                <div>{content}</div>
                                <div className='flex gap-[1rem] text-black text-3xl cursor-pointer'>
                                    <AiOutlineCloseCircle className="close" onClick={() => dispatch(deleteToDo({ id }))} />
                                    <AiFillEdit className="edit" onClick={() => onEditToggle(id, content)} />
                                </div>
                            </div>
                        })
                    }
                </div>}
    </div>;
};

export default ListTodo;