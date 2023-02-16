import "./ModifyBroadcast.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileActions } from "../../../store/profile";

import left from "../../../assets/left.png";
import right from "../../../assets/right.png";
import Button from "../../../UI/Button/Button";

import bannerImg from "../../../assets/2.jpg";
import thumbnailImg from "../../../assets/4.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

const ModifyBroadcast = () => {
  const dispatch = useDispatch();
  const userId = window.localStorage.getItem("userId");
  const category = useSelector((state) => state.broadcast.category);
  const starttime = useSelector((state) => state.broadcast.starttime);
  const endtime = useSelector((state) => state.broadcast.endtime);
  const day = useSelector((state) => state.broadcast.day);
  const modifyBroadcast = () => {
    const dayArr = [];
    const arr = ["월", "화", "수", "목", "금", "토", "일"];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === day) {
        dayArr.push(true);
      } else {
        dayArr.push(false);
      }
    }
    const dateController = new Date();
    let year = dateController.getFullYear(); // 년도
    let month = dateController.getMonth() + 1; // 월
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    let date = dateController.getDate(); // 날짜
    let start = starttime.substring(3);
    let end = endtime.substring(3);
    if (parseInt(start[0]) < 10) {
      start = "0" + start;
    }
    if (parseInt(end[0]) < 10) {
      end = "0" + end;
    }
    //2007-12-03 10:15
    const startTime = `${year}-${month}-${date} ${start}`;
    const endTime = `${year}-${month}-${date} ${end}`;
    const stationInfo = {
      userId: userId,
      name: document.getElementById("modifyBroadcastTitle").value,
      startTime: startTime,
      endTime: endTime,
      description: document.getElementById("modifyDesc").value,
      notice: document.getElementById("modifyBroadcastNotice").value,
      category: category,
      mon: dayArr[0],
      tue: dayArr[1],
      wen: dayArr[2],
      thu: dayArr[3],
      fri: dayArr[4],
      sat: dayArr[5],
      sun: dayArr[6],
    };
    const API_URL = `http://localhost:8080/stations`;
    axios({
      url: API_URL,
      method: "PATCH",
      data: stationInfo,
    })
      .then((res) => {
        // console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkBroadcastTitle = () => {
    const modifytitle = document.getElementById("modifyBroadcastTitle").value;
    const API_URL = `http://localhost:8080/stations/check/${modifytitle}`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        if (res.data) {
          document.getElementById("resTitle").innerHTML =
            "사용가능한 방송국명입니다.";
        } else {
          document.getElementById("resTitle").innerHTML =
            "이미 사용중인 방송국명입니다.";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <img className="bannerImg" src={bannerImg} alt="썸네일이미지" />
      <div className="space"></div>
      <div className="banner">
        <img src={left} alt="왼쪽확성기" className="bannerIcon" />
        <input
          type="text"
          placeholder="공지를 입력해주세요"
          className="modifyBroadcastNotice"
          id="modifyBroadcastNotice"
        />
        <img src={right} alt="오른쪽확성기" className="bannerIcon" />
      </div>
      <div className="thumbnail">
        <img src={thumbnailImg} alt="썸네일이미지" className="thumbnailImg" />
      </div>
      <div className="broadcastInfo">
        <div className="titleLine">
          <input
            type="text"
            placeholder="방송국명을 입력해주세요"
            className="modifyBroadcastTitle"
            id="modifyBroadcastTitle"
          />
          <p id="resTitle"></p>
          <Button value={checkBroadcastTitle} name="중복확인"></Button>
        </div>
        <hr />
        <div style={{ float: "left" }}>
          {day} {starttime}~{endtime}
          <br />
          {category}
          <br />
          <input type="text" className="desc" id="modifyDesc" />
          <br />
          <Link to="/broadcasts">
            <Button
              name="방송정보 수정"
              style={{ float: "left" }}
              value={modifyBroadcast}
            ></Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ModifyBroadcast;
