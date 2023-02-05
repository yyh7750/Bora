import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { boardActions } from "../../../store/board";
import { letterActions } from "../../../store/letter";

import "./WriteBoard.scss";
import Button from "../../../UI/Button/Button";
const WriteBoard = () => {
  const dispatch = useDispatch();

  //useEffect(() => {...올라갈때 로직}, [...감시할 state array]};

  const countText = () => {
    var content = document.getElementById("content").value;
    if (content.length > 500) {
      content = content.substring(0, 500);
      document.getElementById("content").value = content;
    }
    document.getElementById("count").innerHTML = content.length + "/500";
  };

  const sendMessage = () => {
    const message = {
      userId: 0,
      boardTitle: document.getElementById("title").value,
      boardContent: document.getElementById("content").value,
    };
    // window.localStorage.setItem("board", message);
    dispatch(letterActions.writeLetter());
    dispatch(boardActions.writeBoard(message));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <fieldset id="writeBoard">
        <legend>사연을 보내주세요 💜</legend>
        <input type="text" id="title" />
        <br />
        <textarea
          id="content"
          onKeyUp={countText}
          maxLength="500"
          cols="70"
          rows="20"
        ></textarea>
        <br />
        <div id="countText">
          <div id="count" style={{ flex: 1 }}>
            0/500
          </div>
          <Link onClick={sendMessage} to="/viewBoard">
            <Button
              style={{ flex: 1 }}
              name="보내기"
              margin="10px"
              fontsize="0.6em"
              width="70px"
            />
          </Link>
        </div>
      </fieldset>
    </motion.div>
  );
};
export default WriteBoard;
