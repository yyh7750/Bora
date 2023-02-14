import axios from "axios";
import { changeStatus } from "../../../store/host";

const createOnAirRoom = async (myRoomName, myRoomType, nickname, dispatch) => {
  try {
    const {
      data: { OnAirRoomId },
    } = await axios({
      method: "post",
      url: "https://i8b301.p.ssafy.io/api/main/broadcast",
      // url: "http://localhost:8080/api/main/broadcast",
      data: {
        title: myRoomName,
        moods: myRoomType,
        userId: nickname,
        maxViewer: 0,
        sessionId: "값",
      },
    });
    console.log(myRoomName);
    if (OnAirRoomId !== 0) {
      dispatch(changeStatus(true));
    }
    return OnAirRoomId;
  } catch (e) {
    // alertError(e);
  }
};

export default createOnAirRoom;
