import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState("");

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
        "https://placeofkindness-server.herokuapp.com/api/v1/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            email: email,
            username: username,
            password: password,
            passwordConfirm: passwordConfirm,
            role: role,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      localStorage.setItem("token", responseData.token);
      console.log(responseData);
      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="signup_form">
      <label htmlFor="User">Name</label>
      <input
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="User">Email</label>
      <input
        type="text"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="User">Username</label>
      <input
        type="text"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="Password">Password</label>
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <label htmlFor="Password">Password Confirm</label>
      <input
        type="password"
        name="passwordConfirm"
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />

      <label htmlFor="Role">Role</label>
      <input
        type="text"
        name="role"
        onChange={(e) => setRole(e.target.value)}
      />

      <button type="submit" onClick={handleSubmit}>
        Login
      </button>
    </form>
  );
};

export default Register;
