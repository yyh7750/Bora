import React from "react";
import logo from "../../../assets/bora_logo.png";
import styled, { keyframes } from "styled-components";
import classes from "./Loading.module.css";

const StyledLoadingWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #13161f;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 2;
  top: 0;
`;

const StyledLoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleDiv = styled.div`
  position: relative;
  z-index: 1;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  border: none;
`;

const logoMove = keyframes`
  0% {
    padding-bottom: 0px;
    transform: rotate(0deg);
  }

  33% {
    padding-bottom: 20px;
    transform: rotate(-5deg);
  }

  66% {
    padding-bottom: 10px;
    transform: rotate(5deg);
  }

  100% {
    padding-bottom: 0px;
    transform: rotate(0deg);
  }

`;

const LogoImg = styled.img`
  width: 20%;
  height: 100px;
  position: absolute;
  z-index: 0;
  padding-bottom: 0px;
  animation: ${logoMove} 1s linear infinite;
`;

const loading = keyframes`
  0% {
    content: "입장중";
    transform: translate(-45px, 0px);
  }

  33% {
    content: "입장중.";
    transform: translate(-45px, 0px);
  }

  66% {
    content: "입장중..";
    transform: translate(-45px, 0px);
  }

  100% {
    content: "입장중...";
    transform: translate(-45px, 0px);
  }
`;

const LoadingMessageDiv = styled.div`
  margin: 10px;

  ::after {
    content: "로고를 터치하여 계속하세요";
    position: absolute;
    color: #fff;
    text-align: center;
    transform: translate(-170px, 0px);
    animation: ${loading} 1s linear;
    font-size: 28px;
    font-weight: bold;
  }
`;

const Loading = (props) => {
  return (
    <div>
      <StyledLoadingWrapper>
        <StyledLoadingDiv>
          <CircleDiv onClick={props.enterOnAirRoom}></CircleDiv>
          <LogoImg src={logo} alt=""></LogoImg>
        </StyledLoadingDiv>
        <div id={classes.load}>
          <div>G</div>
          <div>N</div>
          <div>I</div>
          <div>D</div>
          <div>A</div>
          <div>O</div>
          <div>L</div>
        </div>
        <p>로고를 클릭하면 입장합니다 !</p>
      </StyledLoadingWrapper>
    </div>
  );
};

export default Loading;
