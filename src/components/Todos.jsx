import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

import {
  DataTable,
  TableBody,
  TableCardHeader,
} from 'react-md';

import Todo from './Todo';
import AddTodoButton from './AddTodoButton';
import ToggleAllButton from './ToggleAllButton';
import ClearCompletedButton from './ClearCompletedButton';


const queryTodos = gql`{
  todos{
    id
    title
    completed
  }
}`;

class Todos extends Component {
  constructor(props) {
    super(props);
    this.handleAddTodoClick = this.handleAddTodoClick.bind(this);
    this.handleToggleAllClick = this.handleToggleAllClick.bind(this);
    this.handleClearCompletedClick = this.handleClearCompletedClick.bind(this);
    this.state = {
      toggleAllState: true,
    };
  }

  handleAddTodoClick(mutation, refetch) { 
    mutation({ variables: { title: '' } })
      .then((res) => {
        if (res.data.add) {
          refetch();
        }
      });
  }

  handleToggleAllClick(mutation) {
    mutation({ variables: { checked: this.state.toggleAllState } });
    this.setState({ toggleAllState: !this.state.toggleAllState });
  }

  handleClearCompletedClick(mutation, refetch) {
    mutation()
      .then((res) => {
        if (res.data.clearCompleted) {
          refetch();
        }
      });
  }

  render() {
    const { data: { loading, error, refetch, todos } } = this.props;
    if (loading) { return <p>Loading...</p>; }
    if (error) { return <p>Error!</p>; }
    return (
      <div>
        <DataTable baseId="todos" fullWidth={false} className="todos">
          <TableCardHeader
            title="To-do list"
          >
            <AddTodoButton onAddTodoClick={mutation => this.handleAddTodoClick(mutation, refetch)} iconChildren="add" >Add</AddTodoButton>
            <ToggleAllButton onToggleAllClick={this.handleToggleAllClick}  toggleAllState={false} iconChildren="done">Toggle All</ToggleAllButton>
            <ClearCompletedButton onClearCompletedClick={mutation => this.handleClearCompletedClick(mutation, refetch)} iconChildren="clear">Clear Completed</ClearCompletedButton>
          </TableCardHeader>
          <TableBody>
            {
              todos.map((item) => {
                const { id, title, completed } = item;
                return <Todo refetch={refetch} key={id} id={id} title={title} completed={completed} />;
              })
            }
          </TableBody>
        </DataTable>
      </div>
    );
  }
}

export default graphql(queryTodos)(Todos);
