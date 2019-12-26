import React, { useState, useEffect } from "react";
import axios from "axios";
import GiftCardList from "./GiftCardList";

function Search(props) {
  const [filteredCards, setFilteredCards] = useState([]);
  //const [showCardsList, setShowCardsList] = useState(false);
  let searchValue = props.location.search.slice(3);

  useEffect(() => {
    async function getSearchData() {
      let { data } = await axios.get("http://localhost:3001/gifts");
      let totalCards = data;
      let filteredCards = totalCards.filter(
        card => card.name.includes(searchValue.toLocaleUpperCase()) === true
      );
      setFilteredCards(filteredCards);
    }
    getSearchData();
  }, [searchValue]);

  return (
    <>
      <h3>search results</h3>
      {filteredCards.length !== 0 ? (
        <GiftCardList gifts={filteredCards} />
      ) : (
        <h4>No cards to display</h4>
      )}
    </>
  );
}

export default Search;
