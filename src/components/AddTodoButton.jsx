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
  constructor(props) {
    super(props);
    this.onAddClick = this.onAddClick.bind(this);
  }

  onAddClick() {
    this.props
      .mutate({ variables: { title: '' } })
      .then((res) => {
        if (res.data.add) {
          this.props.refetch();
        }
      });
  }

  render() {
    const { mobile, children } = this.props;
    return (
      <Button
        icon={mobile}
        flat={!mobile}
        primary
        tooltipLabel={mobile ? children : null}
        onClick={this.onAddClick.bind(this)}
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
  refetch: PropTypes.func.isRequired
};

export default graphql(addTodoMutation)(AddTodoButton);
