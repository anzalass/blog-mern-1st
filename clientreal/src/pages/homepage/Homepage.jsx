import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";
import Footer from "../../components/footer/Footer";
import Populer from "../../components/populer/Populer";

export default function Homepage() {
  // const { user, dispatch } = useContext(Context);
  const [load, setLoad] = useState(false);
  const [cari, setCari] = useState("");

  const { search } = useLocation();
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
      <Header cari={setCari} />
      <div className="bigHome">
        <div className="bigHome2">
          <div className="homeTop">
            {cari ? <Posts post={post} /> : <Populer />}
          </div>
          <h1 className="artikel">Artikel</h1>
          <div className="home">{cari ? null : <Posts post={post} />}</div>
        </div>
        <div className="sidebarhome">
          <Sidebar />
        </div>
      </div>
      <Footer />
    </>
  );
}
