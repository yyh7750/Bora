import React, { Fragment } from "react";
import "./NavProfile.scss";
//더미데이터
import younha from "../../assets/younha.jpg";
const NavProfile = (props) => {
  const value = props.name;
  return (
    <Fragment>
      <div className="navContainer">
        <img src={younha} className="profileImg" />
        <div className="userNickname">{value}</div>
      </div>
    </Fragment>
  );
};

export default NavProfile;
