import { useState } from "react";

export default function Authenticate({ token, setToken }) {
    // state variables for error success, and username
  const [err, setErr] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState("");

//   fetch API authenticate endpoint with token authorization passed into header
  const handleClick = async () => {
    try {
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
    //   pull message and username from data returned from API authenticate
      setSuccessMessage(data.message);
      if(data.data){
      setUsername(data.data.username);
      }
    } catch (err) {
      setErr(err.message);
    }
  };
  return (
    <div className="authenticate">
      <h2>Authenticate</h2>
      {/* conditionals to render to screen if error or with success */}
      {err && <p>{err}</p>}
      {successMessage && <p>{successMessage}</p>}
      {username && <p>Username: {username}</p>}
      {/* button to authenticate token with API */}
      <button onClick={handleClick}>Authenticate Token</button>
    </div>
  );
}
