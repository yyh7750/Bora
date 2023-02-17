import React, { Fragment } from "react";
import "./CategoryButton.scss";

const CategoryButton = (props) => {
  const value = props.name;
  return (
    <Fragment>
      <button className="ctButton" onClick={props.value}>
        # {value}
      </button>
    </Fragment>
  );
};

export default CategoryButton;
