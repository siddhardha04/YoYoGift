import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

export default function ActionSnackbar(props) {
  let { openSnackbar, message } = props;

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={openSnackbar}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{message}</span>}
      />
    </div>
  );
}
