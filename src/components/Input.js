import React from "react";

export const Input = ({ handleChange, text }) => {
  return (
    <input placeholder={text} onChange={(e) => handleChange(e)} type="text" />
  );
};
