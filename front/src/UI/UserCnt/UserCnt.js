import React, { Fragment } from "react";
import "./UserCnt.scss";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const UserCnt = (props) => {
  const value = props.num;
  return (
    <Fragment>
      <div className="userCntDiv">
        <FontAwesomeIcon icon={faUserCircle} className="userCntIcon" />
        {value}
      </div>
    </Fragment>
  );
};

export default UserCnt;
