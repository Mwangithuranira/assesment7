interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
  type Action =
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'TOGGLE_COMPLETE'; payload: number }
    | { type: 'DELETE_TODO'; payload: number }
    | { type: 'EDIT_TODO'; payload: { id: number, text: string } };


    


    export type { Todo, Action };
  