//useSelector(): 기존 리덕스의 connect() 사용하지 않고 리덕스의 상태 조회 가능
//useDispatch(): 생성한 액션을 발생시키며, 액션생성 함수를 가져온다.
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../../store/login";

import axios from "axios";

// import kakaoLogin from "../assets/kakaoLogin.png";

const Login = () => {
  const dispatch = useDispatch();

  //useSelector로 스토어에서 현재 상태값을 가져온다.
  const show = useSelector((state) => state.login.showLogin);

  //useDispatch를 통해 변경되는 값을 스토어에 전달.
  const toggleLoginHandler = () => {
    dispatch(loginActions.toggleLogin());
  };

  const CLIENT_ID = "506dd048e8b6d28b22eaf5dce091b0df";
  const REDIRECT_URI = "http://localhost:8080/oauth2/authorization/kakao";
  let URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // const login = () => {
  //   axios.post(`/users/dummyuser`).then((res) => console.log(res));
  // };
  return (
    <div>
      <button onClick={toggleLoginHandler} style={{ marginTop: "100px" }}>
        CLICK
      </button>
      {show && (
        <a href={URL} style={{ marginTop: "100px" }}>
          로그인
        </a>
      )}
    </div>
  );
};
export default Login;
