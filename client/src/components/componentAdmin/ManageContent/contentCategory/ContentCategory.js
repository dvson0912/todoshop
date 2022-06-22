import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryById,
  getCategory,
} from "../../../../store/action/CategoryAction";
import { RiUploadCloudLine, RiDeleteBin2Fill } from "react-icons/ri";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../../Loading/Loading";
import Paginate from "../../../Paginate/Paginate";

const ContentCategory = () => {
  const [isDelete, setIsDelete] = useState(false);
  const dispacth = useDispatch();
  const location = useLocation();
  const search = location.search;
  const categorys = useSelector((state) => state.Products.categorys);
  const loading = useSelector((state) => state.Products.loading);

  useLayoutEffect(() => {
    const page = search ? search[search.indexOf("=") + 1] : 1;
    dispacth(getCategory(page));
  }, [dispacth, search, isDelete]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="manage__content">
            <div className="manage__content__top">
              <h1 className="manage__content-heading">Quản Lý Category</h1>
              <Link
                className="manage__content-link"
                to={"/admin/create/category"}
              >
                Create Category
              </Link>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Name</th>
                  <th>Ngày Tạo</th>
                  <th>Upload</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {categorys.docs
                  ? categorys.docs.map((item, index) => {
                      return (
                        <tr key={item._id}>
                          <td className="center">
                            {/* {page && index + 1 + (page - 1) * 8} */}
                            {index + 1}
                          </td>
                          <td>{item.name}</td>
                          <td>{moment(item.createdAt).format("MMM Do YY")}</td>
                          <td className="center">
                            <RiUploadCloudLine />
                          </td>
                          <td className="center">
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={(e) =>
                                dispacth(
                                  deleteCategoryById(
                                    item._id,
                                    setIsDelete,
                                    isDelete
                                  )
                                )
                              }
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
          <Paginate
            currentPage={categorys.page}
            totalPage={categorys.totalPages}
            url={location.pathname}
          />
        </>
      )}
    </>
  );
};

export default ContentCategory;
