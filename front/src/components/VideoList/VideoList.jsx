import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import classes from "./VideoList.modeul.scss";
import "./VideoList.scss";

const VideoList = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState();
  const [mood, setMood] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [check, setCheck] = useState(false);

  const changeCategoryHandler = () => {
    setCategory();
  };

  const changeMoodHandler = () => {
    setMood({
      ...mood,
    });
  };

  const changeSortByHandler = () => {
    setSortBy();
  };

  const checkHandler = () => {
    if (check === false) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  //-------------- 버튼 선택시 렌더링 ---------------
  useEffect(() => {
    const API_URL = `http://localhost:8080/main/live-broad/`;
    axios({
      url: API_URL,
      method: "GET",
      params: { category, mood, sortBy },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category, mood, sortBy]);
  return (
    <>
      <div class="container">
        <form>
          <label>
            <input type="radio" name="category" />
            <span>노래</span>
          </label>
          <label>
            <input type="radio" name="category" />
            <span>춤</span>
          </label>
          <label>
            <input type="radio" name="category" />
            <span>책</span>
          </label>
          <label>
            <input type="radio" name="category" />
            <span>더빙</span>
          </label>
          <label>
            <input type="radio" name="category" />
            <span>교육</span>
          </label>
          <label>
            <input type="radio" name="category" />
            <span>ASMR</span>
          </label>
          <label>
            <input type="radio" name="category" />
            <span>상담</span>
          </label>
          <label>
            <input type="radio" name="category" />
            <span>뉴스</span>
          </label>
          <label>
            <input type="radio" name="category" />
            <span>엔터</span>
          </label>
          <label>
            <input type="radio" name="category" />
            <span>인터뷰</span>
          </label>
        </form>
      </div>
      <div>
        <select>
          <option>최신순</option>
          <option>인기순</option>
          <option>팔로워순</option>
        </select>
      </div>
      <div className="container">
        <label>
          <input type="radio" value="cal" />
          <span>잔잔한</span>
        </label>
        <label>
          <input type="radio" value="exc" />
          <span>신나는</span>
        </label>
        <label>
          <input type="radio" value="qut" />
          <span>조용한</span>
        </label>
        <label>
          <input type="radio" value="liv" />
          <span>활기찬</span>
        </label>
        <label>
          <input type="radio" value="edu" />
          <span>교육적인</span>
        </label>
      </div>
    </>
  );
};

export default VideoList;
