import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ user }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: username,
            password: password,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      localStorage.setItem("token", responseData.token);
      alert(responseData.data.role);
      console.log(responseData);
      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="signup_form" onSubmit={handleSubmit}>
      <label htmlFor="User">Username</label>
      <input
        type="text"
        name="user"
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="Password">Password</label>
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
