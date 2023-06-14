import { useContext } from "react";
import { useState } from "react";
import "./write.css";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState("");
  // const [categories, setCategories] = useState([]);
  // const [list, setList] = useState("");
  const { user } = useContext(Context);

  const handleSub = async (e) => {
    e.preventDefault();
    console.log(categories);
    const newPost = {
      username: user.username,
      title,
      desc,
      categories,
    };

    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {}
    }
    if (images) {
      // const filename = Date.now();
      const data = new FormData();
      images.forEach((p) => {
        data.append("name", p.name + Date.now());
      });
      images.forEach((p) => {
        data.append("file", p);
      });
      newPost.images = images.map((i) => `${i.name}${Date.now()}`);
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("http://localhost:5000/api/post", newPost);
      window.location.replace("http://localhost:3000/post/" + res.data._id);
    } catch (err) {}
  };

  function addgambar(e) {
    e.preventDefault();
    setImages([...images, image]);
    console.log(image);
  }

  // function addCat(e) {
  //   e.preventDefault();
  //   setCategories([...categories, list]);
  //   console.log(categories, list);
  //   setList("");
  // }

  // function deletearr(length) {
  //   const del = categories.filter((c) => c.length !== length);
  //   setCategories(del);
  // }

  return (
    <div className="write">
      {file ? (
        <>
          <div className="divImg">
            <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
          </div>
        </>
      ) : null}
      <form className="writeForm" onSubmit={handleSub}>
        <div className="plusbtn">
          <label htmlFor="fileInput">
            <h1>+</h1>
          </label>
        </div>
        <div className="writeFormGroup">
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="categories">
          <input
            className="inputCat"
            type="text"
            name=""
            id=""
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
        </div>
        {/* <div>
          <input
            type="file"
            name="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button onClick={addgambar}>add gambar</button>
          {image ? (
            <div>
              {images.map((i) => (
                <li>
                  <img
                    src={URL.createObjectURL(i)}
                    alt=""
                    height={50}
                    width={50}
                  />{" "}
                  <button>del</button>
                </li>
              ))}
            </div>
          ) : null}
        </div> */}
        <div className="writeFormGroup">
          <textarea
            className=" writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
{
  /* <button onClick={addCat}> cateegory</button> */
}
// {categories.length > 0 ? (
//   <div>
//     {categories.map((c) => (
//       <li>
//         <span>{c}</span>{" "}
//         <button onClick={() => (c.length)}>del</button>
//       </li>
//     ))}
//   </div>
// ) : null}
