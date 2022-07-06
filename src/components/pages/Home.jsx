import React from 'react'
import { Link } from "react-router-dom";
import EntryList from '../EntryList';
import EntryListItem from "../EntryListItem";

function Home() {
  return (
    <>
      <h3>All Categories</h3>
      <EntryList />
    </>
  );
}

// function Home({entries}) {
//   return entries ? (
//     <>
//       <h3>All Categories</h3>
//       <EntryList entries={entries} />
//     </>
    // <ul>
    //   {/* {entries.map((entry) => (
    //     <EntryListItem id={entry._id} text={entry.entry} />
    //   ))} */}
    //   {/* {entries.map((entry) => (
    //     <li key={entry._id}>
    //       <Link to={`/entry/${entry._id}`}>{entry.entry}</Link>
    //     </li>
    //   ))} */}
    //   {/* {entries.map((entry, index) => (
    //     <li>
    //       <Link to={`/entry/${index}`}>{entry.entry}</Link>
    //     </li>
    //   ))} */}
    // </ul>
  // ) : (
  //   <p>Loading...</p>
  // );
// }

export default Home