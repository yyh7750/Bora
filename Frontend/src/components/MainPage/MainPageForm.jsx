import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Carousel from "../../UI/Carousel/Carousel";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const MainPageForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Carousel />
      <Carousel />
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