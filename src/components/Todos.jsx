import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import {
  DataTable,
  TableBody,
  TableCardHeader,
} from 'react-md';

import Todo from './Todo';
import AddTodoButton from './AddTodoButton';
import ClearCompletedButton from './ClearCompletedButton';
import ToggleAllButton from './ToggleAllButton';

import { QUERY_TODOS } from '../graph';

export class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleAllState: true,
    };
  }

  render() {
    const { data: { loading, error, refetch, todos } } = this.props;

    if (loading) { return <p>Loading...</p>; }
    if (error) { return <p>Error!</p>; }

    return (
      <div>
        <div>
          <AddTodoButton id="add-todo-button" refetchTodos={refetch} iconChildren="add" >Add</AddTodoButton>
          <ToggleAllButton id="toggle-all-button" iconChildren="done">Toggle All</ToggleAllButton>
          <ClearCompletedButton id="clear-completed-button" refetchTodos={refetch} iconChildren="clear">Clear Completed</ClearCompletedButton>
        </div>
        <DataTable baseId="todos" fullWidth={false} className="todos">
          <TableCardHeader
            visible={false}
            title="Keet Todo"
          />
          <TableBody>
            {
              todos.map(({ id, title, completed }) => (
                <Todo
                  refetchTodos={refetch}
                  key={id}
                  id={id}
                  title={title}
                  completed={completed}
                />
              ))
            }
          </TableBody>
        </DataTable>
      </div>
    );
  }
}

export default graphql(QUERY_TODOS)(Todos);
