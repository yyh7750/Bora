import React from "react";
import { motion } from "framer-motion";
import "./Button.scss";

const Button = (props) => {
  const value = props.name;
  console.log(props.margin);
  return (
    <motion.div
      className="buttonBox"
      whileHover={{ scale: 1.12 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <button
        className="button"
        onClick={props.value}
        style={{
          marginTop: `${props.margin}`,
          fontSize: `${props.fontsize}`,
          width: `${props.width}`,
        }}
      >
        {value}
      </button>
    </motion.div>
  );
};

export default Button;
