import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { NavBarData } from "./NavBarData";
import "./NavBar.css";
import Logo from "../../assets/bora_logo.png";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const [profileImg, setProfileImg] = useState("");
  const [follow, setFollow] = useState([]);

  const showSidebar = () => setSidebar(!sidebar);
  const userId = window.localStorage.getItem("userId");
  useEffect(() => {
    const API_URL = `http://localhost:8080/api/follow/dj/${userId}`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          setFollow(follow.concat(res.data[i]));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  if (sidebar) {
    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
  } else {
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  }

  const logout = () => {
    const API_URL = `http://localhost:8080/api/log-out`;
    axios({
      url: API_URL,
      method: "POST",
      data: {},
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unLink = () => {
    window.Kakao.API.request({
      url: "/v1/user/unlink",
    })
      .then(function (res) {
        alert("success: " + JSON.stringify(res));
        deleteCookie();
      })
      .catch(function (err) {
        alert("fail: " + JSON.stringify(err));
      });
  };

  const deleteCookie = () => {
    document.cookie =
      "authorize-access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };
  return (
    <>
      <IconContext.Provider value={{ color: "#FFF" }}>
        <Helmet>
          <script
            src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
            integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
            crossorigin="anonymous"
          ></script>
          <script>Kakao.init('de1728094127555c46cc75f2be924bfa')</script>
        </Helmet>
        <div className="navbar">
          <div className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </div>
          <a href="/main">
            <img id="mainLogo" src={Logo} alt="" />
          </a>
          <button onClick={logout}>로그아웃</button>
          <button onClick={unLink}>탈퇴</button>

          <div className="wrap"></div>
          <div
            className={sidebar ? "menu-bars-blocking" : ""}
            onClick={showSidebar}
          ></div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <div className="menu-bars">
                <AiIcons.AiOutlineClose />
              </div>
            </li>

            {NavBarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}

                    <span id="item_titl">{item.title}</span>
                  </Link>
                </li>
              );
            })}
            {/**여기서 구독자 목록이 나타나야함 */}
            {follow.map((item, index) => {
              return (
                <li key={index}>
                  <span id="item_titl">{item.djNickName}</span>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={sidebar ? "blocking" : ""} onClick={showSidebar}></div>
      </IconContext.Provider>
    </>
  );
}
