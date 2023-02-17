import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { boardActions } from "../../../store/board";
import Button from "../../../UI/Button/Button";
import "./WriteBoard.scss";

import axios from "axios";

const ModifyBoard = () => {
  const dispatch = useDispatch();

  const userId = window.localStorage.getItem("userId");
  const djId = "3";

  const boardTitle = useSelector((state) => state.board.boardTitle);
  const boardContent = useSelector((state) => state.board.boardContent);

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
      djId: djId,
      viewerId: userId,
      title: document.getElementById("title").value,
      contents: document.getElementById("content").value,
      regDateTime: new Date(),
    };
    // dispatch(boardActions.writeBoard(message));
    const API_URL = `http://localhost:8080/storybox`;
    axios({
      url: API_URL,
      method: "PATCH",
      data: message,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

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
        <input type="text" id="title" defaultValue={boardTitle} />
        <br />
        <textarea
          id="content"
          cols="70"
          rows="20"
          onKeyUp={countText}
          maxLength="500"
          defaultValue={boardContent}
        ></textarea>
        <br />
        <div id="countText">
          <div id="count" style={{ flex: 1 }}>
            0/500
          </div>
          <Link onClick={sendMessage} to="/viewBoard">
            <Button
              style={{ flex: 1 }}
              name="수정완료"
              margin="10px"
              width="100px"
              fontsize="0.6em"
            />
          </Link>
        </div>
      </fieldset>
    </motion.div>
  );
};
export default ModifyBoard;
