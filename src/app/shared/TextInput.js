import React from "react";
import { Input } from "@material-ui/core";

export const TextInput = ({ id, placeholder, onchange, onblur, classname }) => (
  <Input
    id={id}
    placeholder={placeholder}
    onChange={onchange}
    onBlur={onblur}
    inputProps={{ "aria-label": "description" }}
  />
);
