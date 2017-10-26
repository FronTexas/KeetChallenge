import React from 'react';
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

const Todo = (props) => {
  const {
    id,
    title,
    completed,
    refetch,
    mutateTitleMutation,
    toggleCompletedMutation,
    deleteTodoMutation,
    toggleCompleted,
    mutateTitle,
    deleteTodo } = props;
  return (
    <TableRow
      onCheckboxClick={() => { toggleCompleted(id, toggleCompletedMutation); }}
      selected={completed}
    >
      <EditDialogColumn
        defaultValue={title}
        placeholder="Type here to add new todo list"
        onChange={(updatedTitle) => { mutateTitle(id, updatedTitle, mutateTitleMutation); }}
        inline
      />
      <Button
        onClick={() => deleteTodo(id, refetch, deleteTodoMutation)}
        raised
        secondary
        iconChildren="close"
      >Delete
      </Button>
    </TableRow>
  );
};

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  refetch: PropTypes.func.isRequired,
  mutateTitleMutation: PropTypes.func.isRequired,
  toggleCompletedMutation: PropTypes.func.isRequired,
  deleteTodoMutation: PropTypes.func.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  mutateTitle: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default compose(
  graphql(mutateTitleMutationString, { name: 'mutateTitleMutation' }),
  graphql(toggleCompletedMutationString, { name: 'toggleCompletedMutation' }),
  graphql(deleteTodoMutationString, { name: 'deleteTodoMutation' }),
)(Todo);
