import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { boardActions } from "../../../store/board";
import "./UserToDj.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import profileImg from "../../../assets/profileimg.jpg";
import radio from "../../../assets/radio.png";
import Button from "../../../UI/Button/Button";
import MailBox from "../../../UI/MailBox/MailBox";

import ModifyProfile from "../ModifyProfile/ModifyProfile";

import { profileActions } from "../../../store/profile";

const DjToDj = () => {
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState();

  const userId = window.localStorage.getItem("userId");
  useEffect(() => {
    const API_URL = `http://localhost:8080/api/users/${userId}`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        setNickname(res.data.nickName);
        dispatch(profileActions.setProfile(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const showModifyProfile = useSelector(
    (state) => state.profile.showProfileModal
  );

  const toggle = useSelector((state) => state.board.toggle);

  const isLetter = useSelector((state) => state.letter.isLetter);

  const toggleHandler = () => {
    dispatch(boardActions.toggleBoard());
  };

  const profileOpenHandeler = () => {
    dispatch(profileActions.openModifyProfile());
  };

  const startBroadcast = () => {
    const API_URL = `http://localhost:8080/api/stations/${userId}`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.3,
      },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut" },
    },
  };
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
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
            <Button
              style={{ flex: 1 }}
              value={startBroadcast}
              name="방송하기"
            />
          </div>
          <div>
            <span className="lister">청취자</span>
            <span className="listercnt">100k</span>
          </div>
          <div>
            <p className="content">유저의 한마디입니다.</p>
          </div>
        </div>
        {showModifyProfile && <ModifyProfile />}
        <div>
          {toggle && !isLetter && (
            <div>
              <span className="goLetter">사연함 보러가기</span>
              <span className="click">! ! Open ! !</span>
              <Link onClick={toggleHandler} to="/emptyBoard">
                <MailBox />
              </Link>
            </div>
          )}
          {toggle && isLetter && (
            <div>
              <span className="goLetter">사연함 보러가기</span>
              <span className="click">! ! Open ! !</span>
              <Link onClick={toggleHandler} to="/viewBoard">
                <MailBox />
              </Link>
            </div>
          )}
          {!toggle && (
            <div>
              <span className="goLetter">방송정보 보러가기</span>
              <span className="click">! ! Click ! !</span>
              <Link onClick={toggleHandler} to="/broadcast">
                <div className="monitor">
                  <img src={radio} alt="방송정보 보러가기" />
                </div>
              </Link>
            </div>
          )}
        </div>
      </fieldset>
      <hr />
      <Outlet />
    </motion.div>
  );
};
export default DjToDj;
