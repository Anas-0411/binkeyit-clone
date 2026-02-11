import React, { useState, useEffect, useCallback } from "react";
import Axios from "../../utils/Axios";
import SummaryApis from "../../api/SummaryApis";
import AxiosToastError from "../../utils/AxiosToastError";
import Loading from "../../components/common/Loading";
import ProductCard from "../../components/admin/ProductCard";
import { GiPreviousButton } from "react-icons/gi";
import { GiNextButton } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  // handle next button
  const handleNextButton = () => {
    if (page !== totalPageCount) {
      setPage((preve) => preve + 1);
    }
  };

  // handle previous button
  const handlePreviousButton = () => {
    if (page > 1) {
      setPage((preve) => preve - 1);
    }
  };

  // fetch product
  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApis.getAllProducts,
        data: {
          page: page,
          limit: 12,
          search: search,
        },
      });

      const { data: responseData } = response;
      // console.log(responseData);

      if (responseData.success) {
        setTotalPageCount(responseData.totalPages);
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // handle on change
  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    let flag = true;
    const interval = setTimeout(() => {
      if (flag) {
        fetchProduct();
        flag = false;
      }
    }, 300);
    return () => {
      clearTimeout(interval);
    };
  }, [search, fetchProduct]);

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between gap-4">
        <h1 className="font-semibold text-xl"> Product</h1>
        <div className="bg-blue-50 px-4 py-2 flex items-center rounded-full gap-2 focus-within:border-amber-500 border-2">
          <IoSearchOutline size={20} />
          <input
            type="text"
            value={search}
            placeholder="Search product here..."
            className="h-full py-1 outline-none"
            onChange={handleOnChange}
          />
        </div>
      </div>
      {loading && <Loading />}
      <div className="p-4 bg-blue-50">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {productData.map((product, index) => {
            return <ProductCard key={product._id + index} data={product} />;
          })}
        </div>
        <div className="flex justify-between my-4">
          <button
            className="border border-yellow-500 px-4 py-2 hover:bg-yellow-500 hover:text-white rounded-full font-bold text-yellow-500 cursor-pointer"
            onClick={handlePreviousButton}
          >
            <GiPreviousButton size={20} />
          </button>
          <button className="w-20 bg-white rounded-full">
            {page}/{totalPageCount}
          </button>
          <button
            className="border border-yellow-500 px-4 py-2 hover:bg-yellow-500 hover:text-white rounded-full font-bold text-yellow-500 cursor-pointer"
            onClick={handleNextButton}
          >
            <GiNextButton size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductAdmin;
