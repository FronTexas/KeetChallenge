import { gql } from 'react-apollo';

import TableActionButtonFactory from './TableActionButton';

const ToggleAllButton = TableActionButtonFactory(gql`
mutation toggleAll($checked:Boolean!){
  toggleAll(checked:$checked){
    id,title,completed
  }
}`);

export default ToggleAllButton;
