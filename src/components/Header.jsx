import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  return (
    <header className="header">
      <img
        src={require("./img/deloitte.png")}
        alt="logo"
        className="header-image"
      />

      <img
        src={require("./img/makingimpact.png")}
        alt="logo"
        className="header-image2"
      />
    </header>
  );
};

export default Header;
