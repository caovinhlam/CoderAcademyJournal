import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "setEntries":
      return {
        // always expand it so that categories doesn't get erased
        ...state,
        entries: action.data,
      };
    case "addEntry":
      return {
        ...state,
        entries: [...state.entries, action.data],
      };
    default:
      return state;
  }
}

const initialState = {
  entries: [],
  categories: [],
};

// Custom Hook
const useStore = () => useReducer(reducer, initialState)
export default useStore
// export default reducer;
