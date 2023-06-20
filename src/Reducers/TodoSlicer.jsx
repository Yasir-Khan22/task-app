import { createSlice } from '@reduxjs/toolkit'

export const TodoSlicer = createSlice({
    name: 'toDo',
    initialState: {
        todoList: [
            { id: 1, content: "Today HouseHold Chores" },
            { id: 2, content: "Playing Cricket With Friends" }
        ]
    },
    reducers: {
        addToDo: (state, action) => {
            let newTodoList = {
                id: Math.random(),
                content: action.payload.newContent
            }
            state.todoList.push(newTodoList);
        },
        deleteToDo: (state, action) => {
            let { todoList } = state;
            state.todoList = todoList.filter((item) => item.id !== action.payload.id);
        },
        editTodo: (state, action) => {
            let { todoList } = state;
            state.todoList = todoList.map((item) => item.id === action.payload.id ? action.payload : item);
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToDo, deleteToDo, editTodo } = TodoSlicer.actions

export default TodoSlicer.reducer;