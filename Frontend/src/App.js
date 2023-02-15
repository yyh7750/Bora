import { Route, Routes, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Login from "./components/Login/Login";
import UserRegist from "./components/Login/UserRegist";

import EmptyBoard from "./components/MyPage/Board/EmptyBoard";
import WriteBoard from "./components/MyPage/Board/WriteBoard";
import ViewBoard from "./components/MyPage/Board/ViewBoard";
import ModifyBoard from "./components/MyPage/Board/ModifyBoard";

import ViewBoardList from "./components/MyPage/Board/ViewBoardList";
import DetailBoard from "./components/MyPage/Board/DetailBoard";

import UserToDj from "./components/MyPage/Form/UserToDj";
import DjToDj from "./components/MyPage/Form/DjToDj";
import UserToUser from "./components/MyPage/Form/UserToUser";

import Broadcast from "./components/MyPage/Broadcast/Broadcast";
import EmptyBroadcast from "./components/MyPage/Broadcast/EmptyBroadcast";
import MakeBroadcast from "./components/MyPage/Broadcast/MakeBroadcast";
import OnAir from "./UI/OnAir/OnAir";

import MainPageForm from "./components/MainPage/MainPageForm";
import Navbar from "./UI/NavBar/NavBar";

import MySchedule from "./components/Schedule/MySchedule";
import ModifySchedule from "./components/Schedule/ModifySchedule";

import ModifyBroadcast from "./components/MyPage/Broadcast/ModifyBroadcast";
import ModifyProfile from "./components/MyPage/ModifyProfile/ModifyProfile";

import CreateRoom from "./components/Openvidu/components/CreateRoom";
import VideoRoomComponent from "./components/Openvidu/components/VideoRoomComponent";
import { Fragment } from "react";

// import VideoRoomComponent from "./components/Openvidu/components/VideoRoomComponent";
const App = () => {
  // const location = useLocation();
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/regist" element={<UserRegist />} />
        <Route path="/enterRoom" element={<VideoRoomComponent />} />
        <Route element={<Navbar />}>
          {/**redirect = Navigate */}
          <Route path="/" element={<Navigate to="/makeBroadcast" />} />
          <Route path="/main" element={<MainPageForm />} />
          {/**유저가 보는 DJ */}
          <Route element={<UserToDj />}>
            <Route element={<OnAir />}>
              <Route path="/emptyBoard" element={<EmptyBoard />} />
              <Route path="/viewBoard" element={<ViewBoard />} />
              <Route path="/writeBoard" element={<WriteBoard />} />
              <Route path="/modifyBoard" element={<ModifyBoard />} />
              <Route path="/broadcast" element={<Broadcast />} />
            </Route>
          </Route>

          {/**DJ가 보는 DJ */}
          <Route element={<DjToDj />}>
            <Route element={<OnAir />}>
              <Route path="/viewBoardList" element={<ViewBoardList />} />
              <Route path="/detailBoard" element={<DetailBoard />} />

              <Route path="/broadcast" element={<Broadcast />} />
              <Route path="/modifyBroadcast" element={<ModifyBroadcast />} />

              <Route path="/broadcasts" element={<Broadcast />} />
            </Route>
          </Route>

          {/**유저가 보는 유저 */}
          <Route element={<UserToUser />}>
            <Route element={<OnAir />}>
              <Route path="/emptyBroadcast" element={<EmptyBroadcast />} />
              <Route path="/makeBroadcast" element={<MakeBroadcast />} />
            </Route>
          </Route>

          {/* <Route path="/modifyProfile" element={<ModifyProfile />} /> */}

          {/**편성표 */}
          <Route path="/mySchedule" element={<MySchedule />} />
          <Route path="/modifySchedule" element={<ModifySchedule />} />

          {/* 오픈비두 */}

          <Route path="/createRoom" element={<CreateRoom />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default App;
