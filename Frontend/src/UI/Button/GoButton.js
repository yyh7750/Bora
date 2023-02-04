import React from "react";

import "./GoButton.scss";

const GoButton = (props) => {
  return (
    <div id="container">
      <button id="goButton" class="learn-more">
        <span class="circle" aria-hidden="true">
          <span class="icon arrow"></span>
        </span>
        <span class="button-text">{props.value}</span>
      </button>
    </div>
  );
};

export default GoButton;
