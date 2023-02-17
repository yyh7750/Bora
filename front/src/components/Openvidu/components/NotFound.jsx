// import { Typography } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo404 from "../../../assets/bora_logo.png";
import logo from "../../../assets/bora_logo.png";

const BackDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 40px 10px 10px 10px;
  text-align: center;
`;

const ContentDiv = styled.div`
  color: #0f9749;
`;

const StyledTextDiv = styled.div`
  font-size: 60px;
  font-weight: 700;
`;

const NotFound = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goMain = () => {
    navigate("/main");
  };

  return (
    <BackDiv>
      <img src={logo404} alt=""></img>
      <ContentDiv>
        <StyledTextDiv>Oops!...</StyledTextDiv>
        <div>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            {pathname}은 존재하지 않는 페이지이거나
            <br></br>
            잘못된 요청입니다.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            onClick={goMain}
            src={logo}
            alt=""
            style={{ width: "100px", height: "100px" }}
          ></img>
          <span onClick={goMain}>메인으로 이동하기</span>
        </div>
      </ContentDiv>
    </BackDiv>
  );
};

export default NotFound;
