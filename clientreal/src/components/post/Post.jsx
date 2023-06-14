import React, { useState } from "react";
import "./post.css";
import messi from "../../assets/messi.png";
import { useNavigate } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  const nav = useNavigate();

  return (
    <div onClick={() => nav(`/post/${post._id}`)} className="post">
      <div className="postImage">
        {post.photo && (
          <div>
            <img
              className="postImg"
              src={PF + post.photo}
              height={50}
              width={50}
              alt="not avalibale"
            />
          </div>
        )}
      </div>

      <div className="postInfo">
        <div className="postCats">
          <span>{post.categories}</span>
        </div>

        <span className="postTitle">{post.title}</span>
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
        {/* <p className="postDesc">{post.desc}</p> */}
      </div>
      <div className="btnDiv">
        <button className="btnRead">Read More</button>
      </div>
    </div>
  );
}

// {post.categories.map((c) => (
//   <span className="postCat">{c} </span>
// ))}
