import thumbnailImg from "../../assets/4.jpg";
import "./Schedular.scss";

const Schedular = (props) => {
  const items = props.items;
  return (
    <div className="schedules">
      <div className="timeCircle">{items.startTime}:00</div>
      <div className="schedule_img">
        <img src={thumbnailImg} alt="편성표썸네일" className="scheduleImg" />
      </div>
      <div className="schedule_desc">
        <p id="schedule_descs">{items.djName}</p>
        <p id="schedule_descs">{items.stationName}</p>
        <p id="schedule_descs">
          {items.startTime} ~ {items.endTime}
        </p>
      </div>
    </div>
  );
};

export default Schedular;
