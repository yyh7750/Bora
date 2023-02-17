import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Carousel from "../../UI/Carousel/Carousel";
import "./MainPageForm.scss";
import MyOnAir from "../MyOnAir/MyOnAir";
import { useNavigate } from "react-router-dom";
import VideoList from "../VideoList/VideoList";
import axios from "axios";

const MainPageForm = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const moveToOnAir = () => {
    navigate("");
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

  useEffect(() => {
    const urlSearch = new URLSearchParams(window.location.search);
    if (window.localStorage.getItem("userId") === null) {
      console.log(window.localStorage.getItem("userId"));
      const userId = urlSearch.get("userId");
      window.localStorage.setItem("userId", userId);
      console.log(userId);
      // setUserid(userId);
      const accessToken = urlSearch.get("token");
      window.localStorage.setItem("token", accessToken);
      // setAtk(accessToken);
      console.log(accessToken);
    }

    //닉네임 저장하기 위해서 받아오는 get 요청
    const id = localStorage.getItem("userId");
    const API_URL = `http://localhost:8080/users/${id}`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("nickname", res.data.nickName);
        localStorage.setItem("isState", res.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Carousel></Carousel>
      <MyOnAir />
      <VideoList />
    </motion.div>
  );
};
export default MainPageForm;
