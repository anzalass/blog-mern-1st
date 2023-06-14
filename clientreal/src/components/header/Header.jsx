import "./header.css";
import bg from "../../assets/bgoldtr.jpg";
export default function Header({ cari }) {
  return (
    <div className="header">
      <div className="headertitle">
        <div className="search">
          <input
            type="text"
            onChange={(e) => cari(e.target.value)}
            className="searchInput"
            placeholder="   Cari Artikel"
          />
        </div>
      </div>
      <img className="headerImg" src={bg} alt="" />
    </div>
  );
}
