import React from 'react';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Button } from 'react-md';


const toggleAllMutation = gql`
mutation toggleAll($checked:Boolean!){
  toggleAll(checked:$checked){
    id,title,completed
  }
}`;

const ToggleAllButton = ({ mobile, children, mutate, onToggleAllClick, ...props }) => {
  return (
    <Button
      icon={mobile}
      flat={!mobile}
      primary
      tooltipLabel={mobile ? children : null}
      onClick={() => onToggleAllClick(mutate)}
      {...props}
    >
      {mobile ? null : children}
    </Button>
  );
};

ToggleAllButton.propTypes = {
  mobile: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onToggleAllClick: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
};

ToggleAllButton.defaultProps = { mobile: false };

export default graphql(toggleAllMutation)(ToggleAllButton);

