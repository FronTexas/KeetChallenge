import React from 'react';
import { shallow, mount } from 'enzyme';
import { gql } from 'react-apollo';
import { Todos } from './components/Todos';
import App from './App';
import Todo from './components/Todo';
import TableActionButtonBuilder from './components/TableActionButton';

it('shallow renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.length).toEqual(1);
});

describe('Test for <Todos/>', () => {
  let wrapper;
  const mockedFunctions = {
    handleAddTodoClick: jest.fn(),
    handleToggleAllClick: jest.fn(),
    handleClearCompletedClick: jest.fn(),
    handleDeleteTodo: jest.fn(),
    handleToggleCompleted: jest.fn(),
    handleMutateTitle: jest.fn(),
  };

  beforeEach(() => {
    const mockedData = {
      loading: false,
      error: false,
      refetch: () => {},
      todos: [{ id: '123', title: 'Empty', completed: false }],
    };
    wrapper = mount(<Todos data={mockedData} />);
    wrapper.instance().handleAddTodoClick = mockedFunctions.handleAddTodoClick;
    wrapper.instance().handleToggleAllClick = mockedFunctions.handleToggleAllClick;
    wrapper.instance().handleClearCompletedClick = mockedFunctions.handleClearCompletedClick;
    wrapper.instance().handleDeleteTodo = mockedFunctions.handleDeleteTodo;
    wrapper.instance().handleToggleCompleted = mockedFunctions.handleToggleCompleted;
    wrapper.instance().handleMutateTitle = mockedFunctions.handleMutateTitle;
  });

  it('Calls AddTodo handler', () => {
    wrapper.find('#add-todo-button').props().onClick();
    expect(mockedFunctions.handleAddTodoClick).toHaveBeenCalled();
  });

  it('Calls ClearCompleted handler', () => {
    wrapper.find('#clear-completed-button').props().onClick();
    expect(mockedFunctions.handleClearCompletedClick).toHaveBeenCalled();
  });

  it('Calls MutateTitle handler', () => {
    wrapper.find('Todo').props().mutateTitle();
    expect(mockedFunctions.handleMutateTitle).not.toHaveBeenCalled();
  });
});

describe('Test for <Todo />', () => {
  let wrapper;
  const minProps = {
    id: '',
    title: '',
    completed: false,
    refetch: () => {},
    mutateTitleMutation: () => {},
    toggleCompletedMutation: () => {},
    deleteTodoMutation: () => {},
    toggleCompleted: jest.fn(),
    mutateTitle: jest.fn(),
    deleteTodo: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mount(<Todo {...minProps} />);
  });

  it('Renders Todo without exploding', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('Calls deleteTodo when delete button is pressed', () => {
    wrapper.find('Button').simulate('click');
    expect(minProps.deleteTodo).toHaveBeenCalled();
  });

  it('Calls toggleCompleted when the checkbox is clicked', () => {
    wrapper.find('TableRow').props().onCheckboxClick();
    expect(minProps.toggleCompleted).toHaveBeenCalled();
  });

  it('Calls mutateTitle after editing the title', () => {
    wrapper.find('EditDialogColumn').props().onChange();
    expect(minProps.mutateTitle).toHaveBeenCalled();
  });
});

describe('Test for <TableActionButton />', () => {
  let wrapper;
  const minProps = {
    mobile: false,
    OnClickHandler: jest.fn(),
    mutate: jest.fn(),
  };

  beforeEach(() => {
    const TableActionButton = TableActionButtonBuilder(gql`
      mutation addTodo($title:String!){
        add(title:$title){
          id,title,completed
        }
    }`);
    wrapper = mount(<TableActionButton{...minProps}>Test</TableActionButton>);
  });

  it('Calls the handler when clicked', () => {
    wrapper.find('Button').props().onClick();
    expect(minProps.OnClickHandler).toHaveBeenCalled();
  });
});
