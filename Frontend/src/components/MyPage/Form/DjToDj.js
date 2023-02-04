import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../../../store/board";
import "./UserToDj.scss";

import { motion } from "framer-motion";

import profileImg from "../../../assets/profileimg.jpg";
import radio from "../../../assets/radio.png";
import Button from "../../../UI/Button/Button";
import MailBox from "../../../UI/MailBox/MailBox";

const DjToDj = () => {
  const dispatch = useDispatch();

  const toggle = useSelector((state) => state.board.toggle);

  const isLetter = useSelector((state) => state.letter.isLetter);

  const toggleHandler = () => {
    dispatch(boardActions.toggleBoard());
  };

  const profileHandeler = () => {
    console.log("프로필정보수정");
  };
  const startBroadcast = () => {
    console.log("방송시작");
  };

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
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <fieldset className="profile">
        <img src={profileImg} alt="프로필이미지" className="circle" />
        <div className="trainerInfo">
          <div className="infoTop">
            <span className="nickname" style={{ marginRight: "20px", flex: 1 }}>
              DJ이름
            </span>
            <Button
              style={{ flex: 1 }}
              value={profileHandeler}
              name="프로필 수정"
            />
            <Button
              style={{ flex: 1 }}
              value={startBroadcast}
              name="방송하기"
            />
          </div>
          <div>
            <span className="lister">청취자</span>
            <span className="listercnt">100k</span>
          </div>
          <div>
            <p className="content">유저의 한마디입니다.</p>
          </div>
        </div>
        <div>
          {toggle && !isLetter && (
            <div>
              <span className="goLetter">사연함 보러가기</span>
              <span className="click">! ! Open ! !</span>
              <Link onClick={toggleHandler} to="/emptyBoard">
                <MailBox />
              </Link>
            </div>
          )}
          {toggle && isLetter && (
            <div>
              <span className="goLetter">사연함 보러가기</span>
              <span className="click">! ! Open ! !</span>
              <Link onClick={toggleHandler} to="/viewBoard">
                <MailBox />
              </Link>
            </div>
          )}
          {!toggle && (
            <div>
              <span className="goLetter">방송정보 보러가기</span>
              <span className="click">! ! Click ! !</span>
              <Link onClick={toggleHandler} to="/broadcast">
                <div className="monitor">
                  <img src={radio} alt="방송정보 보러가기" />
                </div>
              </Link>
            </div>
          )}
        </div>
      </fieldset>
      <hr />
      <Outlet />
    </motion.div>
  );
};
export default DjToDj;
