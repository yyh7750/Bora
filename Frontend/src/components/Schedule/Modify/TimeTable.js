import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useCallback } from "react";
import TimeTableCell from "./TimeTableCell";
import { useState } from "react";
import { timeTableState } from "./store";
import { useRecoilValue } from "recoil";
import "./TimeTable.scss";
import SearchBar from "./SearchBar";
import Button from "../../../UI/Button/Button";

const hourData = Array.from({ length: 24 }, (i, j) => j);

const TimeTable = (props) => {
  const products = props.searchItems;
  const timeTableData = useRecoilValue(timeTableState);
  const [showModal, setshowModal] = useState(true);
  const [editInfo, seteditInfo] = useState({});
  const handleClose = useCallback(() => {
    setshowModal(false);
    seteditInfo({});
  }, []);

  const Edit = useCallback(
    (day, id) => {
      const { start, end, name, color } = timeTableData[day].find(
        (lectureInfo) => lectureInfo.id === id
      );
      seteditInfo({
        products: products,
        dayData: day,
        startTimeData: start,
        endTimeData: end,
        lectureNameData: name,
        colorData: color,
        idNum: id,
      });
      setshowModal(true);
    },
    [timeTableData]
  );

  const ModifyTimeTable = () => {
    const arr = [];
    const tableValue = window.localStorage.getItem("timeTable");
    console.log(tableValue);
    console.log(Object.keys(tableValue));
    console.log(Object.values(tableValue));
  };

  return (
    <>
      <SearchBar
        showModal={showModal}
        handleClose={handleClose}
        products={products}
        {...editInfo}
      />
      <TableContainer
        sx={{
          width: "80%",
          minWidth: "650px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "150px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" width={100} className="rowcell">
                <p className="rowcell">시간</p>
              </TableCell>
              <TableCell align="center" width={200} className="rowcell">
                <p className="rowcell" style={{ color: "red" }}>
                  SUN
                </p>
              </TableCell>
              <TableCell align="center" width={200} className="rowcell">
                <p className="rowcell">MON</p>
              </TableCell>
              <TableCell align="center" width={200} className="rowcell">
                <p className="rowcell">TUE</p>
              </TableCell>
              <TableCell align="center" width={200} className="rowcell">
                <p className="rowcell">WED</p>
              </TableCell>
              <TableCell align="center" width={200} className="rowcell">
                <p className="rowcell">THU</p>
              </TableCell>
              <TableCell align="center" width={200} className="rowcell">
                <p className="rowcell">FRI</p>
              </TableCell>
              <TableCell align="center" width={200} className="rowcell">
                <p className="rowcell" style={{ color: "blue" }}>
                  SAT
                </p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hourData.map((time, index) => (
              <TableRow key={index}>
                <TableCell align="center" className="rowcell">
                  <p className="rowcell">{`${time}:00-${time + 1}:00`}</p>
                </TableCell>
                <TimeTableCell day="sun" timeNum={time} Edit={Edit} />
                <TimeTableCell day="mon" timeNum={time} Edit={Edit} />
                <TimeTableCell day="tue" timeNum={time} Edit={Edit} />
                <TimeTableCell day="wed" timeNum={time} Edit={Edit} />
                <TimeTableCell day="thu" timeNum={time} Edit={Edit} />
                <TimeTableCell day="fri" timeNum={time} Edit={Edit} />
                <TimeTableCell day="sat" timeNum={time} Edit={Edit} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <Button value={ModifyTimeTable} name="수정하기"></Button>
    </>
  );
};

export default TimeTable;
