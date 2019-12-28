import React, { useContext, memo, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { userAuthenticationContext } from "../shared/Contexts";

function GiveReview(props) {
  const {
    handleReviewClose,
    giftId,
    setNewReviewAdded,
    setSnackbarOpen,
    setSnackMessage,
    closeSnackbar
  } = props;
  const [user, setUser] = useState({});
  let userContext = useContext(userAuthenticationContext);

  useEffect(() => {
    axios
      .get(
        "http://localhost:3001/users?email=" + userContext.userdata.userEmail
      )
      .then(resp => {
        setUser(resp.data[0]);
      });
  }, [userContext.userdata.userEmail]);

  const reviewSchema = Yup.object().shape({
    message: Yup.string().required()
  });

  return (
    <>
      <Formik
        initialValues={{ message: "" }}
        validationSchema={reviewSchema}
        onSubmit={async (values, { setSubmitting }) => {
          // same shape as initial values
          setSubmitting(false);

          let reviewData = {
            userId: user.id,
            userName: user.name,
            giftId: giftId,
            review: values.message,
            reviewedAt: new Date()
          };

          let resp = await axios.post(
            "http://localhost:3001/comments-review",
            reviewData
          );

          if (resp.status === 201) {
            handleReviewClose();
            setNewReviewAdded();
            setSnackbarOpen(true);
            setSnackMessage("Review posted successfully");
            closeSnackbar();
          } else {
            handleReviewClose();
            setNewReviewAdded();
            setSnackbarOpen(true);
            setSnackMessage("An error while posting a review");
            closeSnackbar();
          }
        }}
        onChange={(values, e) => {
          e.persist();
          console.log(values);
          if (e.target.name === "receiverEmail")
            values.receiverEmail = e.target.value;
          else if (e.target.name === "message") values.message = e.target.value;
        }}
      >
        {({ values, errors, handleChange }) => (
          <Form>
            <TextField
              autoFocus
              margin="dense"
              name="message"
              label="Review"
              type="text"
              fullWidth
              value={values.message}
              onChange={handleChange}
            />
            <div style={{ color: "red" }}>{errors.message}</div>
            <Button onClick={handleReviewClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default memo(GiveReview);
