import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../../../store/board";

import "./DjToDj.scss";

import profileImg from "../../../assets/mori.png";
import radio from "../../../assets/radio.png";
import Button from "../../../UI/Button/Button";
import MailBox from "../../../UI/MailBox/MailBox";

import axios from "axios";
import { useEffect, useState } from "react";
import { profileActions } from "../../../store/profile";
import { Subscriber } from "openvidu-browser";

const UserToDj = () => {
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState();
  const [desc, setDesc] = useState();
  const [profileimg, setProfileimg] = useState();

  const userId = window.localStorage.getItem("userId");
  const djId = "3";
  //DJ정보 렌더링
  useEffect(() => {
    const API_URL = `http://localhost:8080/users/${djId}`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        setNickname(res.data.nickName);
        setDesc(res.data.desc);
        setProfileimg(res.data.profileImg);
        dispatch(profileActions.setProfile(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const toggle = useSelector((state) => state.board.toggle);

  const isLetter = useSelector((state) => state.letter.isLetter);

  const subscribe = useSelector((state) => state.board.subscribe);

  const subscribeCnt = useSelector((state) => state.board.subscribeCnt);

  const toggleHandler = () => {
    dispatch(boardActions.toggleBoard());
  };

  const subscribeHandler = () => {
    dispatch(boardActions.toggleSubscribe());
    const API_URL = `http://localhost:8080/follow/redis`;
    let DATA = {};
    if (subscribe) {
      DATA = {
        id: "2+3",
        req: "follow",
        djId: djId,
        viewerId: userId,
      };
    } else {
      DATA = {
        id: "2+3",
        req: "unfollow",
        djId: djId,
        viewerId: userId,
      };
    }
    axios({
      url: API_URL,
      method: "POST",
      data: DATA,
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
        delay: 0.5,
        duration: 0.5,
      },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      // exit="exit"
    >
      <fieldset className="profile">
        <img src={profileImg} alt="프로필이미지" className="circle" />
        <div className="trainerInfo">
          <div className="infoTop">
            <span className="nickname" style={{ marginRight: "20px", flex: 1 }}>
              {nickname}
            </span>
            {!subscribe && (
              <Button
                style={{ flex: 1 }}
                value={subscribeHandler}
                name="구독"
                margin="30px"
                fontsize="0.8em"
                width="70px"
              />
            )}
            {subscribe && (
              <Button
                style={{ flex: 1 }}
                value={subscribeHandler}
                name="구독중"
                margin="30px"
                fontsize="0.8em"
                width="70px"
              />
            )}
          </div>
          <div>
            <span className="lister">청취자</span>
            <span className="listercnt">{subscribeCnt}</span>
          </div>
          <div>
            <p className="content">{desc}</p>
          </div>
        </div>
        <div>
          {toggle && !isLetter && (
            <div>
              <span className="goLetter">사연신청하러가기</span>
              <span className="click">! ! Click ! !</span>
              <Link onClick={toggleHandler} to="/emptyBoard">
                <MailBox />
              </Link>
            </div>
          )}
          {toggle && isLetter && (
            <div>
              <span className="goLetter">사연신청하러가기</span>
              <span className="click">! ! Click ! !</span>
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
                  <motion.img
                    src={radio}
                    alt="방송정보 보러가기"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  />
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

export default UserToDj;
