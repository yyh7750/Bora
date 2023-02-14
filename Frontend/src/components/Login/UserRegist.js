import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../../store/login";
import axios from "axios";
import { useEffect } from "react";

const UserRegist = () => {
  useEffect(() => {
    const urlSearch = new URLSearchParams(window.location.search);
    const accessToken = urlSearch.get("atk");
    window.localStorage.setItem("atk", accessToken);
  }, []);
  // axios.get(`/users/dummyuser`).then((res) => console.log(res));

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
        //유효성검사(귀찮아서 안함)
      }
    });
  };
  const ageHandler = () => {
    const genderNodeList = document.getElementsByName("age");

    genderNodeList.forEach((node) => {
      if (node.checked) {
        dispatch(loginActions.setAge(parseInt(node.value)));
      } else {
        //유효성검사(귀찮아서 안함)
      }
    });
  };

  const sendUserInfo = () => {
    // const userInfo = {
    //   id: id,
    //   age: age,
    //   gender: gender,
    // };
    // console.log(userInfo);

    const API_URL = `http://localhost:8080/api/sign-up`;
    axios({
      url: API_URL,
      method: "POST",
      data: {
        userId: document.getElementById("inputEmail").value,
        nickName: document.getElementById("inputNickname").value,
        gender: gender,
        age: age,
      },
    })
      .then((res) => {
        console.log(res);
        window.localStorage.setItem("userId", res.data.id);
        window.location.href = "http://localhost:3000/main";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkNickname = () => {
    const nickname = document.getElementById("inputNickname").value;
    const API_URL = `http://localhost:8080/api/sign-up/${nickname}`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        if (res.data) {
          document.getElementById("resTitle").innerHTML =
            "사용 가능한 닉네임입니다.";
        } else {
          document.getElementById("resTitle").innerHTML =
            "이미 사용중인 닉네임입니다.";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div style={{ marginBottom: "100px" }}>회원가입</div>
      <label>
        이메일
        <input type="text" id="inputEmail" />
      </label>
      <br />
      <label>
        닉네임 <input type="text" id="inputNickname" />
        <button onClick={checkNickname}>중복체크</button>
        <p id="resTitle"></p>
      </label>
      <br />
      <div>회원가입</div>
      <label>
        <input type="radio" value="m" name="gender" onClick={genderHandler} />
        남성
        <input type="radio" value="f" name="gender" onClick={genderHandler} />
        여성
      </label>

      <br />

      <label>
        <input type="radio" value="1" name="age" onClick={ageHandler} />
        10대 이하
        <input type="radio" value="2" name="age" onClick={ageHandler} />
        20대
        <input type="radio" value="3" name="age" onClick={ageHandler} />
        30대
        <input type="radio" value="4" name="age" onClick={ageHandler} />
        40대 이상
      </label>
      <button onClick={sendUserInfo}>제출</button>
    </div>
  );
};

export default UserRegist;
