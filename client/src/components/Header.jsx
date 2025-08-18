import Search from "./Search";
import Logo from "./Logo";
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Header = () => {
  const [isMobile] = useMobile();
  const isLocation = useLocation();
  const isSearchPage = isLocation.pathname === "/search";
  console.log("isLocation:", isLocation.pathname);
  console.log("isMobile:", isMobile);
  console.log("isSearchPage:", isSearchPage);
  const navigate = useNavigate();
  // const user = useSelector((state) => state?.user);
  // console.log("user from store", user);

  const redirectToLoginPage = () => {
    navigate("/login");
  };
  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 flex flex-col justify-center gap-1 bg-white">
      {!(isMobile && isSearchPage) && (
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* logo */}
          <div>
            <Logo />
          </div>
          {/* search bar */}
          <div className="hidden lg:block">
            <Search />
          </div>
          {/* login and my cart */}
          <div>
            {/* display only in mobile version */}
            <button
              className="text-neutral-600 lg:hidden"
              onClick={redirectToLoginPage}
              aria-label="User Profile"
            >
              <FaRegUserCircle size={26} />
            </button>
            {/* display only in desktop version */}
            <div className="hidden lg:flex items-center gap-10">
              <button
                onClick={redirectToLoginPage}
                className="text-lg p-4 text-green-700 font-semibold"
              >
                Login
              </button>
              <button className="flex items-center gap-2 bg-green-700 hover:bg-green-800 px-4 py-2 rounded text-white">
                {/* add to cart button */}
                <div className="animate-bounce">
                  <FaCartShopping size={26} />
                </div>
                <div className="font-bold">
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
