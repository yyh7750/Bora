
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../../store/login";
// import kakaoLogin from "../assets/kakaoLogin.png";

const Login = () => {
  const dispatch = useDispatch();

  const show = useSelector((state) => state.login.showLogin);

  const toggleLoginHandler = () => {
    dispatch(loginActions.toggleLogin());
  };


  const CLIENT_ID = "506dd048e8b6d28b22eaf5dce091b0df";
  const REDIRECT_URI = "http://localhost:8080/oauth2/authorization/kakao";
  let URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div>
      <button onClick={toggleLoginHandler}>CLICK</button>
      {show && <a href={URL}>로그인</a>}
    </div>
  );
};
export default Login;
