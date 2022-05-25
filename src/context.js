import React from "react";

const TodosContext = React.createContext({
    idCount: 4,
  todos: [
    // { id: 1, text: "Eat breakfast", complete: false },
    // { id: 2, text: "Do Laundry", complete: false },
    // { id: 3, text: "Finish Project", complete: false },
  ],
  currentTodo: {}
});

export default TodosContext;
