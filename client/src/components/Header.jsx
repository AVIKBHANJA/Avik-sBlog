import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
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
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Avik's
        </span>
        Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      {/* Navigation Links - Visible only on md and larger screens */}
      <div className="hidden md:flex items-center">
        <Link
          to="/"
          className={`mr-4 font-medium ${
            path === "/"
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`mr-4 font-medium ${
            path === "/about"
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          }`}
        >
          About
        </Link>
      </div>

      <div className="flex gap-2 md:order-2">
        <button
          type="button"
          onClick={() => dispatch(toggleTheme())}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hidden sm:flex
                   bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 
                   text-yellow-500 dark:text-blue-400 hover:scale-110"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <FaSun className="w-5 h-5" />
          ) : (
            <FaMoon className="w-5 h-5" />
          )}
        </button>

        {/* Mobile Navigation Dropdown */}
        <div className="md:hidden">
          <Dropdown
            arrowIcon={true}
            inline
            label={<HiMenu className="w-5 h-5" />}
            dismissOnClick={true}
          >
            <Dropdown.Item as="div">
              <Link
                to="/"
                className={`block w-full text-left ${
                  path === "/" ? "text-blue-600 dark:text-blue-400" : ""
                }`}
              >
                Home
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as="div">
              <Link
                to="/about"
                className={`block w-full text-left ${
                  path === "/about" ? "text-blue-600 dark:text-blue-400" : ""
                }`}
              >
                About
              </Link>
            </Dropdown.Item>
          </Dropdown>
        </div>

        {currentUser ? (
          <Dropdown
            arrowIcon={true}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
      </div>

      {/* Remove the old Navbar.Collapse as we've replaced it with our own responsive navigation */}
    </Navbar>
  );
}
