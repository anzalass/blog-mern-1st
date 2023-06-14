import "./sidebar.css";
import React from "react";
import messi from "../../assets/messi.png";
import ig from "../../assets/ig.svg";
import fb from "../../assets/fb.svg";
import twt from "../../assets/twt.svg";
import pin from "../../assets/pin.svg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Sidebar() {
  const { user, dispatch } = useContext(Context);
  const nav = useNavigate();
  const [cats, setCats] = useState([]);
  const url = "http://localhost:5000/api/categories";
  const PF = "http://localhost:5000/images/";
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(url);
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">About Me</span>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          tempore, nihil numquam repellat laboriosam in, optio quo vero beatae
          sed dolore aperiam magni reiciendis et culpa, rem error? Molestias,
          aspernatur .
        </p>
        <div className="sidebarItem">
          <span className="sidebarTitle">Categories</span>
          <ul className="sideBarList">
            {cats.map((c) => (
              <li
                onClick={() => nav(`/categori?cat=${c.name}`)}
                className="sidebarListItem"
              >
                {c.name}
              </li>
            ))}
            <br />
          </ul>
          <br />
          <div className="sidebarItem">
            <span className="sidebarTitle">Follow Us</span>
            <div className="sidebarSocial">
              <img className="sidebarIcon" src={ig} alt="" />
              <img className="sidebarIcon" src={fb} alt="" />
              <img className="sidebarIcon" src={pin} alt="" />
              <img className="sidebarIcon" src={twt} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
