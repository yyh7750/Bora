import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserToDj = () => {
  const flag = true;
  const emptyBoard = useSelector((state) => state.board.emptyBoard);
  console.log(emptyBoard);
  // const goBoard = () => {
  //   flag = false;
  // };
  // const goBroadcast = () => {
  //   flag = true;
  // };
  return (
    <div>
      {emptyBoard && (
        <Link to="/emptyBoard">
          <button>사연함에 사연 신청하러 가기</button>
        </Link>
      )}
      {!emptyBoard && (
        <Link to="/viewBoard">
          <button>사연함에 사연 신청하러 가기</button>
        </Link>
      )}
      {/* {!flag && (
        <Link>
          <button>방송정보 보러가기</button>
        </Link>
      )} */}
    </div>
  );
};
export default UserToDj;
