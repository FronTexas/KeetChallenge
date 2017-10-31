import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { ADD_TODO, QUERY_TODOS } from '../graph';

import TableActionButton from './TableActionButton';

export class AddTodoButtonComponent extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
  }

  handleOnClick = () => {
    const { addTodo } = this.props;
    addTodo('');
  }

  render() {
    return (
      <TableActionButton onClick={this.handleOnClick} {...this.props} />
    );
  }
}

export default graphql(ADD_TODO, {
  props: ({ mutate }) => ({
    addTodo: title => mutate({
      variables: { title },
      optimisticResponse: {
        add: {
          __typename: 'todo',
          id: -1,
          title,
          completed: false,
        },
      },
      update: (store, { data: { add } }) => {
        const data = store.readQuery({ query: QUERY_TODOS });
        data.todos.push(add);
        store.writeQuery({ query: QUERY_TODOS, data });
      },
    }),
  }),
})(AddTodoButtonComponent);
