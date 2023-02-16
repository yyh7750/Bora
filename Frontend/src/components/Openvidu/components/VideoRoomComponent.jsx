import axios from "axios";
// import {connect} from "react-redux";
import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { Person } from "@mui/icons-material";
import { OpenVidu } from "openvidu-browser";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import ChattingForm from "./chat/ChattingForm";
import ChattingList from "./chat/ChattingList";
import deleteRoom from "./delete";
import UserVideoComponent from "./UserVideoComponent";
import NotFound from "./NotFound";
// import OpenViduLayout from "../layout/openvidu-layout";
// import UserModel from "../models/user-model";
import getMyInfo from "../../MyPage/Form/getMyInfo";
import basicImg from "../../../assets/wallpaper.jpg";
import Loading from "./Loading";
import { useDispatch } from "react-redux";
import { changeStatus } from "../../../store/host";
import Button from "../../../UI/Button/Button";
import heart from "../../../assets/yesheart.png";

const ContainerDiv = styled.div`
  height: 100vh;
`;

const SessionHeaderDiv1 = styled.div`
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  position: absolute;
  top: 0;
`;

const SessionHeaderDiv2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
  padding: 5px;
`;

const WhiteDiv = styled.div`
  color: white;
`;

const ProfileDiv = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 70%;
  overflow: hidden;
  border: 1px solid rgba(33, 33, 33);
  margin: 5px;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const AuctionRoomTitle = styled.div`
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin: 5px;
`;

const MessageDiv = styled.div`
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
`;

const MainVideoDiv = styled.div`
  height: 100%;
  position: relative;
  top: 0px;
  left: 0px;
  margin-top: -60px;
