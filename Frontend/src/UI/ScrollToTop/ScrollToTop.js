import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//화면 최상단으로 올라가는 ScrollToTop 컴포넌트
const ScrollToTop = () => {
  const { pathname } = useLocation();
  //   const urlSearch = new URLSearchParams(window.location.search);

  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default ScrollToTop;
