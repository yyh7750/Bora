import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../../../UI/Button/Button";
import { boardActions } from "../../../store/board";

import "./WriteBoard.scss";

const ViewBoard = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const userId = window.localStorage.getItem("userId");
  const djId = "3";

  useEffect(() => {
    //1.axios요청으로 사연리스트 객체 받아오기
    const API_URL = `http://localhost:8080/api/storybox/${djId}/${userId}`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        setTitle(res.data.title);
        setContents(res.data.contents);
        dispatch(boardActions.writeBoard(res.data));
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [title, contents]);

  const boardTitle = useSelector((state) => state.board.boardTitle);
  const boardContent = useSelector((state) => state.board.boardContent);
  // const userId = useSelector((state) => state.board.userId);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <fieldset id="writeBoard">
        <legend>내가 보낸 사연 확인하기</legend>
        <input type="text" id="title" readOnly defaultValue={title} />
        <br />
        <textarea
          id="content"
          cols="70"
          rows="20"
          readOnly
          defaultValue={contents}
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
