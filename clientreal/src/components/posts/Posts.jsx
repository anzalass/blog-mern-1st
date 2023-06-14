"use";
import "./posts.css";
import Post from "../post/Post";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Populer from "../../components/populer/Populer";

export default function Posts({ post }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(post.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(post.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, post]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % post.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="posts">
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName={"pagination"}
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
        />
      </div>
      <div className="listPost">
        {currentItems.map((p) => {
          return (
            <div className="spost">
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
