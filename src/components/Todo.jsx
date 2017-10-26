import React, { Component } from 'react';
import {
  TableRow,
  EditDialogColumn,
  Button
} from 'react-md';
import { gql, graphql, compose } from 'react-apollo';


import PropTypes from 'prop-types';


const mutateTitleMutation = gql`
mutation mutateTitle($id: String!,$title: String!){
  save(id: $id, title: $title){
    id,title,completed
  }
}`;

const toggleCompletedMutation = gql`
mutation toggleCompleted($id:String!){
  toggle(id:$id){
    id,title,completed
  }
}`;

const deleteTodoMutation = gql`
mutation deleteTodo($id:String!){
  destroy(id:$id){
    id,title,completed
  }
}`;

const MUTATE_TIMEOUT_INTERVAL = 500;
class Todo extends Component {
  constructor(props) {
    super(props);
    this.mutateTitle = this.mutateTitle.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  mutateTitle(id, title, mutation) {
    if (this.timeOutId) clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      mutation({ variables: { id, title } });
    }, MUTATE_TIMEOUT_INTERVAL);
  }

  toggleCompleted(id, mutation) {
    mutation({ variables: { id } });
  }

  deleteTodo(id, refetch, mutation) {
    mutation({ variables: { id } })
      .then((res) => {
        if (res.data.destroy) {
          refetch();
        }
      });
  }

  render() {
    const { id, title, completed, refetch, mutateTitleMutation, toggleCompletedMutation, deleteTodoMutation } = this.props;
    return (
      <TableRow
        onCheckboxClick={() => { this.toggleCompleted(id, toggleCompletedMutation); }}
        selected={completed}
      >
        <EditDialogColumn
          defaultValue={title}
          placeholder="Add new todo"
          onChange={(updatedTitle) => { this.mutateTitle(id, updatedTitle, mutateTitleMutation); }}
          inline
        />
        <Button
          onClick={() => this.deleteTodo(id, refetch, deleteTodoMutation)}
          raised
          secondary
          iconChildren="close"
        >Delete</Button>
      </TableRow>
    );
  }
}

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.string.isRequired,
};

export default compose(
  graphql(mutateTitleMutation, { name: 'mutateTitleMutation' }),
  graphql(toggleCompletedMutation, { name: 'toggleCompletedMutation' }),
  graphql(deleteTodoMutation, { name: 'deleteTodoMutation' }),

)(Todo);
