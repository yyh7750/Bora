import { Outlet } from "react-router-dom";
import "./UserToDj.scss";

import { useSelector, useDispatch } from "react-redux";

import profileImg from "../../../assets/mori.png";
import Button from "../../../UI/Button/Button";

import ModifyProfile from "../ModifyProfile/ModifyProfile";

import { profileActions } from "../../../store/profile";
import { useEffect, useState } from "react";
import axios from "axios";

const UserToUser = () => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState();
  const [desc, setDesc] = useState();
  const userId = window.localStorage.getItem("userId");

  //유저정보렌더링(본인)
  useEffect(() => {
    const API_URL = `http://localhost:8080/users/${userId}`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        // console.log(res);
        setNickname(res.data.nickName);
        setDesc(res.data.desc);
        dispatch(profileActions.setProfile(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const showModifyProfile = useSelector(
    (state) => state.profile.showProfileModal
  );

  const profileOpenHandeler = () => {
    dispatch(profileActions.openModifyProfile());
  };

  return (
    <div>
      <fieldset className="profile">
        <img src={profileImg} alt="프로필이미지" className="circle" />
        <div className="trainerInfo">
          <div className="infoTop">
            <span className="nickname" style={{ marginRight: "20px", flex: 1 }}>
              {nickname}
            </span>
            <Button
              style={{ flex: 1 }}
              value={profileOpenHandeler}
              name="프로필 수정"
            />
          </div>
          <div>
            <span className="lister">청취자</span>
            <span className="listercnt">100k</span>
          </div>
          <div>
            <p className="content">{desc}</p>
          </div>
          {showModifyProfile && <ModifyProfile />}
        </div>
      </fieldset>
      <hr />
      <Outlet />
    </div>
  );
};
export default UserToUser;
