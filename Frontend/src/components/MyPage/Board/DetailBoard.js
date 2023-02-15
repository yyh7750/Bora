import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../../../store/board";

const DetailBoard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const storyboxId = location.state.storyboxId;
  const userId = window.localStorage.getItem("userId");
  const djId = "3";
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const boardTitle = useSelector((state) => state.board.boardTitle);
  const boardContent = useSelector((state) => state.board.boardContent);

  useEffect(() => {
    //1.axios요청으로 사연리스트 객체 받아오기
    const API_URL = `http://localhost:8080/api/storybox/list/${djId}/${storyboxId}`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        setWriter(res.data.viewerId);
        setTitle(res.data.title);
        setContents(res.data.contents);
        // dispatch(boardActions.writeBoard(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteBoard = () => {
    //모달창 띄우기
    //예 누르면 모달창 false하고 사연리스트로 이동
    //이때 axios요청해서 해당 사연이 가려진 새로운 사연리스트 받아서 페이지에 세팅
    //아니오 누르면 모달창 false하고 사연리스트 이동x

    const API_URL = `http://localhost:8080/api/storybox/list/${storyboxId}`;
    axios
      .delete(API_URL)
      .then((res) => {
        console.log(res);
        // dispatch(boardActions.writeBoard(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addBlacklist = () => {
    const DATA = {
      djId: "3",
      viewerId: writer,
    };
    const API_URL = `http://localhost:8080/api/users/blacklist`;
    axios({
      url: API_URL,
      method: "POST",
      data: DATA,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <fieldset>
      <span style={{ paddingTop: "30px" }}>프로필사진</span>

      <div>{writer}</div>
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
      <Link to="/viewBoardList">
        <button>목록</button>
      </Link>

      <button onClick={deleteBoard}>사연가리기</button>

      <button onClick={addBlacklist}>블랙리스트추가</button>
    </fieldset>
  );
};
export default DetailBoard;
