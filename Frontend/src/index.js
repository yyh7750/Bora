import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/index";
import { BrowserRouter } from "react-router-dom";

//리액트 버전 18이상 부터는 이렇게 써야함!
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //Provider : 해당 리액트앱은 store라는 저장소를 사용하는 앱이다.
  <Provider store={store}>
    {/**Routes, Route는 사용하기 위해서 Router로 감싸는데, 18이상은 BrowserRouter로 최상단 컴포넌트인 App을 감싼다. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//개발
