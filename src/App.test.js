import React from 'react';
import { shallow, mount } from 'enzyme';
import { Todos } from './components/Todos';
import App from './App';
import TableActionButton from './components/TableActionButton';
import { TodoComponent } from './components/Todo';
import { AddTodoButtonComponent } from './components/AddTodoButton';
import { ClearCompletedButtonComponent } from './components/ClearCompletedButton';
import { ToggleAllButtonComponent } from './components/ToggleAllButton';

it('shallow renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.length).toEqual(1);
});

describe('Test for Todos', () => {
  let wrapper;

  beforeEach(() => {
    const mockedData = {
      loading: false,
      error: false,
      refetch: () => {},
      todos: [{ id: '123', title: 'Empty', completed: false }],
    };
    wrapper = mount(<Todos data={mockedData} />);
  });

  it('Renders without exploding', () => {
    expect(wrapper.length).toEqual(1);
  });
});

describe('Test for Todo', () => {
  let wrapper;
  const minProps = {
    id: '',
    title: '',
    completed: false,
    refetchTodos: () => {},
    toggleTodo: jest.fn(),
    mutateTitle: jest.fn(),
    deleteTodo: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mount(<TodoComponent {...minProps} />);
  });

  it('Renders Todo without exploding', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('Calls deleteTodo when delete button is pressed', () => {
    const mockPromise = new Promise((resolve) => {
      resolve();
    });
    minProps.deleteTodo.mockReturnValueOnce(mockPromise);
    wrapper.find('Button').simulate('click');
    expect(minProps.deleteTodo).toHaveBeenCalled();
  });

  it('Calls toggleTodo when the checkbox is clicked', () => {
    wrapper.find('TableRow').props().onCheckboxClick();
    expect(minProps.toggleTodo).toHaveBeenCalled();
  });

  it('Calls mutateTitle after editing the title', () => {
    jest.useFakeTimers();
    wrapper.find('EditDialogColumn').props().onChange();
    jest.runAllTimers();
    expect(minProps.mutateTitle).toHaveBeenCalled();
  });
});

describe('Test for TableActionButton', () => {
  let wrapper;
  const minProps = {
    mobile: false,
  };

  beforeEach(() => {
    wrapper = mount(<TableActionButton{...minProps}>Test</TableActionButton>);
  });

  it('Renders TableActionButton without exploding', () => {
    expect(wrapper.length).toEqual(1);
  });
});

describe('Test for AddTodoButton', () => {
  let wrapper;
  let addTodo;
  let mockPromise;
  let refetchTodos;

  beforeEach(() => {
    addTodo = jest.fn();
    mockPromise = new Promise((resolve) => {
      const res = { data: { add: true } };
      resolve(res);
    });
    refetchTodos = jest.fn();
    addTodo.mockReturnValueOnce(mockPromise);
    wrapper = mount(<AddTodoButtonComponent addTodo={addTodo} refetchTodos={refetchTodos} />);
  });

  it('Calls addTodo when clicked', () => {
    wrapper.find('TableActionButton').props().onClick();
    expect(addTodo).toHaveBeenCalled();
  });
});

describe('Test for ClearCompletedButton', () => {
  let wrapper;
  let clearCompleted;
  let mockPromise;
  let refetchTodos;

  beforeEach(() => {
    clearCompleted = jest.fn();
    mockPromise = new Promise((resolve) => {
      const res = { data: { clearCompleted: true } };
      resolve(res);
    });
    refetchTodos = jest.fn();
    clearCompleted.mockReturnValueOnce(mockPromise);
    wrapper = mount(<ClearCompletedButtonComponent clearCompleted={clearCompleted} refetchTodos={refetchTodos} />);
  });

  it('Calls clearCompleted when clicked', () => {
    wrapper.find('TableActionButton').props().onClick();
    expect(clearCompleted).toHaveBeenCalled();
  });
});

describe('Test for ToggleAllButton', () => {
  let wrapper;
  let toggleAllTodos;
  let mockPromise;

  beforeEach(() => {
    toggleAllTodos = jest.fn();
    mockPromise = new Promise((resolve) => {
      resolve();
    });
    toggleAllTodos.mockReturnValueOnce(mockPromise);
    wrapper = mount(<ToggleAllButtonComponent toggleAllTodos={toggleAllTodos} />);
  });

  it('Calls toggleAllTodos when clicked', () => {
    wrapper.find('TableActionButton').props().onClick();
    expect(toggleAllTodos).toHaveBeenCalled();
  });
});
