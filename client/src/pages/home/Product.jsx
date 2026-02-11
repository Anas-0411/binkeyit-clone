// import React from "react";
// import { useState, useEffect } from "react";
// import Axios from "./../../utils/Axios";
// import SummaryApis from "./../../api/SummaryApis";
// import AxiosToastError from "./../../utils/AxiosToastError";

// const Product = () => {
//   const [productData, setProductData] = useState([]);
//   const [page, setPage] = useState(1);
//   const fetchProduct = async () => {
//     try {
//       const response = await Axios({
//         ...SummaryApis.getAllProducts,
//         data: {
//           page: page,
//         },
//       });
//       const { data: responseData } = response;
//       console.log(responseData);
//       if (responseData.success) {
//         setProductData(responseData.data);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };
//   useEffect(() => {
//     fetchProduct();
//   });
//   return <div>Product</div>;
// };

// export default Product;
