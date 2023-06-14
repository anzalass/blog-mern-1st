import React from "react";
import "./topbar.css";
import ig from "../../assets/ig.svg";
import fb from "../../assets/fb.svg";
import twt from "../../assets/twt.svg";
import pin from "../../assets/pin.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const nav = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="w3-container  top">
      <div className="topleft">
        <h1>Anzalas Blog</h1>
      </div>
      <div className="topcenter">
        <ul className="toplist">
          <li onClick={() => nav("/")} className="toplistitem">
            Home
          </li>
          <li onClick={() => nav("/")} className="toplistitem">
            About
          </li>
          <li onClick={() => nav("/")} className="toplistitem">
            Contact
          </li>
          <li onClick={() => nav("/write")} className="toplistitem">
            Write
          </li>
          <li className="toplistitem" onClick={handleLogout}>
            {user && "Logout"}
          </li>
        </ul>
      </div>
      <div className="topright">
        {user ? (
          <img
            className="topimg"
            src={PF + user.profilePic}
            alt=""
            onClick={() => nav("/settings")}
          />
        ) : (
          <>
            <button className="btnTop1" onClick={() => nav("/login")}>
              Login
            </button>
            <button className="btnTop2" onClick={() => nav("/regis")}>
              Register
            </button>
          </>
        )}
        <svg
          className="topsearchicon"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </div>
    </div>
  );
}
