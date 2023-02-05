import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../../../store/board";

const DjToDj = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.board.toggle);
  const toggleHandler = () => {
    dispatch(boardActions.toggleBoard());
  };
  return (
    <div>
      {toggle && (
        <Link to="/viewBoardList">
          <button onClick={toggleHandler}>사연함 보러가기</button>
        </Link>
      )}
      {!toggle && (
        <Link to="/broadcast">
          <button onClick={toggleHandler}>방송정보 보러가기</button>
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
export default DjToDj;
