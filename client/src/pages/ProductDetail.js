import React, { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getProductByName } from "../store/action/ProductAction";

import NavigationProduct from "../components/NavigationProduct/NavigationProduct";
import ProductContent from "../components/ProductContent/ProductContent";
import ButtonOnTop from "../components/ButtonOnTop/ButtonOnTop";
import ProductSynthetic from "../components/ProductSynthetic/ProductSynthetic";
import Loading from "../components/Loading/Loading";
import RelatedProducts from "../components/relatedProduct/RelatedProducts";
import Layout1 from "../layout/Layout1";

const ProductDetail = () => {
  const slug = useParams();
  const dispatch = useDispatch();
  const { product, relatedProducts } = useSelector(
    (state) => state.Products.product
  );
  const loading = useSelector((state) => state.Products.loading);
  useLayoutEffect(() => {
    dispatch(getProductByName(slug.product));
  }, [dispatch, slug.product]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="product-page">
          {product ? (
            <>
              <NavigationProduct product={product} />
              <div className="product-page__container">
                <ProductContent product={product} />
                <ProductSynthetic
                  descriptionImg={product.descriptionImg}
                  name={product.name}
                />
                <div className="product-page__container-title">
                  <span>SẢN PHẨM CÙNG DANH MỤC</span>
                </div>
                <RelatedProducts relatedProducts={relatedProducts} />
              </div>
              <ButtonOnTop />
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default Layout1(ProductDetail);
