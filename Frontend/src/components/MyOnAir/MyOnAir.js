import React, { useState } from "react";
import "./MyOnAir.scss";
import MyOnAirCarousel from "../../UI/Carousel/MyOnAirCarousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import room_info from "../MainPage/room_info";
import { useEffect } from "react";
import axios from "axios";

const MyOnAir = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [roomInfo, setRoomInfo] = useState();
  const [roomInfos, setRoomInfos] = useState([]);

  //방 정보
  // const [roomInfos, setRoomInfos] = useState(null);
  // const getRoomInfos = async () => {
  //   setRoomInfos(await room_info());
  // };

  const moveToOnAir = () => {
    navigate("");
  };

  // const userId = localStorage.getItem("userId");
  const userId = "1";
  useEffect(() => {
    const API_URL = `http://localhost:8080/main/follow-broad/${userId}`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setRoomInfo(res.data.length);
        console.log(roomInfo);
        for (let i = 0; i < res.data.length; i++) {
          setRoomInfos((roomInfos) => [...roomInfos, res.data[i]]);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //-------------- 버튼 선택시 렌더링 ---------------
  const mood = ["exciting"];
  useEffect(() => {
    const API_URL = `http://localhost:8080/api/main/live-broad/`;
    axios({
      url: API_URL,
      method: "GET",
      params: mood,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [mood]);

  // useEffect(()=>{
  //   if(params)
  // })

  return (
    <div className="myOnAir_container">
      <br />
      <span className="myOnAir_title">
        <b>My ONAIR</b>
      </span>
      {roomInfo !== 0 ? (
        <MyOnAirCarousel {...roomInfos}></MyOnAirCarousel>
      ) : (
        <div>스트림중인 방송이 없습니다.</div>
      )}
    </div>
  );
};

export default MyOnAir;
