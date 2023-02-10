import React from "react";
import { motion } from "framer-motion";
import "./MailBox.scss";

const MailBox = () => {
  return (
    <motion.div className="mail-box">
      <div className="box-back"></div>
      <div className="mail"></div>
      <div className="box"></div>
    </motion.div>
  );
};

export default MailBox;
