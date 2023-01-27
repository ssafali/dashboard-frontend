import "./HomePage.css";
import Dashboard from "../Dashboard/Dashboard";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import LoginPage from '../LoginPage/LoginPage'

function HomePage() {
const { isLoggedIn } = useContext(AuthContext);
  
  return (
    <div className="home-page">
      {isLoggedIn &&(<Dashboard/>)}
      {!isLoggedIn &&(<LoginPage/>)}
    </div>
  );
}

export default HomePage;
