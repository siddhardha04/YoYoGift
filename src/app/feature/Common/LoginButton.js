/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from "react";
import { Button } from "@material-ui/core";

function LoginButton(props) {
  return (
    <div className="google-login">
      <Button variant="contained" color="primary" onClick={props.onClick}>
        <span id="google-icon">
          <img src="../../../../assests/google-icon.png" alt="google-login" />
        </span>
        Login
      </Button>
    </div>
  );
}

export default memo(LoginButton);
