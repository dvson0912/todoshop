import React from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const Paginate = ({ currentPage, totalPage = 1, url }) => {
  return (
    <div className="paginate">
      {currentPage !== 1 && (
        <div className="paginate__item">
          <Link to={`${url}?page=${1}`}>
            <AiOutlineDoubleLeft />
          </Link>
        </div>
      )}
      {totalPage > 5 && currentPage - 3 > 0 && (
        <div className="paginate__item paginate__item--disable">...</div>
      )}
      {currentPage - 4 > 0 && totalPage - currentPage === 0 && (
        <div className="paginate__item">
          <Link to={`${url}?page=${currentPage - 4}`}>{currentPage - 4}</Link>
        </div>
      )}
      {currentPage - 3 > 0 && totalPage - currentPage <= 1 && (
        <div className="paginate__item">
          <Link to={`${url}?page=${currentPage - 3}`}>{currentPage - 3}</Link>
        </div>
      )}
      {currentPage - 2 > 0 && (
        <div className="paginate__item">
          <Link to={`${url}?page=${currentPage - 2}`}>{currentPage - 2}</Link>
        </div>
      )}
      {currentPage - 1 > 0 && (
        <div className="paginate__item">
          <Link to={`${url}?page=${currentPage - 1}`}>{currentPage - 1}</Link>
        </div>
      )}
      <div className="paginate__item paginate__item--current">
        {currentPage}
      </div>
      {currentPage + 1 <= totalPage && (
        <div className="paginate__item">
          <Link to={`${url}?page=${currentPage + 1}`}>{currentPage + 1}</Link>
        </div>
      )}
      {currentPage + 2 <= totalPage && (
        <div className="paginate__item">
          <Link to={`${url}?page=${currentPage + 2}`}>{currentPage + 2}</Link>
        </div>
      )}
      {currentPage + 3 <= totalPage && currentPage <= 2 && (
        <div className="paginate__item">
          <Link to={`${url}?page=${currentPage + 3}`}>{currentPage + 3}</Link>
        </div>
      )}
      {currentPage + 4 <= totalPage && currentPage === 1 && (
        <div className="paginate__item">
          <Link to={`${url}?page=${currentPage + 4}`}>{currentPage + 4}</Link>
        </div>
      )}
      {totalPage - currentPage - 2 > 0 && (
        <div className="paginate__item paginate__item--disable">...</div>
      )}
      {currentPage !== totalPage && (
        <div className="paginate__item">
          <Link to={`${url}?page=${totalPage}`}>
            <AiOutlineDoubleRight />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Paginate;
