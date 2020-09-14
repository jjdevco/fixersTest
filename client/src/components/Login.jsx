import React, { useState } from "react";

import { auth } from "../providers/firebase";

function Login() {
  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("Jimenez12");

  const handleLogin = async (evt) => {
    evt.preventDefault();

    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);
      const token = user.xa;
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Hello Login</h1>
      <form>
        <label htmlFor="email">email: </label>
        <input
          name="email"
          type="text"
          placeholder="email"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <br />
        <label htmlFor="password">password:</label>
        <input
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <br />
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
