import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const DetailBoard = () => {
  const boardTitle = useSelector((state) => state.board.boardTitle);
  const boardContent = useSelector((state) => state.board.boardContent);
  const deleteBoard = () => {
    //모달창 띄우기
    //예 누르면 모달창 false하고 사연리스트로 이동
    //이때 axios요청해서 해당 사연이 가려진 새로운 사연리스트 받아서 페이지에 세팅
    //아니오 누르면 모달창 false하고 사연리스트 이동x
  };
  return (
    <fieldset>
      <span>프로필사진</span>
      <span>글쓴사람 이름</span>
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
      <Link to="/viewBoardList">
        <button>목록</button>
      </Link>
      <Link to="/modifyBoard">
        <button onClick={deleteBoard}>사연가리기</button>
      </Link>
    </fieldset>
  );
};
export default DetailBoard;
