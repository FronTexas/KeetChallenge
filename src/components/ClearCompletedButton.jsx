import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Button } from 'react-md';


const clearCompletedMutation = gql`
mutation {
  clearCompleted{
    id,title,completed
  }
}`;

class ClearCompletedButton extends Component {
  render() {
    const { mobile, children, mutate, onClearCompletedClick } = this.props;
    return (
      <Button
        icon={mobile}
        flat={!mobile}
        primary
        tooltipLabel={mobile ? children : null}
        onClick={() => onClearCompletedClick(mutate)}
        {...this.props}
      >
        {mobile ? null : children}
      </Button>
    );
  }
}


ClearCompletedButton.propTypes = {
  mobile: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClearCompletedClick: PropTypes.func.isRequired,
};

export default graphql(clearCompletedMutation)(ClearCompletedButton);
