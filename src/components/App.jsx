import { useEffect, useReducer, useState } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Nav from "./Nav";
import CategorySelection from "./pages/CategorySelection"
import Home from "./pages/Home";
import NewEntry from "./pages/NewEntry";
import ShowEntry from "./pages/ShowEntry"; 
import reducer from '../reducer'
import StoreContext from "../store";
import useStore from "../reducer";


// const initialState = {
//   entries: [],
//   categories: []
// }

// use reducer if multiple components needs access to the state
// function reducer(state, action) {
//   switch (action.type) {
//     case 'setEntries':
//       return {
//         // always expand it so that categories doesn't get erased
//         ...state,
//         entries: action.data
//       }
//     case "addEntry":
//       return {
//         ...state,
//         entries: [...state.entries, action.data]
//       }
//     default:
//       return state;
//   }
// }

const api = import.meta.env.VITE_API_ENDPOINT || "http://localhost:4000/api/v1";

function App() {
  // const [entries, setEntries] = useState([
  //   { category: "Food", entry: "Hello" },
  //   { category: "Coding", entry: "Coding is cool!" },
  //   { category: "Work", entry: "Just another day at the office" },
  // ]);

  const [store, dispatch] = useStore()
  // const [store, dispatch] = useReducer(reducer, initialState)
  const {entries} = store

  useEffect(() => {
    async function getEntries() {
      const res = await fetch(`${api}/entries`)
      // const data = await res.json()
      // setEntries(data)
      // setEntries(await res.json());
      dispatch({
        type: 'setEntries',
        data: await res.json()
      })
    }
    getEntries()
  }, [])

  function ShowEntryWrapper() {
    const { id } = useParams();
    // return <ShowEntry entry={entries[id]} />
    // return <ShowEntry entry={entries.find((entry) => entry._id == id)} />;
    return <ShowEntry entry={entries.find((entry) => entry._id == id)} />;
  }

  // function addEntry(category, entry) {
  //   const newEntry = { category, entry };
  //   // rewatch at 90 mins REACT 3.4.1 SPA CRUD
  //   const id = entries.length;
  //   setEntries([...entries, newEntry]);
  //   return id
  // }

  async function addEntry(category, entry) {
    const newEntry = { category, entry };
    const res = await fetch(`${api}/entries`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    });
    const returnedEntry = await res.json();
    // setEntries([...entries, returnedEntry]);
    dispatch({
      type: "addEntry",
      data: returnedEntry
    })
    return returnedEntry._id;
  }

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      <BrowserRouter>
        <Nav />
        <Routes>
          {/* <Route path="/" element={<Home entries={entries} />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<CategorySelection />} />
          <Route path="entry/:id" element={<ShowEntryWrapper />} />
          <Route
            path="/entry/new/:category"
            element={<NewEntry addEntry={addEntry} />}
          />
          {/* this is a wildcard and will match with any url */}
          <Route path="*" element={<h4>Page not Found!</h4>} />
        </Routes>
        {/* <Home />
      <CategorySelection />
      <NewEntry /> */}
      </BrowserRouter>
    </StoreContext.Provider>
  );
}

export default App
