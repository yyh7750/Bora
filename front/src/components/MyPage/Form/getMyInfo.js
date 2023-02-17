import axios from "axios";

const getMyInfo = async (nickname) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "http://localhost:8080/users/" + nickname,
      // url: "https://i8b301.p.ssafy.io/users/" + nickname,
    });
    // console.log(data);
    return data;
  } catch (error) {
    // alertError(error);
  }
};

export default getMyInfo;
