import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GoButton from "../../../UI/Button/GoButton";
import "./EmptyBroadcast.scss";

const EmptyBoard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="emptySecond">
        <div className="typewriter">
          <h1>아직 DJ가 아니시군요😢</h1>
        </div>
        <Link to="/writeBoard">
          <GoButton value="방송국 개설하러 가기" />
        </Link>
      </div>
    </motion.div>
  );
};
export default EmptyBoard;
