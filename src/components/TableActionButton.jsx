import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-md';

const TableActionButton = ({ mobile, children, ...props }) => (
  <Button
    icon={mobile}
    flat={!mobile}
    primary
    tooltipLabel={mobile ? children : null}
    {...props}
  >
    {mobile ? null : children}
  </Button>
);

TableActionButton.defaultProps = { mobile: false };

TableActionButton.propTypes = {
  mobile: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default TableActionButton;
