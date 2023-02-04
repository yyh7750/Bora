import { Outlet } from "react-router-dom";
import "./UserToDj.scss";

import profileImg from "../../../assets/mori.png";
import Button from "../../../UI/Button/Button";

const UserToUser = () => {
  const profileHandeler = () => {
    console.log("프로필정보수정");
  };

  return (
    <div>
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
          </div>
          <div>
            <span className="lister">청취자</span>
            <span className="listercnt">100k</span>
          </div>
          <div>
            <p className="content">유저의 한마디입니다.</p>
          </div>
        </div>
      </fieldset>
      <hr />
      <Outlet />
    </div>
  );
};
export default UserToUser;
