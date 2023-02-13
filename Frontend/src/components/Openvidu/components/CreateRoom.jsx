import "./VideoRoomComponent";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GoButton from "../../../UI/Button/GoButton";
import { useDispatch } from "react-redux";
import thumbnail from "../../../assets/wallpaper.jpg";
import createOnAirRoom from "./createOnAirRoom";

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

// localStorage.setItem("djNickname", "DJ");

const CreateRoom = () => {
  const [myRoomName, setMyRoomName] = useState("");
  const [myRoomType, setMyRoomType] = useState([]);
  // const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));

  // const nickname = useSelector((state) => state.login.value.id);
  const nickname = "dj";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e, setValue) => {
    setValue(e.target.value);
  };

  const goBack = () => {
    navigate(-1);
  };

  const createRoom = async () => {
    console.log("!!");
    const roomId = await createOnAirRoom(
      myRoomName,
      myRoomType,
      nickname,
      dispatch
    );
    console.log(roomId);
    if (roomId !== false) {
      console.log("방송 생성 성공");
      navigate("/enterRoom", {
        state: {
          id: roomId,
          myRoomName: myRoomName,
          myRoomType: myRoomType,
          nickname: nickname,
        },
      });
    }
  };

  //체크박스 체크하면 화면에 띄우기
  const getCheckboxValue = (event) => {
    let arr = [];
    console.log(event.target.checked);
    // 선택된 목록 가져오기
    const query = 'input[name="roomType"]:checked';
    const selectedEls = document.querySelectorAll(query);

    // 선택된 목록에서 value 찾기
    let result = "";
    selectedEls.forEach((el) => {
      result += el.value + " ";
    });
    arr = result.split(" ");
    if (arr.length >= 2) {
      arr.pop();
    }
    setMyRoomType(arr);
  };

  const test = () => {
    console.log("왜 안눌리냐..");
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <div id="joinRoom">
        <h1 id="joinRoom_h1"> 방 만들기 </h1>
        <div id="join-dialog" className="jumbotron vertical-center">
          <div id="create_thumbnail">
            <img src={thumbnail} alt="" />
          </div>
          <div id="create_room">
            <form className="form-group">
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
                    onChange={(e) => onChange(e, setMyRoomName)}
                    required
                  />
                  <label for="name" class="form__label">
                    방송 제목을 입력하세요
                  </label>
                </div>
              </p>
            </form>
            <br />
            <p>
              <label id="joinRoom_label">RoomType: </label>
              <input
                type="checkbox"
                name="roomType"
                value="잔잔한"
                onClick={getCheckboxValue}
              />
              <a id="checkbox_id">잔잔한</a>
              <input
                type="checkbox"
                name="roomType"
                value="신나는"
                onClick={getCheckboxValue}
              />
              <a id="checkbox_id">신나는</a>
              <input
                type="checkbox"
                name="roomType"
                value="조용한"
                onClick={getCheckboxValue}
              />
              <a id="checkbox_id">조용한</a>
              <input
                type="checkbox"
                name="roomType"
                value="기쁜"
                onClick={getCheckboxValue}
              />
              <a id="checkbox_id">기쁜</a>
              <input
                type="checkbox"
                name="roomType"
                value="교육적인"
                onClick={getCheckboxValue}
              />
              <a id="checkbox_id">교육적인</a>
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
            <button value="방송 생성하기" onClick={createRoom}>
              방송 생성하기
            </button>
            {/* <button value="뒤로가기" onClick={goBack}>
              뒤로가기
            </button> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateRoom;
