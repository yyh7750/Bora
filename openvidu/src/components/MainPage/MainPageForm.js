import React from "react";
import { motion } from "framer-motion";
import Carousel from "../../UI/Carousel/Carousel";

const MainPageForm = () => {
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
    </motion.div>
  );
};
export default MainPageForm;
