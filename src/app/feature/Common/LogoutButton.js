/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from "react";
import { Button } from "@material-ui/core";

function LogoutButton(props) {
  return (
    <div className="google-login">
      <Button variant="contained" color="primary" onClick={props.onClick}>
        Logout
      </Button>
    </div>
  );
}

export default memo(LogoutButton);
