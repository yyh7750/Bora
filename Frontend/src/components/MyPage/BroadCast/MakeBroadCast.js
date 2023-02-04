import "./MakeBroadcast.scss";

import left from "../../../assets/left.png";
import right from "../../../assets/right.png";
import Button from "../../../UI/Button/Button";

//더미데이터
import bannerImg from "../../../assets/2.jpg";
import thumbnailImg from "../../../assets/4.jpg";

const MakeBroadcast = () => {
  const createBroadcast = () => {
    // {
    //   userId:
    //   name:
    //   startTime:
    //   endTime:
    //   description:
    //   notice:
    //   category:
    //   mon:
    //   tue:
    //   wen:
    //   thu:
    //   fri:
    //   sat:
    //   sun:
    // }
    console.log("방송국 생성!");
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
          className="notice"
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
            className="title"
          />
        </div>
        <hr />
        <div style={{ float: "left" }}>
          방송 요일
          <br />
          <input
            type="checkbox"
            value="mon"
            name="day"
            style={{ marginLeft: "0px" }}
          />
          월
          <input type="checkbox" value="tue" name="day" />
          화
          <input type="checkbox" value="wed" name="day" />
          수
          <input type="checkbox" value="thu" name="day" />
          목
          <input type="checkbox" value="fri" name="day" />
          금
          <input type="checkbox" value="sat" name="day" />
          토
          <input type="checkbox" value="sun" name="day" />일
          <br />
          방송시간
          <br />
          <select name="startTime">
            <option value="">시작시간</option>
            <option value="0">00:00</option>
            <option value="1">01:00</option>
            <option value="2">02:00</option>
            <option value="3">03:00</option>
            <option value="4">04:00</option>
            <option value="5">05:00</option>
            <option value="6">06:00</option>
            <option value="7">07:00</option>
            <option value="8">08:00</option>
            <option value="9">09:00</option>
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="12">12:00</option>
            <option value="13">13:00</option>
            <option value="14">14:00</option>
            <option value="15">15:00</option>
            <option value="16">16:00</option>
            <option value="17">17:00</option>
            <option value="18">18:00</option>
            <option value="19">19:00</option>
            <option value="20">20:00</option>
            <option value="21">21:00</option>
            <option value="22">22:00</option>
            <option value="23">23:00</option>
          </select>
          <select name="endTime">
            <option value="">종료시간</option>
            <option value="1">01:00</option>
            <option value="2">02:00</option>
            <option value="3">03:00</option>
            <option value="4">04:00</option>
            <option value="5">05:00</option>
            <option value="6">06:00</option>
            <option value="7">07:00</option>
            <option value="8">08:00</option>
            <option value="9">09:00</option>
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="12">12:00</option>
            <option value="13">13:00</option>
            <option value="14">14:00</option>
            <option value="15">15:00</option>
            <option value="16">16:00</option>
            <option value="17">17:00</option>
            <option value="18">18:00</option>
            <option value="19">19:00</option>
            <option value="20">20:00</option>
            <option value="21">21:00</option>
            <option value="22">22:00</option>
            <option value="23">23:00</option>
            <option value="24">24:00</option>
          </select>
          <br />
          방송태그
          <br />
          <select name="category">
            <option value="">방송태그</option>
            <option value="노래">노래</option>
            <option value="춤">춤</option>
            <option value="독서">독서</option>
            <option value="더빙">더빙</option>
            <option value="ASMR">ASMR</option>
            <option value="뉴스">뉴스</option>
            <option value="엔터">엔터</option>
            <option value="인터뷰">인터뷰</option>
          </select>
          <br />
          방송설명
          <br />
          <input type="text" className="desc" />
          <br />
          <Button
            name="생성하기"
            value={createBroadcast}
            style={{ float: "left" }}
          ></Button>
        </div>
      </div>
    </div>
  );
};
export default MakeBroadcast;
