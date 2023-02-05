import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { boardActions } from "../../../store/board";
const WriteBoard = () => {
  const dispatch = useDispatch();

  //useEffect(() => {...올라갈때 로직}, [...감시할 state array]};

  const countText = () => {
    var content = document.getElementById("content").value;
    if (content.length > 500) {
      content = content.substring(0, 500);
      document.getElementById("content").value = content;
    }
    document.getElementById("count").innerHTML = content.length + "/500";
  };

  const sendMessage = () => {
    const message = {
      userId: 0,
      boardTitle: document.getElementById("title").value,
      boardContent: document.getElementById("content").value,
    };
    console.log(message);
    dispatch(boardActions.writeBoard(message));
  };

  return (
    <div>
      <fieldset>
        <legend>사연을 보내주세요♥</legend>
        <input type="text" id="title" />
        <br />
        <textarea
          id="content"
          onKeyUp={countText}
          maxLength="500"
          cols="70"
          rows="20"
        ></textarea>
        <br />
        <span id="count">0/500</span>
        <Link to="/viewBoard">
          <button onClick={sendMessage}>보내기</button>
        </Link>
      </fieldset>
    </div>
  );
};
export default WriteBoard;
