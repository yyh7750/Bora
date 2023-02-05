import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../../../store/board";
import "./UserToDj.css";
import profileImg from "../../../assets/profileimg.jpg";
import Button from "../../../UI/Button";

const UserToDj = () => {
  const dispatch = useDispatch();

  const toggle = useSelector((state) => state.board.toggle);

  const toggleHandler = () => {
    dispatch(boardActions.toggleBoard());
  };
  return (
    <div>
      <fieldset>
        <img src={profileImg} className="circle" />
        <div className="trainerInfo">
          <div className="infoTop">
            <span className="nickname" style={{ marginRight: "20px", flex: 1 }}>
              DJ이름
            </span>
            <Button style={{ flex: 1 }} value="subscribe" name="구독" />
          </div>
          <div>
            <span className="lister">청취자</span>
            <span className="listercnt">100k</span>
          </div>
          <div>
            <p className="content">유저의 한마디입니다.</p>
          </div>
        </div>
        {/* <div className="trainerInfo2">
          <span>
            <div></div>
            <div>
              <div id="buttonFirst" className="light-button button-wrapper">
                <div className="button">
                  <span id="button">구독취소</span>
                </div>
              </div>
            </div>
          </span>
        </div>
        <div className="trainerInfo2">
          <div id="buttonFirst" className="light-button button-wrapper">
            <div className="button">
              <span id="button"> subscribeCnt1명 </span>
            </div>
          </div>
        </div> */}
        <div>
          {toggle && (
            <Link to="/emptyBoard">
              <button onClick={toggleHandler}>
                사연함에 사연 신청하러 가기
              </button>
            </Link>
          )}
          {toggle && (
            <Link to="/viewBoard">
              <button onClick={toggleHandler}>
                사연함에 사연 신청하러 가기
              </button>
            </Link>
          )}
          {!toggle && (
            <Link>
              <button onClick={toggleHandler}>방송정보 보러가기</button>
            </Link>
          )}
        </div>
      </fieldset>
      <hr />
    </div>
  );
};
export default UserToDj;
