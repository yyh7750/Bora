import DeleteIcon from "@mui/icons-material/Delete";
import { TableCell } from "@mui/material";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { useRecoilState } from "recoil";

import { timeTableState } from "./store";
import "./TimeTable.scss";
import { useDispatch, useSelector } from "react-redux";
import { scheduleActions } from "../../../store/schedule";
import { redirect } from "react-router-dom";

function TimeTableCell({ day, timeNum, Edit, products }) {
  // useDispatch를 통해 변경되는 값을 스토어에 전달.
  const [timeTableData, settimeTableData] = useRecoilState(timeTableState);
  // const [hover, sethover] = useState(false);
  const [hover, sethover] = useState(false);
  const dispatch = useDispatch();
  const didMount = useRef(false);
  const arr = useSelector((state) => state.schedule.arr);
  const timeData = useMemo(
    () =>
      timeTableData[day].find(
        (time) => time.start <= timeNum && timeNum < time.end
      ),
    [day, timeNum, timeTableData]
  );

  // useEffect(() => {
  //   if (didMount.current) djname = timeData.djName;
  //   else didMount.current = true;
  // }, [djname]);

  const confirmDelete = useCallback(() => {
    settimeTableData((oldtimeTableData) => {
      const newDayData = oldtimeTableData[day].filter(
        (data) => data.id !== timeData.id
      );
      return {
        ...oldtimeTableData,
        [day]: newDayData,
      };
    });
    dispatch(scheduleActions.deleteArr(timeData.djName));
  }, [day, settimeTableData, timeData?.id]);
  return (
    <>
      {timeData?.start === timeNum ? (
        <TableCell
          style={{ backgroundColor: timeData.color, position: "relative" }}
          align="center"
          rowSpan={timeData.end - timeData.start}
          onMouseOver={() => sethover(true)}
          onMouseLeave={() => sethover(false)}
        >
          {timeData.name}
          <br />
          {timeData.djName}

          {hover ? (
            <div style={{ position: "absolute", top: 5, right: 5 }}>
              <DeleteIcon
                style={{ cursor: "pointer" }}
                onClick={confirmDelete}
              />
            </div>
          ) : null}
        </TableCell>
      ) : timeData?.start < timeNum && timeNum < timeData?.end ? null : (
        <TableCell />
      )}
    </>
  );
}

export default memo(TimeTableCell);
