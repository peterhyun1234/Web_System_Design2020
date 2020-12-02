import React, { useState } from 'react';
import { Form } from './Form';
import { List } from './List';

export function TodoList() {
  return (
  <div>
    <span>Total: 1 Done: 0</span>
    <Form/>
    <List/>
  </div>
  );
}
