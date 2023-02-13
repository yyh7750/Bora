import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link, useNavigate } from "react-router-dom";
import { NavBarData } from "./NavBarData";
import "./NavBar.css";
import Logo from "../../assets/bora_logo.png";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

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

  return (
    <>
      <IconContext.Provider value={{ color: "#FFF" }}>
        <div className="navbar">
          <div className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </div>
          <a href="/main">
            <img id="mainLogo" src={Logo} alt="" />
          </a>
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
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}

                    <span id="item_titl">{item.title}</span>
                  </Link>
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
