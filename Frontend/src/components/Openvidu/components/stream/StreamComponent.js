import React, { useState } from "react";
import "./StreamComponent.css";
import OvVideoComponent from "./OvVideo";
import { motion } from "framer-motion";

import MicOff from "@material-ui/icons/MicOff";
import VideocamOff from "@material-ui/icons/VideocamOff";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeOff from "@material-ui/icons/VolumeOff";
import IconButton from "@material-ui/core/IconButton";

import heartIcon from "../../../../assets/yesheart.png";

const StreamComponent = (props) => {
  const [heartCount, setHeartCount] = useState(0);
  // const [nickname, setNickname] = useState(props.user.getNickname());
  // const [showForm, setShowForm] = useState(false);
  const [mutedSound, setMutedSound] = useState(false);
  // const [isFormValid, setIsFormValid] = useState(true);

  const toggleSound = () => {
    setMutedSound((mutedSound = !mutedSound));
  };

  const heartHandler = () => {
    setHeartCount(heartCount + 1);
    console.log("하트 수" + heartCount);
  };

  return (
    <div className="OT_widget-container">
      {/* <div className="pointer video_nickname">
          <div onClick={this.toggleNicknameForm}>
            <span id="video_nickname">{this.props.user.getNickname()}</span>
            {this.props.user.isLocal() && <span id=""></span>}
          </div>
        </div> */}

      {props.user !== undefined &&
      props.user.getStreamManager() !== undefined ? (
        <div className="streamComponent">
          {/* 내 화면컴포넌트 */}
          <OvVideoComponent user={props.user} mutedSound={mutedSound} />
          <div id="heartIcons">
            <motion.img
              src={heartIcon}
              alt="하트"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              onClick={heartHandler}
            />
          </div>
          <div id="statusIcons">
            {!props.user.isVideoActive() ? (
              <div id="camIcon">
                {/* 내 화면에서 비디오 꺼졌을 때, 비디오 꺼진 아이콘 뜨는 거 */}
                <VideocamOff id="statusCam" />
              </div>
            ) : null}

            {!props.user.isAudioActive() ? (
              <div id="micIcon">
                <MicOff id="statusMic" />
              </div>
            ) : null}
          </div>
          <div>
            {!props.user.isLocal() && (
              <IconButton id="volumeButton" onClick={toggleSound}>
                {mutedSound ? <VolumeOff color="secondary" /> : <VolumeUp />}
              </IconButton>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default StreamComponent;
