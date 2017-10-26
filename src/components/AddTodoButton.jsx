import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Button } from 'react-md';


const addTodoMutation = gql`
  mutation addTodo($title:String!){
    add(title:$title){
      id,title,completed
    }
}`;

class AddTodoButton extends Component {
  render() {
    const { mobile, children, mutate, onAddTodoClick } = this.props;
    return (
      <Button
        icon={mobile}
        flat={!mobile}
        primary
        tooltipLabel={mobile ? children : null}
        onClick={() => onAddTodoClick(mutate)}
        {...this.props}
      >
        {mobile ? null : children}
      </Button>
    );
  }
}


AddTodoButton.propTypes = {
  mobile: PropTypes.bool,
  children: PropTypes.node.isRequired,
  refetch: PropTypes.func.isRequired,
  onAddTodoClick: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired
};

export default graphql(addTodoMutation)(AddTodoButton);
