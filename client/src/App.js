import "./sass/index.scss";

import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import ProductListPage from "./pages/ProductListPage";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import ProductDetail from "./pages/ProductDetail";
import Auth from "./pages/Auth";
import Loading from "./components/Loading/Loading";
import CreatePage from "./pages/CreatePage";
import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import AdminPage from "./pages/AdminPage";
import LoginAdminPage from "./pages/LoginAdminPage";
import { useDispatch, useSelector } from "react-redux";
import { reLogin } from "./store/action/AuthAction";
import CheckOut from "./pages/CheckOut";

const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const UserPage = lazy(() => import("./pages/UserPage"));

function App() {
  const { pathname, search } = useLocation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.Cart.cart);
  const user = useSelector((state) => state.User.user);
  useEffect(() => {
    localStorage.setItem("CART", JSON.stringify(cart));
  }, [cart]);

  useLayoutEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken) {
      dispatch(reLogin());
    }
  }, [dispatch]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/category">
          <Route path=":category/:type" element={<ProductListPage />} />
          <Route path=":category" element={<ProductListPage />} />
          <Route path="" element={<ProductListPage />} />
        </Route>

        <Route path="/products/:product" element={<ProductDetail />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkOut" element={<CheckOut />} />

        <Route path="">
          <Route path="" element={<Posts />} />
          <Route path=":post" element={<Post />} />
        </Route>

        <Route path="user">
          <Route path="login" element={<Auth type={"login"} />} />
          <Route path="register" element={<Auth type={"register"} />} />
          <Route
            path="profile"
            element={<UserPage title={"Trang thông tin"} path={"home"} />}
          />
          <Route
            path="profile/edit-info"
            element={<UserPage title={"Sửa thông tin"} path={"updateInfo"} />}
          />
          <Route
            path="profile/edit-password"
            element={
              <UserPage title={"Đổi mật khẩu"} path={"updatePassword"} />
            }
          />
          <Route
            path="profile/order"
            element={<UserPage title={"Đơn Hàng"} path={"order"} />}
          />
          <Route
            path="profile/order/order-details"
            element={
              <UserPage title={"Chi Tiết Đơn Hàng"} path={"orderDetails"} />
            }
          />
        </Route>

        <Route path="/admin">
          <Route
            path="/admin"
            element={
              !user || !user.admin ? (
                <Navigate to={"/admin/login"} />
              ) : (
                <AdminPage />
              )
            }
          />
          <Route path="/admin/login" element={<LoginAdminPage />} />
          <Route
            path="/admin/create/:create"
            element={
              !user || !user.admin ? (
                <Navigate to={"/admin/login"} />
              ) : (
                <CreatePage />
              )
            }
          />
          <Route
            path="/admin/:manage"
            element={
              !user || !user.admin ? (
                <Navigate to={"/admin/login"} />
              ) : (
                <AdminPage />
              )
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
