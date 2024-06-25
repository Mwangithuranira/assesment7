import React, { useReducer, useEffect } from "react";
import TodoList from "./components/todolist";
import TodoForm from "./components/todoform";
import { Todo, Action } from "./types.d";
import useLocalStorage from "./Hooks/useLocalstorage";

import "./App.scss";
import Header from "./components/header";
//code resolution using useLocalStorage hook

// Remove initialTodos declaration as i have handled it using useLocalStorage hook

const reducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case "TOGGLE_COMPLETE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "EDIT_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
    default:
      return state;
  }
};

const App: React.FC = () => {
  // Use the useLocalStorage hook to get and set todos
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  const [state, dispatch] = useReducer(reducer, todos);

  useEffect(() => {
    setTodos(state);
  }, [state, setTodos]);

  const addTodo = (text: string) => {
    dispatch({ type: "ADD_TODO", payload: text });
  };

  const toggleComplete = (id: number) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  };

  const deleteTodo = (id: number) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const editTodo = (id: number, newText: string) => {
    dispatch({ type: "EDIT_TODO", payload: { id, text: newText } });
  };

  const totalTodos = state.length;
  const completedTodos = state.filter((todo) => todo.completed).length;
  const uncompletedTodos = totalTodos - completedTodos;

  return (
    <div className="wrapper">
      <div className="mytodo">
        <Header />
        <TodoForm onAddTodo={addTodo} />
      </div>
      <div className="app">
        <TodoList
          todos={state}
          onToggleComplete={toggleComplete}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
        <div className="counters">
          <p>Total Todos: {totalTodos}</p>
          <p>Completed Todos: {completedTodos}</p>
          <p>Uncompleted Todos: {uncompletedTodos}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
