import axios from "axios";
// import { alertError } from "../../../common/alertError";
// import apiPath from "../../../common/apiPath";

const room_info = async (userId) => {
  try {
    console.log("방정보요청");
    const {
      data: { content },
    } = await axios({
      method: "GET",
      // url: "https://i8b301.p.ssafy.io:8445/follow-broad/" + { userId },
      url: "http://localhost:8080/api/follow-broad/" + { userId },
    });
    console.log(content);
    return content;
  } catch (error) {
    // alertError(error);
  }
};

export default room_info;
