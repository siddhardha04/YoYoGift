import React from "react";
import { Button } from "@material-ui/core";

export default function LoginButton() {
  return (
    <div className="google-login">
      <Button variant="contained" color="primary">
        <span id="google-icon">
          <img src="../../../../assests/google-icon.png" alt="google-login" />
        </span>
        Login
      </Button>
    </div>
  );
}
