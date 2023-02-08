import "./Broadcast.scss";

import { useSelector, useDispatch } from "react-redux";
import { blacklistActions } from "../../../store/blacklist";

import left from "../../../assets/left.png";
import right from "../../../assets/right.png";
import Button from "../../../UI/Button/Button";

import bannerImg from "../../../assets/2.jpg";
import thumbnailImg from "../../../assets/4.jpg";
import BlackList from "../BlackList/BlackList";

const Broadcast = () => {
  const dispatch = useDispatch();
  const showBlacklist = useSelector((state) => state.blacklist.showBlacklist);

  const showblackList = () => {
    dispatch(blacklistActions.openBlacklist());
  };

  return (
    <div>
      <img className="bannerImg" src={bannerImg} alt="썸네일이미지" />
      <div className="space"></div>
      <div className="banner">
        <img src={left} alt="왼쪽확성기" className="bannerIcon" />
        공지자리
        <img src={right} alt="오른쪽확성기" className="bannerIcon" />
      </div>
      <div className="thumbnail">
        <img src={thumbnailImg} alt="썸네일이미지" className="thumbnailImg" />
      </div>
      <div className="broadcastInfo">
        <div className="titleLine">방송국명자리</div>
        <hr />
        <div style={{ float: "left" }}>
          방송요일자리 방송시간자리
          <br />
          방송태그자리
          <br />
          방송설명자리
          <br />
          <button onClick={showblackList}>블랙리스트</button>
          <Button name="방송정보 수정" style={{ float: "left" }}></Button>
          {showBlacklist && <BlackList name="블랙리스트" />}
        </div>
      </div>
    </div>
  );
};
export default Broadcast;
