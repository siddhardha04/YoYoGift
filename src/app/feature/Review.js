import React, { useContext, memo, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { userAuthenticationContext } from "../shared/Contexts";

function Review(props) {
  const { handleClose, giftId } = props;
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(
        "http://localhost:3001/users?email=" + userContext.userdata.userEmail
      )
      .then(resp => {
        setUser(resp.data[0]);
      });
  });

  let userContext = useContext(userAuthenticationContext);

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

          if (resp.status === 200) {
            handleClose();
            // setsnackbarState({
            //   snackbarOpen: true,
            //   vertical: "bottom",
            //   horizontal: "center"
            // });
            // setTimeout(() => {
            //   setsnackbarState({
            //     snackbarOpen: false,
            //     vertical: "bottom",
            //     horizontal: "center"
            //   });
            // }, 2000);
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
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting
        }) => (
          <Form>
            <TextField
              autoFocus
              margin="dense"
              name="message"
              label="Message"
              type="text"
              fullWidth
              value={values.message}
              onChange={handleChange}
            />
            <div style={{ color: "red" }}>{errors.message}</div>
            <Button onClick={handleClose} color="primary">
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

export default memo(Review);
