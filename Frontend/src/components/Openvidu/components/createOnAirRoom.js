import axios from "axios";
import { changeStatus } from "../../../store/host";

const createOnAirRoom = async (
  mainImg,
  sessionId,
  myRoomName,
  myRoomType,
  nickname,
  dispatch
) => {
  try {
    await axios({
      method: "post",
      // url: "https://i8b301.p.ssafy.io/api/main/broadcast",
      url: "http://localhost:8080/main/broadcast",
      data: {
        imgUrl: mainImg,
        title: myRoomName,
        moods: myRoomType,
        userId: nickname,
        maxViewer: 0,
        sessionId: "Session" + sessionId,
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
