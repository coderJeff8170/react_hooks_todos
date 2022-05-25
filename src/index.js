import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import ReactDOM from "react-dom";
import TodosContext from "./context";
import todosReducer from "./reducer";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import axios from "axios";

//custom hook to grab api

const useAPI = (endpoint) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(endpoint);
    setData(response.data);
  };
  return data;
};

const App = () => {
  const initialState = useContext(TodosContext); //initial state comes from the context object
  const [state, dispatch] = useReducer(todosReducer, initialState); //useReducer takes a reducer function and a state,
  const savedTodos = useAPI("http://localhost:3001/todos");

  useEffect(() => {
      dispatch({
          type: "GET_TODOS",
          payload: savedTodos
      })
  },[savedTodos])

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm></TodoForm>
      <TodoList />
    </TodosContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
