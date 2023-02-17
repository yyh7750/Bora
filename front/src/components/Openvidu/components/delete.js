import axios from "axios";
import { changeStatus } from "../../../store/host";

const deleteRoom = async (
  roomId,
  roomTitle,
  maxUsers,
  roomType,
  nickname,
  dispatch
) => {
  try {
    const {
      data: { success },
    } = await axios({
      method: "delete",
      // url: "https://i8b301.p.ssafy.io:8080/api/main/broadcast/" + roomId,
      url: "http://localhost:8080/main/broadcast/",
      data: {
        title: roomTitle,
        moods: roomType,
        userId: nickname,
        maxViewer: maxUsers,
        sessionId: roomId.toString(),
      },
    });
    dispatch(changeStatus(false));
    if (success === true) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default deleteRoom;
