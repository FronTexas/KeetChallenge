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
    this.handleToggleAllClick = this.handleToggleAllClick.bind(this);
    this.state = {
      toggleAllState: true,
    };
  }

  handleToggleAllClick(mutation) {
    mutation({ variables: { checked: this.state.toggleAllState } });
    this.setState({ toggleAllState: !this.state.toggleAllState });
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
            <ToggleAllButton toggleAllState={false} onToggleAllClick={this.handleToggleAllClick} iconChildren="done">Toggle All</ToggleAllButton>
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
