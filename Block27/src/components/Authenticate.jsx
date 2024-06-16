import { useState } from "react";

export default function Authenticate({ token, setToken }) {
  // state variables for error, success, and username
  const [err, setErr] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState("");
  const handleClick = async () => {
    try {
      // if authenticate button is clicked before a token is created, set error message to display for 5 seconds
      if (!token) {
        setErr("Please enter a username and password before authenticating");
        const myTimeout = setTimeout(() => {
          setErr(null);
        }, 5000);
        myTimeout;
        return;
      }
      // fetch request to API authenticate endpoint with token authorization passed into header
      const res = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      // pull message and username from data returned from API authenticate
      setSuccessMessage(data.message);
      // pull data object from json only if get request is successful and data object exists
      if (data.data) {
        // pull username from data object in json and pass to setUsername
        setUsername(data.data.username);
        // clear error
      }
    } catch (err) {
      setErr(err.message);
    }
  };
  // reset page functionality to be passed to reset page button onclick
  const resetPage = () => {
    setToken(null);
    setSuccessMessage(null);
    setUsername("");
  };

  return (
    <div className="authenticate">
      <h2>Authenticate</h2>
      {/* conditionals to render to screen if error*/}
      {err && <p className="error">{err}</p>}
      {/* conditionals to render to screen if success */}
      {successMessage && <p>{successMessage}</p>}
      {username && <p>Username: {username}</p>}
      {/* button to authenticate token with API */}
      <button onClick={handleClick}>Authenticate Token</button>
      {/* button to reset page allowing another sign up */}
      <button onClick={resetPage}>Reset Page</button>
    </div>
  );
}
