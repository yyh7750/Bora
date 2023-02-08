import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
// import * as IoIcons from "react-icons/io";

export const NavBarData = [
  {
    title: "홈",
    path: "/main",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "마이페이지",
    path: "/broadcast",
    icon: <FaIcons.FaUserAlt />,
    cName: "nav-text",
  },
  {
    title: "나의 편성표",
    path: "/mySchedule",
    icon: <AiIcons.AiFillCalendar />,
    cName: "nav-text",
  },
  {
    title: "방송 만들기",
    path: "/createRoom",
    icon: <AiIcons.AiFillVideoCamera />,
    cName: "nav-text",
  },
];
