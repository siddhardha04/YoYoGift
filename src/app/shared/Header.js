import React from "react";
import Typography from "@material-ui/core/Typography";
import LoginButton from "../feature/LoginButton";
import { TextInput } from "./TextInput";
import { Formik } from "formik";
import * as Yup from "yup";

export default function Header() {
  return (
    <header>
      <div className="header-container">
        <div className="app-logo">
          <a href="/">
            <img src="../../../../assests/app-logo.jpeg" alt="app-logo"></img>
          </a>
        </div>
        <div className="app-title">
          <Typography variant="h6" noWrap>
            YOYOGift
          </Typography>
        </div>
        <span style={{ flex: "1 1 auto" }}></span>
        <LoginButton />
      </div>
      <div className="search-container">
        <Formik
          initialValues={{ searchQuery: "kfc" }}
          onSubmit={async values => {
            await new Promise(resolve => setTimeout(resolve, 500));
            alert(JSON.stringify(values, null, 2));
          }}
          validationSchema={Yup.object().shape({
            searchQuery: Yup.string()
          })}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <TextInput
                  id={"searchQuery"}
                  onchange={handleChange}
                  onblur={handleBlur}
                  placeholder={"Search For Product"}
                />
              </form>
            );
          }}
        </Formik>
      </div>
    </header>
  );
}
