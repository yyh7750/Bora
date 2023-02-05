import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { boardActions } from "../../../store/board";

const ModifyBoard = () => {
  const dispatch = useDispatch();

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
      userId: 0,
      boardTitle: document.getElementById("title").value,
      boardContent: document.getElementById("content").value,
    };
    dispatch(boardActions.writeBoard(message));
  };
  return (
    <fieldset>
      <legend>사연을 보내주세요♥</legend>
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
      <span id="count">0/500</span>
      <Link to="/viewBoard">
        <button onClick={sendMessage}>수정</button>
      </Link>
    </fieldset>
  );
};
export default ModifyBoard;
