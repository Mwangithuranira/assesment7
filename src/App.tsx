import React, { useReducer, useEffect } from "react";
import TodoList from "./components/todolist";
import TodoForm from "./components/todoform";
import { Todo, Action } from "./types.d";

import "./App.scss";
import Header from "./components/header";

const initialTodos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

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
  const [todos, dispatch] = useReducer(reducer, initialTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const uncompletedTodos = totalTodos - completedTodos;

  return (
    <div className="wrapper">
      <div className="mytodo">
        <Header />
        <TodoForm onAddTodo={addTodo} />
      </div>
      <div className="app">
        <TodoList
          todos={todos}
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
