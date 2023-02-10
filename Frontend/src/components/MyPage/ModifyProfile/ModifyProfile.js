import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blacklistActions } from "../../../store/blacklist";
import "./ModifyProfile.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Profile from "../../../UI/Profile/Profile";
import FilterBox from "../../../UI/FilterBox/FilterBox";
import bannerImg from "../../../assets/2.jpg";

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
    }
  };

  const showBlacklistModal = useSelector(
    (state) => state.blacklist.showBlacklistModal
  );

  const closeBlacklist = () => {
    dispatch(blacklistActions.closeBlacklist());
  };
  const showModal = () => {
    dispatch(blacklistActions.openBlacklistModal());
  };
  return (
    <Fragment>
      {/* <FilterBox /> */}
      <div className="profileModal">
        <FontAwesomeIcon
          icon={faXmark}
          className="closeButton"
          onClick={closeBlacklist}
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
                <img
                  src={bannerImg.preview_URL}
                  onClick={() => inputRef.click()}
                />
              </div>
            </div>
            <span style={{ marginRight: "10px" }}>블랙된사람1</span>
            <button
              className="profileButton"
              style={{ marginRight: "10px" }}
              onClick={showModal}
            >
              해제
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ModifyProfile;
