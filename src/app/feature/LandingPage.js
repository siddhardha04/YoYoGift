import React, { useEffect, useState, memo } from "react";
import GiftCardList from "./GiftCardList";
import Categories from "./Categories";
import Brands from "./Brands";
import CardPoints from "./CardPoints";
import axios from "axios";

function LandingPage() {
  const [gifts, setGifts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showBrands, setShowBrands] = useState(false);
  const [showPoints, setShowPoints] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState("");
  //const [noCardsToDisplay, setnoCardsToDisplay] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/gifts").then(resp => setGifts(resp.data));

    axios.get("http://localhost:3001/category").then(resp => {
      const totalCategories = resp.data.map(cat => cat.name);
      return setCategories(totalCategories);
    });
  }, []);

  async function handleCategory(e) {
    e.persist();
    if (e.target.checked === true) {
      let resp = await axios.get(
        "http://localhost:3001/gifts?categoryId=" +
          Number(e.target.defaultValue)
      );

      let filteredGifts = resp.data;
      setGifts(filteredGifts);
      setSelectedCategory(e.target.defaultValue);

      /*getting all brands based on category selection */
      let allBrandNames = filteredGifts.map(gift => gift.brand);
      let uniqueBrandNames = [];
      allBrandNames.forEach(name => {
        if (uniqueBrandNames.indexOf(name) === -1) {
          uniqueBrandNames.push(name);
          return name;
        }
      });

      setBrands(uniqueBrandNames);
      setShowBrands(true);
    }
  }
  async function handleBrand(e) {
    e.persist();
    if (e.target.checked === true) {
      let resp = await axios.get(
        "http://localhost:3001/gifts?categoryId=" +
          selectedCategory +
          "&brand=" +
          e.target.defaultValue
      );
      let filteredGifts = resp.data;
      setGifts(filteredGifts);
      setSelectedBrand(e.target.defaultValue);
      setShowPoints(true);
    }
  }

  async function handlePoints(e) {
    e.persist();
    let lowerPointvalue;
    let highPointValue;
    let points = e.target.defaultValue.split("-");
    if (points.length > 1) {
      lowerPointvalue = points[0];
      highPointValue = points[1];
    } else {
      lowerPointvalue = e.target.defaultValue.slice(1);
      highPointValue = 100000;
    }
    if (e.target.checked === true) {
      let resp = await axios.get(
        "http://localhost:3001/gifts?categoryId=" +
          selectedCategory +
          "&brand=" +
          selectedBrand
      );
      let totalGifts = resp.data;
      // eslint-disable-next-line array-callback-return
      let filterdGiftsByPoints = totalGifts.filter(gift => {
        if (
          gift.buyoutPoints >= lowerPointvalue &&
          gift.buyoutPoints <= highPointValue
        )
          return gift;
      });
      // if (filterdGiftsByPoints.length === 0) {
      //   setnoCardsToDisplay(true);
      // }
      setGifts(filterdGiftsByPoints);
    }
  }

  return (
    <div className="app-container">
      <div className="categories-container">
        <Categories categories={categories} handleCategory={handleCategory} />
      </div>
      <div className="brands-container">
        {showBrands ? (
          <Brands brands={brands} handleBrand={handleBrand} />
        ) : null}
      </div>
      <div className="points-container">
        {showPoints ? <CardPoints handlePoints={handlePoints} /> : null}
      </div>
      <div className="filtered-cards-container">
        <GiftCardList gifts={gifts} />
      </div>
    </div>
  );
}

export default memo(LandingPage);
