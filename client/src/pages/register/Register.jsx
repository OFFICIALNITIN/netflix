import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const history = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const navigate = useNavigate();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleClick = () => {
    navigate("/login");
  };
  const handleFinish = async (e) => {
    e.preventDefault();
    const usernameValue = usernameRef.current.value;
    const passwordValue = passwordRef.current.value;

    if (!usernameValue || usernameValue.length < 3) {
      toast.error("Username must be at least 3 characters long", {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
      return;
    }

    if (!passwordValue || passwordValue.length < 6) {
      toast.error("Password must be at least 6 characters long", {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
      return;
    }

    setUsername(usernameValue);
    setPassword(passwordValue);

    try {
      await axios.post("https://netflix-7yip.onrender.com/api/auth/register", {
        email,
        username: usernameValue,
        password: passwordValue,
      });
      navigate("/login");
      toast.success("Registration successful! Redirecting to login...", {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Registration failed. Please try again.", {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
            <button onClick={handleClick} className="registerButton">
              Sign In
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="text" placeholder="username" ref={usernameRef} />
            <input type="password" placeholder="password" ref={passwordRef} />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
