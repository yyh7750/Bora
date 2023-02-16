import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Carousel from "../../UI/Carousel/Carousel";
import "./MainPageForm.scss";
import MyOnAir from "../MyOnAir/MyOnAir";
import { useNavigate } from "react-router-dom";

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
    const accessToken = urlSearch.get("token");
    window.localStorage.setItem("token", accessToken);
    const userId = urlSearch.get("userId");
    window.localStorage.setItem("userId", userId);
  }, []);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Carousel />
      <MyOnAir />
      {/* {roomInfos ? (
        <Carousel>
          {roomInfos.map((roominfo, index) => (
            <Div pl={0.5} pr={0.5} key={index}>
              <RoomCard {...roominfo} />
            </Div>
          ))}
        </Carousel>
      ) : (
        <Text font="Jua" fontSize="xxxl">
          isLoading
        </Text>
      )} */}
    </motion.div>
  );
};
export default MainPageForm;
