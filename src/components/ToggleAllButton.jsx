import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { TOGGLE_ALL } from '../graph';

import TableActionButton from './TableActionButton';

class ToggleAllButton extends Component {
  static propTypes = {
    toggleAllTodos: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      toggleAllValue: false,
    };
  }

  handleOnClick = () => {
    const { toggleAllTodos } = this.props;
    toggleAllTodos(this.state.toggleAllValue)
      .then(() => this.setState({ toggleAllValue: !this.state.toggleAllValue }));
  }

  render() {
    return (
      <TableActionButton onClick={this.handleOnClick} {...this.props} />
    );
  }
}

export default graphql(TOGGLE_ALL, {
  props: ({ mutate }) => ({
    toggleAllTodos: checked => mutate({ variables: { checked } }),
  }),
})(ToggleAllButton);
