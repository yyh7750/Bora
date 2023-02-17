import React, { useState, useEffect } from "react";

// import { useSelector, useDispatch } from "react-redux";
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { NavBarData } from "./NavBarData";
import "./NavBar.css";
import Logo from "../../assets/bora_logo.png";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import LogoutButton from "../Button/LogoutButton";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [profileImg, setProfileImg] = useState("");
  const [follow, setFollow] = useState([]);

  const userId = window.localStorage.getItem("userId");
  useEffect(() => {
    const API_URL = `http://localhost:8080/follow/dj/${userId}`;
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

    const API_URL2 = `http://localhost:8080/users/${userId}`;
    axios({
      url: API_URL2,
      method: "GET",
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.stationDTO !== null) {
          setIsbroadcast(true);
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
    window.localStorage.clear();
    window.location.href = "http://localhost:3000/login";
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

  const [isbroadcast, setIsbroadcast] = useState(false);

  const isBroadcast = () => {
    const API_URL = `http://localhost:8080/users/${userId}`;
    console.log(userId);
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        if (res.data.stationDTO !== null) {
          setIsbroadcast(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#FFF" }}>
        <div className="navbar">
          <div className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </div>
          <Link to="/main">
            <img id="mainLogo" src={Logo} alt="" />
          </Link>

          <div
            onClick={logout}
            style={{ marginLeft: "auto", marginRight: "20px" }}
          >
            <LogoutButton />
          </div>

          <div className="wrap"></div>

          {/* <div class="wrap">
            <div class="search">
              <input
                type="text"
                class="searchTerm"
                placeholder="What are you looking for?"
              />
              <button type="submit" class="searchButton">
                <FaIcons.FaSearch />
              </button>
            </div>
          </div> */}

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
                <li key={index} className={item.cName} onClick={isBroadcast}>
                  {item.title == "마이페이지" && isbroadcast && (
                    <Link to="/broadcasts">
                      {item.icon}

                      <span id="item_titl">{item.title}</span>
                    </Link>
                  )}
                  {item.title == "마이페이지" && !isbroadcast && (
                    <Link to="/emptyBroadcast">
                      {item.icon}

                      <span id="item_titl">{item.title}</span>
                    </Link>
                  )}
                  {item.title != "마이페이지" && (
                    <Link to={item.path}>
                      {item.icon}

                      <span id="item_titl">{item.title}</span>
                    </Link>
                  )}
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
      <Outlet />
    </>
  );
}
