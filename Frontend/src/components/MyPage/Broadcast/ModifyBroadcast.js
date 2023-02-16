import "./ModifyBroadcast.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { broadcastActions } from "../../../store/broadcast";

import left from "../../../assets/left.png";
import right from "../../../assets/right.png";
import Button from "../../../UI/Button/Button";

import bannerImg from "../../../assets/2.jpg";
import thumbnailImg from "../../../assets/4.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { color } from "@mui/system";

const ModifyBroadcast = () => {
  const dispatch = useDispatch();

  const userId = window.localStorage.getItem("userId");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [name, setName] = useState("");
  const [notice, setNotice] = useState("");
  const [day, setDay] = useState("");
  useEffect(() => {
    const resarr = ["월", "화", "수", "목", "금", "토", "일"];
    const API_URL = `http://localhost:8080/api/stations/${userId}`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        // console.log(res);
        setCategory(res.data.category);
        setDescription(res.data.description);
        setStarttime(res.data.startTime);
        setEndtime(res.data.endTime);
        setName(res.data.name);
        setNotice(res.data.notice);
        const dayarr = [
          res.data.mon,
          res.data.tue,
          res.data.wen,
          res.data.thu,
          res.data.fri,
          res.data.sat,
          res.data.sun,
        ];
        let realday = "";
        for (let i = 0; i < dayarr.length; i++) {
          if (dayarr[i] === true) {
            setDay(resarr[i]);
            realday = resarr[i];
          }
        }
        dispatch(broadcastActions.setBroadcast(res.data));
        dispatch(broadcastActions.setDay(realday));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [name]);

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
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const userId = window.localStorage.getItem("userId");
      const HEADERS = {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      };
      //이미지 axios요청
      const IMG_URL = `http://localhost:8080/api/img/file-upload/banner/${userId}`;
      axios({
        headers: HEADERS,
        url: IMG_URL,
        method: "POST",
        data: formData,
      })
        .then((res) => {
          console.log(res);
          // window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
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
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const userId = window.localStorage.getItem("userId");
      const HEADERS = {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      };
      //이미지 axios요청
      const IMG_URL = `http://localhost:8080/api/img/file-upload/thumbnail/${userId}`;
      axios({
        headers: HEADERS,
        url: IMG_URL,
        method: "POST",
        data: formData,
      })
        .then((res) => {
          console.log(res);
          // window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //타이틀유효성검사
  const checkBroadcastTitle = () => {
    const modifytitle = document.getElementById("modifyBroadcastTitle").value;
    const API_URL = `http://localhost:8080/api/stations/check/${modifytitle}`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        if (res.data) {
          document.getElementById("resTitle").innerHTML =
            "사용가능한 방송국명입니다.";
          document.getElementById("resTitle").style.color = "green";
          dispatch(broadcastActions.checkInfo(true));
        } else {
          document.getElementById("resTitle").innerHTML =
            "이미 사용중인 방송국명입니다.";
          document.getElementById("resTitle").style.color = "red";
          dispatch(broadcastActions.checkInfo(false));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const check = useSelector((state) => state.broadcast.isVaild);

  //방송국 수정
  const modifyBroadcast = () => {
    const name = document.getElementById("modifyBroadcastTitle").value;
    const description = document.getElementById("modifyDesc").value;
    const notice = document.getElementById("modifyBroadcastNotice").value;
    console.log(check);
    if (
      (name.length == 0) |
      (description.length == 0) |
      (notice.length == 0) |
      !check
    ) {
      document.getElementById("resModify").innerHTML =
        "방송국 정보를 다시 확인해주세요.";
      document.getElementById("resModify").style.color = "red";
    } else {
      const dayArr = [];
      const arr = ["월", "화", "수", "목", "금", "토", "일"];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === day) {
          dayArr.push(true);
        } else {
          dayArr.push(false);
        }
      }
      const dateController = new Date();
      let year = dateController.getFullYear(); // 년도
      let month = dateController.getMonth() + 1; // 월
      if (parseInt(month) < 10) {
        month = "0" + month;
      }
      let date = dateController.getDate(); // 날짜
      let start = starttime.substring(3);
      let end = endtime.substring(3);
      // if (parseInt(start[0]) < 10) {
      //   start = "0" + start;
      // }
      // if (parseInt(end[0]) < 10) {
      //   end = "0" + end;
      // }
      //2007-12-03 10:15
      const startTime = `${year}-${month}-${date} ${start}`;
      const endTime = `${year}-${month}-${date} ${end}`;
      const stationInfo = {
        userId: userId,
        name: name,
        description: description,
        startTime: startTime,
        endTime: endTime,
        notice: notice,
        category: category,
        mon: dayArr[0],
        tue: dayArr[1],
        wen: dayArr[2],
        thu: dayArr[3],
        fri: dayArr[4],
        sat: dayArr[5],
        sun: dayArr[6],
      };
      const API_URL = `http://localhost:8080/api/stations`;
      axios({
        url: API_URL,
        method: "PATCH",
        data: stationInfo,
      })
        .then((res) => {
          // console.log(res);
          window.location.reload();
          window.location.href = "http://localhost:3000/broadcasts";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div className="uploader-wrapper">
        <input
          id="makeBroadcastInput"
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
          className="modifyBroadcastNotice"
          id="modifyBroadcastNotice"
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
        <div className="titleLine" style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="방송국명을 입력해주세요"
            className="modifyBroadcastTitle"
            id="modifyBroadcastTitle"
            style={{ flex: "2" }}
          />
          <Button
            value={checkBroadcastTitle}
            name="중복확인"
            style={{ flex: "1" }}
          ></Button>
        </div>
        <p id="resTitle"></p>
        <div id="modifyTime">
          {day} {starttime}~{endtime}
        </div>
        {/* <div style={{ float: "left" }}> */}
        <div id="modifyCategory">{category} </div>
        <input type="text" className="desc" id="modifyDesc" />
        {/* <Link to="/broadcasts"> */}
        <Button
          name="방송정보 수정"
          style={{ float: "left" }}
          value={modifyBroadcast}
        ></Button>
        <p id="resModify"></p>
        {/* </Link> */}
        {/* </div> */}
      </div>
    </div>
  );
};
export default ModifyBroadcast;
