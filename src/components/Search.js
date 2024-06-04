import React from "react";

const Search = () => {
  return (
    <section>
      <form role="search">
        <label htmlFor="search">Search for stuff</label>
        <input id="search" type="search" placeholder="Search..." autoFocus />
        <button type="submit">Go</button>
      </form>
    </section>
  );
};
//<form onSubmit="event.preventDefault();" role="search">

export default Search;
