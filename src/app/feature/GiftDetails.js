import React, { useEffect, useState, useContext, memo } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import RateReviewIcon from "@material-ui/icons/RateReview";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { userAuthenticationContext } from "../shared/Contexts";
import SendEmail from "./SendEmail";
import Review from "./Review";
import Snackbar from "@material-ui/core/Snackbar";
import Modal from "../shared/Modal";

function GiftDetails(props) {
  let giftId = props.match.params.id;
  const [giftCardDetails, setGiftCardDetails] = useState({});
  const [userReviews, setUserReviews] = useState([]);
  const [openGiftNowModal, setOpenGiftNowModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [favouriteIds, setFavouriteIds] = useState([]);

  console.log(favouriteIds);

  const [snackbarState, setsnackbarState] = useState({
    snackbarOpen: false,
    vertical: "bottom",
    horizontal: "center"
  });

  const { vertical, horizontal, snackbarOpen } = snackbarState;

  let userContext = useContext(userAuthenticationContext);

  useEffect(() => {
    axios
      .get("http://localhost:3001/gifts/" + giftId)
      .then(resp => setGiftCardDetails(resp.data));

    axios
      .get("http://localhost:3001/comments-review?giftId=" + giftId)
      .then(resp => setUserReviews(resp.data));

    if (userContext.userdata.userEmail !== "") {
      axios
        .get(
          "http://localhost:3001/users?email=" + userContext.userdata.userEmail
        )
        .then(resp => {
          console.log(resp);
          setFavouriteIds(resp.data[0].favourites);
        });
    }
  }, [giftId, userContext.userdata.userEmail]);

  const handleClose = () => {
    setOpenGiftNowModal(false);
    setOpenReviewModal(false);
  };

  function handleGift() {
    setOpenGiftNowModal(true);
  }

  function handleReview() {
    setOpenReviewModal(true);
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
            Add to Fav
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
      {userReviews.map(review => (
        <div className="user-reviews" key={review.userId}>
          <div className="user-image">
            <AccountCircleIcon />
          </div>
          <div className="review-content">
            <div>{review.userName}</div>
            <div>{review.review}</div>
          </div>
        </div>
      ))}
      {openGiftNowModal ? (
        <Modal
          openModal={openGiftNowModal}
          handleClose={handleClose}
          dialogTitle={"Send The Gift"}
          dialogText={"Please fill out the form to send the gift card"}
          component={
            <SendEmail
              handleClose={handleClose}
              giftId={giftId}
              setsnackbarState={setsnackbarState}
            ></SendEmail>
          }
        ></Modal>
      ) : null}
      {openReviewModal ? (
        <Modal
          openModal={openReviewModal}
          handleClose={handleClose}
          dialogTitle={"Write a Review"}
          dialogText={"Please fill out the form to a write a review"}
          component={
            <Review
              giftId={giftId}
              setsnackbarState={setsnackbarState}
              handleClose={handleClose}
            ></Review>
          }
        ></Modal>
      ) : null}
      {/* <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Send The Gift</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form to send the gift card
          </DialogContentText>
          <SendEmail
            handleClose={handleClose}
            giftId={giftId}
            setsnackbarState={setsnackbarState}
          />
        </DialogContent>
      </Dialog> */}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={snackbarOpen}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={
          <span id="message-id">Email has been sent successfully!!</span>
        }
        role="alert"
      />
    </div>
  );
}

export default memo(GiftDetails);
