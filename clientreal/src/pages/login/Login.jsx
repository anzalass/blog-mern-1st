import axios from "axios";
import { useContext, useState } from "react";
import { useRef } from "react";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const [fail, setFail] = useState(false);
  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUKSES", payload: res.data });
    } catch (error) {
      setFail(true);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  console.log(isFetching);
  console.log(user);

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your email..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" disabled={fail}>
          Login
        </button>
        {fail ? <span>Password Wrong Refresh page to Try Again</span> : null}
      </form>
      <button className="loginRegisterButton" type="submit">
        Register
      </button>
    </div>
  );
}
