import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProductEvaluate = ({ name }) => {
  const user = useSelector((state) => state.User.user);
  const [star, setStar] = useState(0);
  const starCurrent = useRef(star);
  let arrayStar = [1, 2, 3, 4, 5];
  return (
    <div className="productEvaluate">
      <div className="productEvaluate__content">
        <p className="productEvaluate__name">0 ĐÁNH GIÁ CHO {name}</p>
      </div>
      <div className="productEvaluate__form">
        {user === null ? (
          <div className="productEvaluate__form__noLogIn">
            <span className="productEvaluate__form__logIn-title">
              THÊM ĐÁNH GIÁ
            </span>
            <Link to={"/log-in"} className="btn btn--primary">
              Đăng nhập để đánh giá
            </Link>
          </div>
        ) : (
          <div className="productEvaluate__form__logIn">
            <span className="productEvaluate__form__logIn-title">
              THÊM ĐÁNH GIÁ
            </span>
            <span className="productEvaluate__form__logIn-lable">
              Đánh giá của bạn
            </span>
            <div className="productEvaluate__form__logIn-list">
              {arrayStar.map((item) => (
                <FiStar
                  onClick={() => {
                    setStar(item);
                    starCurrent.current = item;
                  }}
                  onMouseMove={() => {
                    setStar(item);
                  }}
                  onMouseLeave={() => {
                    setStar(starCurrent.current);
                  }}
                  className={`productEvaluate__form__logIn-star ${
                    item <= star ? "active" : ""
                  }`}
                  key={`start_${item}`}
                />
              ))}
            </div>
            <span className="productEvaluate__form__logIn-lable">
              Nhận xét của bạn *
            </span>
            <textarea className="productEvaluate__form__logIn-textarea" />
            <div className="productEvaluate__form__logIn-info">
              <div className="productEvaluate__form__logIn-column">
                <label
                  className="productEvaluate__form__logIn-lable"
                  htmlFor="name"
                >
                  Tên *
                </label>
                <input
                  className="productEvaluate__form__logIn-input"
                  type="text"
                  disabled
                  value={user.userName}
                  id="name"
                />
              </div>
              <div className="productEvaluate__form__logIn-column">
                <label
                  className="productEvaluate__form__logIn-lable"
                  htmlFor="email"
                >
                  Email *
                </label>
                <input
                  className="productEvaluate__form__logIn-input"
                  type="text"
                  value={user.email}
                  disabled
                  id="email"
                />
              </div>
            </div>
            <button className="productEvaluate__form__logIn-btn">Gửi Đi</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductEvaluate;
