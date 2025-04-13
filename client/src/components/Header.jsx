import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className="border-b-2 shadow-sm py-4 dark:bg-gray-800 transition-all duration-300">
      {/* Logo */}
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white flex items-center"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white shadow-md hover:shadow-lg transition-all duration-300">
          Avik's
        </span>
        <span className="ml-2">Blog</span>
      </Link>

      {/* Integrated Search Bar */}
      <div className="flex-grow flex justify-center mx-4">
        <form onSubmit={handleSubmit} className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 bg-gray-50
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                     dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
            aria-label="Search"
          >
            <AiOutlineSearch className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Navigation Links - Desktop */}
      <div className="hidden md:flex items-center mr-4">
        <Link
          to="/"
          className={`font-medium text-base transition-colors duration-200 mr-6 ${
            path === "/"
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400"
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`font-medium text-base transition-colors duration-200 ${
            path === "/about"
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400"
          }`}
        >
          About
        </Link>
      </div>

      {/* Right Side Items */}
      <div className="flex gap-3 items-center md:order-2">
        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={() => dispatch(toggleTheme())}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out
                   bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 
                   text-yellow-500 dark:text-blue-400 hover:scale-110 shadow-sm"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <FaSun className="w-5 h-5" />
          ) : (
            <FaMoon className="w-5 h-5" />
          )}
        </button>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Button
                color="gray"
                pill
                className="p-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                <HiMenu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              </Button>
            }
            dismissOnClick={true}
            theme={{
              floating: {
                base: "bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700",
                item: {
                  base: "flex items-center justify-start py-2.5 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer",
                },
              },
            }}
          >
            <Dropdown.Item as="div">
              <Link
                to="/"
                className={`block w-full text-left px-2 py-1 rounded ${
                  path === "/"
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                Home
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as="div">
              <Link
                to="/about"
                className={`block w-full text-left px-2 py-1 rounded ${
                  path === "/about"
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                About
              </Link>
            </Dropdown.Item>
          </Dropdown>
        </div>

        {/* User Menu */}
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div className="overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors duration-300">
                <Avatar
                  alt="user"
                  img={currentUser.profilePicture}
                  rounded
                  status="online"
                  statusPosition="bottom-right"
                  className="w-10 h-10"
                />
              </div>
            }
            theme={{
              floating: {
                base: "bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700",
                item: {
                  base: "flex items-center justify-start py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer",
                },
              },
            }}
          >
            <Dropdown.Header>
              <span className="block text-sm font-medium">
                @{currentUser.username}
              </span>
              <span className="block text-xs font-light text-gray-500 dark:text-gray-400 truncate mt-1">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item className="hover:bg-purple-50 dark:hover:bg-gray-700">
                <span className="font-medium">Profile</span>
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={handleSignout}
              className="hover:bg-purple-50 dark:hover:bg-gray-700"
            >
              <span className="text-red-500 font-medium">Sign out</span>
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button
              gradientDuoTone="purpleToPink"
              outline
              className="font-medium shadow-sm hover:shadow-md transition-all duration-300"
            >
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </Navbar>
  );
}
