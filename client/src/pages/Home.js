import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Banner2 from "../components/Banner2/Banner2";
import SliderProduct from "../components/SliderProduct/SliderProduct";
import PostNew from "../components/PostNew/PostNew";
import Banner from "../components/banner/Banner";

import banner from "../assets/imgs/SC_BANNER_NHO___WEB.jpg";
import ImgAddress from "../assets/imgs/sb_1570684484_63.jpg";
import Layout1 from "../layout/Layout1";

const Home = () => {
  const Posts = useSelector((state) => state.Posts.Posts);

  return (
    <>
      <div className="home">
        <Banner />
        <Banner2 />
        <Link to={"/product"} className="home__link">
          <h2>new arrivals</h2>
        </Link>
        <div className="home__seperate"></div>
        <SliderProduct />
        <div className="home__banner">
          <img src={banner} alt="" className="home__banner-img" />
        </div>
        <PostNew Posts={Posts} />
        <iframe
          width="100%"
          height="600"
          src="https://www.youtube.com/embed/_JgMCoppKHg"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        <h3 className="home__title">Hệ Thống Cửa Hàng</h3>
        <div className="home__seperate"></div>
        <div className="home__address">
          <img src={ImgAddress} alt="" className="home__address-img" />
          <Link to={"/map"} className="home__address-link">
            Địa Chỉ Hệ Thống Cửa Hàng
          </Link>
        </div>
      </div>
    </>
  );
};

export default Layout1(Home);
