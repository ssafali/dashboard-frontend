import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <header>
      <div >
        <Link to="/" className="headerLogo">Dashy</Link>
      </div>

      <nav className="navbar">
        <ul>
            {isLoggedIn && (
              <li className="navLi">
                {/* <Link  to="/pomodoro" className="navButton">Pomodoro</Link> */}
                {/* <Link  className="navButton">Profile</Link> */}
                <Link className="logout-btn" onClick={logOutUser} >Logout</Link>
              </li>
            )}
         
            {!isLoggedIn && (
              <li className="navLi">
                <Link to="/" className="navButton"> Home </Link>
                <Link to="/signup" className="navButton">Sign Up</Link>
                <Link to="/login" className="navButton">Login</Link>
              </li>
            )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
