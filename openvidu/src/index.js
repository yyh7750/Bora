import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//리액트의 성능을 측정하기 위한 reportWebVitals
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import store from "./store/index";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./UI/ScrollToTop/ScrollToTop";

//리액트 버전 18이상 부터는 이렇게 써야함!
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //Provider : 해당 리액트앱은 store라는 저장소를 사용하는 앱이다.
  //Provider는 react-redux에서 리액트 앱에 스토어를 연동할 수 있게 해주는 컴포넌트.
  //Provider의 props로 사용할 스토어 지정. store={}
  //하나의 프로젝트에서는 하나의 스토어만을 가질 수 있다.
  <Provider store={store}>
    {/**Routes, Route는 사용하기 위해서 Router로 감싸는데, 18이상은 BrowserRouter로 최상단 컴포넌트인 App을 감싼다. */}
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
