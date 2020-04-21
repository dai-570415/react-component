import React, { Component } from 'react';

class TodoInput extends Component {
    constructor(props) {
      super(props);
      this.state = {
        inputValue: '',
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    // input情報を変える
    handleChange(e) {
      this.setState({
        inputValue: e.target.value,
      });
    }

    // add buttonクリック後の処理(App.jsのaddTodo()発火)
    handleClick() {
      const inputValue = this.state.inputValue;
      this.props.addTodo(inputValue);
    }

    render() {
      return (
        <div className="todo-input">
            <input
              placeholder="New Todo"
              value={ this.state.inputValue }
              onChange={ this.handleChange }
            />
            <button onClick={ this.handleClick }>Add</button>
        </div>
      );
    }
  }
  
  export default TodoInput;