import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "./images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChalkboardUser } from "@fortawesome/free-solid-svg-icons";

function Navbar(props) {
  const value = props.page;
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("profileImage");
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
      <nav>
        <div className="logo1">
          <img src={logo} alt="StuHub Logo" />
        </div>
        <div className="navigation">
          <div id="menu-btn">
            <div className="menu-dash" onClick={toggleMobileMenu}>
              ☰
            </div>
          </div>
          <i
            id="menu-close"
            className="fas fa-times"
            onClick={closeMobileMenu}
          ></i>
          <ul className={isMobileMenuOpen ? "active" : ""}>
            {isMobileMenuOpen && (
              <li className="close-button">
                <button onClick={closeMobileMenu}>X</button>
              </li>
            )}
            <li className={value === "home" ? "active" : ""}>
              <Link to="/">Home</Link>
            </li>
            <li className={value === "courses" ? "active" : ""}>
              <Link to="/courses">Courses</Link>
            </li>
            {authToken && (
              <>
                <li className={value === "profile" ? "active" : ""}>
                  <Link to="/profile">
                    Profile
                    <FontAwesomeIcon icon={faUser} />
                  </Link>
                </li>
                <li className={value === "learnings" ? "active" : ""}>
                  <Link to="/learnings">
                    Learnings
                    <FontAwesomeIcon icon={faChalkboardUser} />
                  </Link>
                </li>
              </>
            )}
            <li className={value === "privacy" ? "active" : ""}>
              <Link to="/privacy">Privacy</Link>
            </li>
            <li className={value === "terms" ? "active" : ""}>
              <Link to="/terms">Terms</Link>
            </li>
            <li className={value === "refunds" ? "active" : ""}>
              <Link to="/refunds">Refunds</Link>
            </li>
            <li className={value === "shipping" ? "active" : ""}>
              <Link to="/shipping">Shipping</Link>
            </li>
            <li className={value === "contact" ? "active" : ""}>
              <Link to="/contactus">Contact Us</Link>
            </li>
            {authToken ? (
              <li>
                <button onClick={handleLogOut} className="sign-out-button">
                  Sign Out
                </button>
              </li>
            ) : (
              <li>
                <button onClick={() => navigate("/login")}>Login/SignUp</button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;