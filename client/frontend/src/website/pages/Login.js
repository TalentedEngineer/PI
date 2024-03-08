import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/UserSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (email.length > 50) {
      errors.email = "Email address is too long";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    }
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (password.length > 50) {
      errors.password = "Password is too long. Maximum length is 50";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      fetch(`${process.env.REACT_APP_API_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsSubmitting(false);

          if (data.error && data.emailNotFound) {
            setErrors({ email: data.message });
            return;
          }

          if (data.error && data.incorrectPassword) {
            setErrors({ password: data.message });
            return;
          }

          dispatch(setUser(data.user));
          localStorage.setItem("user", JSON.stringify(data.user));
          Cookies.set("authId", data.token);
          navigate("/dashboard");
        })
        .catch((err) => {
          setIsSubmitting(false);
          setErrors({ message: err.message });
        });
    }
  };

  return (
    <>
      <div className="bg-transparent hombg">
        <Header transparent={true} />
      </div>

      <div className="authbg">
        <div className="container mx-auto py-28">
          <div>
            <div className="md:w-2/5 w-full mx-auto bg-white rounded-xl p-7 shadow-lg text-gray-800">
              <h3 className="text-3xl font-extrabold text-center mb-2">
                Login
              </h3>
              <p className="text-center text-sm">
                Give your visitor a smooth online experience with a solid UX
                design
              </p>
              <form className="mt-10 text-left" onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">
                    Email<span className="text-red-500 ml-2">*</span>
                  </label>
                  <input
                    type="email"
                    className="rounded-xl bg-gray-50 focus:bg-white border-2 border-gray-200 hover:bg-gray-100 focus:border-nft-primary-light w-full p-4 outline-none"
                    placeholder="Please enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  {errors.email && (
                    <span className="text-red-400 text-sm font-medium px-4">
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">
                    Password<span className="text-red-500 ml-2">*</span>
                  </label>
                  <input
                    type="password"
                    className="rounded-xl bg-gray-50 focus:bg-white border-2 border-gray-200 hover:bg-gray-100 focus:border-nft-primary-light w-full p-4 outline-none"
                    placeholder="Please enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {errors.password && (
                    <span className="text-red-400 text-sm font-medium px-4">
                      {errors.password}
                    </span>
                  )}
                </div>

                    <div class="flex flex-col text-sm text-gray-800">
    <span class="font-semibold">Test User</span>
    <span class="text-xs">E-mail: joharkhan@mailsac.com</span>
    <span class="text-xs">Password: joharkhan@mailsac.com</span>
</div>

                <div className="mt-10">
                  <button
                    className="bg-nft-primary-light h-full py-5 px-10 rounded-xl font-semibold text-white hover:opacity-80 transition-colors text-sm w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="h-5 w-5 mx-auto rounded-full border-t border-r animate-spin border-white"></div>
                    ) : (
                      <>
                        <span>Continue</span>
                        <ArrowSmallRightIcon className="inline-block w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="flex items-center space-x-4 my-8">
                <hr className="flex-1 border-t border-gray-200" />
                <div className="text-sm font-medium uppercase">or</div>
                <hr className="flex-1 border-t border-gray-200" />
              </div>

              <button className="bg-gray-200 h-full py-4 px-10 rounded-xl font-semibold text-gray-700 hover:opacity-80 transition-colors text-sm w-full flex items-center justify-center gap-5">
                <span>
                  <img
                    src={require("../assets/google.png")}
                    alt=""
                    className="w-7 h-7"
                  />
                </span>
                <span>Sign In with Google</span>
              </button>
              <div className="flex gap-2 text-sm text-gray-400 justify-center mt-6">
                <span>Don't have an account?</span>
                <Link
                  to="/signup"
                  className="text-nft-primary-light font-medium"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
export default Login;
