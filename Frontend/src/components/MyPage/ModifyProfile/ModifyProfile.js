import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ModifyProfile.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Profile from "../../../UI/Profile/Profile";
import FilterBox from "../../../UI/FilterBox/FilterBox";
import bannerImg from "../../../assets/2.jpg";
import { profileActions } from "../../../store/profile";
import axios from "axios";

const ModifyProfile = (props) => {
  const dispatch = useDispatch();

  const [image, setImage] = useState({
    image_file: "",
    preview_URL: bannerImg,
  });

  let inputRef;

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
      console.log(e.target.files[0]);
      formData.append("files", e.target.files[0]);
      for (let value of formData.values()) {
        console.log(value);
      }
      const userId = window.localStorage.getItem("userId");
      const HEADERS = {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      };
      //이미지 axios요청
      const IMG_URL = `http://localhost:8080/img/file-upload/profile`;
      axios({
        headers: HEADERS,
        url: IMG_URL,
        method: "POST",
        params: { file: formData, userId: userId },
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

  const profileCloseHandeler = () => {
    dispatch(profileActions.closeModifyProfile());
  };
  const userId = window.localStorage.getItem("userId");

  const modifyProfileInfo = () => {
    const DATA = {
      id: userId,
      nickName: document.getElementById("nickNameInput").value,
      desc: document.getElementById("userSayInput").value,
    };
    const API_URL = `http://localhost:8080/users`;
    axios({
      url: API_URL,
      method: "PATCH",
      data: DATA,
    })
      .then((res) => {
        // console.log(res);
        dispatch(profileActions.closeModifyProfile());
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      {/* <FilterBox /> */}
      <div className="profileModal">
        <FontAwesomeIcon
          icon={faXmark}
          className="closeButton"
          onClick={profileCloseHandeler}
        />
        <div className="profileModalInfo">
          <span className="profileTitle">{props.name}</span>
          <div className="profileModalInfo2">
            <div className="profileImgChange">
              <input
                type="file"
                accept="image/*"
                onChange={saveImage}
                onClick={(e) => (e.target.value = null)}
                ref={(refParam) => (inputRef = refParam)}
                style={{ display: "none" }}
              />
              <div className="img-wrapper">
                <img src={image.preview_URL} onClick={() => inputRef.click()} />
              </div>
            </div>
            <br />
            <label>
              <span style={{ marginRight: "30px" }}>닉네임</span>
              <input type="text" id="nickNameInput" />
            </label>
            <br />
            <label>
              <span style={{ marginRight: "30px" }}>유저 한마디</span>
              <input
                type="text"
                id="userSayInput"
                // className="profileModifyDesc"
              />
            </label>
            <br />
            <button
              className="profileButton"
              style={{ marginRight: "10px" }}
              onClick={modifyProfileInfo}
            >
              수정하기
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ModifyProfile;
