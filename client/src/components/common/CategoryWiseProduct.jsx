import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "./../../utils/Axios";
import SummaryApis from "./../../api/SummaryApis";
import AxiosToastError from "./../../utils/AxiosToastError";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";

const CategoryWiseProduct = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApis.getProductByCategory,
        data: {
          id: id,
        },
      });
      const { data: responseData } = response;
      // console.log(responseData);
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, []);

  const loadingCardNumber = new Array(6).fill(null);

  return (
    <div>
      <div className="container mx-auto p-4 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-lg md:text-xl lg:text-2xl">{name}</h3>
        <Link to="" className="text-green-600 hover:text-green-450">
          See All
        </Link>
      </div>
      <div className="container mx-auto flex items-center gap-4 md:gap-6 lg:gap-10 p-4">
        {loading &&
          loadingCardNumber.map((_, index) => {
            return (
              <CardLoading key={"categoryWiseProductDisplay" + index} />
            );
          })}
        {data.map((p, index) => {
          return (
            <CardProduct data={p} key={p._id + "categoryWiseProductDisplay" + index} />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryWiseProduct;
