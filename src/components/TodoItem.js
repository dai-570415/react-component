import React from 'react';

const TodoItem = ({ id, title }) => {
  return <li>{ id }: { title }</li>;
}
  
export default TodoItem;