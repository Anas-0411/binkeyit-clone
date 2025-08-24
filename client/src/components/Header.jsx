import Search from "./Search";
import Logo from "./Logo";
import useMobile from "../hooks/useMobile";
import { useLocation} from "react-router-dom";
import Login from "./Login";

const Header = () => {
  const [isMobile] = useMobile();
  const isLocation = useLocation();
  const isSearchPage = isLocation.pathname === "/search";
  console.log("isLocation:", isLocation.pathname);
  console.log("isMobile:", isMobile);
  console.log("isSearchPage:", isSearchPage);
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
            <Login />
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
