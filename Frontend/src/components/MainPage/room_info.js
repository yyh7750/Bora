import axios from "axios";
// import { alertError } from "../../../common/alertError";
import apiPath from "../../../common/apiPath";

const room_info = async () => {
  try {
    console.log("방정보요청");
    const {
      data: { content },
    } = await axios({
      method: "GET",
      url: apiPath.room.rooms() + "?page=0",
    });
    console.log(content);
    return content;
  } catch (error) {
    // alertError(error);
  }
};

export default room_info;
