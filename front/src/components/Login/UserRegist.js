import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../../store/login";
import axios from "axios";
import { useEffect } from "react";
import "./UserRegist.scss";

const UserRegist = () => {
  useEffect(() => {
    const urlSearch = new URLSearchParams(window.location.search);
    const accessToken = urlSearch.get("token");
    window.localStorage.setItem("token", accessToken);
    const userId = urlSearch.get("userId");
    window.localStorage.setItem("userId", userId);
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

  const checkNickname = () => {
    const nickname = document.getElementById("inputNickname").value;
    const API_URL = `http://localhost:8080/sign-up/${nickname}`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        if (res.data) {
          document.getElementById("resTitle").innerHTML =
            "사용 가능한 닉네임입니다.";
          dispatch(loginActions.checkInfo(true));
        } else {
          document.getElementById("resTitle").innerHTML =
            "이미 사용중인 닉네임입니다.";
          dispatch(loginActions.checkInfo(false));
        }
      })
      .catch((err) => {
        console.log(err);
      });

    localStorage.setItem(
      "userNickname",
      document.getElementById("inputNickname").value
    );
  };
  const check = useSelector((state) => state.broadcast.isVaild);

  const sendUserInfo = () => {
    const nickname = document.getElementById("inputNickname").value;
    if ((age === 0) | (gender.length == 0) | (nickname.length == 0) | !check) {
      document.getElementById("resModify").innerHTML =
        "회원정보를 다시 입력해주세요.";
      document.getElementById("resModify").style.color = "red";

      const API_URL = `http://localhost:8080/sign-up`;
      const userId = window.localStorage.getItem("userId");
      const DATA = {
        userId: userId,
        nickName: nickname,
        age: age,
        gender: gender,
      };
      console.log(DATA);

      axios({
        url: API_URL,
        method: "PATCH",
        data: DATA,
      })
        .then((res) => {
          console.log(res);
          window.localStorage.setItem("userId", res.data.id);
          window.location.href = "http://localhost:3000/main";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="registBody">
      <div className="registBody2"></div>
      <div className="registBlackBox"></div>
      <div className="registForm">
        <div className="registTitle">회원가입</div>

        <label>
          <div>
            닉네임{" "}
            <input type="text" id="inputNickname" className="registInput" />
            <button onClick={checkNickname} className="registcheckBtn">
              중복체크
            </button>
          </div>
          <p id="resTitle"></p>
        </label>
        <label style={{ verticalAlign: "-1px" }}>
          성별
          <div style={{ marginBottom: "10px", marginTop: "5px" }}>
            <input
              type="radio"
              value="m"
              name="gender"
              onClick={genderHandler}
            />
            남성
            <input
              type="radio"
              value="f"
              name="gender"
              onClick={genderHandler}
            />
            여성
          </div>
        </label>

        <label>
          나이
          <br />
          <div style={{ marginBottom: "10px", marginTop: "5px" }}>
            <input type="radio" value="1" name="age" onClick={ageHandler} />
            10대 이하
            <input type="radio" value="2" name="age" onClick={ageHandler} />
            20대
            <input type="radio" value="3" name="age" onClick={ageHandler} />
            30대
            <input type="radio" value="4" name="age" onClick={ageHandler} />
            40대 이상
          </div>
        </label>
        <br />
        <button onClick={sendUserInfo} className="registBtn">
          제출
        </button>
        <p id="resModify"></p>
      </div>
    </div>
  );
};

export default UserRegist;
