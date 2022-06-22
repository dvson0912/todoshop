import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";

import Img from "../../assets/imgs/dathongbaobocongthuong.png";

const Footer = () => (
  <div className="footer">
    <div className="footer__top">
      <div className="footer__top-info">
        <div className="footer__contact">
          <ul className="footer__contact-list">
            <li className="footer__contact-item">
              <span className="footer__contact-title">MUA HÀNG TRỰC TUYẾN</span>
            </li>
            <li className="footer__contact-item">
              <span className="footer__contact-phone">0938.803.633</span>
            </li>
            <li className="footer__contact-item">
              <span className="footer__contact-phone">1900.633.501</span>
            </li>
            <li className="footer__contact-item">
              <span className="footer__contact-email">
                sale.online@totoshop.vn
              </span>
            </li>
          </ul>
          <ul className="footer__contact-list">
            <li className="footer__contact-item">
              <span className="footer__contact-title">HOTLINE GÓP Ý</span>
            </li>
            <li className="footer__contact-item">
              <span className="footer__contact-phone">0908.18.12.89</span>
            </li>
            <li className="footer__contact-item">
              <span className="footer__contact-email">cskh@totoshop.vn</span>
            </li>
          </ul>
        </div>
        <div className="footer__support">
          <ul className="footer__support-list">
            <span>Thông tin</span>
            <li className="footer__support-item">
              <Link to={"/posts/gioi-thieu"}>Giới thiệu</Link>
            </li>
            <li className="footer__support-item">
              <Link to={"/posts/lien-he"}>Liên hệ công ty</Link>
            </li>
            <li className="footer__support-item">
              <Link to={"/posts/doi-tac"}>Đối tác</Link>
            </li>
            <li className="footer__support-item">
              <Link to={"/posts"} className="blue-color">
                Tuyển dụng
              </Link>
            </li>
          </ul>
          <ul className="footer__support-list">
            <span>Chính sách</span>
            <li className="footer__support-item">
              <Link to={"/posts/gioi-thieu"}>Chính sách đổi hàng</Link>
            </li>
            <li className="footer__support-item">
              <Link to={"/posts/lien-he"}>Chính sách bảo hành</Link>
            </li>
            <li className="footer__support-item">
              <Link to={"/posts/doi-tac"}>Chính sách bảo mật</Link>
            </li>
            <li className="footer__support-item">
              <Link to={"/posts"}>Chính sách hoàn tiền</Link>
            </li>
          </ul>
          <ul className="footer__support-list">
            <span>FAQ</span>
            <li className="footer__support-item">
              <Link to={"/posts/gioi-thieu"}>Thanh toán và vận chuyển</Link>
            </li>
            <li className="footer__support-item">
              <Link to={"/posts/lien-he"}>Hướng dẫn chọn size</Link>
            </li>
            <li className="footer__support-item">
              <Link to={"/posts/doi-tac"}>Kiểm tra thông tin đơn hàng</Link>
            </li>
            <li className="footer__support-item">
              <Link to={"/posts"}>Câu hỏi thường gặp</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__top-send">
        <div className="footer__top__sale">
          <span>Đăng ký nhận khuyến mãi</span>
          <form className="footer__top__sale-form">
            <input
              type="text"
              className="footer__top__sale-input"
              placeholder="Nhập Email Của Bạn"
            />
            <button>Gửi</button>
          </form>
        </div>
        <div className="footer__top__idea">
          <div className="footer__top__idea-icon">
            <AiOutlineMail />
          </div>
          <span>GÓP Ý/ THAN PHIỀN</span>
        </div>
      </div>
    </div>

    <div className="footer__bottom">
      <div className="footer__bottom-left">
        <span className="footer__bottom-title">
          CÔNG TY TNHH SXTM &amp; DV TOTO GROUP
        </span>
        <span className="footer__bottom-address">
          Địa chỉ: 304 - 306 Nguyễn Trãi, P.8, Q.5, TPHCM/ Điện thoại:
          0938803633/DKKD số: 41C8013053 cấp ngày 01/12/2010, nơi cấp UBND Quận
          3
        </span>
      </div>
      <div className="footer__bottom-right">
        <img src={Img} alt="" />
      </div>
    </div>
  </div>
);

export default Footer;
