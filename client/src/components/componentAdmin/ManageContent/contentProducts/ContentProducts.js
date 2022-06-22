import moment from "moment";
import React, { useEffect, useState } from "react";
import { RiDeleteBin2Fill, RiUploadCloudLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import formatPrice from "../../../../hooks/formatPrice";
import {
  deleteProduct,
  getPageProducts,
} from "../../../../store/action/ProductAction";
import { urlServer } from "../../../../store/URL";
import Loading from "../../../Loading/Loading";
import Paginate from "../../../Paginate/Paginate";

const ContentProducts = () => {
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState(false);
  const location = useLocation();
  const search = location.search;
  const products = useSelector((state) => state.Products.products);
  const loading = useSelector((state) => state.Products.loading);

  useEffect(() => {
    const getPage = search ? search[search.indexOf("=") + 1] : 1;
    dispatch(getPageProducts(getPage));
  }, [dispatch, search, isDelete]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="manage__content">
            <div className="manage__content__top">
              <h1 className="manage__content-heading">Quản Lý Products</h1>
              <Link
                className="manage__content-link"
                to={"/admin/create/product"}
              >
                Create Product
              </Link>
            </div>

            <div style={{ overflow: "auto", height: 600 }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Avatar</th>
                    <th>price</th>
                    <th>Size</th>
                    <th>Color</th>
                    <th>Description Img</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Ngày Tạo</th>
                    <th>Upload</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {products.docs &&
                    products.docs.map((item, index) => {
                      return (
                        <tr key={`item__${index}`}>
                          <td className="td-center td-w-100px">
                            {/* {getPage && index + 1 + (getPage - 1) * 4} */}
                            {index + 1}
                          </td>
                          <td className="td-w-200px ">{item.name}</td>
                          <td className="td-w-100px">
                            <img src={urlServer + item.avatar} alt="" />
                          </td>
                          <td className="td-w-100px">
                            {formatPrice(item.price)}
                          </td>
                          <td className="td-w-100px">{item.size.join(",")}</td>
                          <td className="td-color">
                            <div>
                              {item.color.map((colorItem, index) => (
                                <img
                                  src={urlServer + colorItem}
                                  key={`${item.link}_color_${index}`}
                                  item={`${item.link}_color_${index}`}
                                  alt=""
                                />
                              ))}
                            </div>
                          </td>
                          <td className="td-desc">
                            <div>
                              {item.descriptionImg.map((img, index) => (
                                <img
                                  src={urlServer + img}
                                  key={`${item.link}_color_${index}`}
                                  alt=""
                                />
                              ))}
                            </div>
                          </td>
                          <td className="td-w-200px td-center">
                            {item.nameCategory}
                          </td>
                          <td className="td-w-200px">{item.nameType}</td>
                          <td className="td-w-200px">
                            {moment(item.createdAt).format("MMM Do YY")}
                          </td>
                          <td className="td-w-100px td-center">
                            <RiUploadCloudLine />
                          </td>
                          <td className="td-w-100px td-center">
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                dispatch(deleteProduct(item._id));
                                setIsDelete(!isDelete);
                              }}
                            >
                              <RiDeleteBin2Fill />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <Paginate
            currentPage={products.page}
            totalPage={products.totalPages}
            url={location.pathname}
          />
        </>
      )}
    </>
  );
};

export default ContentProducts;
