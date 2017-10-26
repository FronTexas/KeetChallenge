import { gql } from 'react-apollo';

import TableActionButtonFactory from './TableActionButton';

const ClearCompletedButton = TableActionButtonFactory(gql`
mutation {
  clearCompleted{
    id,title,completed
  }
}`);

export default ClearCompletedButton;
