import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../../../store/board";
import "./UserToDj.scss";
import profileImg from "../../../assets/mori.png";
import radio from "../../../assets/radio.png";
import Button from "../../../UI/Button/Button";
import MailBox from "../../../UI/MailBox/MailBox";

const UserToDj = () => {
  const dispatch = useDispatch();

  const toggle = useSelector((state) => state.board.toggle);

  const isLetter = useSelector((state) => state.letter.isLetter);

  const toggleHandler = () => {
    dispatch(boardActions.toggleBoard());
  };

  const subscribeHandler = () => {
    console.log("하이");
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
      },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      // exit="exit"
    >
      <fieldset className="profile">
        <img src={profileImg} alt="프로필이미지" className="circle" />
        <div className="trainerInfo">
          <div className="infoTop">
            <span className="nickname" style={{ marginRight: "20px", flex: 1 }}>
              DJ이름
            </span>
            <Button
              style={{ flex: 1 }}
              value={subscribeHandler}
              name="구독"
              margin="30px"
              fontsize="0.8em"
              width="70px"
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
              <span className="goLetter">사연신청하러가기</span>
              <span className="click">! ! Click ! !</span>
              <Link onClick={toggleHandler} to="/emptyBoard">
                <MailBox />
              </Link>
            </div>
          )}
          {toggle && isLetter && (
            <div>
              <span className="goLetter">사연신청하러가기</span>
              <span className="click">! ! Click ! !</span>
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
                  <motion.img
                    src={radio}
                    alt="방송정보 보러가기"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  />
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

export default UserToDj;
