import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../../../store/board";
import "./ViewBoardList.scss";
import gift from "../../../assets/gift.png";

const ViewBoardList = () => {
  const dispatch = useDispatch();
  const userId = "3";
  const [checkedItems, setCheckedItems] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    //1.axios요청으로 사연리스트 객체 받아오기
    const API_URL = `http://localhost:8080/api/storybox/list/${userId}`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        setPosts(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(posts);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      currentPosts.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };

  const show = useSelector((state) => state.board.toggleList);

  //useDispatch를 통해 변경되는 값을 스토어에 전달.
  const toggleBoardListHandler = () => {
    dispatch(boardActions.toggleBoardList());
  };

  //사연가리기
  const deleteBoards = () => {
    console.log(checkItems);

    //1.사연가리기 버튼 false
    //2.사연함 우측상단에 가리기 버튼 새로생성
    //3.checkbox 생성
    //4.가리기버튼누르면 모달창 생성
    //5.모달창 "예" -> axios 요청해서 새로운 사연리스트 받아서 리렌더링
    //6.모달창 "아니오" -> 모달창 false

    const API_URL = `http://localhost:8080/api/storybox/list`;
    axios({
      url: API_URL,
      method: "DELETE",
      data: checkItems,
    })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(boardActions.toggleBoardList());
  };

  return (
    <div
      className="letterListContainer"
      style={{ fontFamily: "Noto Sans Korean,Malgun Gothic,sans-serif" }}
    >
      <div className="letterListTitleNav">
        <div className="letterListTitleIcon1">
          <img src={gift} alt="선물" className="letterListTitleIcon" />
        </div>
        <div className="letterListTitle">사연함</div>
        <div className="letterListTitleIcon2">
          <img src={gift} alt="선물" className="letterListTitleIcon" />
        </div>
      </div>
      <hr className="letterListhr" />
      <div className="letterListInfo">
        <div style={{ padding: "0 12px" }}>
          <table className="board_list text-center">
            <colgroup>
              {show && <col width="*" />}
              <col width="30%" />
              <col width="*" />
              <col width="*" />
              <col width="*" />

              <col width="*" />
            </colgroup>
            <thead>
              <tr style={{ borderSpacing: "0rem" }}>
                {show && (
                  <th>
                    <input
                      type="checkbox"
                      name="select-all"
                      onChange={(e) => handleAllCheck(e.target.checked)}
                      checked={
                        checkItems.length === currentPosts.length ? true : false
                      }
                    />
                    <span>전체선택</span>
                  </th>
                )}
                <th>제목</th>
                <th>작성자</th>
                <th>읽음여부</th>
                <th>작성일시</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post) => (
                <tr key={post.viewerId}>
                  {show && (
                    <td>
                      <input
                        type="checkbox"
                        name={`select-${post.id}`}
                        onChange={(e) =>
                          handleSingleCheck(e.target.checked, post.id)
                        }
                        checked={checkItems.includes(post.id) ? true : false}
                      />
                    </td>
                  )}
                  <td className="letterListInfoTitle">
                    <Link
                      className="text-ellipsis"
                      to={`/detailBoard`}
                      state={{ storyboxId: post.id }}
                      style={{ textDecoration: "none" }}
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td>{post.viewerId}</td>
                  <td>{post.is_read ? "읽음" : "읽지않음"}</td>
                  <td style={{ textAlign: "center" }}>
                    {`${post.regDateTime[0]}-${post.regDateTime[1]}-${post.regDateTime[2]} ${post.regDateTime[3]}:${post.regDateTime[4]}:${post.regDateTime[5]}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!show && (
            <button onClick={toggleBoardListHandler} className="letterListBtn">
              사연가리기
            </button>
          )}
          {show && (
            <button onClick={deleteBoards} className="letterListBtn">
              사연가리기2
            </button>
          )}
        </div>

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          currentPage={currentPage}
          paginate={paginate}
        ></Pagination>
      </div>
    </div>
  );
};
export default ViewBoardList;
