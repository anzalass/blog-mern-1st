import "./singlePost.css";
import React from "react";
import messi from "../../assets/bgoldtr.jpg";
import del from "../../assets/del.svg";
import edit from "../../assets/edit.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const nav = useNavigate();
  const url = "http://localhost:5000/api/post/";
  const loc = useLocation();
  const path = loc.pathname.split("/")[2];
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setupdateMode] = useState(false);
  // const [list, setList] = useState("");
  // const [categories, setCategories] = useState([]);
  const [categories, setCategories] = useState("");

  const [post, setPost] = useState({});
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(url + path);
      console.log(path);
      setPost(res.data);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/post/${post._id}`, {
        data: { username: user.username },
        method: "DELETE",
      });
      window.location.replace("http://localhost:3000");
    } catch (error) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/post/${post._id}`, {
        username: user.username,
        title,
        desc,
        categories,
      });
      window.location.reload("");
    } catch (error) {}
  };

  // function addCat(e) {
  //   e.preventDefault();
  //   setCategories([...categories, list]);
  //   console.log(categories, list);
  //   setList(" ");
  // }

  // function deletearr(length) {
  //   const del = categories.filter((c) => c.length !== length);
  //   setCategories(del);
  // }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <div className="judul">
          {updateMode ? (
            <input
              type="text"
              className="singleTitleEdit"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1> {post.title} </h1>
          )}
        </div>
        <div className="singlePostImg">
          {post.photo && (
            <img
              src={PF + post.photo}
              alt=""
              className="imageSinglePost"
              height
              width
            />
          )}
        </div>
        <div className="singlePostTitle">
          {post.username === user?.username && (
            <div className="singlePostEdit">
              <img
                className="singlePostIcon"
                src={edit}
                alt=""
                onClick={() => (
                  setupdateMode(true), console.log(categories.name)
                )}
              />
              <img
                className="singlePostIcon"
                src={del}
                alt=""
                onClick={handleDelete}
              />
            </div>
          )}
        </div>

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author :{" "}
            <b
              className="authorklik"
              onClick={() => nav(`/?user=${post.username}`)}
            >
              {post.username}
            </b>
          </span>
          <span className="singlePostDate">
            {" "}
            {new Date(post.createdAt).toDateString()}{" "}
          </span>

          {updateMode ? (
            <div className="editCat">
              <input
                type="text"
                onChange={(e) => setCategories(e.target.value)}
                value={categories}
              />
              {/* <button onClick={addCat}>add</button> */}
              {/* {categories.length > 0 ? (
                <div>
                  {categories.map((c) => (
                    <li>
                      <span>{c}</span>{" "}
                      <button onClick={() => deletearr(c.length)}>del</button>
                    </li>
                  ))}
                </div>
              ) : null} */}
            </div>
          ) : null}
        </div>
        {updateMode ? (
          <textarea
            className="singleDescInputEdit"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{post.desc}</p>
        )}

        {updateMode ? <button onClick={handleUpdate}>Update</button> : null}
      </div>
    </div>
  );
}
