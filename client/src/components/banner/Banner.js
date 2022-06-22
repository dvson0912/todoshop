import React, { useEffect, useRef, useState } from "react";

import Img1 from "../../assets/imgs/Slide_1_.jpg";
import Img2 from "../../assets/imgs/Slide_2_.jpg";
import Img3 from "../../assets/imgs/Slide_3.jpg";
import Img4 from "../../assets/imgs/SC_SLIDE_2.jpg";

const Banner = () => {
  const listImg = useRef();
  const [indexBanner, setIndexBanner] = useState(1);
  const [positionX, setPositionX] = useState(0);

  const datasImg = [Img1, Img2, Img3, Img4];

  const handleClickDot = (index) => {
    setIndexBanner(index);
  };

  useEffect(() => {
    const handleResize = () => {
      if (listImg) {
        setPositionX(listImg.current.offsetWidth);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    const time = setTimeout(() => {
      if (indexBanner < datasImg.length - 1) {
        setIndexBanner(indexBanner + 1);
      } else {
        setIndexBanner(0);
      }
    }, 2000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(time);
    };
  }, [indexBanner, positionX, datasImg.length]);
  return (
    <div className="banner">
      <div className="banner__slide">
        <div
          className="banner__list"
          ref={listImg}
          style={{ transform: `translateX(-${indexBanner * positionX}px)` }}
        >
          {datasImg.map((img, index) => (
            <img
              src={img}
              key={`banner__img-${index}`}
              alt="banner Img"
              className="banner__list-img"
            />
          ))}
        </div>
        <ul className="banner__not-list">
          {datasImg.map((item, index) => (
            <li
              className={`banner__not-item ${
                index === indexBanner ? "active" : ""
              }`}
              key={`banner__not-${index}`}
              onClick={() => handleClickDot(index)}
            ></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Banner;
