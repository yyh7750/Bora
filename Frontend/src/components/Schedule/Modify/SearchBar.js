import "./SearchBar.scss";

import { Button } from "@mui/material";
import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { timeTableState } from "./store";
import { v4 as uuidv1 } from "uuid";
import { useEffect } from "react";

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
  const [searchValue, setSearchValue] = useState("");
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

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
    return product.name.includes(searchValue);
  });
  const Submit = useCallback(
    (name, day, start, end, dj, userId) => {
      console.log(name);
      console.log(day);
      console.log(start);
      console.log(end);
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

      settimeTableData((oldTimeData) => ({
        ...oldTimeData,
        [day]: [...oldTimeData[day], data],
      }));

      handleClose();
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
                      product.name,
                      product.day,
                      product.start,
                      product.end,
                      product.dj,
                      product.userId
                    )
                  }
                >
                  <p id={`name${index}`}>{product.name}</p>
                  <p id={`day${index}`}>{product.day}</p>
                  <p id={`start${index}`}>{product.start}</p>
                  <p id={`end${index}`}>{product.end}</p>
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
