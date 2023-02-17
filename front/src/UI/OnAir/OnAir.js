import "./OnAir.scss";
import { Outlet } from "react-router-dom";

const OnAir = () => {
  return (
    <div className="onAir">
      <div className="onAir_container">
        <div className="neon">ONAIR</div>
        <Outlet />
      </div>
    </div>
  );
};

export default OnAir;
