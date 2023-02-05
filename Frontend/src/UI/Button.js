import React, { Fragment } from "react";
import "./Button.scss";

const Button = (props) => {
  const value = props.name;
  return (
    <Fragment>
      <button className="button" onClick={props.value}>
        {value}
      </button>
    </Fragment>
  );
};

export default Button;
