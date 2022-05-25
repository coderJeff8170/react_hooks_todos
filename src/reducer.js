// import uuidv4 from 'uuid/v4'

export default function reducer(state, action) {
  switch (action.type) {
      case "GET_TODOS":
          return {
              ...state,
              todos: action.payload
          }
    case "TOGGLE_TODO":
      const toggledTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? action.payload
          : todo
      );
      return {
        ...state,
        todos: toggledTodos,
      };
    // return {
    //     ...state,
    //     complete: !action.payload.complete
    // }

    case "DELETE_TODO":
      const deletedTodos = state.todos.filter(
        (el) => el.id !== action.payload.id
      );
      //prevent persisted text if todo is deleted in middle of update
      const isRemovedTodo =
        state.currentTodo.id === action.payload.id ? {} : state.currentTodo;
      return {
        ...state,
        currentTodo: isRemovedTodo,
        todos: deletedTodos,
      };

    case "ADD_TODO":
    //   if (!action.payload) {
    //     return state;
    //   }
    //   if (state.todos.findIndex((todo) => todo.text === action.payload) > -1) {
    //     return state;
    //   }
      const addedTodos = [...state.todos, action.payload];
      return {
        ...state,
        todos: addedTodos,
      };
      
    case "SET_CURRENT_TODO":
      return {
        ...state,
        currentTodo: action.payload,
      };

    case "UPDATE_TODO":
    //   if (!action.payload) {
    //     return state;
    //   }
    //   if (state.todos.findIndex((todo) => todo.text === action.payload) > -1) {
    //     return state;
    //   }
      //create the update todo from the payload
      const updatedTodo = {...action.payload};
      //find index of todo to update
      const updatedTodoIndex = state.todos.findIndex(
        (todo) => todo.id === state.currentTodo.id
      );
      //update the todos by inserting the updated todo into the whole array with slice
      const updatedTodos = [
        ...state.todos.slice(0, updatedTodoIndex),
        updatedTodo,
        ...state.todos.slice(updatedTodoIndex + 1),
      ];

      return {
        ...state,
        currentTodo: {}, //dont forget to empty the currentTodo!
        todos: updatedTodos,
      };

    default:
      return state;
  }
}
