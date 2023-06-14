import Header from "../../components/header/Header";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import Footer from "../../components/footer/Footer";
import "./categori.css";

export default function Categori() {
  const [cari, setCari] = useState("");

  const { search } = useLocation();
  const path = search.slice(1);
  const path1 = path.slice(2);
  const base = `http://localhost:5000/api/post/`;
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(base + (search ? search : `?c=${cari}`));
      console.log("anjing" + search);
      setPost(res.data);
    };
    fetchPost();
  }, [search, cari]);

  return (
    <>
      <>
        <Header cari={setCari} />
        <div className="bigHome">
          <div className="bigHome2">
            <h1 className="judulPencarian">Categori : {path1}</h1>

            <div className="home">{<Posts post={post} />}</div>
          </div>
          <div className="sidebarhome">
            <Sidebar />
          </div>
        </div>
        <Footer />
      </>
    </>
  );
}
