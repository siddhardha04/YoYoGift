import React, { useEffect, useState, useContext, memo } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import Reviews from "./Reviews";
import RateReviewIcon from "@material-ui/icons/RateReview";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { userAuthenticationContext } from "../shared/Contexts";
import SendEmail from "./SendEmail";
import GiveReview from "./GiveReview";
import ActionSnackbar from "../shared/ActionSnackbar";
import Modal from "../shared/Modal";

function GiftDetails(props) {
  let giftId = props.match.params.id;
  const [giftCardDetails, setGiftCardDetails] = useState({});
  const [userReviews, setUserReviews] = useState([]);
  const [newReviewAdded, setNewReviewAdded] = useState(0);
  const [openGiftNowModal, setOpenGiftNowModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [favouriteIds, setFavouriteIds] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  let userContext = useContext(userAuthenticationContext);

  useEffect(() => {
    axios
      .get("http://localhost:3001/gifts/" + giftId)
      .then(resp => setGiftCardDetails(resp.data));
  }, [giftId]);

  useEffect(() => {
    if (userContext.userdata.userEmail !== "") {
      axios
        .get(
          "http://localhost:3001/users?email=" + userContext.userdata.userEmail
        )
        .then(resp => {
          setFavouriteIds(resp.data[0].favourites);
        });
    }
  }, [userContext.userdata.userEmail]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/comments-review?giftId=" + giftId)
      .then(resp => setUserReviews(resp.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newReviewAdded]);

  const addReview = () => {
    setNewReviewAdded(newReviewAdded + 1);
  };

  const handleGiftNowClose = () => {
    setOpenGiftNowModal(false);
  };

  const handleReviewClose = () => {
    setOpenReviewModal(false);
  };

  function handleGift() {
    setOpenGiftNowModal(true);
  }

  function handleReview() {
    setOpenReviewModal(true);
  }

  function closeSnackbar() {
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 2000);
  }

  return (
    <div className="gift-details-container">
      <div className="gift-image">
        <img
          alt={giftCardDetails.name}
          src={giftCardDetails.imageUrl}
          onError={e => {
            e.target.onerror = null;
            e.target.src = "/assests/default-giftcard.jpg";
          }}
        />
      </div>
      <div className="giftcard-buttons">
        <div className="giftnow">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleGift}
            disabled={userContext.userdata.userEmail !== "" ? false : true}
          >
            <CardGiftcardIcon />
            Gift Now
          </Button>
        </div>
        <div className="addtofav">
          <Button
            variant="contained"
            color="secondary"
            disabled={
              userContext.userdata.userEmail !== ""
                ? favouriteIds.indexOf(giftId) === -1
                  ? false
                  : true
                : true
            }
          >
            <FavoriteIcon />
            {userContext.userdata.userEmail !== ""
              ? favouriteIds.indexOf(giftId) === -1
                ? "Add to Fav"
                : "Added"
              : "Add to Fav"}
          </Button>
        </div>
        <div className="review">
          <Button
            variant="contained"
            color="secondary"
            disabled={userContext.userdata.userEmail !== "" ? false : true}
            onClick={handleReview}
          >
            <RateReviewIcon />
            Give Review
          </Button>
        </div>
      </div>
      <div className="card-name-points">
        <div style={{ fontSize: "24px", fontWeight: "600" }}>
          {giftCardDetails.name}
        </div>
        <div style={{ fontSize: "20px" }}>
          Points:{giftCardDetails.buyoutPoints}
        </div>
        <div style={{ fontSize: "20px" }}>Brand:{giftCardDetails.brand}</div>
      </div>
      <div className="card-description">
        <p>{giftCardDetails.desc}</p>
      </div>
      <div className="rating">
        <p>Rating: {giftCardDetails.rating}</p>
      </div>
      <Reviews giftId={giftId} userReviews={userReviews} />
      {openGiftNowModal ? (
        <Modal
          openModal={openGiftNowModal}
          dialogTitle={"Send The Gift"}
          dialogText={"Please fill out the form to send the gift card"}
          component={
            <SendEmail
              handleGiftNowClose={handleGiftNowClose}
              giftId={giftId}
              setSnackbarOpen={setSnackbarOpen}
              setSnackMessage={setSnackMessage}
              closeSnackbar={closeSnackbar}
            ></SendEmail>
          }
        ></Modal>
      ) : null}
      {openReviewModal ? (
        <Modal
          openModal={openReviewModal}
          dialogTitle={"Write a Review"}
          dialogText={"Please fill out the form to a write a review"}
          component={
            <GiveReview
              giftId={giftId}
              handleReviewClose={handleReviewClose}
              setNewReviewAdded={addReview}
              setSnackbarOpen={setSnackbarOpen}
              setSnackMessage={setSnackMessage}
              closeSnackbar={closeSnackbar}
            ></GiveReview>
          }
        ></Modal>
      ) : null}
      <ActionSnackbar openSnackbar={snackbarOpen} message={snackMessage} />
    </div>
  );
}

export default memo(GiftDetails);
