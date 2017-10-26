import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

import {
  DataTable,
  TableBody,
  TableCardHeader,
} from 'react-md';

import Todo from './Todo';
import AddTodoButton from './AddTodoButton';

const queryTodos = gql`{
  todos{
    id
    title
    completed
  }
}`;

class Todos extends Component {
  onRemoveClick() {
    this.props = this.props;
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
            <AddTodoButton refetch={refetch} iconChildren="add">Add</AddTodoButton>
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
