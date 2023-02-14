import axios from "axios";
import { changeStatus } from "../../../store/host";

const createOnAirRoom = async (myRoomName, myRoomType, nickname, dispatch) => {
  try {
    await axios({
      method: "post",
      // url: "https://i8b301.p.ssafy.io/api/main/broadcast",
      url: "http://localhost:8080/api/main/broadcast",
      data: {
        title: myRoomName,
        moods: myRoomType,
        userId: nickname,
        maxViewer: 0,
        sessionId: "100",
      },
    }).then((res) => {
      console.log(res);
    });
    // console.log("들어왔나유");
    dispatch(changeStatus(true));
    // console.log(changeStatus(true));
    return true;
  } catch (e) {
    // alertError(e);
  }
};

export default createOnAirRoom;
