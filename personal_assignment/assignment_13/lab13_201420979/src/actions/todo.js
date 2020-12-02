export const CREATE_TODO = "todo/ADD_TODO";
export const DELETE_TODO = "todo/DELETE_TODO";
export const TOGGLE_TODO = "todo/TOGGLE_TODO";

let todoID = 0;

export const addTodo = ({ id, text }) => ({
  type: CREATE_TODO,
  id: todoID++,
  text
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id: todoID--,
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
});