// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./MySchedule.scss";

// import required modules
import { EffectFlip, Pagination, Navigation } from "swiper";

import thumbnialImg from "../../assets/4.jpg";

const MySchedule = () => {
  return (
    <>
      <Swiper
        effect={"flip"}
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        className="myScheduleSwiper"
      >
        <SwiperSlide>
          <div className="schedules">
            <div className="schedule_img">
              <img src={thumbnialImg} alt="" />
            </div>
            <div classNmae="schedule_desc">
              <p id="schedule_descs">DJ 이름</p>
              <p id="schedule_descs">방송국명</p>
              <p id="schedule_descs">pm 2:00 ~ 3:00</p>
              <p id="schedule_descs">#음악 #춤</p>
            </div>
          </div>
          <div className="schedules">
            <div className="schedule_img">
              <img src={thumbnialImg} alt="" />
            </div>
            <div classNmae="schedule_desc">
              <p id="schedule_descs">DJ 이름</p>
              <p id="schedule_descs">방송국명</p>
              <p id="schedule_descs">pm 2:00 ~ 3:00</p>
              <p id="schedule_descs">#음악 #춤</p>
            </div>
          </div>
          <div className="schedules">
            <div className="schedule_img">
              <img src={thumbnialImg} alt="" />
            </div>
            <div classNmae="schedule_desc">
              <p id="schedule_descs">DJ 이름</p>
              <p id="schedule_descs">방송국명</p>
              <p id="schedule_descs">pm 2:00 ~ 3:00</p>
              <p id="schedule_descs">#음악 #춤</p>
            </div>
          </div>
          <div className="schedules">
            <div className="schedule_img">
              <img src={thumbnialImg} alt="" />
            </div>
            <div classNmae="schedule_desc">
              <p id="schedule_descs">DJ 이름</p>
              <p id="schedule_descs">방송국명</p>
              <p id="schedule_descs">pm 2:00 ~ 3:00</p>
              <p id="schedule_descs">#음악 #춤</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="schedules">
            <div className="schedule_img">
              <img src={thumbnialImg} alt="" />
            </div>
            <div classNmae="schedule_desc">
              <p id="schedule_descs">DJ 이름</p>
              <p id="schedule_descs">방송국명</p>
              <p id="schedule_descs">pm 2:00 ~ 3:00</p>
              <p id="schedule_descs">#음악 #춤</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="schedules">
            <div className="schedule_img">
              <img src={thumbnialImg} alt="" />
            </div>
            <div classNmae="schedule_desc">
              <p id="schedule_descs">DJ 이름</p>
              <p id="schedule_descs">방송국명</p>
              <p id="schedule_descs">pm 2:00 ~ 3:00</p>
              <p id="schedule_descs">#음악 #춤</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="schedules">
            <div className="schedule_img">
              <img src={thumbnialImg} alt="" />
            </div>
            <div classNmae="schedule_desc">
              <p id="schedule_descs">DJ 이름</p>
              <p id="schedule_descs">방송국명</p>
              <p id="schedule_descs">pm 2:00 ~ 3:00</p>
              <p id="schedule_descs">#음악 #춤</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="schedules">
            <div className="schedule_img">
              <img src={thumbnialImg} alt="" />
            </div>
            <div classNmae="schedule_desc">
              <p id="schedule_descs">DJ 이름</p>
              <p id="schedule_descs">방송국명</p>
              <p id="schedule_descs">pm 2:00 ~ 3:00</p>
              <p id="schedule_descs">#음악 #춤</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="schedules">
            <div className="schedule_img">
              <img src={thumbnialImg} alt="" />
            </div>
            <div classNmae="schedule_desc">
              <p id="schedule_descs">DJ 이름</p>
              <p id="schedule_descs">방송국명</p>
              <p id="schedule_descs">pm 2:00 ~ 3:00</p>
              <p id="schedule_descs">#음악 #춤</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="schedules">
            <div className="schedule_img">
              <img src={thumbnialImg} alt="" />
            </div>
            <div classNmae="schedule_desc">
              <p id="schedule_descs">DJ 이름</p>
              <p id="schedule_descs">방송국명</p>
              <p id="schedule_descs">pm 2:00 ~ 3:00</p>
              <p id="schedule_descs">#음악 #춤</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default MySchedule;
