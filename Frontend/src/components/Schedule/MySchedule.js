import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { motion } from "framer-motion";

import "./MySchedule.scss";

import { EffectFlip, Pagination, Navigation } from "swiper";

import Schedular from "../../UI/Schedular/Schedular";

import thumbnialImg from "../../assets/4.jpg";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const MySchedule = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
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
    </motion.div>
  );
};

export default MySchedule;
