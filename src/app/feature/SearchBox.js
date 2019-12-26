import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from "@material-ui/core";

function SearchBox(props) {
  const [queryValue, setQueryValue] = useState("");

  function handleQueryValueChange(e) {
    setQueryValue(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    props.history.push("/search?q=" + queryValue);
    // let { data } = await axios.get("http://localhost:3001/gifts");
    // let totalCards = data;
    // let filteredCards = totalCards.filter(
    //   card => card.name.includes(queryValue.toLocaleUpperCase()) === true
    // );
    // setFilteredCards(filteredCards);
    // setShowCardsList(true);
  }

  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="search-container">
          <div className="search-icon">
            <SearchIcon />
          </div>
          <TextField
            id="searchQuery"
            placeholder="Search by card name"
            size="small"
            value={queryValue}
            onChange={handleQueryValueChange}
          />
        </div>
      </form>
    </>
  );
}

export default withRouter(SearchBox);
