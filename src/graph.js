import { gql } from 'react-apollo';

export const MUTATE_TITLE = gql`
mutation mutateTitle($id: String!,$title: String!){
  save(id: $id, title: $title){
    id,title,completed
  }
}`;

export const TOGGLE_TODO = gql`
mutation toggleTodo($id:String!){
  toggle(id:$id){
    id,title,completed
  }
}`;

export const DELETE_TODO = gql`
mutation deleteTodo($id:String!){
  destroy(id:$id){
    id,title,completed
  }
}`;
