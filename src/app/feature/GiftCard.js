import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

function GiftCard(props) {
  let { gift } = props;

  return (
    <div className="card-container">
      <div className="cardname-wrapper">
        <div className="card-name">{gift.name}</div>
        <div className="card-brand">{gift.brand}</div>
      </div>
      <div
        className="cardimage-wrapper"
        onLoad={e => {
          e.persist();
          e.target.style.backgroundColor = "cornsilk";
        }}
      >
        <img
          alt={gift.name + " gift card"}
          src={gift.imageUrl}
          onError={e => {
            e.target.onerror = null;
            e.target.src = "/assests/default-giftcard.jpg";
          }}
        />
        <div className="description">{gift.desc.slice(0, 75) + "..."}</div>
      </div>
      <div className="card-footer">
        <div className="card-points">Points:{gift.buyoutPoints}</div>
        <div className="card-details">
          <Link to={"/gift/details/" + gift.id}>
            <Button variant="contained" color="secondary">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

GiftCard.propTypes = {
  gift: PropTypes.object
};

export default memo(GiftCard);
