import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { motion } from "framer-motion";

import "./MySchedule.scss";

import { EffectFlip, Pagination, Navigation } from "swiper";

import Schedular from "../../UI/Schedular/Schedular";

import thumbnialImg from "../../assets/4.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

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

const MySchedule = () => {
  const userId = localStorage.getItem("userId");

  const [sundaylist, setSundaylist] = useState([]);
  const [mondaylist, setMondaylist] = useState([]);
  const [tuesdaylist, setTuesdaylist] = useState([]);
  const [wednesdaylist, setWednesdaylist] = useState([]);
  const [thursdaylist, setThursdaylist] = useState([]);
  const [fridaylist, setFridaylist] = useState([]);
  const [saturdaylist, setSaturdaylist] = useState([]);

  useEffect(() => {
    const API_URL = `http://localhost:8080/api/users/playlist/${"1"}`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].day === "sun") {
            setSundaylist((sundaylist) => [...sundaylist, res.data[i]]);
          }
          if (res.data[i].day === "mon") {
            setMondaylist((mondaylist) => [...mondaylist, res.data[i]]);
          }
          if (res.data[i].day === "tue") {
            setTuesdaylist((tuesdaylist) => [...tuesdaylist, res.data[i]]);
          }
          if (res.data[i].day === "wed") {
            setWednesdaylist((wednesdaylist) => [
              ...wednesdaylist,
              res.data[i],
            ]);
          }
          if (res.data[i].day === "thu") {
            setThursdaylist((thursdaylist) => [...thursdaylist, res.data[i]]);
          }
          if (res.data[i].day === "fri") {
            setFridaylist((fridaylist) => [...fridaylist, res.data[i]]);
          }
          if (res.data[i].day === "sat") {
            setSaturdaylist((saturdaylist) => [...saturdaylist, res.data[i]]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="MyScheduleFormTitle">나만의 편성표</div>
      <div className="MyScheduleLine"></div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="MyScheduleVerticalLine"></div>
        <Swiper
          effect={"flip"}
          grabCursor={true}
          // pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectFlip, Pagination, Navigation]}
          className="myScheduleSwiper"
        >
          <SwiperSlide id="sun">
            {sundaylist.map((item, index) => {
              return <Schedular items={sundaylist[index]} />;
            })}
          </SwiperSlide>
          <SwiperSlide id="mon">
            {mondaylist.map((item, index) => {
              return <Schedular items={mondaylist[index]} />;
            })}
          </SwiperSlide>
          <SwiperSlide id="tue">
            {tuesdaylist.map((item, index) => {
              return <Schedular items={tuesdaylist[index]} />;
            })}
          </SwiperSlide>
          <SwiperSlide id="wed">
            {wednesdaylist.map((item, index) => {
              return <Schedular items={wednesdaylist[index]} />;
            })}
          </SwiperSlide>
          <SwiperSlide id="thu">
            {thursdaylist.map((item, index) => {
              return <Schedular items={thursdaylist[index]} />;
            })}
          </SwiperSlide>
          <SwiperSlide id="fri">
            {fridaylist.map((item, index) => {
              return <Schedular items={fridaylist[index]} />;
            })}
          </SwiperSlide>
          <SwiperSlide id="sat">
            {saturdaylist.map((item, index) => {
              return <Schedular items={saturdaylist[index]} />;
            })}
          </SwiperSlide>
        </Swiper>
      </motion.div>
    </div>
  );
};

export default MySchedule;
