import axios from "axios";
import { changeStatus } from "../../../store/host";

const createOnAirRoom = async (myRoomName, myRoomType, nickname, dispatch) => {
  try {
    const {
      data: { OnAirRoomId },
    } = await axios({
      method: "post",
      url: "https://i8b301.p.ssafy.io:8445/api/main/broadcast",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      data: {
        title: myRoomName,
        mood: myRoomType,
        userId: nickname,
      },
    });
    if (OnAirRoomId !== 0) {
      dispatch(changeStatus(true));
    }
    return OnAirRoomId;
  } catch (e) {
    // alertError(e);
  }
};

export default createOnAirRoom;
