import React, { Component } from "react";
import "./SidebarComponent.css";

import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import Videocam from "@material-ui/icons/Videocam";
import VideocamOff from "@material-ui/icons/VideocamOff";
// import Fullscreen from "@material-ui/icons/Fullscreen";
// import FullscreenExit from "@material-ui/icons/FullscreenExit";
import PictureInPicture from "@material-ui/icons/PictureInPicture";
import ScreenShare from "@material-ui/icons/ScreenShare";
import StopScreenShare from "@material-ui/icons/StopScreenShare";
// import Tooltip from "@material-ui/core/Tooltip";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
// import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
// import CreateIcon from "@material-ui/icons/Create";
// import BorderColorIcon from "@material-ui/icons/BorderColor";
// import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {
  // ListItemText,
  ListItemIcon,
  MenuItem,
  MenuList,
} from "@material-ui/core";

export default class SidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isFull: false, isBlackBoard: false };
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    // this.toggleEditor = this.toggleEditor.bind(this);
    // this.toggleIsBlackBoard = this.toggleIsBlackBoard.bind(this);
  }

  handleFullScreen = (e) => {
    const { isFull } = this.state;
    this.setState({
      isFull: !isFull,
    });
    if (!isFull) {
      this.openFullscreen();
    } else {
      this.setState({ isFull: false });
      this.closeFullScreen();
    }
  };

  openFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullScreen();
    }
  };

  closeFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancleFullScreen) {
      document.mozCancleFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  componentDidMount = () => {
    window.addEventListener("fullscreenchange", (e) => {
      this.setState({ isFull: document.fullscreen });
    });
  };

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  screenShare() {
    this.props.screenShare();
  }

  stopScreenShare() {
    this.props.stopScreenShare();
  }

  leaveSession() {
    this.props.leaveSession();
  }

  toggleChat() {
    this.props.toggleChat();
  }

  // toggleEditor() {
  //   this.props.toggleEditor();
  // }

  // toggleIsBlackBoard() {
  //   this.setState({ isBlackBoard: !this.state.isBlackBoard });
  //   this.props.toggleIsBlackBoard();
  // }

  render() {
    const localUser = this.props.user;
    // const { isFull } = this.state;
    // const editorDisplay = this.props.editorDisplay.display;
    return (
      // <AppBar className="toolbar" id="header">
      <MenuList className="side">
        <MenuItem onClick={this.micStatusChanged}>
          <ListItemIcon
            // color="inherit"
            // className="navButton"
            id="navMicButton"
          >
            {localUser !== undefined && localUser.isAudioActive() ? (
              <Mic />
            ) : (
              <MicOff color="secondary" />
            )}
          </ListItemIcon>
          {/* <ListItemText
            // color="inherit"
            // className="navButton"
            id="navMicButton"
          >
            {localUser !== undefined && localUser.isAudioActive()
              ? "마이크 끄기"
              : "마이크 켜기"}
          </ListItemText> */}
        </MenuItem>
        <MenuItem onClick={this.camStatusChanged}>
          <ListItemIcon
            color="inherit"
            // className="navButton"
            id="navCamButton"
          >
            {localUser !== undefined && localUser.isVideoActive() ? (
              <Videocam />
            ) : (
              <VideocamOff color="secondary" />
            )}
          </ListItemIcon>
          {/* <ListItemText
            color="inherit"
            // className="navButton"
            id="navCamButton"
          >
            {localUser !== undefined && localUser.isVideoActive()
              ? "카메라 끄기"
              : "카메라 켜기"}
          </ListItemText> */}
        </MenuItem>
        <MenuItem onClick={this.screenShare}>
          <ListItemIcon
            color="inherit"
            // className="navButton"
            id="navScreenButton"
          >
            {localUser !== undefined && localUser.isScreenShareActive() ? (
              <PictureInPicture />
            ) : (
              <ScreenShare />
            )}
          </ListItemIcon>
          {/* <ListItemText
            color="inherit"
            // className="navButton"
            id="navScreenButton"
          >
            {localUser !== undefined && localUser.isScreenShareActive()
              ? "창 변경하기"
              : "화면 공유"}
          </ListItemText> */}
        </MenuItem>
        {localUser !== undefined && localUser.isScreenShareActive() && (
          <MenuItem onClick={this.stopScreenShare}>
            <ListItemIcon id="navScreenButton">
              <StopScreenShare color="secondary" />
            </ListItemIcon>
            {/* <ListItemText id="navScreenButton">화면 공유 중지</ListItemText> */}
          </MenuItem>
        )}
        {/* <MenuItem onClick={this.handleFullScreen}>
          <ListItemIcon
            color="inherit"
            // className="navButton"
          >
            {localUser !== undefined && isFull ? (
              <FullscreenExit />
            ) : (
              <Fullscreen />
            )}
          </ListItemIcon>
          <ListItemText
            color="inherit"
            // className="navButton"
          >
            {localUser !== undefined && isFull ? "전체 화면 종료" : "전체 화면"}
          </ListItemText>
        </MenuItem> */}
        {/* <MenuItem onClick={this.toggleIsBlackBoard}>
          <ListItemIcon
            color="inherit"
            // className="navButton"
          >
            {localUser !== undefined && this.state.isBlackBoard ? (
              <HighlightOffIcon />
            ) : (
              <BorderColorIcon />
            )}
          </ListItemIcon>
          <ListItemText
            color="inherit"
            // className="navButton"
          >
            {localUser !== undefined && this.state.isBlackBoard
              ? "칠판 끄기"
              : "칠판 키기"}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={this.toggleEditor}>
          <ListItemIcon color="inherit" id="navEditorButton">
            {localUser !== undefined && editorDisplay === "none" ? (
              <CreateIcon />
            ) : (
              <CreateIcon color="secondary" />
            )}
          </ListItemIcon>
          <ListItemText color="inherit" id="navEditorButton">
            {localUser !== undefined && editorDisplay === "none"
              ? "편집기 열기"
              : "편집기 끄기"}
          </ListItemText>
        </MenuItem> */}
        {/* <MenuItem onClick={this.toggleChat}>
          <ListItemIcon
            color="inherit"
            // className="navButton"
            // id="navChatButton"
          >
            {this.props.showNotification && <div id="point" className="" />}
            <Tooltip title="Chat">
              <QuestionAnswer />
            </Tooltip>
          </ListItemIcon>
          <ListItemText
            color="inherit"
            // className="navButton"
            // id="navChatButton"
          >
            채팅하기
          </ListItemText>
        </MenuItem> */}
        <MenuItem onClick={this.leaveSession}>
          <ListItemIcon
            color="secondary"
            // className="navButton"
            // id="navLeaveButton"
          >
            <PowerSettingsNew color="#8A6BCD" />
          </ListItemIcon>
          {/* <ListItemText
            color="secondary"
            // className="navButton"
            // id="navLeaveButton"
          >
            종료하기
          </ListItemText> */}
        </MenuItem>
      </MenuList>
    );
  }
}
