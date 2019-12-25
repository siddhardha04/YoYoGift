import React, { useContext, useEffect, useState } from "react";
import { userAuthenticationContext } from "../shared/Contexts";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "@material-ui/core";
import GiftCardList from "./GiftCardList";

function Profile() {
  let userContext = useContext(userAuthenticationContext);
  const [userProfileData, setUserProfileData] = useState({});
  const [favouriteIds, setFavouriteIds] = useState([]);
  const [favouriteCards, setFavouriteCards] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);
  const [noCardsToDisplay, setNoCardsToDisplay] = useState(false);

  useEffect(() => {
    async function getUserProfileData() {
      const resp = await axios.get(
        "http://localhost:3001/users?email=" + userContext.userdata.userEmail
      );
      setUserProfileData(resp.data[0]);
      setFavouriteIds(resp.data[0].favourites);
    }
    getUserProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAddBalance() {
    let minimumPoints = 1000;
    let updatedPoints = minimumPoints + userProfileData.balancePoints;
    axios
      .put("http://localhost:3001/users/" + userProfileData.id, {
        ...userProfileData,
        balancePoints: updatedPoints
      })
      .then(resp => {
        setUserProfileData(resp.data);
      });
  }

  async function displayFavourites() {
    let resp = await axios.get("http://localhost:3001/gifts");
    let totalGifts = resp.data;
    let result = [];
    favouriteIds.forEach(id =>
      // eslint-disable-next-line array-callback-return
      totalGifts.find(gift => {
        if (gift.id === id) result.push(gift);
      })
    );
    setFavouriteCards(result);
    if (result.length === 0) {
      setNoCardsToDisplay(true);
    }
    setShowFavourites(true);
  }

  return userProfileData.email !== "" ? (
    <div className="user-profile-wrapper">
      <div className="user-profile">
        <div className="profile-image">
          <img
            alt="profile-img"
            src={userProfileData.image}
            style={{ border: "1px solid", borderRadius: "50%" }}
          />
        </div>
        <div className="user-desc">
          <div style={{ fontSize: "30px" }}>Name: {userProfileData.name}</div>
          <div style={{ fontSize: "20px" }}>
            Account Balance:{userProfileData.balancePoints}
          </div>
          <Button
            onClick={handleAddBalance}
            color="secondary"
            variant="contained"
          >
            Add Balance
          </Button>
        </div>
      </div>
      <div className="user-cards-container">
        <div className="user-features">
          <Button
            color="secondary"
            variant="contained"
            onClick={displayFavourites}
          >
            Favourites
          </Button>
        </div>
        {showFavourites ? (
          <div className="feature-container">
            {!noCardsToDisplay ? (
              <GiftCardList gifts={favouriteCards} />
            ) : (
              <div>No Favourite cards are available</div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <CircularProgress />
  );
}

export default Profile;
