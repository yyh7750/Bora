import React, { Fragment } from "react";
import "./Profile.scss";
//더미데이터
import younha from "../../assets/younha.jpg";
const Profile = () => {
  return (
    <Fragment>
      <img src={younha} className="profileImg" alt="프로필이미지" />
    </Fragment>
  );
};

export default Profile;
