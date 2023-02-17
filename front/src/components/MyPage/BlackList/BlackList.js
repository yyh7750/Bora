import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blacklistActions } from "../../../store/blacklist";
import "./BlackList.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Profile from "../../../UI/Profile/Profile";
import Modal from "../../../UI/Modal/Modal";
import FilterBox from "../../../UI/FilterBox/FilterBox";

const BlackList = (props) => {
  const dispatch = useDispatch();

  const showBlacklistModal = useSelector(
    (state) => state.blacklist.showBlacklistModal
  );

  const closeBlacklist = () => {
    dispatch(blacklistActions.closeBlacklist());
  };
  const showModal = () => {
    dispatch(blacklistActions.openBlacklistModal());
  };
  const closeModal = () => {
    dispatch(blacklistActions.closeBlacklistModal());
  };
  return (
    <Fragment>
      <FilterBox />
      <div className="blacklistModal">
        <FontAwesomeIcon
          icon={faXmark}
          className="closeButton"
          onClick={closeBlacklist}
        />
        <div className="blackModalInfo">
          <span className="blacklistTitle">{props.name}</span>
          <div className="blackModalInfo2">
            <Profile className="blacklistImg" />
            <span style={{ marginRight: "10px" }}>블랙된사람1</span>
            <button
              className="blackListButton"
              style={{ marginRight: "10px" }}
              onClick={showModal}
            >
              해제
            </button>
          </div>
        </div>
        {showBlacklistModal && (
          <Modal
            name="해제하시겠습니까?"
            close={closeModal}
            no={closeModal}
            className="blackModal"
          />
        )}
      </div>
    </Fragment>
  );
};

export default BlackList;
