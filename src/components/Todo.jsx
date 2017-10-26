import React, { Component } from 'react';
import {
  TableRow,
  EditDialogColumn,
} from 'react-md';
import { gql, graphql } from 'react-apollo';


import PropTypes from 'prop-types';

const MUTATE_TIMEOUT_INTERVAL = 500;

const mutateTitle = gql`
  mutation mutateTitle($id: String!,$title: String!){
  save(id: $id, title: $title){
    id,title,completed
  }
}`;

class Todo extends Component {
  constructor(props) {
    super(props);
    this.mutateTitle = this.mutateTitle.bind(this);
  }

  mutateTitle(id, title, refetch, mutate) {
    if (this.timeOutId) clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      mutate({ variables: { id, title } })
        .then((res) => {
          if (res.data.save) {
            refetch();
          }
        });
    }, MUTATE_TIMEOUT_INTERVAL);
  }

  render() {
    const { id, title, completed, refetch, mutate } = this.props;
    return (
      <TableRow>
        <EditDialogColumn
          defaultValue={title}
          placeholder="Add new todo"
          onChange={(updatedTitle) => { this.mutateTitle(id, updatedTitle, refetch, mutate); } }
          inline
        />
      </TableRow>
    );
  }
}

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default graphql(mutateTitle)(Todo);
