import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { CLEAR_COMPLETED } from '../graph';

import TableActionButton from './TableActionButton';

export class ClearCompletedButtonComponent extends Component {
  static propTypes = {
    clearCompleted: PropTypes.func.isRequired,
    refetchTodos: PropTypes.func.isRequired,
  }

  handleOnClick = () => {
    const { clearCompleted, refetchTodos } = this.props;
    clearCompleted()
      .then((res) => {
        if (res.data.clearCompleted) {
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

export default graphql(CLEAR_COMPLETED, {
  props: ({ mutate }) => ({
    clearCompleted: () => mutate(),
  }),
})(ClearCompletedButtonComponent);

