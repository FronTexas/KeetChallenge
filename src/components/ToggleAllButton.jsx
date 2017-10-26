import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Button } from 'react-md';


const toggleAllMutation = gql`
mutation toggleAll($checked:Boolean!){
  toggleAll(checked:$checked){
    id,title,completed
  }
}`;

class ToggleAllButton extends Component {
  render() {
    const { mobile, children, mutate, onToggleAllClick } = this.props;
    return (
      <Button
        icon={mobile}
        flat={!mobile}
        primary
        tooltipLabel={mobile ? children : null}
        onClick={() => onToggleAllClick(mutate)}
        {...this.props}
      >
        {mobile ? null : children}
      </Button>
    );
  }
}


ToggleAllButton.propTypes = {
  mobile: PropTypes.bool,
  children: PropTypes.node.isRequired,
  refetch: PropTypes.func.isRequired,
  onToggleAllClick: PropTypes.func.isRequired,
};

export default graphql(toggleAllMutation)(ToggleAllButton);
