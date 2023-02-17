import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { boardActions } from "../../../store/board";
import { letterActions } from "../../../store/letter";

import "./WriteBoard.scss";
import Button from "../../../UI/Button/Button";

import axios from "axios";

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
    const userId = window.localStorage.getItem("userId");
    const message = {
      djId: "3",
      viewerId: userId,
      title: document.getElementById("title").value,
      contents: document.getElementById("content").value,
      regDateTime: new Date(),
    };
    // window.localStorage.setItem("board", message);
    dispatch(letterActions.writeLetter());
    dispatch(boardActions.writeBoard(message));

    const API_URL = `http://localhost:8080/storybox`;
    axios({
      url: API_URL,
      method: "POST",
      data: message,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
