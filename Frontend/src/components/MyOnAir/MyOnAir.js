import React, { useState } from "react";
import "./MyOnAir.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import room_info from "../MainPage/room_info";
import { useEffect } from "react";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../UI/Carousel/MyOnAirCarousel.scss";
// import required modules
import { Navigation, Pagination } from "swiper";
import thumbnail from "../../assets/wallpaper.jpg";

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
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const API_URL = `http://localhost:8080/main/follow-broad/${userId}`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        console.log(typeof res.data);
        console.log(res.data);
        setRoomInfo(res.data.length);
        setRoomInfos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(roomInfos.stationName);

  console.log(roomInfos);

  return (
    // <div></div>
    <div className="myOnAir_container">
      <br />
      <span className="myOnAir_title">
        <b>My ONAIR</b>
      </span>
      {roomInfo !== 0 ? (
        <Swiper
          slidesPerView={2.5}
          spaceBetween={30}
          // pagination={{
          //   type: "progressbar",
          // }}
          navigation={false}
          modules={[Pagination, Navigation]}
          className="myOnAirSwiper"
        >
          {roomInfos.map((res, index) => (
            <SwiperSlide className="MyOnAirSlide" key={index}>
              <motion.div
                className="swiper-slide"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 45 }}
                style={{ background: "rgb(255, 255, 255)", cursor: "pointer" }}
                onClick={() => {
                  navigate("/enterRoom", {
                    state: {
                      id: res.sessionId,
                      nickname: localStorage.getItem("nickname"),
                      myRoomName: res.title,
                      myRoomType: res.mood,
                      nickname: res.nickName,
                      thumbnail: res.imgUrl,
                    },
                  });
                }}
              >
                <img
                  className="slideThumbnail"
                  // src={res.bannerUrl}
                  src={thumbnail}
                  alt=""
                  style={{ position: "fixed", top: "0", left: "0" }}
                />
                <span
                  style={{
                    position: "fixed",
                    bottom: "25px",
                    width: "100%",
                    left: "-140px",
                    marginRight: "10px",
                    paddingBottom: "12px",
                    color: "#000",
                    fontSize: "17px",
                  }}
                >
                  {res.stationName}
                </span>
                <div
                  style={{
                    position: "fixed",
                    bottom: "18px",
                    display: "flex",
                    width: "100%",
                    marginLeft: "30px",
                    marginRight: "10px",
                    marginBottom: "-2px",
                  }}
                >
                  <span
                    style={{
                      textAlign: "left",
                      color: "#000",
                      fontSize: "20px",
                      position: "fixed",
                      left: "10px",
                      bottom: "14px",
                    }}
                  >
                    <b>{res.title}</b>
                  </span>
                  <img
                    src={res.userUrl}
                    alt="프로필사진"
                    style={{
                      position: "fixed",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      right: "20px",
                      bottom: "14px",
                    }}
                  />
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div>스트림중인 방송이 없습니다.</div>
      )}
    </div>
  );
};

export default MyOnAir;
