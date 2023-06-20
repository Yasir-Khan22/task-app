import { configureStore } from '@reduxjs/toolkit';
import TodoSlicer from './Reducers/TodoSlicer';

export default configureStore({
    reducer: {
        toDo: TodoSlicer
    },
})