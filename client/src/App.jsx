import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { setAllCategory, setAllSubCategory } from "./store/productSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApis";
import { AxiosError } from "axios";

function App() {
  const dispatch = useDispatch();

  // fetching user details
  const fetchUser = async () => {
    const userDetails = await fetchUserDetails();
    // console.log("user data: ", userDetails.data);
    dispatch(setUserDetails(userDetails.data));
  };

  // fetching category
  const fetchCategory = async () => {
    try {
      // dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(
          setAllCategory(responseData.data),
          // responseData.data.sort((a, b) => a.name.localeCompare(b.name))
        );
      }
    } catch (error) {
      AxiosError(error);
    }
  };
  
  // fetching subcategory
  const fetchSubCategory = async () => {
    try {
      // dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(
          setAllSubCategory(responseData.data),
        );
      }
    } catch (error) {
      AxiosError(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  });
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-139px)]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
