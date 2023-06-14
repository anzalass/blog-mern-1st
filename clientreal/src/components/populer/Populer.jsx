import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./populer.css";
import Post from "../post/Post";
export default function Populer() {
  const [populer, setPop] = useState([]);
  const { search } = useLocation();
  const PF = "http://localhost:5000/images/";
  const nav = useNavigate();
  const plus = "populer";

  useEffect(() => {
    const fetchPopuler = async () => {
      const res = await axios.get(`http://localhost:5000/api/post/?c=populer`);
      console.log(res + "tes");
      setPop(res.data);
    };
    fetchPopuler();
  }, [search]);

  return (
    <div className="postPop">
      <h1 className="artikel">Artikel Populer</h1>
      <div className="listPostPop">
        {populer.map((p) => {
          return (
            <div className="spostPop">
              <Post post={p} key={p.id}></Post>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// {post.map((p) => (
//   <Post post={p} key={p.id}></Post>
// ))}
