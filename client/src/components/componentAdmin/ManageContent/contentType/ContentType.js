import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiUploadCloudLine, RiDeleteBin2Fill } from "react-icons/ri";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import { deleteType, getPageType } from "../../../../store/action/TypeAction";
import Loading from "../../../Loading/Loading";
import Paginate from "../../../Paginate/Paginate";

const ContentType = () => {
  const [isDelete, setIsDelete] = useState(false);
  const dispacth = useDispatch();
  const location = useLocation();
  const search = location.search;
  const types = useSelector((state) => state.Products.types);
  const loading = useSelector((state) => state.Products.loading);
  const user = useSelector((state) => state.User.user);
  useLayoutEffect(() => {
    const page = search ? search[search.indexOf("=") + 1] : 1;
    dispacth(getPageType(page));
  }, [dispacth, search, isDelete]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="manage__content">
            <div className="manage__content__top">
              <h1 className="manage__content-heading">Quản Lý Type</h1>
              <Link className="manage__content-link" to={"/admin/create/type"}>
                Create Type
              </Link>
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Phụ Thuộc Category</th>
                    <th>Ngày Tạo</th>
                    <th>Upload</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {types.docs
                    ? types.docs.map((item, index) => {
                        return (
                          <tr key={item._id}>
                            <td className="td-w-100px td-center">
                              {index + 1}
                            </td>
                            <td className="td-w-200px">{item.name}</td>
                            <td className="td-w-200px">{item.nameCategory}</td>
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
                                  dispacth(
                                    deleteType(
                                      item._id,
                                      setIsDelete,
                                      isDelete,
                                      user.accessToken
                                    )
                                  );
                                }}
                              >
                                <RiDeleteBin2Fill />
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
          <Paginate
            currentPage={types.page}
            totalPage={types.totalPages}
            url={location.pathname}
          />
        </>
      )}
    </>
  );
};

export default ContentType;
