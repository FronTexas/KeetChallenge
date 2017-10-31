import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { CLEAR_COMPLETED, QUERY_TODOS } from '../graph';

import TableActionButton from './TableActionButton';

export class ClearCompletedButtonComponent extends Component {
  static propTypes = {
    clearCompleted: PropTypes.func.isRequired,
  }

  handleOnClick = () => {
    const { clearCompleted } = this.props;
    clearCompleted();
  }

  render() {
    return (
      <TableActionButton onClick={this.handleOnClick} {...this.props} />
    );
  }
}

export default graphql(CLEAR_COMPLETED, {
  props: ({ mutate }) => ({
    clearCompleted: () => mutate({
      update: (store, { data: { clearCompleted } }) => {
        const data = store.readQuery({ query: QUERY_TODOS });
        const completedIds = new Set(clearCompleted.map(todo => todo.id));
        // filter out the todos that is cleared
        data.todos = data.todos.filter(todo => !completedIds.has(todo.id));
        store.writeQuery({ query: QUERY_TODOS, data });
      },
    }),
  }),
})(ClearCompletedButtonComponent);

