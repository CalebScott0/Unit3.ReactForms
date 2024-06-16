import { useState } from "react";

export default function SignUpForm({ setToken }) {
  // state variables for username, password, and error
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // input validation for username
      if (username === "") {
        setErr(
          "Your username must be at least 8 characters and contain only letters and numbers"
        );
        return;
      }
      // check if username length is less than 8
      else if (username.length < 8) {
        setErr("Your username must be at least 8 characters");
        return;
      }
      // check if username has any spaces or special characters
      else if (!/^[A-Za-z0-9]*$/.test(username)) {
        setErr("Your username must contain only letters and numbers");
        return;
      }
      // input validation for password
      if (password === "") {
        setErr(
          "Your password must be at least 8 characters and contain only letters and numbers"
        );
        return;
      }
      // check if password length is less than 8
      else if (password.length < 8) {
        setErr("Your password must be at least 8 characters");
        return;
      }
      // check if password has any spaces or special characters
      else if (!/^[A-Za-z0-9]*$/.test(password)) {
        setErr("Your password must contain only letters and numbers");
        return;
      }
      // once username and password match requested format, clear any errors shown to user
      else {
        setErr(null);
      }
      // Post request to signup endpoint of api with username and password
      const res = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      // grab token from data object
      setToken(data.token);
      // clear fields on submit and alert user submission was successful
      window.alert("Submission successful, ready to authenticate");
      setUsername("");
      setPassword("");
    } catch (err) {
      setErr(err.message);
    }
  };
  return (
    <div>
      <h2>Sign Up</h2>
      {/* check if error and display error to user if true */}
      {err && <p className="error">{err}</p>}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Enter a Username and Password (required)</legend>
          <label>
            Username:
            <input
              // required={true}
              // pattern={"[A-Za-z0-9]{8,}"}
              // title={"Minimum 8 Characters - Letters and Numbers Only"}
              placeholder={"Minimum 8 Characters - Letters and Numbers Only"}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </label>
          <label>
            Password:
            <input
              // type="password"
              // required={true}
              // pattern={"[A-Za-z0-9]{8,}"}
              // title={"Minimum 8 Characters - Letters and Numbers Only"}
              placeholder={"Minimum 8 Characters - Letters and Numbers Only"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
        </fieldset>
        <input type="submit" />
      </form>
    </div>
  );
}
