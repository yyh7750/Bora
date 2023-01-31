import { Link } from "react-router-dom";

const EmptyBoard = () => {
  return (
    <div>
      <div>작성한 사연이 없어요..</div>
      <Link to="/writeBoard">
        <div>사연 작성하러 가기</div>
      </Link>
    </div>
  );
};
export default EmptyBoard;
