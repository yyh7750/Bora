import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../../../UI/Button/Button";

import "./WriteBoard.scss";

const ViewBoard = () => {
  const boardTitle = useSelector((state) => state.board.boardTitle);
  const boardContent = useSelector((state) => state.board.boardContent);
  console.log(boardTitle);
  console.log(boardContent);
  // const userId = useSelector((state) => state.board.userId);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <fieldset id="writeBoard">
        <legend>내가 보낸 사연 확인하기</legend>
        <input type="text" id="title" readOnly defaultValue={boardTitle} />
        <br />
        <textarea
          id="content"
          cols="70"
          rows="20"
          readOnly
          defaultValue={boardContent}
        ></textarea>
        <br />
        <div>
          <Link to="/modifyBoard">
            <Button name="수정" margin="10px" width="70px" fontsize="0.6em" />
          </Link>
        </div>
      </fieldset>
    </motion.div>
  );
};
export default ViewBoard;
