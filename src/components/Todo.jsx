import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import {
  TableRow,
  EditDialogColumn,
  Button,
} from 'react-md';

import { MUTATE_TITLE, TOGGLE_TODO, DELETE_TODO } from '../graph';

const MUTATE_TITLE_INTERVAL = 300;
export class TodoComponent extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    refetchTodos: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    mutateTitle: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
  };

  handleCheckboxClick = () => {
    const { id, toggleTodo } = this.props;
    toggleTodo(id);
  }

  handleEditDialogColumnChange = (title) => {
    const { id, mutateTitle } = this.props;
    if (this.timeOutId) {
      clearTimeout(this.timeOutId);
    }
    this.timeOutId = setTimeout(() => {
      mutateTitle(id, title);
    }, MUTATE_TITLE_INTERVAL);
  }

  handleDeleteButtonClick = () => {
    const { id, deleteTodo, refetchTodos } = this.props;
    deleteTodo(id)
      .then((res) => {
        if (res && res.data && res.data.destroy) {
          refetchTodos();
        }
      });
  }

  render() {
    const { title, completed } = this.props;
    return (
      <TableRow
        onCheckboxClick={this.handleCheckboxClick}
        selected={completed}
      >
        <EditDialogColumn
          defaultValue={title}
          placeholder="Type here to add new todo list"
          onChange={this.handleEditDialogColumnChange}
          inline
        />
        <Button
          onClick={this.handleDeleteButtonClick}
          raised
          secondary
          iconChildren="close"
        >Delete
        </Button>
      </TableRow>
    );
  }
}

const MUTATE_TITLE_WRAPPED = graphql(MUTATE_TITLE, {
  props: ({ mutate }) => ({
    mutateTitle: (id, title) => mutate({ variables: { id, title } }),
  }),
});

const TOGGLE_TODO_WRAPPED = graphql(TOGGLE_TODO, {
  props: ({ mutate }) => ({
    toggleTodo: id => mutate({ variables: { id } }),
  }),
});

const DELETE_TODO_WRAPPED = graphql(DELETE_TODO, {
  props: ({ mutate }) => ({
    deleteTodo: id => mutate({ variables: { id } }),
  }),
});

export default compose(
  MUTATE_TITLE_WRAPPED,
  TOGGLE_TODO_WRAPPED,
  DELETE_TODO_WRAPPED,
)(TodoComponent);
