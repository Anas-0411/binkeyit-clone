import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { setAllCategory } from "./store/productSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApis";

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
          setAllCategory(responseData.data)
          // responseData.data.sort((a, b) => a.name.localeCompare(b.name))
        );
      }
    } catch (error) {
    } finally {
      // dispatch(setLoadingCategory(false));
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
  }, []);
  return (
    <>
      <Header />
      <main className="min-h-[76vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
