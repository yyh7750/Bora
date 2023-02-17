import React from "react";
import "./ModifySchedule.scss";
import TimeTable from "./Modify/TimeTable";
import { RecoilRoot } from "recoil";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
function ModifySchedule() {
  const [searchItems, setSearchItems] = useState([]);
  useEffect(() => {
    const API_URL = `http://localhost:8080/users/playlist`;

    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        console.log(res.data);
        setSearchItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //이거 대신에 전체리스트 백엔드에서 받기
  // const searchItems = [
  //   {
  //     stationName: "desktop",
  //     djName: "dj1",
  //     day: "mon",
  //     startTime: "10",
  //     endTime: "11",
  //   },
  //   {
  //     stationName: "notebook",
  //     djName: "dj2",
  //     day: "tue",
  //     startTime: "11",
  //     endTime: "12",
  //   },
  //   {
  //     stationName: "smart phone",
  //     djName: "dj3",
  //     day: "wed",
  //     startTime: "12",
  //     endTime: "13",
  //   },
  //   {
  //     stationName: "clock",
  //     djName: "dj4",
  //     day: "thu",
  //     startTime: "13",
  //     endTime: "14",
  //   },
  //   {
  //     stationName: "chair",
  //     djName: "dj5",
  //     day: "fri",
  //     startTime: "14",
  //     endTime: "15",
  //   },
  //   {
  //     stationName: "iPad",
  //     djName: "dj6",
  //     day: "sat",
  //     startTime: "15",
  //     endTime: "17",
  //   },
  //   {
  //     stationName: "airPot",
  //     djName: "dj7",
  //     day: "sat",
  //     startTime: "09",
  //     endTime: "10",
  //   },
  // ];

  return (
    <RecoilRoot>
      <div className="App">
        <TimeTable searchItems={searchItems} />
      </div>
    </RecoilRoot>
  );
}
export default ModifySchedule;
