import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import thumbnail from "../../assets/wallpaper.jpg";
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./MyOnAirCarousel.scss";
// import required modules
import { Navigation, Pagination } from "swiper";

const MyOnAirCarousel = (props) => {
  const navigator = useNavigate();
  console.log(props);

  return (
    // <>
    //   <Swiper
    //     slidesPerView={2.5}
    //     spaceBetween={30}
    //     // pagination={{
    //     //   type: "progressbar",
    //     // }}
    //     navigation={false}
    //     modules={[Pagination, Navigation]}
    //     className="myOnAirSwiper"
    //   >
    //     <SwiperSlide className="MyOnAirSlide">
    //       {array.map((res, index) => {
    //         <motion.div
    //           key={index}
    //           className="swiper-slide"
    //           whileHover={{ scale: 1.05 }}
    //           transition={{ type: "spring", stiffness: 45 }}
    //           style={{ background: "rgb(255, 255, 255)" }}
    //         >
    //           {/* <div className="nowViewer">
    //           <FaIcons.FaUserAlt style={{ width: "16px" }} />
    //           100
    //         </div> */}
    //           <img
    //             className="slideThumbnail"
    //             src={res.bannerUrl}
    //             alt=""
    //             style={{ position: "fixed", top: "0", left: "0" }}
    //           />
    //           <span
    //             style={{
    //               position: "fixed",
    //               bottom: "25px",
    //               width: "100%",
    //               left: "-140px",
    //               marginRight: "10px",
    //               paddingBottom: "12px",
    //               color: "#000",
    //               fontSize: "17px",
    //             }}
    //           >
    //             PM 12:00 ~ 1:00
    //           </span>
    //           <div
    //             style={{
    //               position: "fixed",
    //               bottom: "18px",
    //               display: "flex",
    //               width: "100%",
    //               marginLeft: "30px",
    //               marginRight: "10px",
    //               marginBottom: "-2px",
    //             }}
    //           >
    //             <span
    //               style={{
    //                 textAlign: "left",
    //                 color: "#000",
    //                 fontSize: "20px",
    //                 position: "fixed",
    //                 left: "10px",
    //                 bottom: "14px",
    //               }}
    //             >
    //               <b>{res.statinName}</b>
    //             </span>
    //             <img
    //               src={res.userUrl}
    //               alt="프로필사진"
    //               style={{
    //                 position: "fixed",
    //                 width: "40px",
    //                 height: "40px",
    //                 display: "flex",
    //                 right: "20px",
    //                 bottom: "14px",
    //               }}
    //             />
    //           </div>
    //         </motion.div>;
    //       })}
    //     </SwiperSlide>
    //   </Swiper>
    // </>
    <div></div>
  );
};

export default MyOnAirCarousel;
