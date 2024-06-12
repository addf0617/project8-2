import React from "react";

const Search = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.search();
  };

  const handleChange = (e) => {
    props.setQuery(e.target.value);
  };

  return (
    <section>
      <form role="search">
        <label htmlFor="search">Search for stuff</label>
        <input
          id="search"
          type="search"
          placeholder="Search..."
          autoFocus
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Go
        </button>
      </form>
    </section>
  );
};

export default Search;
