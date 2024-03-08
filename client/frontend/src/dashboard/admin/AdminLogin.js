import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Please fill all the fields");
    }

    if (
      email !== process.env.REACT_APP_ADMIN_EMAIL ||
      password !== process.env.REACT_APP_ADMIN_PASSWORD
    ) {
      return alert("Invalid Credentials");
    } else {
      Cookies.set("adminAuth", process.env.REACT_APP_ADMIN_AUTH_ID);
      window.location.href = "/admin";
    }
  };

  useEffect(() => {
    if (
      Cookies.get("adminAuth") &&
      Cookies.get("adminAuth") === process.env.REACT_APP_ADMIN_AUTH_ID
    ) {
      window.location.href = "/admin";
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-full bg-nft-primary-light h-screen">
      <div className="shadow-xl bg-white p-5 rounded-xl w-full max-w-md">
        <h1 className="mb-4 text-xl font-bold text-center ">Admin Login</h1>

        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-2 mb-3">
            <label>E-mail</label>
            <input
              type="email"
              required
              className="p-3 bg-gray-200 border rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input
              type="password"
              required
              className="p-3 bg-gray-200 border rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="p-3 mt-3 bg-nft-primary-light w-full text-center text-white rounded-xl"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
