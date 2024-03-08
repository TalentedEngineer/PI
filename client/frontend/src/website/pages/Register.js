import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  ArrowSmallRightIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (email.length > 50 || email.length < 6) {
      errors.email = "Email address must be between 6 and 60 characters long";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    }

    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (password.length > 50) {
      errors.password = "Password must be at most 50 characters long";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!termsChecked) {
      errors.terms = "You must agree to the Terms and Conditions";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      fetch(`${process.env.REACT_APP_API_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setErrors({ email: data.message });
          } else {
            alert(data.message);
            setShowVerifyEmail(true);
          }
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsSubmitting(false);
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
            <div
              className={`md:w-2/5 w-full mx-auto bg-white rounded-xl p-7 shadow-lg text-gray-800 ${
                showVerifyEmail && "hidden"
              }`}
            >
              <h3 className="text-3xl font-extrabold text-center mb-2">
                Register
              </h3>
              <p className="text-center text-sm">
                Give your visitor a smooth online experience with a solid UX
                design
              </p>
              <form className="mt-10 text-left" onSubmit={handleSubmit}>
                {/* Email input */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">
                    Email<span className="text-red-500 ml-2">*</span>
                  </label>
                  <input
                    type="email"
                    className="rounded-xl bg-gray-50 focus:bg-white border-2 border-gray-200 hover:bg-gray-100 focus:border-nft-primary-light w-full p-4 outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Please enter your email address"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <span className="text-red-400 text-sm font-medium px-4">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Password input with show/hide feature */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">
                    Password<span className="text-red-500 ml-2">*</span>
                  </label>
                  <div className="relative">
                    <button
                      className="absolute right-3 top-5 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      {showPassword ? (
                        <EyeIcon className="w-5 h-5 ml-2" />
                      ) : (
                        <EyeSlashIcon className="w-5 h-5 ml-2" />
                      )}
                    </button>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="rounded-xl bg-gray-50 focus:bg-white border-2 border-gray-200 hover:bg-gray-100 focus:border-nft-primary-light w-full p-4 outline-none"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Please enter your password"
                      disabled={isSubmitting}
                    />
                    {errors.password && (
                      <span className="text-red-400 text-sm font-medium px-4">
                        {errors.password}
                      </span>
                    )}
                  </div>
                </div>

                {/* Confirm Password input */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">
                    Confirm Password
                    <span className="text-red-500 ml-2">*</span>
                  </label>
                  <input
                    type="password"
                    className="rounded-xl bg-gray-50 focus:bg-white border-2 border-gray-200 hover:bg-gray-100 focus.border-nft-primary-light w-full p-4 outline-none"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Please confirm your password"
                    disabled={isSubmitting}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-400 text-sm font-medium px-4">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>

                {/* terms and conditions checkbox */}
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded-xl bg-gray-50 focus:bg-white border-2 border-gray-200 hover:bg-gray-100 focus.border-nft-primary-light w-4 h-4 p-4 outline-none accent-nft-primary-light cursor-pointer"
                      id="terms"
                      disabled={isSubmitting}
                      checked={termsChecked}
                      onChange={(e) => setTermsChecked(e.target.checked)}
                    />
                    <label className="ml-2 text-sm" htmlFor="terms">
                      I agree to the{" "}
                      <Link
                        to="/terms-and-conditions"
                        target="_blank"
                        className="text-nft-primary-light font-medium"
                      >
                        Terms and Conditions of Use.
                      </Link>
                    </label>
                  </div>

                  {errors.terms && (
                    <span className="text-red-400 text-sm font-medium px-4">
                      {errors.terms}
                    </span>
                  )}
                </div>

                {/* Submit button */}
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
                        <span>Register Now</span>
                        <ArrowSmallRightIcon className="inline-block w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Or separator */}
              <div className="flex items-center space-x-4 my-8">
                <hr className="flex-1 border-t border-gray-200" />
                <div className="text-sm font-medium uppercase">or</div>
                <hr className="flex-1 border-t border-gray-200" />
              </div>

              {/* Sign Up with Google button */}
              <button className="bg-gray-200 h-full py-4 px-10 rounded-xl font-semibold text-gray-700 hover:opacity-80 transition-colors text-sm w-full flex items-center justify-center gap-5">
                <span>
                  <img
                    src={require("../assets/google.png")}
                    alt=""
                    className="w-7 h-7"
                  />
                </span>
                <span>Sign Up with Google</span>
              </button>

              {/* Login link */}
              <div className="flex gap-2 text-sm text-gray-400 justify-center mt-6">
                <span>Already have an account?</span>
                <Link
                  to="/login"
                  className="text-nft-primary-light font-medium"
                >
                  Login
                </Link>
              </div>
            </div>

            <div
              className={`md:w-2/5 w-full mx-auto bg-white rounded-xl p-14 shadow-lg text-gray-800 ${
                !showVerifyEmail && "hidden"
              }`}
            >
              <h3 className="text-3xl font-extrabold text-center mb-2">
                Verification Email Sent
              </h3>
              <p className="text-center text-sm mt-5">
                A verification email has been sent to your email address{" "}
                <b>{email}</b>. Please check your email for a verification link.
                If you don't see it, check your spam folder.
                <br /> Thank you!
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Register;
