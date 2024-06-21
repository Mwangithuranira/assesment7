import React, { useState } from 'react';
import { Todo } from '../types.d';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(todo.id, newText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
         title="Edit todo text"
          placeholder="Enter todo text"
        onChange={() => onToggleComplete(todo.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          title="Edit todo text"
          placeholder="Enter todo text"
        />
      ) : (
        <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
      )}
      <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
