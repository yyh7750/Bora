import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ViewBoard = () => {
  const boardTitle = useSelector((state) => state.board.boardTitle);
  const boardContent = useSelector((state) => state.board.boardContent);
  console.log(boardTitle);
  console.log(boardContent);
  // const userId = useSelector((state) => state.board.userId);
  return (
    <fieldset>
      <legend>사연을 보내주세요♥</legend>
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
      <Link to="/modifyBoard">
        <button>수정</button>
      </Link>
    </fieldset>
  );
};
export default ViewBoard;
