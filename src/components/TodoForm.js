import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import TodosContext from "../context";

export default function TodoForm() {
  const [todo, setTodo] = useState("");
  const {
    state: { currentTodo = {} }, //we need access to the currentTodo in global state
    dispatch,
  } = useContext(TodosContext);

  //we employ useEffect to tell us if the currentTodo has changed
  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    } else {
      setTodo(""); //reset the text box
    }
  }, [currentTodo.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentTodo.text) {
        const response = await axios.patch(`http://localhost:3001/todos/${currentTodo.id}`, {
            text: todo
        })
      dispatch({ type: "UPDATE_TODO", payload: response.data });
    } else {
      const newId = await axios.get("http://localhost:3001/idCount");
      console.log(newId.data.count)
      
      const response = await axios.post("http://localhost:3001/todos", {
        id: newId.data.count,
        text: todo,
        complete: false,
      });
      const updatedId = await axios.put("http://localhost:3001/idCount", {
        count: newId.data.count + 1
      })
      dispatch({ type: "ADD_TODO", payload: response.data });
    }

    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input
        type="text"
        className="border-black border-solid border-2"
        onChange={(event) => setTodo(event.target.value)}
        value={todo}
      />
    </form>
  );
}
