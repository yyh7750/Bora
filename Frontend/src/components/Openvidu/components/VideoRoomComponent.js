import axios from "axios";
// import {connect} from "react-redux";
import { motion } from "framer-motion";
import { OpenVidu } from "openvidu-browser";
import React, { Component } from "react";
import ChatComponent from "./chat/ChatComponent";
import StreamComponent from "./stream/StreamComponent";
import "./VideoRoomComponent.scss";
// import OpenViduLayout from "../layout/openvidu-layout";
import UserModel from "../models/user-model";
import SidebarComponent from "./sidebar/SidebarComponent";
import thumbnail from "../../../assets/wallpaper.jpg";
import GoButton from "../../../UI/Button/GoButton";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

var localUser = new UserModel();
const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/";

const users = { user: "1", value: "디제이" };
const participant = { user: "2", value: "Participant" };
localStorage.setItem(users.user, users.value);
localStorage.setItem(participant.user, participant.value);

class VideoRoomComponent extends Component {
  constructor(props) {
    super(props);
    this.hasBeenUpdated = false;
    // this.layout = new OpenViduLayout();
    const sessionName = "a" + Math.floor(Math.random() * 10000000000);
    // let userName = localStorage.getItem("1");

    this.remotes = [];
    this.localUserAccessAllowed = false;
    this.state = {
      //"세션 아이디는 영어+숫자조합 랜덤으로 부여"
      mySessionId: sessionName,
      myUserName: localStorage.getItem("1"),
      myRoomName: "",
      myRoomType: [],
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: "block",
      currentVideoDevice: undefined,
      isFullscreen: false,
      color: "#00000",
      width: 500,
      height: 500,
      brushRadius: 5,
      lazyRadius: 0,
    };

    this.state = { dj: "" };
    this.state = {};

    this.handleChangeRoomName = this.handleChangeRoomName.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    // this.updateLayout = this.updateLayout.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.nicknameChanged = this.nicknameChanged.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    // this.toggleChat = this.toggleChat.bind(this);
  }

