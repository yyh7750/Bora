import "./VideoRoomComponent";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Component } from "react";
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

let arr = [];
let isHost = false;
// localStorage.setItem("djNickname", "DJ");

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = { myRoomName: "" };
    this.handleChangeRoomName = this.handleChangeRoomName.bind(this);
  }

  handleChangeRoomName(e) {
    console.log("바뀐건가?");
    console.log(e.target.value);
    this.setState({
      myRoomName: e.target.value,
    });
    localStorage.setItem("myRoomName", e.target.value);
  }

  //체크박스 체크하면 화면에 띄우기
  getCheckboxValue = (event) => {
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
    localStorage.setItem("myRoomType", arr);
  };

  isHostHandler(e) {
    isHost = true;
    localStorage.setItem("isHost", isHost);
    localStorage.setItem("nickname", "디제이");
    localStorage.setItem("djNickname", "디제이");
    // e.preventDefault();
  }

  render() {
    const myRoomName = this.state.myRoomName;
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
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
                    <label for="name" class="form__label">
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
                  <div>
                    <Link to="/enterRoom" onClick={this.isHostHandler}>
                      방송생성하기
                    </Link>
                  </div>
                </p>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
}

export default CreateRoom;
