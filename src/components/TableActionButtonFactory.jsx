import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Button } from 'react-md';


const TableActionButton = ({ mobile, children, mutate, OnClickHandler, ...props }) => (
  <Button
    icon={mobile}
    flat={!mobile}
    primary
    tooltipLabel={mobile ? children : null}
    onClick={() => OnClickHandler(mutate)}
    {...props}
  >
    {mobile ? null : children}
  </Button>
);

TableActionButton.defaultProps = { mobile: false };

TableActionButton.propTypes = {
  mobile: PropTypes.bool,
  children: PropTypes.node.isRequired,
  OnClickHandler: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
};

export default mutation => graphql(mutation)(TableActionButton);
