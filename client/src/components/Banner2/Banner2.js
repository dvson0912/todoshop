import React, { useEffect, useRef } from "react";

import imgBanner1 from "../../assets/imgs/Banner_doi__Nam_.jpg";
import imgBanner2 from "../../assets/imgs/Banner_doi__Nu__.jpg";
import imgBanner3 from "../../assets/imgs/Banner_vuong_lon.jpg";
import imgBanner4 from "../../assets/imgs/Banner_vuong_nho__phai_tren_.jpg";
import imgBanner5 from "../../assets/imgs/Banner_vuong_nho__trai_tren_.jpg";
import imgBanner6 from "../../assets/imgs/Banner_vuong_nho__phai_duoi_.jpg";
import imgBanner7 from "../../assets/imgs/Banner_vuong_nho__trai_duoi_.jpg";
import ButtonOnTop from "../ButtonOnTop/ButtonOnTop";
import { ScrollShow } from "../../hooks/ScrollShow";
const Banner2 = () => {
  const img1 = useRef();
  const img2 = useRef();
  const img3 = useRef();
  const img4 = useRef();
  const img5 = useRef();
  const img6 = useRef();
  const img7 = useRef();

  useEffect(() => {
    const listImg = [img1, img2, img3, img4, img5, img6, img7];
    const handleScroll = (e) => {
      listImg.forEach((img) => {
        ScrollShow(window.innerHeight, img.current);
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="banner2">
      <div className="banner2__item">
        <img
          src={imgBanner1}
          alt=""
          ref={img1}
          className="banner2__item-img hide hide__bottom"
        />
      </div>
      <div className="banner2__item">
        <img
          src={imgBanner2}
          alt=""
          ref={img2}
          className="banner2__item-img hide hide__top"
        />
      </div>
      <div className="banner2__item">
        <img
          src={imgBanner3}
          alt=""
          ref={img3}
          className="banner2__item-img hide hide__bottom__scale"
        />
      </div>
      <div className="banner2__item">
        <img
          src={imgBanner4}
          alt=""
          ref={img4}
          className="banner2__item-imgsm hide hide__top"
        />
        <img
          src={imgBanner5}
          alt=""
          ref={img5}
          className="banner2__item-imgsm hide hide__top"
        />
        <img
          src={imgBanner6}
          alt=""
          ref={img6}
          className="banner2__item-imgsm hide hide__bottom"
        />
        <img
          src={imgBanner7}
          alt=""
          ref={img7}
          className="banner2__item-imgsm hide hide__bottom"
        />
      </div>

      <ButtonOnTop />
    </div>
  );
};

export default Banner2;
