import React, { Component } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './assets/css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], // id: 0, title: 'None Value'
      uniqueId: 1,
    }
    this.addTodo = this.addTodo.bind(this);
    this.resetTodo = this.resetTodo.bind(this);
  }
  
  // add buttonクリック後の処理の詳細
  addTodo(title) {
    const { tasks, uniqueId } = this.state;

    tasks.push({
      title,
      id: uniqueId,
    });

    this.setState({
      tasks,
      uniqueId: uniqueId + 1,
    });
  }

  // Reser buttonクリック後の処理
  resetTodo() {
    this.setState({
      tasks: [],
    });
  }

  render() {
    return (
      <div className="container">
          <h1>Todo App</h1>
          <button onClick={ this.resetTodo }>Reset</button>
          <TodoInput addTodo={ this.addTodo } />
          <TodoList tasks={ this.state.tasks } />
      </div>
    );
  }
}

export default App;
