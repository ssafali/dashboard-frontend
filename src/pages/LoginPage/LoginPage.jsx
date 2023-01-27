import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

 const API_URL = "http://localhost:5005";
//const API_URL = 'https://jungle-green-macaw-sock.cyclic.app';


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios.post(`${API_URL}/auth/login`, requestBody)
    .then((response) => {
      //console.log("JWT token", response.data.authToken);
      
      storeToken(response.data.authToken);
      authenticateUser();
      navigate("/");
    })
    .catch((error) => {
      const errorDescription = error.response?.data.message;
      setErrorMessage(errorDescription);
    })
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input 
          className="username-input" 
          type="email" 
          name="email" 
          value={email} 
          onChange={handleEmail}
        />

        <label>Password:</label>
        <input
          className="password-input"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button className="login-button" type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="signup-container">
        <Link className="signup-button" to={"/signup"}> Sign Up</Link>
      </div>
    </div>
  );
}

export default LoginPage;
