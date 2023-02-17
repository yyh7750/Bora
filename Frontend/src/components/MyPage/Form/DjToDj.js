import { Link, Outlet, useNavigate } from "react-router-dom";
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
import { Subscriber } from "openvidu-browser";

const DjToDj = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [nickname, setNickname] = useState();
  const [desc, setDesc] = useState();
  const [profileimg, setProfileimg] = useState();
  const [subscriberCnt, setSubscriberCnt] = useState();

  const userId = window.localStorage.getItem("userId");

  //DJ정보렌더링(본인)
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
        setProfileimg(res.data.profileImg);
        setSubscriberCnt(res.data.stationDTO.followCnt);
        dispatch(profileActions.setProfile(res.data));
      })
      .catch((err) => {
        console.log(err);
      });

    // const URL = `http://localhost:8080/follow/viewer/${djId}`;
    // axios({
    //   url: URL,
    //   method: "GET",
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [userId]);

  const showModifyProfile = useSelector(
    (state) => state.profile.showProfileModal
  );
  const toggle = useSelector((state) => state.board.toggle);

  const isLetter = useSelector((state) => state.letter.isLetter);

  const moveToCreate = () => {
    navigate("/createRoom");
  };

  const toggleHandler = () => {
    dispatch(boardActions.toggleBoard());
  };

  const profileOpenHandeler = () => {
    dispatch(profileActions.openModifyProfile());
  };

  // const startBroadcast = () => {
  //   const API_URL = `http://localhost:8080/api/stations/${userId}`;
  //   axios({
  //     url: API_URL,
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
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
      <fieldset className="profile" style={{ marginTop: "10px" }}>
        <img src={profileimg} alt="프로필이미지" className="circle" />
        <div className="trainerInfo">
          <div className="infoTop">
            <span className="nickname" style={{ marginRight: "20px", flex: 1 }}>
              {nickname}
            </span>
            <Button
              style={{ flex: 1 }}
              value={profileOpenHandeler}
              name="프로필 수정"
              id="mypage_btn"
              margin="30px"
              DJ이름
            />
            {/* <Button
              style={{ flex: 1 }}
              value={startBroadcast}
              name="방송하기"
              id="mypage_btn"
              margin="30px"
              marginLeft="10px"
            /> */}
            <Button
              style={{ flex: 1 }}
              value={moveToCreate}
              margin="30px"
              marginLeft="10px"
              name="방송시작"
            />
          </div>
          <div>
            <span className="lister">청취자</span>
            <span className="listercnt">{subscriberCnt}</span>
          </div>
          <div>
            <p className="content">{desc}</p>
          </div>
        </div>

        {showModifyProfile && <ModifyProfile />}

        <div>
          {toggle && !isLetter && (
            <div>
              <span className="goLetter">사연함 보러가기</span>
              <span className="click">! ! Open ! !</span>
              <Link onClick={toggleHandler} to="/viewBoardList">
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
