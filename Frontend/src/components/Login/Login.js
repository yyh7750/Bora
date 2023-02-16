//useSelector(): 기존 리덕스의 connect() 사용하지 않고 리덕스의 상태 조회 가능
//useDispatch(): 생성한 액션을 발생시키며, 액션생성 함수를 가져온다.
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../../store/login";
import "./Login.css";
import axios from "axios";
import kakaoLoginBtn from "../../assets/kakaoLogin.png";
import click from "../../assets/click.png";
import clickIcon from "../../assets/clickIcon.png";

const Login = () => {
  const dispatch = useDispatch();

  //useSelector로 스토어에서 현재 상태값을 가져온다.
  const show = useSelector((state) => state.login.showLogin);

  //useDispatch를 통해 변경되는 값을 스토어에 전달.
  const toggleLoginHandler = () => {
    dispatch(loginActions.toggleLogin());
  };

  const CLIENT_ID = "6994198e0a1efb1a987463241de95a65";
  const REDIRECT_URI = "http://localhost:8080/oauth2/authorization/kakao";
  let URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // const login = () => {
  //   axios.post(`/users/dummyuser`).then((res) => console.log(res));
  // };

  return (
    <div className="loginBody">
      <div className="loginBody2"></div>
      {show && <div className="loginBlackBox"></div>}
      <div>
        {!show && <img src={click} alt="클릭글씨" className="loginClick" />}
        {!show && (
          <img
            src={clickIcon}
            alt="클릭아이콘"
            className="loginClickIcon"
            onClick={toggleLoginHandler}
          />
        )}

        {show && (
          <a href={URL} style={{ marginTop: "100px" }}>
            <img
              src={kakaoLoginBtn}
              alt="카카오로그인버튼"
              className="loginKakaoBtn"
            />
          </a>
        )}
      </div>
    </div>
  );
};
export default Login;
