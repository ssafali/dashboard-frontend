import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Location from "../../components/Location Search/Location";

const API_URL = "http://localhost:5005";
//const API_URL = 'https://jungle-green-macaw-sock.cyclic.app';

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handlePasswordConfirm = (e) => setConfirmPass(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleOnSearchChange = (e) => {
    setLocation(e.label);
    console.log(e);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPass) {
      // Create an object representing the request body
      const requestBody = { email, password, name, location };

      // Make an axios request to the API
      // If POST request is successful redirect to login page
      // If the request resolves with an error, set the error message in the state
      axios
        .post(`${API_URL}/auth/signup`, requestBody)
        .then((response) => {
          navigate("/login");
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        });
    } else {
      setErrorMessage("Please enter matching passwords")
    }
  };

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Username:</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPass"
          value={confirmPass}
          onChange={handlePasswordConfirm}
        />
        <label>Location:</label>
        <Location
          className="location"
          value={location}
          onSearchChange={handleOnSearchChange}
        />
        <button className="signup-btn" type="submit" value="signup">
          Sign Up
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p className="login">Already have account?</p>
      <Link className="login-btn" to={"/login"}>
        {" "}
        Login
      </Link>
    </div>
  );
}
export default SignupPage;
