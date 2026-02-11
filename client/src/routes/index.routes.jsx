import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import SearchPage from "../pages/home/SearchPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import OptVerification from "../pages/auth/OptVerification";
import ResetPassword from "../pages/auth/ResetPassword";
import UserMenuMobile from "../pages/user/UserMenuMobile";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/user/Profile";
import MyOrders from "../pages/user/MyOrders";
import Address from "../pages/user/Address";
import ProductAdmin from "../pages/home/ProductAdmin";
import Category from "../pages/home/Category";
import SubCategory from "../pages/home/SubCategory"
import UploadProduct from "../pages/admin/UploadProduct";
import AdminPermission from "../layout/AdminPermission";
import ProductLists from "../pages/home/ProductLists";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <OptVerification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "user",
        element: <UserMenuMobile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "myOrders",
            element: <MyOrders />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "category",
            element: (
              <AdminPermission>
                <Category />
              </AdminPermission>
            ),
          },
          {
            path: "sub-category",
            element: (
              <AdminPermission>
                <SubCategory />
              </AdminPermission>
            ),
          },
          {
            path: "upload-product",
            element: (
              <AdminPermission>
                <UploadProduct />
              </AdminPermission>
            ),
          },
          {
            path: "product",
            element: (
              <AdminPermission>
                <ProductAdmin />
              </AdminPermission>
            ),
          },
        ],
      },
      {
        path: ":category",
        children: [
          {
            path: ":subCategory",
            element: <ProductLists/> 
          }
        ]
      }
    ],
  },
]);

export default router;
