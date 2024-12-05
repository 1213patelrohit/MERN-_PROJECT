import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate= useNavigate()
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const LoginHandle = async () => {
    let result = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-type": "application/json" },
    });
    result = await result.json();
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate('/')
    } else {
      alert("please enter valid username and password your ");
    }
  };
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  },[navigate]);

  return (
    <div className="login">
        <h1>Login</h1>
      <input
        type="text"
        className="inputBox"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        placeholder=" Enter Your Email"
      />
      <input
        type="password"
        className="inputBox"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        placeholder=" Enter Your Password"
      />
      <button onClick={LoginHandle} type="button" className="signUpbutton">
        Login
      </button>
    </div>
  );
};

export default Login;
