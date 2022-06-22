import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getPageProducts } from "../../store/action/ProductAction";
import Product from "../Products/Product";

const SliderProduct = () => {
  const product = useRef();
  const [productWidth, setProductWidth] = useState(0);
  const [indexSlide, setIndexSlide] = useState(0);
  const Products = useSelector((state) => state.Products.products);
  const loading = useSelector((state) => state.Products.loading);

  const dispatch = useDispatch();

  const handleClickLeft = () => {
    if (indexSlide !== 0) {
      setIndexSlide(indexSlide - 1);
    } else if (window.innerWidth > 990 && indexSlide < 2) {
      setIndexSlide(2);
    } else if (
      window.innerWidth > 750 &&
      window.innerWidth <= 990 &&
      indexSlide < 3
    ) {
      setIndexSlide(3);
    } else if (window.innerWidth <= 750 && indexSlide < 4) {
      setIndexSlide(4);
    }
  };
  const handleClickRight = () => {
    if (window.innerWidth > 990 && indexSlide < 2) {
      setIndexSlide(indexSlide + 1);
    } else if (
      window.innerWidth > 750 &&
      window.innerWidth <= 990 &&
      indexSlide < 3
    ) {
      setIndexSlide(indexSlide + 1);
    } else if (window.innerWidth <= 750 && indexSlide < 4) {
      setIndexSlide(indexSlide + 1);
    } else {
      setIndexSlide(0);
    }
  };
  useEffect(() => {
    const handleShowSlider = () => {
      if (product.current && product.current.childNodes) {
        if (product.current.childNodes[0])
          setProductWidth(product.current.childNodes[0].offsetWidth);
      }
    };
    handleShowSlider();
    window.addEventListener("resize", handleShowSlider);
    const time = setTimeout(() => {
      if (window.innerWidth > 990 && indexSlide < 2) {
        setIndexSlide(indexSlide + 1);
      } else if (
        window.innerWidth > 750 &&
        window.innerWidth <= 990 &&
        indexSlide < 3
      ) {
        setIndexSlide(indexSlide + 1);
      } else if (window.innerWidth <= 750 && indexSlide < 4) {
        setIndexSlide(indexSlide + 1);
      } else {
        setIndexSlide(0);
      }
    }, 2000);

    return () => {
      window.removeEventListener("resize", handleShowSlider);
      clearInterval(time);
    };
  }, [productWidth, indexSlide]);

  useEffect(() => {
    dispatch(getPageProducts(1));
  }, [dispatch]);

  return (
    <>
      {Products.docs && !loading && (
        <div className="slideproduct">
          <div
            className="slideproduct__btn slideproduct__btn-left"
            onClick={() => handleClickLeft()}
          >
            <AiOutlineLeft />
          </div>
          <div
            className="slideproduct__slider"
            style={{
              transform: `translateX(-${productWidth * indexSlide}px)`,
            }}
          >
            <div className="slideproduct__list" ref={product}>
              {Products.docs !== []
                ? Products.docs.map((item, index) => {
                    if (index < 6) {
                      return <Product item={item} key={`product-${index}`} />;
                    }
                    return false;
                  })
                : ""}
            </div>
            <div className="slideproduct__list">
              {Products.docs !== []
                ? Products.docs.map((item, index) => {
                    if (index >= 6) {
                      return <Product item={item} key={`product-${index}`} />;
                    }
                    return false;
                  })
                : ""}
            </div>
          </div>

          <div
            className="slideproduct__btn slideproduct__btn-right"
            onClick={handleClickRight}
          >
            <AiOutlineRight />
          </div>
        </div>
      )}
    </>
  );
};

export default SliderProduct;
