import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const PostNew = ({ Posts }) => {
  const [widthSlide, setWidthSlide] = useState(0);
  const [indexSlide, setIndexSlide] = useState(0);
  const slide = useRef();

  const handleClickLeft = () => {
    if (indexSlide === 0) {
      setIndexSlide(3);
    } else {
      setIndexSlide(indexSlide - 1);
    }
  };
  const handleClickRight = () => {
    if (3 === indexSlide) {
      setIndexSlide(0);
    } else {
      setIndexSlide(indexSlide + 1);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (slide) {
        setWidthSlide(slide.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    const time = setTimeout(() => {
      if (indexSlide < 3) {
        setIndexSlide(indexSlide + 1);
      } else {
        setIndexSlide(0);
      }
    }, 3000);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(time);
    };
  }, [indexSlide, widthSlide]);

  return (
    <div className="posts">
      <div className="posts__top">
        <Link to={"/posts"} className="posts__heading">
          <span>tin tuc moi ngay</span>
        </Link>
      </div>
      <div className="posts__content">
        <div className="posts__content__slide">
          <div className="posts__content__slide-btn posts__content__slide-btn--left">
            <AiOutlineLeft onClick={handleClickLeft} />
          </div>
          <div
            className="posts__content__slide-list"
            style={{ transform: `translateX(-${indexSlide * widthSlide}px)` }}
            ref={slide}
          >
            {Posts.map((post, index) => {
              if (index + 4 >= Posts.length) {
                return (
                  <div
                    key={`posts--${index}`}
                    className="posts__content__slide-item"
                  >
                    <img
                      src={post.avatar}
                      alt=""
                      className="posts__content__slide-img"
                    />
                    <div className="posts__content__slide-bottom">
                      <span className="posts__content__slide-text">
                        Xu Huong Thoi Trang
                      </span>
                      <span className="posts__content__slide-title">
                        {post.title}
                      </span>
                    </div>
                  </div>
                );
              }
              return false;
            })}
          </div>
          <div className="posts__content__slide-btn posts__content__slide-btn--right">
            <AiOutlineRight onClick={handleClickRight} />
          </div>
        </div>
        <div className="posts__content__right hide-on-tablet">
          <Link to={"/"}>
            <h3 className="posts__content__right-heading">
              BÀI VIẾT XEM NHIỀU
            </h3>
          </Link>
          <div className="posts__content__right-list">
            {Posts.map((post, index) => {
              if (index + 4 >= Posts.length) {
                return (
                  <div
                    key={`posts--${index}`}
                    className="posts__content__right-item"
                  >
                    <img
                      src={post.avatar}
                      alt=""
                      className="posts__content__right-img"
                    />
                    <div className="posts__content__right-body">
                      <Link to={"/"} className="posts__content__right-title">
                        {post.title}
                      </Link>
                      <span className="posts__content__right-day">
                        {post.day}
                      </span>
                      <Link to={"/"} className="posts__content__right-type">
                        {post.type}
                      </Link>
                    </div>
                  </div>
                );
              }
              return false;
            })}
          </div>
        </div>
      </div>
      <div className="posts__bottom">
        <Link to={"/posts"}>
          <span className="posts__bottom-text">Xem Them Nhieu Tin Khac</span>
        </Link>
      </div>
    </div>
  );
};

export default PostNew;
