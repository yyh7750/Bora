import "./ModifyBroadcast.scss";
import { useSelector, useDispatch } from "react-redux";

import left from "../../../assets/left.png";
import right from "../../../assets/right.png";
import Button from "../../../UI/Button/Button";

import bannerImg from "../../../assets/2.jpg";
import thumbnailImg from "../../../assets/4.jpg";
import { Link } from "react-router-dom";

const ModifyBroadcast = () => {
  const modifyBroadcast = () => {
    //방송정보 수정한 양식 객체에 담에서 broadcast.js에 전달
  };

  return (
    <div>
      <img className="bannerImg" src={bannerImg} alt="썸네일이미지" />
      <div className="space"></div>
      <div className="banner">
        <img src={left} alt="왼쪽확성기" className="bannerIcon" />
        <input
          type="text"
          placeholder="공지를 입력해주세요"
          className="modifyBroadcastNotice"
        />
        <img src={right} alt="오른쪽확성기" className="bannerIcon" />
      </div>
      <div className="thumbnail">
        <img src={thumbnailImg} alt="썸네일이미지" className="thumbnailImg" />
      </div>
      <div className="broadcastInfo">
        <div className="titleLine">
          <input
            type="text"
            placeholder="방송국명을 입력해주세요"
            className="modifyBroadcastTitle"
          />
        </div>
        <hr />
        <div style={{ float: "left" }}>
          방송요일자리 방송시간자리
          <br />
          방송태그자리
          <br />
          <input type="text" className="desc" />
          <br />
          <Link to="/broadcast">
            <Button
              name="방송정보 수정"
              style={{ float: "left" }}
              value={modifyBroadcast}
            ></Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ModifyBroadcast;
