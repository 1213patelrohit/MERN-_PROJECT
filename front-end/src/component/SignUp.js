import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  },[navigate]);

  const CollectData = async () => {
    let result = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    localStorage.setItem("user", JSON.stringify(result.result)); //Store data in localStorage
    localStorage.setItem("token", JSON.stringify(result.auth)); //Store data in localStorage
    if (result) {
      navigate("/"); // user succesfully lognin then redirect to homePage
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder=" Enter Your Name"
      />
      <input
        className="inputBox"
        type="text"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        placeholder=" Enter Your email"
      />
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        placeholder=" Enter Your password"
      />
      <button className="signUpbutton" type="button" onClick={CollectData}>
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
