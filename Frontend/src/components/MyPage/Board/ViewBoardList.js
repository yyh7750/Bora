import { Link } from "react-router-dom";
import { useEffect } from "react";

const ViewBoardList = () => {
  const boards = useEffect(() => {
    //1.axios요청으로 사연리스트 객체 받아오기
  }, []);
  const deleteBoards = () => {
    //1.사연가리기 버튼 false
    //2.사연함 우측상단에 가리기 버튼 새로생성
    //3.checkbox 생성
    //4.가리기버튼누르면 모달창 생성
    //5.모달창 "예" -> axios 요청해서 새로운 사연리스트 받아서 리렌더링
    //6.모달창 "아니오" -> 모달창 false
  };
  console.log(boards);

  // //사연함 페이지만들기
  // const indexOfLast = currentPage * postsPerPage;
  // const indexOfFirst = indexOfLast - postsPerPage;
  // const currentPosts = (posts) => {
  //   let currentPosts = 0;
  //   currentPosts = posts.slice(indexOfFirst, indexOfLast);
  //   return currentPosts;
  // };

  return (
    <div>
      <div className="board10">
        {/**생성한boards배열.map((배열안요소(객체), index) => (
          <span key={index}>
            {객체.title식으로 접근}
            {" / "}
          </span>
        )) */}
        <div>index</div>
        <Link to="/detailBoard">
          <div>board.boardTitle</div>
        </Link>
        <div>writeState</div>
        <div>board.userId</div>
        <span>board.boardRegdate</span>
      </div>
      <div>
        <button onClick={deleteBoards}>사연가리기</button>
      </div>
    </div>
  );
};
export default ViewBoardList;
