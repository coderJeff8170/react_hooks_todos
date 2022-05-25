import axios from "axios";
import React, { useContext } from "react";
import TodosContext from "../context";
import {PencilFill, TrashFill } from 'react-bootstrap-icons';

export default function TodoList() {
  const { state, dispatch } = useContext(TodosContext);
  const title =
    state.todos.length > 0
      ? `Number of Todos: ${state.todos.length}`
      : "Nothing to do!";

  return (
    <div
      className="container mx-auto
    max-w-md text-center font-mono"
    >
      <h1 className="text=bold">{title}</h1>
      <ul className="list-reset text-white p-0">
        {state.todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center bg-orange-dark border-black border-dashed border-2 my-2 py-4"
          >
            <span
              className={`flex-1 ml-12 cursor-pointer ${
                todo.complete && "line-through text-grey-darkest"
              }`}
              onDoubleClick={async () => {
                const response = await axios.patch(`http://localhost:3001/todos/${todo.id}`, {
                  complete: !todo.complete,
                });
                dispatch({ type: "TOGGLE_TODO", payload: response.data });
              }}
            >
              {todo.text}
            </span>
            <button
            className="h-6 mx-2 px-2 bg-blue"
              onClick={() =>
                dispatch({ type: "SET_CURRENT_TODO", payload: todo })
              }
            >
              <PencilFill 
                
              />
            </button>
            <button
            className="h-6 mx-2 px-2 bg-red">
              <TrashFill
                
                onClick={async () => {
                  await axios.delete(`http://localhost:3001/todos/${todo.id}`);
                  dispatch({ type: "DELETE_TODO", payload: todo });
                }}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
