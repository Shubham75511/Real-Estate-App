import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; //Link
import { useSelector } from "react-redux"; //useSelector
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user); //useSelector to get user from auth state
  const [ searchTerm, setSearchTerm ] = useState(" "); //useSelector to get search term from search state
  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlparams = new URLSearchParams(window.location.search); 
    urlparams.set("searchTerm", searchTerm); 
    const searchQuery = urlparams.toString();
    navigate(`/search?${searchQuery}`); 
  }

  useEffect(() => {
    const urlparams = new URLSearchParams(location.search); 
    const searchTermFromUrl = urlparams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl); //set search term from url
    }
  }, [location.search]); //useEffect to set search term from url params

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4 m">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Real</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 

          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-7">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="w-7 h-7 rounded-full object-cover"
                src={currentUser.avatar}
                alt= 'profile'
              />
            ) : (
              <li className="text-slate-700 hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
