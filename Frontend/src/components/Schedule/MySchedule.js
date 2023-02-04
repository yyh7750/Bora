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
import Schedular from "../../UI/Schedular/Schedular";

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
          <div className="schedule_img">
            <img src={thumbnialImg} alt="" />
          </div>
          <div classNmae="schedule_desc">
            <p>DJ 이름</p>
            <p>방송국명</p>
            <p>pm 2:00 ~ 3:00</p>
            <p>#음악 #춤</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Schedular />
        </SwiperSlide>
        <SwiperSlide>
          <Schedular />
        </SwiperSlide>
        <SwiperSlide>
          <Schedular />
        </SwiperSlide>
        <SwiperSlide>
          <Schedular />
        </SwiperSlide>
        <SwiperSlide>
          <Schedular />
        </SwiperSlide>
        <SwiperSlide>
          <Schedular />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default MySchedule;
