import React, { useState } from "react";
import "./Navbar.css";
import { MenuList } from "./MenuList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/logo.png";
import logo2 from "../../assets/images/logo2.png";
import logo3 from "../../assets/images/logo3.png";
const Navbar = () => {
  const [navBg, setNavBg] = useState("#fff");
  const location = useLocation();
  React.useEffect(() => {
    if (window.location.pathname === "/") {
      setNavBg("#fff");
    } else {
      setNavBg("#ECF6FF");
    }
  }, [location]);
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  // const { currentUser } = useAuth();
  // const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      // await logout();
      localStorage.removeItem("token");
      alert("Succesfully logged out");
    } catch {
      alert("Not logged out");
    }
  };

  return (
    <nav style={{ backgroundColor: navBg }} className="NavbarItems">
      <div className="logo">
        <Link to="/">
          <img src={logo2} alt="logo" className="logoImage" />
        </Link>
      </div>
      <div className="menu_icon" onClick={handleClick}>
        <FontAwesomeIcon icon={clicked ? faTimes : faBars} />
      </div>
      <ul className={clicked ? `nav_menu active` : `nav_menu`}>
        <div className="menu_box">
          {MenuList.map((item, index) => {
            return (
              <li key={index}>
                <Link className="nav_link navigator" to={item.url}>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </div>
        <div className="auth_btn">
          {/* {currentUser.user_email ? (
            <button className="signin_link">{currentUser.user_name}</button>
          ) : (
            <Link to="/login">
              <button className="signin_link">Sign In</button>
            </Link>
          )} */}
        </div>
        <div className="auth_btn">
          {/* {currentUser.user_name ? (
            <button className="signout_link" onClick={handleLogout}>
              Logout
            </button>
          ) : null} */}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
