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
<<<<<<< HEAD
        <div className="userName">{value}</div>
=======
        <div className="userNickname">{value}</div>
>>>>>>> 0d332a30007a7644bec0b32b7bdad84670085bae
      </div>
    </Fragment>
  );
};

export default NavProfile;
