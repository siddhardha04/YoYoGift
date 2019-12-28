import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function Reviews(props) {
  let { userReviews } = props;

  return userReviews.map(review => (
    <div className="user-reviews" key={review.userId + review.review}>
      <div className="user-image">
        <AccountCircleIcon />
      </div>
      <div className="review-content">
        <div>{review.userName}</div>
        <div>{review.review}</div>
      </div>
    </div>
  ));
}

export default Reviews;
