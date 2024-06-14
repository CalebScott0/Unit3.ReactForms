import { useState } from "react";

export default function SignUpForm() {
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
        console.log(data);

    } catch (err) {
        setErr(err.message);
    }
}
  return (
    <div>
      <h2>Sign Up</h2>
      {err && <p>{err}</p>}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Username:
            <input
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
