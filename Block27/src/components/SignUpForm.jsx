import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password }),
    });
        const data = await res.json();
        // grab token from data object
        setToken(data.token);
        // clear fields on submit
        setUsername("");
        setPassword("");
    } catch (err) {
        setErr(err.message);
    }
}
  return (
    <div>
      <h2>Sign Up</h2>
      {/* check if error and display if true */}
      {err && <p>{err}</p>}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Enter a Username and Password (required)</legend>
          <label>
            Username:
            <input
            required={true}
            pattern={"[a-z0-9]{8,}"}
            title={"Minimum 8 Characters - Letters and Numbers Only"}
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
            required={true}
            pattern={"[a-z0-9]{8,}"}
            title={"Minimum 8 Characters - Letters and Numbers Only"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
        <input type="submit" />
        </fieldset>
      </form>
    </div>
  );
}
