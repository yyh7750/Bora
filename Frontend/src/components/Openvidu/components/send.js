import axios from "axios";
// import apiPath from "../../common/apiPath";

const send = async (payload) => {
  try {
    console.log(payload);
    const {
      data: { success },
    } = await axios({
      method: "post",
      // url: "https://i8b301.p.ssafy.io/api/main/broadcast/" + createId,
      url: "http://localhost:8080/api/main/broadcast/" + createId,
      // 줘야하는 데이터를 전달
      data: {
        ...payload,
      },
    });
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

export default send;
