import "./Broadcast.scss";

import { useSelector, useDispatch } from "react-redux";
import { blacklistActions } from "../../../store/blacklist";

import { broadcastActions } from "../../../store/broadcast";

import left from "../../../assets/left.png";
import right from "../../../assets/right.png";
import Button from "../../../UI/Button/Button";

import bannerImg from "../../../assets/2.jpg";
import thumbnailImg from "../../../assets/4.jpg";
import BlackList from "../BlackList/BlackList";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Broadcast = () => {
  const dispatch = useDispatch();

  const userId = window.localStorage.getItem("userId");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [name, setName] = useState("");
  const [notice, setNotice] = useState("");
  const [day, setDay] = useState("");
  const [bannerimg, setBannerimg] = useState("");
  const [thumbnailimg, setThumbnail] = useState("");
  useEffect(() => {
    const resarr = ["월", "화", "수", "목", "금", "토", "일"];
    const API_URL = `http://localhost:8080/api/stations/${userId}`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        setCategory(res.data.category);
        setDescription(res.data.description);
        setStarttime(res.data.startTime);
        setEndtime(res.data.endTime);
        setName(res.data.name);
        setNotice(res.data.notice);
        setBannerimg(res.data.banner);
        setThumbnail(res.data.thumbnail);
        setDay(res.data.day);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [name]);
  const showBlacklist = useSelector((state) => state.blacklist.showBlacklist);

  const showblackList = () => {
    dispatch(blacklistActions.openBlacklist());
    const API_URL = `http://localhost:8080/users/blacklist/${userId}`;
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

  return (
    <div>
      <img className="bannerImg" src={bannerimg} alt="썸네일이미지" />
      <div className="space"></div>
      <div className="banner">
        <img src={left} alt="왼쪽확성기" className="bannerIcon" />

        {notice}

        <img src={right} alt="오른쪽확성기" className="bannerIcon" />
      </div>
      <div className="thumbnail">
        <img src={thumbnailimg} alt="썸네일이미지" className="thumbnailImg" />
      </div>
      <div className="broadcastInfo">
        <div className="titleLine">{name}</div>
        <hr />
        <div style={{ float: "left" }}>
          {day} {starttime}~{endtime}
          <br />
          {category}
          <br />
          {description}
          <br />
          {/* <button onClick={showblackList}>블랙리스트</button> */}
          <Link to="/modifyBroadcast">
            <Button name="방송정보 수정" style={{ float: "left" }}></Button>
          </Link>
          {showBlacklist && <BlackList name="블랙리스트" />}
        </div>
      </div>
    </div>
  );
};
export default Broadcast;
