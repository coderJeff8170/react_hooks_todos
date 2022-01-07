import React, { useContext, useReducer } from "react";
import { UserContext } from "./index";

//write the reducer and global state outside of component body
const initialState = {
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        count: state.count + 1,
      };
    case "decrement":
      return {
        count: state.count - 1,
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export default function App() {
  const username = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // context patter without useContext:
    // <div className="App">
    //   <UserContext>
    //   {value => <div>Hello, {value}</div>}
    //   </UserContext>
    // </div>
    <div>
      <div>Hello, {username}</div>
      <div>Count: {state.count}</div>
      <button
        className="border p-1"
        onClick={() => dispatch({ type: "increment" })}
      >
        Increment
      </button>
      <button
        className="border p-1"
        onClick={() => dispatch({ type: "decrement" })}
      >
        Decrement
      </button>

      <button
        className="border p-1"
        onClick={() => dispatch({ type: "reset" })}
      >
        Reset
      </button>
    </div>
  );
}
