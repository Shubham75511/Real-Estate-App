import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { signInStart , signInFailure, signInSuccess} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

// SignIn component for user authentication
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user); // Extract loading and error from user state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handleChange function to update formData state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart()); // Dispatch signInStart action to update loading state
      //fetch method to request for our api route.
      //api route address: localhost:3000/api/auth/signin
      const res = await fetch(
        "/api/auth/signin", // fetch request
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // stringify formData
        } // send information(formData) from body of the browser.
      );
      const data = await res.json(); //change & convert response to json
      if (!res.ok) {
        dispatch(signInFailure(data.message)); // Dispatch signInFailure action with error message
        return;
      }
      dispatch(signInSuccess(data)); // Dispatch signInSuccess action with user data
      navigate("/"); // redirect to Home page after successful signin
    } catch (error) {
      dispatch(signInFailure(error.message)); // Dispatch signInFailure action with error message
    }
  };
  // console.log(data);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg focus:outline-none"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
