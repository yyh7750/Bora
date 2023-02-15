// Import Swiper React components
import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./Carousel.scss";

// Swiper에서 가져올 모듈들
import {
  EffectCoverflow,
  Mousewheel,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper";

const Carousel = () => {
  return (
    <motion.div
      intial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={4} //한 슬라이드에 보여줄 갯수
        loop={true}
        coverflowEffect={{
          rotate: 10, //회전각도
          stretch: 0,
          depth: 100, //깊이감도
          modifier: 2,
          slideShadows: true, //선택한부분 밝게, 나머지는 그늘지게
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }} //네비게이션 버튼
        mousewheel={true} //마우스 휠로 이동
        modules={[
          EffectCoverflow,
          Navigation,
          Pagination,
          Mousewheel,
          Autoplay,
        ]}
        className="carousel"
        navigation
      >
        <div className="carouselContainer">
          <SwiperSlide className="carouselSlide">
            <img
              id="carousel"
              src="https://i.pinimg.com/originals/8e/08/9b/8e089b01489631d37d7d4576616f21bb.png"
              alt=""
            />
            <h1 id="lankTitle">#1 Bora의 Purple Mood</h1>
          </SwiperSlide>
          <SwiperSlide className="carouselSlide">
            <img
              id="carousel"
              src="https://images.squarespace-cdn.com/content/v1/57825361440243db4a4b7830/1639274187311-UDFRALELKQJD1FFFXE0A/citypop-city-pop-japanesecitypop-japanese-musicTakeuchi-Mariya-city-pop-Mayonaka-no-Door-Eiichi-Ohtaki-Haruomi-Hosono-Shigeru-Suzuki-Takashi-Matsumoto-happy-end-plastic-love-marina-takeuchi-yumi-arai-sugar-Bape-Tatsuro-Yamashita"
              alt=""
            />
            <h1 id="lankTitle">#2 Bora의 Purple Mood</h1>
          </SwiperSlide>
          <SwiperSlide className="carouselSlide">
            <img
              id="carousel"
              src="https://e.snmc.io/i/600/s/d843fd5d67f410f49d60a2185562773d/9168535/%EB%A0%88%EC%9D%B8%EB%B3%B4%EC%9A%B0-%EB%85%B8%ED%8A%B8-rainbow-note-animation-Cover-Art.jpg"
              alt=""
            />
            <h1 id="lankTitle">#3 Bora의 Purple Mood</h1>
          </SwiperSlide>
          <SwiperSlide className="carouselSlide">
            <img
              id="carousel"
              src="https://i.pinimg.com/736x/55/27/77/55277769351f87ac087660fc2bb7da83.jpg"
              alt=""
            />
            <h1 id="lankTitle">#4 Bora의 Purple Mood</h1>
          </SwiperSlide>
          <SwiperSlide className="carouselSlide">
            <img
              id="carousel"
              src="https://images.squarespace-cdn.com/content/v1/5bd7707c11f7847c45b4b9dd/70ed0536-8d2e-495f-8b0f-c39aa4c5394f/image-asset.png"
              alt=""
            />
            <h1 id="lankTitle">#5 Bora의 Purple Mood</h1>
          </SwiperSlide>
          <SwiperSlide className="carouselSlide">
            <img
              id="carousel"
              src="https://images.squarespace-cdn.com/content/v1/5bd7707c11f7847c45b4b9dd/0c12af1d-5f96-4108-b2f4-dd6305673ee5/image-asset+%281%29.png"
              alt=""
            />
            <h1 id="lankTitle">#6 Bora의 Purple Mood</h1>
          </SwiperSlide>
          <SwiperSlide className="carouselSlide">
            <img
              id="carousel"
              src="https://64.media.tumblr.com/24020fac8f0ab4daed67b9424ce4ac88/798a9e4a38e0ca01-da/s1280x1920/f7785c0e03c9e988fbf6a237f791f3eacae9a3c1.png"
              alt=""
            />
            <h1 id="lankTitle">#7 Bora의 Purple Mood</h1>
          </SwiperSlide>
          <SwiperSlide className="carouselSlide">
            <img
              id="carousel"
              src="https://cdna.artstation.com/p/assets/images/images/049/534/004/large/ragnarsson-manga-inshot-20211106-013442732.jpg?1652725708"
              alt=""
            />
            <h1 id="lankTitle">#8 Bora의 Purple Mood</h1>
          </SwiperSlide>
          <SwiperSlide className="carouselSlide">
            <img
              id="carousel"
              src="https://i.etsystatic.com/10168821/r/il/840921/3185245559/il_570xN.3185245559_f35a.jpg"
              alt=""
            />
            <h1 id="lankTitle">#9 Bora의 Purple Mood</h1>
          </SwiperSlide>
          <SwiperSlide className="carouselSlide">
            <img
              id="carousel"
              src="https://image.bugsm.co.kr/album/images/500/309137/30913789.jpg"
              alt=""
            />
            <h1 id="lankTitle">#10 Bora의 Purple Mood</h1>
          </SwiperSlide>
        </div>
      </Swiper>
    </motion.div>
  );
};

export default Carousel;
