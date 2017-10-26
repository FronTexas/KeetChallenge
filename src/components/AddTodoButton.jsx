import { gql } from 'react-apollo';

import TableActionButtonFactory from './TableActionButton';

const AddTodoButton = TableActionButtonFactory(gql`
mutation addTodo($title:String!){
	add(title:$title){
	  id,title,completed
	}
}`);

export default AddTodoButton;
