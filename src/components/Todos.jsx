import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

import {
  DataTable,
  TableBody,
  TableCardHeader,
} from 'react-md';

import Todo from './Todo';
import AddTodoButton from './AddTodoButton';
import ClearCompletedButton from './ClearCompletedButton';
import ToggleAllButton from './ToggleAllButton';


const queryTodos = gql`{
  todos{
    id
    title
    completed
  }
}`;

export class Todos extends Component {
  constructor(props) {
    super(props);
    this.handleAddTodoClick = this.handleAddTodoClick.bind(this);
    this.handleToggleAllClick = this.handleToggleAllClick.bind(this);
    this.handleClearCompletedClick = this.handleClearCompletedClick.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleMutateTitle = this.handleMutateTitle.bind(this);
    this.handleToggleCompleted = this.handleToggleCompleted.bind(this);
    this.state = {
      toggleAllState: true,
    };
  }

  handleAddTodoClick(addTodoMutation, refetch) {
    addTodoMutation({ variables: { title: '' } })
      .then((res) => {
        if (res.data.add) {
          refetch();
        }
      });
  }

  handleToggleAllClick(toggleAllMutation) {
    toggleAllMutation({ variables: { checked: this.state.toggleAllState } });
    this.setState({ toggleAllState: !this.state.toggleAllState });
  }

  handleClearCompletedClick(clearCompletedMutation, refetch) {
    clearCompletedMutation()
      .then((res) => {
        if (res.data.clearCompleted) {
          refetch();
        }
      });
  }

  handleDeleteTodo(id, refetch, mutation) {
    mutation({ variables: { id } })
      .then((res) => {
        if (res.data.destroy) {
          refetch();
        }
      });
  }

  handleToggleCompleted(id, mutation) {
    mutation({ variables: { id } });
  }

  handleMutateTitle(id, title, mutation) {
    const MUTATE_TITLE_TIMEOUT_INTERVAL = 300;
    if (this.timeOutId) clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      mutation({ variables: { id, title } });
    }, MUTATE_TITLE_TIMEOUT_INTERVAL);
  }

  render() {
    const { data: { loading, error, refetch, todos } } = this.props;

    if (loading) { return <p>Loading...</p>; }
    if (error) { return <p>Error!</p>; }

    return (
      <div>
        <div>
          <AddTodoButton id="add-todo-button" className="testing123" OnClickHandler={mutation => this.handleAddTodoClick(mutation, refetch)} iconChildren="add" >Add</AddTodoButton>
          <ToggleAllButton id="toggle-all-button" OnClickHandler={this.handleToggleAllClick} iconChildren="done">Toggle All</ToggleAllButton>
          <ClearCompletedButton id="clear-completed-button" OnClickHandler={mutation => this.handleClearCompletedClick(mutation, refetch)} iconChildren="clear">Clear Completed</ClearCompletedButton>
        </div>
        <DataTable baseId="todos" fullWidth={false} className="todos">
          <TableCardHeader
            visible={false}
            title="Keet Todo"
          />
          <TableBody>
            {
              todos.map((item) => {
                const { id, title, completed } = item;
                return (
                  <Todo
                    refetch={refetch}
                    key={id}
                    id={id}
                    title={title}
                    completed={completed}
                    toggleCompleted={this.handleToggleCompleted}
                    mutateTitle={this.handleMutateTitle}
                    deleteTodo={this.handleDeleteTodo}
                  />
                );
              })
            }
          </TableBody>
        </DataTable>
      </div>
    );
  }
}

export default graphql(queryTodos)(Todos);
