import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";
import TimeTableCell from "./TimeTableCell";
import { useState } from "react";
import { timeTableState } from "./store";
import { useRecoilValue, useRecoilState } from "recoil";
import "./TimeTable.scss";
import SearchBar from "./SearchBar";
import Button from "../../../UI/Button/Button";
import { useSelector } from "react-redux";

const hourData = Array.from({ length: 24 }, (i, j) => j);

const TimeTable = (props) => {
  const products = props.searchItems;
  const timeTableData = useRecoilValue(timeTableState);
  const [timeTableData2, settimeTableData] = useRecoilState(timeTableState);
  const [showModal, setshowModal] = useState(true);
  const [editInfo, seteditInfo] = useState({});

  //useSelector로 스토어에서 현재 상태값을 가져온다.
  const arr = useSelector((state) => state.schedule.arr);

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
    console.log(arr);
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
                <TimeTableCell
                  day="sun"
                  timeNum={time}
                  Edit={Edit}
                  products={products}
                />
                <TimeTableCell
                  day="mon"
                  timeNum={time}
                  Edit={Edit}
                  products={products}
                />
                <TimeTableCell
                  day="tue"
                  timeNum={time}
                  Edit={Edit}
                  products={products}
                />
                <TimeTableCell
                  day="wed"
                  timeNum={time}
                  Edit={Edit}
                  products={products}
                />
                <TimeTableCell
                  day="thu"
                  timeNum={time}
                  Edit={Edit}
                  products={products}
                />
                <TimeTableCell
                  day="fri"
                  timeNum={time}
                  Edit={Edit}
                  products={products}
                />
                <TimeTableCell
                  day="sat"
                  timeNum={time}
                  Edit={Edit}
                  products={products}
                />
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
