import React, { Fragment } from "react";
import "./MoodButton.scss";

const MoodButton = (props) => {
  const value = props.name;
  return (
    <Fragment>
      <button className="mdButton" onClick={props.value}>
        # {value}
      </button>
    </Fragment>
  );
};

export default MoodButton;
