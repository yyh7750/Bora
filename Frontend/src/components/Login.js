import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../store/login";
import kakaoLogin from "../assets/kakaoLogin.png";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();

  const show = useSelector((state) => state.login.showLogin);

  const toggleLoginHandler = () => {
    dispatch(loginActions.toggleLogin());
  };

  const goKakao = () => {
    axios.get("http://localhost:9999/userApi/goKakao").then((res) => {
      window.location.href = res.data;
    });
  };

  return (
    <div>
      <button onClick={toggleLoginHandler}>CLICK</button>
      {show && <img src={kakaoLogin} alt="kakaoLogin" onClick={goKakao} />}
    </div>
  );
};

export default Login;
