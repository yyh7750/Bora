import { Route, Routes, Navigate } from "react-router-dom";

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

import Broadcast from "./components/MyPage/Broadcast/Broadcast";

const App = () => {
  return (
    <Routes>
      {/**redirect = Navigate */}
      <Route path="/" element={<Navigate to="/userToDj" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/regist" element={<UserRegist />} />

      <Route path="/userToDj" element={<UserToDj />} />
      <Route path="/djToDj" element={<DjToDj />} />

      <Route path="/emptyBoard" element={<EmptyBoard />} />
      <Route path="/writeBoard" element={<WriteBoard />} />
      <Route path="/viewBoard" element={<ViewBoard />} />
      <Route path="/modifyBoard" element={<ModifyBoard />} />

      <Route path="/viewBoardList" element={<ViewBoardList />} />
      <Route path="/detailBoard" element={<DetailBoard />} />

      <Route path="/broadcast" element={<Broadcast />} />
    </Routes>
  );
};

export default App;
