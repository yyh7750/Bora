import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../store/login";
import axios from "axios";

const UserRegist = () => {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.login.id);
  const age = useSelector((state) => state.login.age);
  const gender = useSelector((state) => state.login.gender);

  const genderHandler = () => {
    const genderNodeList = document.getElementsByName("gender");

    genderNodeList.forEach((node) => {
      if (node.checked) {
        dispatch(loginActions.setGender(node.value));
      } else {
        //유효성검사
      }
    });
  };
  const ageHandler = () => {
    const genderNodeList = document.getElementsByName("age");

    genderNodeList.forEach((node) => {
      if (node.checked) {
        dispatch(loginActions.setAge(node.value));
      } else {
        //유효성검사
      }
    });
  };

  const sendUserInfo = () => {
    const userInfo = {
      id: id,
      age: age,
      gender: gender,
    };
    console.log(userInfo);

    const API_URL = `http://localhost:9999/userApi/백엔드 컨트롤러 경로`;
    axios({
      url: API_URL,
      method: "POST",
      params: userInfo,
    })
      .then(() => {
        window.location.href = "메인페이지";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>회원가입</div>
      <label>
        <input type="radio" value="m" name="gender" />
        남성
        <input type="radio" value="f" name="gender" />
        여성
      </label>
      <label>
        <input type="radio" value="1" name="age" />
        10대 이하
        <input type="radio" value="2" name="age" />
        20대
        <input type="radio" value="3" name="age" />
        30대
        <input type="radio" value="4" name="age" />
        40대 이상
      </label>
      <button onClick={sendUserInfo}>제출</button>
    </div>
  );
};

export default UserRegist;
