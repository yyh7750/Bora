import React, { Component } from "react";
import "./StreamComponent.css";
import OvVideoComponent from "./OvVideo";
import { motion } from "framer-motion";
import MicOff from "@material-ui/icons/MicOff";
import VideocamOff from "@material-ui/icons/VideocamOff";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeOff from "@material-ui/icons/VolumeOff";
import IconButton from "@material-ui/core/IconButton";
import heartIcon from "../../../../assets/yesheart.png";

export default class StreamComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.user.getNickname(),
      showForm: false,
      mutedSound: false,
      isFormValid: true,
      heartCnt: 0,
    };
    this.toggleSound = this.toggleSound.bind(this);
    this.heartHandler = this.heartHandler.bind(this);
  }

  toggleSound() {
    this.setState({ mutedSound: !this.state.mutedSound });
  }

  heartHandler() {
    this.setState({ heartCnt: this.state.heartCnt + 1 });
    console.log(this.heartCnt);
  }

  render() {
    return (
      <div className="OT_widget-container">
        {/* <div className="pointer nickname"> */}
        {/* <div onClick={this.toggleNicknameForm}>
            <span id="nickname">{this.props.user.getNickname()}</span>
            {this.props.user.isLocal() && <span id=""></span>}
          </div>
        </div> */}

        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent">
            {/* 내 화면컴포넌트 */}
            <OvVideoComponent
              user={this.props.user}
              mutedSound={this.state.mutedSound}
            />
            <div id="heartIcons">
              <motion.img
                src={heartIcon}
                alt="하트"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                onClick={this.heartHandler}
              />
            </div>
            <div id="statusIcons">
              {!this.props.user.isVideoActive() ? (
                <div id="camIcon">
                  {/* 내 화면에서 비디오 꺼졌을 때, 비디오 꺼진 아이콘 뜨는 거 */}
                  <VideocamOff id="statusCam" />
                </div>
              ) : null}

              {!this.props.user.isAudioActive() ? (
                <div id="micIcon">
                  <MicOff id="statusMic" />
                </div>
              ) : null}
            </div>
            <div>
              {!this.props.user.isLocal() && (
                <IconButton id="volumeButton" onClick={this.toggleSound}>
                  {this.state.mutedSound ? (
                    <VolumeOff color="secondary" />
                  ) : (
                    <VolumeUp />
                  )}
                </IconButton>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
