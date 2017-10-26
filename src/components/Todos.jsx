import React, { Component } from 'react';
import { gql,graphql } from 'react-apollo';

// import Todo from './Todo.jsx';

const query = gql`{
  todos{
    id
    title
    completed
  }
}`

class Todos extends Component {
  render() {
  	let { data } = this.props;
  	let { todos } = data;

  	if (data.loading){return <div></div>};

    return(
      <div>
        {
          todos.map((item,index)=>{
          	let {id,title,completed} = item;
          	console.log('id,title,completed',{id,title,completed});
             // <Todo id={id} title={title} completed={completed}></Todo>
          })	
        }
      </div>
    )
  }
}

Todos = graphql(query)(Todos);
export default Todos;
