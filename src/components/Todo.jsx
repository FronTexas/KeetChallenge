import React, { Component } from 'react';
import {
  TableRow,
  EditDialogColumn,
  Button,
} from 'react-md';
import { gql, graphql, compose } from 'react-apollo';


import PropTypes from 'prop-types';


const mutateTitleMutationString = gql`
mutation mutateTitle($id: String!,$title: String!){
  save(id: $id, title: $title){
    id,title,completed
  }
}`;

const toggleCompletedMutationString = gql`
mutation toggleCompleted($id:String!){
  toggle(id:$id){
    id,title,completed
  }
}`;

const deleteTodoMutationString = gql`
mutation deleteTodo($id:String!){
  destroy(id:$id){
    id,title,completed
  }
}`;

const MUTATE_TIMEOUT_INTERVAL = 300;
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
  refetch: PropTypes.func.isRequired,
  mutateTitleMutation: PropTypes.func.isRequired,
  toggleCompletedMutation: PropTypes.func.isRequired,
  deleteTodoMutation: PropTypes.func.isRequired,
};

export default compose(
  graphql(mutateTitleMutationString, { name: 'mutateTitleMutation' }),
  graphql(toggleCompletedMutationString, { name: 'toggleCompletedMutation' }),
  graphql(deleteTodoMutationString, { name: 'deleteTodoMutation' }),

)(Todo);