  componentDidMount() {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: "OV_big", // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };

    // this.layout.initLayoutContainer(
    //   document.getElementById("layout"),
    //   openViduLayoutOptions
    // );
    window.addEventListener("beforeunload", this.onbeforeunload);
    // window.addEventListener("resize", this.updateLayout);
    // window.addEventListener("resize", this.checkSize);
    // this.joinSession();
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
    // window.removeEventListener("resize", this.updateLayout);
    window.removeEventListener("resize", this.checkSize);
    window.addEventListener("fullscreenchange", (e) => {
      this.state({ isFullscreen: document.fullscreen });
    });
    this.leaveSession();
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  //세션에 참여
  joinSession() {
    this.OV = new OpenVidu(); //1)오픈비두 오브젝트 생성
    console.log("11");

    this.setState(
      {
        session: this.OV.initSession(), //2) 세션을 시작
      },
      async () => {
        this.subscribeToStreamCreated();
        await this.connectToSession();
      }
    );
  }

  //session 연결
  async connectToSession() {
    if (this.props.token !== undefined) {
      console.log("token received: ", this.props.token);
      this.connect(this.props.token);
    } else {
      try {
        var token = await this.getToken();
        localStorage.setItem("DJ_session", this.state.session);
        console.log(this.state.session);
        console.log(token);
        this.connect(token);
      } catch (error) {
        console.error(
          "There was an error getting the token:",
          error.code,
          error.message
        );
        if (this.props.error) {
          this.props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert("There was an error getting the token:", error.message);
      }
    }
  }

  connect(token) {
    this.state.session
      .connect(token, { clientData: this.state.myUserName })
      .then(() => {
        this.connectWebCam();
      })
      .catch((error) => {
        if (this.props.error) {
          this.props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert("There was an error connecting to the session:", error.message);
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        );
      });
  }

  //웹캠 연결
  async connectWebCam() {
    await this.OV.getUserMedia({
      audioSource: undefined,
      videoSource: undefined,
    });
    var devices = await this.OV.getDevices();
    var videoDevices = devices.filter((device) => device.kind === "videoinput");

    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: "640x480",
      frameRate: 30,
      insertMode: "APPEND",
    });

    if (this.state.session.capabilities.publish) {
      publisher.on("accessAllowed", () => {
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers();
          this.localUserAccessAllowed = true;
          if (this.props.joinSession) {
            this.props.joinSession();
          }
        });
      });
    }
    localUser.setNickname(this.state.myUserName);
    localUser.setConnectionId(this.state.session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    this.subscribeToUserChanged();
    this.subscribeToStreamDestroyed();
    this.sendSignalUserChanged({
      isScreenShareActive: localUser.isScreenShareActive(),
    });

    this.setState(
      { currentVideoDevice: videoDevices[0], localUser: localUser },
      () => {
        this.state.localUser.getStreamManager().on("streamPlaying", (e) => {
          // this.updateLayout();
          publisher.videos[0].video.parentElement.classList.remove(
            "custom-class"
          );
        });
      }
    );
  }

  //참여자가 생겼을 때 업데이트
  updateSubscribers() {
    var subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),
            isVideoActive: this.state.localUser.isVideoActive(),
            nickname: this.state.localUser.getNickname(),
            isScreenShareActive: this.state.localUser.isScreenShareActive(),
          });
        }
        // this.updateLayout();
      }
    );
  }

  //세션 떠났을 때
  leaveSession() {
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: this.state.mySessionId,
      myUserName: "OpenVidu_User" + Math.floor(Math.random() * 100),
      localUser: undefined,
    });
    if (this.props.leaveSession) {
      this.props.leaveSession();
    }
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeRoomName(e) {
    console.log("바뀐건가?");
    console.log(e.target.value);
    this.setState({
      myRoomName: e.target.value,
    });
  }

  //캠 온오프 상태 바꼈을 때
  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    this.setState({ localUser: localUser });
  }

  //마이크 온오프 상태 바꼈을 때
  micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    this.setState({ localUser: localUser });
  }

  //닉네임 바꼈을 때 (없어도 될듯)
  nicknameChanged(nickname) {
    let localUser = this.state.localUser;
    localUser.setNickname(nickname);
    this.setState({ localUser: localUser });
    this.sendSignalUserChanged({
      nickname: this.state.localUser.getNickname(),
    });
  }

  //참여자가 사라졌을 때 배열에서 사람 없애주는 기능
  deleteSubscriber(stream) {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  subscribeToStreamCreated() {
    this.state.session.on("streamCreated", (event) => {
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      // var subscribers = this.state.subscribers;
      subscriber.on("streamPlaying", (e) => {
        this.checkSomeoneShareScreen();
        subscriber.videos[0].video.parentElement.classList.remove(
          "custom-class"
        );
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType("remote");
      const nickname = event.stream.connection.data.split("%")[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      this.remotes.push(newUser);
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  subscribeToStreamDestroyed() {
    // On every Stream destroyed...
    this.state.session.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream);
      setTimeout(() => {
        this.checkSomeoneShareScreen();
      }, 20);
      event.preventDefault();
      // this.updateLayout();
    });
  }

  subscribeToUserChanged() {
    this.state.session.on("signal:userChanged", (event) => {
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          console.log("EVENTO REMOTE: ", event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
          if (data.isScreenShareActive !== undefined) {
            user.setScreenShareActive(data.isScreenShareActive);
          }
        }
      });
      this.setState(
        {
          subscribers: remoteUsers,
        },
        () => this.checkSomeoneShareScreen()
      );
    });
  }

  // updateLayout() {
  //   setTimeout(() => {
  //     this.layout.updateLayout();
  //   }, 20);
  // }

  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    this.state.session.signal(signalOptions);
  }

  //전체화면
  toggleFullscreen() {
    const { isFullscreen } = this.state;
    this.setState({
      isFullscreen: !isFullscreen,
    });
    if (!isFullscreen) {
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
    } else {
      this.setState({ isFullscreen: false });
      {
        const document = window.document;
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancleFullScreen) {
          document.mozCancleFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }
  }

  //화면공유
  screenShare() {
    const videoSource =
      navigator.userAgent.indexOf("Firefox") !== -1 ? "window" : "screen";
    const publisher = this.OV.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: localUser.isAudioActive(),
        publishVideo: localUser.isVideoActive(),
        mirror: false,
      },
      (error) => {
        if (error && error.name === "SCREEN_EXTENSION_NOT_INSTALLED") {
          this.setState({ showExtensionDialog: true });
        } else if (error && error.name === "SCREEN_SHARING_NOT_SUPPORTED") {
          alert("Your browser does not support screen sharing");
        } else if (error && error.name === "SCREEN_EXTENSION_DISABLED") {
          alert("You need to enable screen sharing extension");
        } else if (error && error.name === "SCREEN_CAPTURE_DENIED") {
          alert("You need to choose a window or application to share");
        }
      }
    );

    publisher.once("accessAllowed", () => {
      this.state.session.unpublish(localUser.getStreamManager());
      localUser.setStreamManager(publisher);
      this.state.session.publish(localUser.getStreamManager()).then(() => {
        localUser.setScreenShareActive(true);
        this.setState({ localUser: localUser }, () => {
          this.sendSignalUserChanged({
            isScreenShareActive: localUser.isScreenShareActive(),
          });
        });
      });
    });
    publisher.on("streamPlaying", () => {
      // this.updateLayout();
      publisher.videos[0].video.parentElement.classList.remove("custom-class");
    });
  }

  //화면공유 중지
  stopScreenShare() {
    this.state.session.unpublish(localUser.getStreamManager());
    this.connectWebCam();
  }

  //누가 화면공유하고있는지 확인
  checkSomeoneShareScreen() {
    let isScreenShared;
    // return true if at least one passes the test
    isScreenShared =
      this.state.subscribers.some((user) => user.isScreenShareActive()) ||
      localUser.isScreenShareActive();
    const openviduLayoutOptions = {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: isScreenShared,
      bigClass: "OV_big",
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
    };
    // this.layout.setLayoutOptions(openviduLayoutOptions);
    // this.updateLayout();
  }

  //체크박스 체크하면 화면에 띄우기
  getCheckboxValue(event) {
    console.log(event.target.checked);
    // 선택된 목록 가져오기
    const query = 'input[name="roomType"]:checked';
    const selectedEls = document.querySelectorAll(query);

    // 선택된 목록에서 value 찾기
    let result = "";
    selectedEls.forEach((el) => {
      result += "#" + el.value + " ";
    });

    document.getElementById("checkbox_result").innerText = result;
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const myRoomName = this.state.myRoomName;
    const localUser = this.state.localUser;
    var chatDisplay = { display: this.state.chatDisplay };

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        // exit="exit"
      >
        {this.state.session === undefined ? (
          <div id="joinRoom">
            <h1 id="joinRoom_h1"> 방 만들기 </h1>
            <div id="join-dialog" className="jumbotron vertical-center">
              <div id="create_thumbnail">
                <img src={thumbnail} alt="" />
              </div>
              <div id="create_room">
                <form className="form-group" onSubmit={this.joinSession}>
                  {/* <p>
                    <label id="joinRoom_label">Participant: </label>
                    <input
                      className="form-control"
                      type="text"
                      id="createRooms userName"
                      value={localStorage.getItem("1")}
                      required
                    />
                  </p> */}
                  <p>
                    {/* <label id="joinRoom_label">RoomName: </label> */}
                    <div className="form__group">
                      {/* 방송 제목은 25자로 제한을 둘것 => 코드 처리 필요 */}
                      <input
                        className="form-control form__field"
                        type="text"
                        id="createRooms roomName"
                        value={myRoomName || ""}
                        onChange={this.handleChangeRoomName}
                        required
                      />
                      <label for="name" className="form__label">
                        방송 제목을 입력하세요
                      </label>
                    </div>
                  </p>
                  <br />
                  <p>
                    <label id="joinRoom_label">RoomType: </label>
                    <input
                      type="checkbox"
                      name="roomType"
                      value="잔잔한"
                      onClick={this.getCheckboxValue}
                    />
                    <a id="checkbox_id">잔잔한</a>
                    <input
                      type="checkbox"
                      name="roomType"
                      value="신나는"
                      onClick={this.getCheckboxValue}
                    />
                    <a id="checkbox_id">신나는</a>
                    <input
                      type="checkbox"
                      name="roomType"
                      value="조용한"
                      onClick={this.getCheckboxValue}
                    />
                    <a id="checkbox_id">조용한</a>
                    <input
                      type="checkbox"
                      name="roomType"
                      value="활기찬"
                      onClick={this.getCheckboxValue}
                    />
                    <a id="checkbox_id">활기찬</a>
                    <input
                      type="checkbox"
                      name="roomType"
                      value="교육적인"
                      onClick={this.getCheckboxValue}
                    />
                    <a id="checkbox_id">교육적인</a>
                  </p>
                  <p>
                    <div id="checkbox_result"></div>
                  </p>
                  {/* <p>
                  <label>session: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="sessionId"
                    value={mySessionId || ""}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p> */}
                  <p className="text-center">
                    <GoButton
                      className="btn btn-lg btn-success"
                      name="submit"
                      type="submit"
                      value="방송 생성하기"
                      onClick={() =>
                        (document.getElementById("session-roomtype").innerText =
                          this.result)
                      }
                    />
                  </p>
                </form>
              </div>
            </div>
          </div>
        ) : null}

        {this.state.session !== undefined ? (
          <div className="container" id="container">
            {/* {this.state.nickname ===
              localStorage.getItem("1")( */}
            <div className="sidebar">
              {/* 사이드바 => 얘 제어할 수 있는건 DJ만.. 제어판같은걸 넣어볼까.. */}
              <SidebarComponent
                sessionId={mySessionId}
                myRoom={myRoomName}
                user={localUser}
                camStatusChanged={this.camStatusChanged}
                micStatusChanged={this.micStatusChanged}
                screenShare={this.screenShare}
                stopScreenShare={this.stopScreenShare}
                toggleFullscreen={this.toggleFullscreen}
                leaveSession={this.leaveSession}
                // toggleChat={this.toggleChat}
              />
            </div>
            <h2 id="session-title" style={{ color: "white" }}>
              {myRoomName + " "}
            </h2>
            <h3 id="session-nickname" style={{ color: "white" }}>
              {}
            </h3>
            <div id="session-roomtype" style={{ color: "white" }}></div>
            {/* )} */}
            <div id="layout" className="bounds">
              {/* publish => DJ */}
              <div className="publish">
                {localUser !== undefined &&
                  localUser.getStreamManager() !== undefined && (
                    <div
                      className="OT_root OT_publisher custom-class"
                      id="localUser"
                    >
                      <StreamComponent
                        user={localUser}
                        // handleNickname={this.nicknameChanged}
                      />
                    </div>
                  )}
              </div>

              {localUser !== undefined &&
                localUser.getStreamManager() !== undefined && (
                  <div
                    className="OT_root OT_publisher custom-class"
                    style={chatDisplay}
                    id="chatBox"
                  >
                    {/* 채팅 컴포넌트 => 얘도 넓이 고정 위치 고정으로 수정. */}
                    <ChatComponent
                      user={localUser}
                      chatDisplay={"display"}
                      close={this.toggleChat}
                      messageReceived={this.checkNotification}
                    />
                  </div>
                )}
            </div>
          </div>
        ) : null}
      </motion.div>
    );
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */

  //세션아이디 가져오는데, DJ는 따로 저장해놓은 다음 권한 부여해야할거같음.
  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  }
}
export default VideoRoomComponent;
