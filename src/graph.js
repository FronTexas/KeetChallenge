import { gql } from 'react-apollo';

export const QUERY_TODOS = gql`{
  todos{
    id
    title
    completed
  }
}`;

export const ADD_TODO = gql`
mutation addTodo($title:String!){
  add(title:$title){
    id,title,completed
  }
}`;

export const CLEAR_COMPLETED = gql`
mutation {
  clearCompleted{
    id,title,completed
  }
}`;

export const TOGGLE_ALL = gql`
mutation toggleAll($checked:Boolean!){
  toggleAll(checked:$checked){
    id,title,completed
  }
}`;

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
