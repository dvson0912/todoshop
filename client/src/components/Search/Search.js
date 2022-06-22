import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchProducts } from "../../store/action/ProductAction";
import { SEARCH_PRODUCT } from "../../store/type";
import { urlServer } from "../../store/URL";

const Search = ({ handleShowSearch }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const { products } = useSelector((state) => state.Products.searchProducts);
  const handleEnter = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query !== "") {
      dispatch(searchProducts(query));
    } else {
      dispatch({ type: SEARCH_PRODUCT, payload: [] });
    }
  }, [query, dispatch]);

  return (
    <div className="search">
      <div className="search__content">
        <div className="search__content__top">
          <div className="search__content__icon">
            <BsSearch />
          </div>
          <input
            type={"text"}
            placeholder="Tìm Kiếm..."
            className="search__content__input"
            value={query}
            onChange={handleEnter}
          />
          <div
            className="search__content__icon search__content__icon-close"
            onClick={handleShowSearch}
          >
            <AiOutlineClose />
          </div>
        </div>
        <ul className="search__content__list">
          {Array.isArray(products) &&
            products.map((item) => {
              return (
                <li className="search__content__item" key={item._id}>
                  <Link
                    className="search__content__item-link"
                    to={`/products/${item.link}`}
                  >
                    <img
                      className="search__content__item-img"
                      src={`${urlServer}/${item.avatar}`}
                      alt=""
                    />
                    <div className="search__content__item-body">
                      <h4 className="search__content__item-name">
                        {item.name}
                      </h4>
                      <p className="search__content__item-price">
                        {item.price}
                        <sup>đ</sup>
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Search;
