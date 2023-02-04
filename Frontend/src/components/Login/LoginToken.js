// import axios from "axios";

// const LoginToken = () => {
//   let params = new URL(document.location.toString()).searchParams;
//   let code = params.get("code"); // 인가코드 받는 부분
//   console.log(params);
//   console.log(code);
//   let grant_type = "authorization_code";
//   let client_id = "506dd048e8b6d28b22eaf5dce091b0df";
//   let redirect_url = "http://localhost:8080/login/oauth2/code/kakao";
//   console.log(grant_type);
//   console.log(client_id);
//   console.log(redirect_url);
//   axios
//     .post(
//       //`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect_url}&code=${code}`,
//       http://localhost8080/oauth2/authorization/kakao
//       {
//         headers: {
//           "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
//         },
//       }
//     )
//     .then((res) => {
//       console.log(res);
//     });
// };
// export default LoginToken;
