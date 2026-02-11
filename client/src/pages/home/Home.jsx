import React from "react";
import banner from "../../assets/images/banner.jpg";
import bannerMobile from "../../assets/images/banner-mobile.jpg";
import { useSelector } from "react-redux";
import { validUrlConvert } from "../../utils/validUrlConverter";
import { useNavigate } from "react-router-dom";
import CategoryWiseProduct from "../../components/common/CategoryWiseProduct";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  // redirect product list page
  const handleRedirectProductListPage = (id, cat) => {
    // console.log(id, cat);
    const subCategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });
      return filterData ? true : null;
    });

    const url = `/${validUrlConvert(cat)}-${id}/${validUrlConvert(subCategory.name)}-${subCategory._id}`;
    navigate(url);
    // console.log(url);
  };

  return (
    <section className="bg-white">
      {/* banner */}
      <div className="container mx-auto">
        <div
          className={`w-full h-full min-h-60 bg-blue-100 rounded ${!banner && "animate-pulse my-2"}`}
        >
          <img
            src={banner}
            alt="banner"
            className="w-full h-full hidden lg:block"
          />
          <img
            src={bannerMobile}
            alt="banner"
            className="w-full h-full lg:hidden"
          />
        </div>
      </div>
      {/* shop by category */}
      <div className="container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-2">
        {loadingCategory
          ? new Array(12).fill(null).map((c, index) => {
              return (
                <div
                  className="bg-white rounded p-4 min-h-36 grid gap-2 shadow-md animate-pulse"
                  key={index + "loadingCategory"}
                >
                  <div className="bg-blue-100 min-h-24 rounded"></div>
                  <div className="bg-blue-100 h-10 rounded"></div>
                </div>
              );
            })
          : categoryData.map((cat) => {
              return (
                <div
                  key={cat._id + "displayCategory"}
                  className="w-full h-full cursor-pointer"
                  onClick={() =>
                    handleRedirectProductListPage(cat._id, cat.name)
                  }
                >
                  <div>
                    <img
                      src={cat.image}
                      alt=""
                      className="w-full h-full object-scale-down"
                    />
                  </div>
                  <div className="text-center">{cat.name}</div>
                </div>
              );
            })}
      </div>
      {/* display category product */}
      {categoryData.map((c, index) => {
        return (
          <CategoryWiseProduct
            id={c?._id}
            key={c?._id + "categoryWiseProduct" + index}
            name={c?.name}
          />
        );
      })}
    </section>
  );
};

export default Home;
