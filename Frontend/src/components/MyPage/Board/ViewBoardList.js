import { Link } from "react-router-dom";

const ViewBoardList = () => {
  return (
    <div class="container">
      <div class="board10">
        <div>board.boardTitle</div>
        <div>
          <Link>board.boardTitle</Link>
        </div>
        <span>board.boardViewcnt</span>
        <span style="float: right;">board.boardRegdate</span>
      </div>
    </div>
  );
};
export default ViewBoardList;
