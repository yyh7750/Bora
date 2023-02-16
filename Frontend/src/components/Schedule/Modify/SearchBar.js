import "./SearchBar.scss";

import { Button } from "@mui/material";
import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { timeTableState } from "./store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scheduleActions } from "../../../store/schedule";

const checkOverLap = (A, B) =>
  B.start < A.start ? B.end > A.start : B.start < A.end;
const SearchBar = ({
  showModal,
  handleClose,
  products,
  dayData = "fri",
  startTimeData = 0,
  endTimeData = 1,
  lectureNameData = "hello",
  colorData = "#FFFFFF",
  // idNum,
}) => {
  const userId = localStorage.getItem("userId");
  const [searchValue, setSearchValue] = useState("");
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };
  const arr = [];
  const arr2 = useSelector((state) => state.schedule.arr);
  const [playlist, setPlaylist] = useState([]);
  const {
    formState: {},
    reset,
  } = useForm();
  const [timeTableData, settimeTableData] = useRecoilState(timeTableState);
  useEffect(() => {
    if (showModal) {
      reset({
        products: products,
        lectureNameData: lectureNameData,
        day: dayData,
        startTime: startTimeData,
        endTime: endTimeData,
        lectureColor: colorData,
      });
    }
  }, [
    colorData,
    dayData,
    endTimeData,
    lectureNameData,
    reset,
    showModal,
    startTimeData,
  ]);

  const filteredProducts = products.filter((product) => {
    return product.stationName.includes(searchValue);
  });
  const dispatch = useDispatch();
  const Submit = useCallback(
    (name, day, start, end, dj, userId) => {
      let valid = true;

      for (let index = 0; index < timeTableData[day].length; index++) {
        if (
          checkOverLap(timeTableData[day][index], {
            start: parseInt(start),
            end: parseInt(end),
          })
        ) {
          valid = false;
          break;
        }
      }

      if (!valid) {
        alert("해당 시간대에 이미 강의가 있어. 다시 확인해봐 ");
        return;
      }

      const data = {
        start: parseInt(start),
        end: parseInt(end),
        name: name,
        color: "#d8a3ff",
        userId: userId,
        djName: dj,
      };

      const returnData = {
        start: parseInt(start),
        end: parseInt(end),
        name: name,
        day: day,
        userId: userId,
        djName: dj,
      };
      setPlaylist(playlist.concat(returnData));
      settimeTableData((oldTimeData) => ({
        ...oldTimeData,
        [day]: [...oldTimeData[day], data],
      }));
      handleClose();
      window.location.reload();
      console.log(playlist);
      dispatch(scheduleActions.setArr(playlist));
    },
    [handleClose, settimeTableData, timeTableData]
  );
  return (
    <div className="searchBar">
      <input type="text" value={searchValue} onChange={handleInputChange} />
      <ul>
        {filteredProducts.map((product, index) => {
          return (
            <li key={product.name}>
              <form>
                <Button
                  type="button"
                  onClick={() =>
                    Submit(
                      product.stationName,
                      product.day,
                      product.startTime,
                      product.endTime,
                      product.djName,
                      userId
                    )
                  }
                >
                  방송국명 : <p id={`name${index}`}>{product.stationName}</p>
                  <br />
                  요일 : <p id={`day${index}`}>{product.day}</p>
                  <br />
                  시간 : <p id={`start${index}`}>{product.startTime}</p> ~
                  <p id={`end${index}`}>{product.endTime}</p>
                </Button>
              </form>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchBar;
