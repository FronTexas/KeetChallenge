import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { ADD_TODO } from '../graph';

import TableActionButton from './TableActionButton';

export class AddTodoButtonComponent extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    refetchTodos: PropTypes.func.isRequired,
  }

  handleOnClick = () => {
    const { addTodo, refetchTodos } = this.props;
    addTodo('')
      .then((res) => {
        if (res && res.data && res.data.add) {
          refetchTodos();
        }
      });
  }

  render() {
    return (
      <TableActionButton onClick={this.handleOnClick} {...this.props} />
    );
  }
}

export default graphql(ADD_TODO, {
  props: ({ mutate }) => ({
    addTodo: title => mutate({ variables: { title } }),
  }),
})(AddTodoButtonComponent);
