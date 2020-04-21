import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ tasks }) => {
    const list = tasks.map(todo => {
        return <TodoItem { ...todo } key={ todo.id } />;
        // { ...todo } = id={ todo.id } title={ todo.title }
    });
    return <ul>{ list }</ul>;
}

export default TodoList;