import React, { useState } from 'react';

export function List({ id, text, deleteTodo, toggleTodo }) {

  return (
    // <div>
    // <TodoListForm>
    //   <TodoContents>{text}</TodoContents>
    //   <button onClick={() => toggleTodo(id)}>완료</button>
    //   <button onClick={() => deleteTodo(id)}>삭제</button>
    // </TodoListForm>
    // </div>
    <ul>
      <li>
        <span>English</span>
        <br></br>
        <button>완료</button>
        <button>취소</button>
      </li>
    </ul>
  );
}