`;

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

// var localUser = new UserModel();
// const OPENVIDU_SERVER_URL = "http://localhost:5000/";
const OPENVIDU_SERVER_URL = "https://i8b301.p.ssafy.io:8445";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

// const users = { user: "1", value: "디제이" };
// const participant = { user: "2", value: "Participant" };
// localStorage.setItem("djNickname", "DJ");
// localStorage.setItem(participant.user, participant.value);

const VideoRoomComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); //이전 페이지에서 데이터 받아올 때 사용
  const roomId = location.state !== null ? location.state.id : null;
  const roomTitle = location.state !== null ? location.state.myRoomName : null;
  const roomType = location.state !== null ? location.state.myRoomType : null;
  const nickname = location.state !== null ? location.state.nickname : null;
  const isHost = useSelector((state) => state.host.value.host); // console.log(useSelector((state) => state.hostStatus.value.host));

  const [mySessionId, setMySessionId] = useState("SessionA");
  const [myUserName, setMyUserName] = useState(
    "Participant" + Math.floor(Math.random() * 100)
  );
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined); // 페이지의 메인 비디오 화면(퍼블리셔 또는 참가자의 화면 중 하나)
  const [publisher, setPublisher] = useState(undefined); // 자기 자신의 캠
  const [subscribers, setSubscribers] = useState([]); // 다른 유저의 스트림 정보를 저장할 배열
  const [messageList, setMessageList] = useState([]); // 메세지 정보를 담을 배열
  const [totalUsers, setTotalUsers] = useState(0); // 총 유저수
  const [maxUsers, setMaxUsers] = useState(0); // 방송에 들어온 참여자 max값
  const [sumHeart, setSumHeart] = useState(0); // 방송 좋아요 수
  const [chatDisplay, setChatDisplay] = useState(true); // 채팅창 보이기(초깃값: true)
  const [profileImg, setProfileImg] = useState(basicImg);
  const [hostName, setHostName] = useState(undefined);

  let OV = undefined;

  // 토큰 받아오기(KMS로 직접 쏨)
  const getToken = useCallback(() => {
    // console.log(mySessionId);
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  }, [mySessionId]);

  // 세션 생성(KMS로 직접 쏨)
  const createSession = (sessionId) => {
    console.log(sessionId);
    return new Promise((resolve, reject) => {
      let data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + "/openvidu/accept-certificate"
              ); // window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
            }
          }
        });
    });
  };

  // 토큰 생성(KMS로 직접 쏨)
  const createToken = (sessionId) => {
    let myRole = isHost ? "PUBLISHER" : "SUBSCRIBER";
    console.log(myRole);
    return new Promise((resolve, reject) => {
      const data = { role: myRole }; // 여기에 인자를 뭐를 넣냐에 따라 오픈비두 서버에 요청하는 데이터가 달라짐
      axios
        .post(
          OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  // 세션 아이디 설정
  useEffect(() => {
    setMySessionId(`Session${roomId}`);
  }, []);

  // 세션에 참여하기
  const joinSession = () => {
    OV = new OpenVidu(); // --- 1) 오픈비두 오브젝트 생성 ---

    let mySession = OV.initSession(); // --- 2) 세션을 시작 --

    setSession(mySession);

    mySession.on("streamCreated", (event) => {
      // 스트림이 생길 때마다
      const subscriber = mySession.subscribe(event.stream, "SUBSCRIBER"); // 퍼블리셔를 구독자로 넣어줌
      setSubscribers(subscriber);
      console.log(subscriber);
    });

    mySession.on("streamDestroyed", (event) => {
      // 스트림을 종료할 때마다
      deleteSubscriber(event.stream.streamManager); // 참가자 배열에서 스트림 객체를 제거함
    });

    mySession.on("exception", (exception) => {
      // 예외 처리
      console.warn(exception);
    });

    mySession.on("connectionCreated", ({ stream }) => {
      // 유저가 접속할 때마다 인원수를 += 1
      setTotalUsers((prevTotalUsers) => {
        return prevTotalUsers + 1;
      });
      if (maxUsers < totalUsers) {
        setMaxUsers(totalUsers);
      }
    });

    mySession.on("connectionDestroyed", ({ stream }) => {
      // 유저가 접속을 끊을 때마다 -= 1
      setTotalUsers((prevTotalUsers) => {
        return prevTotalUsers - 1;
      });
    });

    mySession.on("signal:chat", (event) => {
      // 채팅 신호 수신하여 메세지 리스트 업데이트
      setMessageList((prevMessageList) => {
        return [...prevMessageList, event.data];
      });
    });

    mySession.on("signal:onair", (event) => {
      // "onair"이라는 시그널을 받음(방송 시작)
      setChatDisplay(false);
    });

    // --- 4) 유효한 토큰으로 세션에 접속하기 ---
    getToken().then((token) => {
      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          let devices = await OV.getDevices();
          let videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          // --- 5) Get your own camera stream ---(퍼블리셔)
          let publisher = OV.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: "1280x720", // The resolution of your video '450x720'
            frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: true, // Whether to mirror your local video or not
          });

          mySession.publish(publisher); // --- 6) 자신의 화면을 송출 ---
          setPublisher(publisher); // 퍼블리셔(스트림 객체)를 담음
          setMainStreamManager(publisher); // 퍼블리셔(스트림 객체)를 담음
        })
        .catch((error) => {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    });
  };

  //하트 수 증가
  const heartCnt = () => {
    setSumHeart(sumHeart + 1);

    const element = document.getElementById("heart");
    element.classList.remove("heart");
    element.offsetWidth = element.offsetWidth;
    element.classList.add("heart");
  };

  // 방 삭제 요청 api
  const deleteRoomRequest = async () => {
    if (isHost) {
      dispatch(changeStatus(false));
      await deleteRoom(
        roomId,
        roomTitle,
        maxUsers,
        roomType,
        nickname,
        dispatch
      );
      const reqeustResponse = true;
      // setIsHost(false) // isHost를 false로 설정함
      if (reqeustResponse) {
        console.log("Room Deleted Successfully!");
      } else {
        console.log("Room Deleted Failed!");
      }
      navigate("/broadcast");
    }
  };

  // 세선 떠나기 --- 7) disconnect함수를 호출하여 세션을 떠남
  const leaveSession = () => {
    const mySession = session;
    if (mySession) {
      mySession.disconnect();
      navigate("/"); // 메인페이지로 이동
    }
    // 속성을 초기화함(필요한 속성은 초기화하면 안 됨)
    OV = null;
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    setMyUserName("Participant" + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
    setMessageList([]);
    // setToggleStart(false);
    setChatDisplay(true);
    setTotalUsers((prevTotalUsers) => {
      return 0;
    });
    // setItemIndex(0); // 0으로 바꿔줘야 방을 파고 다시 들어왔을 때 목록을 0부터 시작할 수 있음
    // setSeconds(0); // 시간 초를 0초로 초기화
    deleteRoomRequest(); // 방 삭제를 요청함
  };

  // 호스트(방 생성자) 여부에 따른 isHost를 토글링함(created()) + 호스트가 아닐 경우 유저의 이름을 바꿈
  useEffect(() => {
    // setIsHost(localStorage.getItem("host") ? true : false);
    setMyUserName(localStorage.getItem("myNickname"));
  }, []);

  useEffect(() => {
    const onbeforeunload = (event) => {
      leaveSession();
    };
    window.addEventListener("beforeunload", onbeforeunload); // componentDidMount
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, [leaveSession]);

  // 참가자를 배열에서 제거함
  const deleteSubscriber = useCallback(
    (streamManager) => {
      let tmp_subscribers = subscribers;
      let index = tmp_subscribers.indexOf(streamManager, 0);
      if (index > -1) {
        tmp_subscribers.splice(index, 1);
        setSubscribers(tmp_subscribers); // 이거 안 되면 구조분해할당으로 업데이트 할 것
      }
    },
    [subscribers]
  );

  // 메세지 보내기(Sender of the message (after 'session.connect'))
  const sendMsg = (msg, currentSession) => {
    // this.state.session으로는 자식이 인식할 수 없으므로 currentSession을 자식에게 props로 넘겨주고 다시 받음
    currentSession
      .signal({
        data: msg, // .signal의 data는 문자열만 넘겨야한다
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "chat", // The type of message (optional)
      })
      .then(() => {
        console.log("Message successfully sent");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getUserInfo = async () => {
    const res1 = await getMyInfo(nickname);
    // const ownerPicturePath = res1.picturePath;
    const ownerName = res1.name;
    // setProfileImg(ownerPicturePath);
    setHostName(ownerName);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // 로딩 페이지를 통한 방 입장
  const enterOnAirRoom = () => {
    joinSession();
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {session === undefined && roomId !== null && (
        <Loading enterOnAirRoom={enterOnAirRoom}></Loading>
      )}
      {roomId == null && <NotFound></NotFound>}
      {session !== undefined ? (
        <ContainerDiv>
          {mainStreamManager !== undefined ? (
            <MainVideoDiv>
              {isHost && (
                <UserVideoComponent
                  streamManager={publisher}
                ></UserVideoComponent>
              )}
              {!isHost && (
                <UserVideoComponent
                  streamManager={publisher}
                ></UserVideoComponent>
              )}
            </MainVideoDiv>
          ) : null}
          <SessionHeaderDiv1>
            <SessionHeaderDiv2>
              <div style={{ display: "flex", alignItems: "center" }}>
                <ProfileDiv>
                  <Img src={profileImg} alt="/" />
                </ProfileDiv>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "left",
                  }}
                >
                  <AuctionRoomTitle>{roomTitle}</AuctionRoomTitle>
                  {isHost && (
                    <WhiteDiv style={{ margin: "5px" }}>{nickname}</WhiteDiv>
                  )}
                </div>
                <Button value={deleteRoomRequest} name="방송종료"></Button>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "5px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "base",
                      alignItems: "center",
                      marginRight: "5px",
                    }}
                  >
                    {/* <Person style={{ color: "red" }} /> */}
                    <span style={{ color: "white" }}>{totalUsers}</span>
                  </div>
                  <Button name="LIVE"></Button>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "base",
                      alignItems: "center",
                      marginRight: "5px",
                    }}
                  >
                    {/* <Person style={{ color: "red" }} /> */}
                    <span style={{ color: "white" }}>{sumHeart}</span>
                  </div>
                  <motion.img
                    whileHover={{ scale: 1.12 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                    src={heart}
                    alt="총 좋아요 수"
                    style={{ width: "40px", height: "40px", cursor: "pointer" }}
                    onClick={heartCnt}
                  />
                </div>
              </div>
            </SessionHeaderDiv2>
          </SessionHeaderDiv1>
          <div className="heart_container">
            <div className="heart">
              <svg
                className="heart_svg"
                width="80"
                height="80"
                viewBox="0 0 800 700"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m263.42 235.15c-66.24 0-120 53.76-120 120 0 134.76 135.93 170.09 228.56 303.31 87.574-132.4 228.56-172.86 228.56-303.31 0-66.24-53.76-120-120-120-48.048 0-89.402 28.37-108.56 69.188-19.161-40.817-60.514-69.188-108.56-69.188z" />
              </svg>
            </div>
            <div className="heart">
              <svg
                className="heart_svg"
                width="70"
                height="70"
                viewBox="0 0 800 700"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m263.42 235.15c-66.24 0-120 53.76-120 120 0 134.76 135.93 170.09 228.56 303.31 87.574-132.4 228.56-172.86 228.56-303.31 0-66.24-53.76-120-120-120-48.048 0-89.402 28.37-108.56 69.188-19.161-40.817-60.514-69.188-108.56-69.188z" />
              </svg>
            </div>
            <div className="heart">
              <svg
                className="heart_svg"
                width="68"
                height="68"
                viewBox="0 0 800 700"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m263.42 235.15c-66.24 0-120 53.76-120 120 0 134.76 135.93 170.09 228.56 303.31 87.574-132.4 228.56-172.86 228.56-303.31 0-66.24-53.76-120-120-120-48.048 0-89.402 28.37-108.56 69.188-19.161-40.817-60.514-69.188-108.56-69.188z" />
              </svg>
            </div>
          </div>
          {chatDisplay && (
            <MessageDiv>
              <ChattingList messageList={messageList}></ChattingList>
              <ChattingForm
                myUserName={myUserName}
                onMessage={sendMsg}
                currentSession={session}
              ></ChattingForm>
            </MessageDiv>
          )}
        </ContainerDiv>
      ) : null}
    </motion.div>
  );
};

export default VideoRoomComponent;
