import React, { useContext, memo } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import emailjs from "emailjs-com";
import { userAuthenticationContext } from "../shared/Contexts";

function SendEmail(props) {
  const {
    handleGiftNowClose,
    giftId,
    setSnackbarOpen,
    setSnackMessage,
    closeSnackbar
  } = props;

  let userContext = useContext(userAuthenticationContext);

  const sendGiftSchema = Yup.object().shape({
    receiverEmail: Yup.string()
      .email("invalid email")
      .required("Required"),
    message: Yup.string().max(50, "Too Long")
  });

  return (
    <>
      <Formik
        initialValues={{ receiverEmail: "", message: "" }}
        validationSchema={sendGiftSchema}
        onSubmit={async (values, { setSubmitting }) => {
          // same shape as initial values
          setSubmitting(false);
          const templateParams = {
            from_name: userContext.userdata.userName,
            message:
              values.message.length === 0
                ? "Reedem the gift card."
                : values.message,
            to_email: values.receiverEmail,
            from_email: userContext.userdata.userEmail,
            gift_link: "https://localhost:3000/gift/details/" + giftId
          };
          console.log(templateParams);

          let emaildata = await emailjs.send(
            "gmail",
            "send_gift",
            templateParams,
            "user_JgOC2O94QDBPEK5j8wMvC"
          );
          if (emaildata.status === 200) {
            handleGiftNowClose();
            setSnackbarOpen(true);
            setSnackMessage("Email sent Successfully");
            closeSnackbar();
          } else {
            handleGiftNowClose();
            setSnackbarOpen(true);
            setSnackMessage("An error while sending an email");
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
              name="receiverEmail"
              label="Receiver Email Address"
              type="email"
              fullWidth
              value={values.receiverEmail}
              onChange={handleChange}
            />
            <div className="error">{errors.receiverEmail}</div>
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
            <Button onClick={handleGiftNowClose} color="primary">
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

export default memo(SendEmail);
