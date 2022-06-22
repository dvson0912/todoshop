import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import Banner from "../components/banner/Banner";
import Product from "../components/Products/Product";
import Paginate from "../components/Paginate/Paginate";
import ButtonOnTop from "../components/ButtonOnTop/ButtonOnTop";
import Loading from "../components/Loading/Loading";
import Layout1 from "../layout/Layout1";
import { getProductByCategory } from "../store/action/CategoryAction";
import { getPageProducts } from "../store/action/ProductAction";
import { getProductsByType } from "../store/action/TypeAction";

const ProductListPage = () => {
  const slug = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products.products);
  const loading = useSelector((state) => state.Products.loading);
  const page =
    location.search === ""
      ? 1
      : location.search[location.search.indexOf("page=") + 5];
  useLayoutEffect(() => {
    if (slug.type) {
      dispatch(getProductsByType(slug.type, page));
    } else if (slug.category) {
      dispatch(getProductByCategory(slug.category, page));
    } else {
      dispatch(getPageProducts(page));
    }
  }, [dispatch, slug, page]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="productListPage">
          <Banner />
          {slug.category === undefined ? (
            <div className="productListPage__header">
              <h3 className="productListPage__header-heading">sản phẩm</h3>
            </div>
          ) : slug.category && slug.type === undefined ? (
            <div className="productListPage__header">
              <h3 className="productListPage__header-heading">
                {products.category && products.category.name}
              </h3>
              <ul className="productListPage__header-list">
                {products.typeOfCategory &&
                  products.typeOfCategory.map((item) => (
                    <li className="productListPage__header-item" key={item._id}>
                      <Link
                        className="productListPage__header-link"
                        to={`/category/${products.category.link}/${item.link}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            slug.category &&
            slug.type && (
              <div className="productListPage__header">
                <h3 className="productListPage__header-heading">
                  {products.type && products.type.name}
                </h3>
              </div>
            )
          )}
          {products.docs && (
            <div className="productListPage__content">
              {products.docs.map((item) => (
                <Product item={item} key={item._id} />
              ))}
            </div>
          )}
          {products.docs && products.docs.length !== 0 && (
            <Paginate
              currentPage={products.page}
              url={location.pathname}
              totalPage={products.totalPages}
            />
          )}
          <ButtonOnTop />
        </div>
      )}
    </>
  );
};

export default Layout1(ProductListPage);
