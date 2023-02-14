import "./MakeBroadcast.scss";

import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import left from "../../../assets/left.png";
import right from "../../../assets/right.png";
import Button2 from "../../../UI/Button/Button";

//더미데이터
import bannerImg from "../../../assets/2.jpg";
import thumbnailImg from "../../../assets/4.jpg";

const MakeBroadcast = () => {
  const createBroadcast = () => {
    const userId = window.localStorage.getItem("userId");
    const arr = [];
    const query = 'input[name="day"]:checked';
    const selectedEls = document.querySelectorAll(query);
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dateController = new Date();
    let year = dateController.getFullYear(); // 년도
    let month = dateController.getMonth() + 1; // 월
    let date = dateController.getDate(); // 날짜
    //2007-12-03 10:15
    const startTime = new Date(
      `${year}-${month}-${date} ${document.getElementById("startTime").value}`
    );
    const endTime = new Date(
      `${year}-${month}-${date} ${document.getElementById("endTime").value}`
    );
    selectedEls.forEach((el) => {
      arr.push(el.value);
      // result += el.value + " ";
    });
    const dayArr = [
      arr.includes("mon"),
      arr.includes("tue"),
      arr.includes("wed"),
      arr.includes("thu"),
      arr.includes("fri"),
      arr.includes("sat"),
      arr.includes("sun"),
    ];
    const stationInfo = {
      userId: userId,
      name: document.getElementById("broadcastTitle").value,
      startTime: startTime,
      endTime: endTime,
      description: document.getElementById("broadcastDesc").value,
      notice: document.getElementById("broadcastNotice").value,
      category: document.getElementById("broadcastCategory").value,
      mon: dayArr[0],
      tue: dayArr[1],
      wen: dayArr[2],
      thu: dayArr[3],
      fri: dayArr[4],
      sat: dayArr[5],
      sun: dayArr[6],
    };

    console.log(stationInfo);

    const API_URL = `http://localhost:8080/api/stations`;
    axios({
      url: API_URL,
      method: "POST",
      data: stationInfo,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    //서버에 이미지 업로드 (배너이미지)
    // if (image.image_file) {
    //   const formData = new FormData();
    //   formData.append("file", image.image_file);
    //   await axios.post("/api/image/upload", formData);
    //   alert("서버에 등록이 완료되었습니다!");
    //   setImage({
    //     image_file: "",
    //     preview_URL: bannerImg,
    //   });
    // } else {
    //   alert("사진을 등록하세요!");
    // }
  };

  const [image, setImage] = useState({
    image_file: "",
    preview_URL: bannerImg,
  });

  const [thumbnailImage, setThumbnailImage] = useState({
    image_file: "",
    preview_URL: thumbnailImg,
  });

  let inputRef;

  let inputThumdnailRef;

  const saveImage = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);
      setImage(() => ({
        image_file: e.target.files[0],
        preview_URL: preview_URL,
      }));
    }
  };

  const saveThumbnailImage = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(thumbnailImage.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);
      setThumbnailImage(() => ({
        image_file: e.target.files[0],
        preview_URL: preview_URL,
      }));
    }
  };

  const deleteImage = () => {
    // createObjectURL()을 통해 생성한 기존 URL을 폐기
    URL.revokeObjectURL(image.preview_URL);
    setImage({
      image_file: "",
      preview_URL: bannerImg,
    });
  };

  useEffect(() => {
    // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
    return () => {
      URL.revokeObjectURL(image.preview_URL);
    };
  }, []);

  return (
    <div>
      <div className="uploader-wrapper">
        <input
          type="file"
          accept="image/*"
          onChange={saveImage}
          // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
          // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
          onClick={(e) => (e.target.value = null)}
          ref={(refParam) => (inputRef = refParam)}
          style={{ display: "none" }}
        />
        <div className="img-wrapper">
          <img src={image.preview_URL} onClick={() => inputRef.click()} />
        </div>
      </div>
      <div className="space"></div>
      <div className="banner">
        <img src={left} alt="왼쪽확성기" className="bannerIcon" />
        <input
          type="text"
          placeholder="공지를 입력해주세요"
          id="broadcastNotice"
          className="notice"
        />
        <img src={right} alt="오른쪽확성기" className="bannerIcon" />
      </div>
      <div className="thumbnail">
        <input
          type="file"
          accept="image/*"
          onChange={saveThumbnailImage}
          // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
          // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
          onClick={(e) => (e.target.value = null)}
          ref={(refParam) => (inputThumdnailRef = refParam)}
          style={{ display: "none" }}
        />
        <div className="img-wrapper">
          <img
            src={thumbnailImage.preview_URL}
            onClick={() => inputThumdnailRef.click()}
            className="thumbnailImg"
          />
        </div>
      </div>
      <div className="broadcastInfo">
        <div className="titleLine">
          <input
            type="text"
            placeholder="방송국명을 입력해주세요"
            className="title"
            id="broadcastTitle"
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
          <select name="startTime" id="startTime">
            <option value="">시작시간</option>
            <option value="00:00">00:00</option>
            <option value="01:00">01:00</option>
            <option value="02:00">02:00</option>
            <option value="03:00">03:00</option>
            <option value="04:00">04:00</option>
            <option value="05:00">05:00</option>
            <option value="06:00">06:00</option>
            <option value="07:00">07:00</option>
            <option value="08:00">08:00</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
            <option value="18:00">18:00</option>
            <option value="19:00">19:00</option>
            <option value="20:00">20:00</option>
            <option value="21:00">21:00</option>
            <option value="22:00">22:00</option>
            <option value="23:00">23:00</option>
          </select>
          <select name="endTime" id="endTime">
            <option value="">종료시간</option>
            <option value="01:00">01:00</option>
            <option value="02:00">02:00</option>
            <option value="03:00">03:00</option>
            <option value="04:00">04:00</option>
            <option value="05:00">05:00</option>
            <option value="06:00">06:00</option>
            <option value="07:00">07:00</option>
            <option value="08:00">08:00</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
            <option value="18:00">18:00</option>
            <option value="19:00">19:00</option>
            <option value="20:00">20:00</option>
            <option value="21:00">21:00</option>
            <option value="22:00">22:00</option>
            <option value="23:00">23:00</option>
            <option value="24:00">24:00</option>
          </select>
          <br />
          방송태그
          <br />
          <select name="category" id="broadcastCategory">
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
          <input type="text" id="broadcastDesc" className="desc" />
          <br />
          <Link to="/broadcast">
            <Button2
              name="생성하기"
              value={createBroadcast}
              style={{ float: "left" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default MakeBroadcast;
