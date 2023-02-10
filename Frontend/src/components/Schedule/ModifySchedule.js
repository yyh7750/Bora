import React from "react";
import "./ModifySchedule.scss";
import TimeTable from "./Modify/TimeTable";
import { RecoilRoot } from "recoil";
function ModifySchedule() {
  let subject = "My React";

  //이거 대신에 전체리스트 백엔드에서 받기
  const searchItems = [
    {
      name: "desktop",
      dj: "dj1",
      day: "mon",
      start: "10",
      end: "11",
      userId: "user1",
    },
    {
      name: "notebook",
      dj: "dj2",
      day: "tue",
      start: "11",
      end: "12",
      userId: "user2",
    },
    {
      name: "smart phone",
      dj: "dj3",
      day: "wed",
      start: "12",
      end: "13",
      userId: "user3",
    },
    {
      name: "clock",
      dj: "dj4",
      day: "thu",
      start: "13",
      end: "14",
      userId: "user4",
    },
    {
      name: "chair",
      dj: "dj5",
      day: "fri",
      start: "14",
      end: "15",
      userId: "user5",
    },
    {
      name: "iPad",
      dj: "dj6",
      day: "sat",
      start: "15",
      end: "17",
      userId: "user6",
    },
  ];

  return (
    <RecoilRoot>
      <div className="App">
        {subject}
        <TimeTable searchItems={searchItems} />
      </div>
    </RecoilRoot>
  );
}
export default ModifySchedule;
