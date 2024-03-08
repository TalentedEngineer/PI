import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/UserSlice";
import Cookies from "js-cookie";

function RegisterUserDetails() {
  const dispatch = useDispatch();

  let { verificationToken } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [languages, setLanguages] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/verifyemail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        verificationToken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.emailValidated) {
          navigate("/login");
          return;
        }

        if (data.error) {
          navigate("/signup");
          return;
        }
        setUserDetails(data.user);
      });
  }, [verificationToken, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (name.length > 50) {
      errors.name = "Name is too long. Maximum length is 50";
    }

    if (!username.trim()) {
      errors.username = "Username is required";
    }

    if (!languages.trim()) {
      errors.languages = "Languages is required";
    }

    if (languages.split(",").length > 5) {
      errors.languages = "Maximum 5 languages allowed";
    }

    if (!location.trim()) {
      errors.location = "Location is required";
    }

    if (location.length > 50) {
      errors.location = "Location is too long. Maximum length is 50";
    }

    if (!bio.trim()) {
      errors.bio = "Bio is required";
    }

    if (bio.length > 200) {
      errors.bio = "Bio is too long. Maximum length is 200";
    }

    if (!avatar) {
      errors.avatar = "Upload Profile picture";
    }

    if (username.includes(" ") || !/^[a-zA-Z0-9_-]*$/.test(username)) {
      errors.username = "Avoid spaces or special characters except _";
    }

    if (username.length < 3 || username.length > 20) {
      errors.username = "Username should be 3-20 characters long";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("languages", languages);
      formData.append("location", location);
      formData.append("bio", bio);
      formData.append("avatar", avatar);
      formData.append("userId", userDetails.userId);
      formData.append("email", userDetails.email);

      const userDetailsRequest = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/userdetails`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await userDetailsRequest.json();
      if (data.error && data.usernameExist) {
        setErrors({ username: data.message });
        setIsSubmitting(false);
        return;
      }
      if (data.error) {
        alert(data.message);
        setIsSubmitting(false);
        return;
      }
      if (data.user) {
        setIsSubmitting(false);
        dispatch(setUser(data.user));
        localStorage.setItem("user", JSON.stringify(data.user));
        Cookies.set("authId", data.user.jwtToken);
        navigate("/dashboard");
      }
    }
  };

  return (
    <>
      <div className="bg-transparent hombg">
        <Header transparent={true} />
      </div>

      <div className="authbg">
        <div className="container mx-auto py-28">
          <div
            className={`md:w-3/5 w-full mx-auto bg-white rounded-xl p-7 shadow-lg text-gray-800`}
          >
            <div className="border-b mb-5 pb-5 border-gray-100">
              <h3 className="text-2xl font-extrabold text-center mb-2">
                Email Verified Successfully
              </h3>
              <p className="text-center text-sm">
                Thank you for verifiying your email address. Please fill out the
                form below to complete your registration.
              </p>
            </div>

            <form className="text-left" onSubmit={handleSubmit}>
              <div className="flex justify-center mb-8 items-center gap-6 md:flex-row flex-col">
                <div>
                  {/* Avatar/DP */}
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected Avatar"
                      className="rounded-full w-40 h-40 mx-auto block bg-gray-100 object-cover"
                    />
                  ) : (
                    <div className="rounded-full w-40 h-40 mx-auto block bg-gray-100"></div>
                  )}
                  <div className="mt-3">
                    {errors.avatar && (
                      <span className="text-red-400 text-sm font-medium px-4">
                        {errors.avatar}
                      </span>
                    )}

                    <label
                      for="avatar"
                      className="rounded-lg bg-gray-800 hover:opacity-80 p-2 outline-none cursor-pointer text-white text-sm block"
                    >
                      Choose profile picture
                    </label>
                    <input
                      name="avatar"
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center gap-6 md:flex-row flex-col">
                <div className="w-full">
                  <label className="block text-sm font-semibold mb-2">
                    Full Name<span className="text-red-500 ml-2">*</span>
                  </label>
                  <input
                    type="text"
                    className="rounded-xl bg-gray-50 focus:bg-white border-2 border-gray-200 hover:bg-gray-100 focus:border-nft-primary-light w-full p-4 outline-none"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <span className="text-red-400 text-sm font-medium px-4">
                      {errors.name}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-sm font-semibold mb-2">
                    Username<span className="text-red-500 ml-2">*</span>
                  </label>
                  <input
                    type="text"
                    className="rounded-xl bg-gray-50 focus:bg-white border-2 border-gray-200 hover:bg-gray-100 focus:border-nft-primary-light w-full p-4 outline-none"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.username && (
                    <span className="text-red-400 text-sm font-medium px-4">
                      {errors.username}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center gap-6 md:flex-row flex-col my-5">
                <div className="w-full">
                  <label className="block text-sm font-semibold mb-2">
                    Languages<span className="text-red-500 ml-2">*</span>
                  </label>
                  <input
                    type="text"
                    className="rounded-xl bg-gray-50 focus:bg-white border-2 border-gray-200 hover:bg-gray-100 focus:border-nft-primary-light w-full p-4 outline-none"
                    placeholder="Languages you speak/understand"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                  />

                  {errors.languages && (
                    <span className="text-red-400 text-sm font-medium px-4">
                      {errors.languages}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-sm font-semibold mb-2">
                    Location<span className="text-red-500 ml-2">*</span>
                  </label>
                  <input
                    type="text"
                    className="rounded-xl bg-gray-50 focus:bg-white border-2 border-gray-200 hover:bg-gray-100 focus:border-nft-primary-light w-full p-4 outline-none"
                    placeholder="Enter your city or country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />

                  {errors.location && (
                    <span className="text-red-400 text-sm font-medium px-4">
                      {errors.location}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center gap-6 md:flex-row flex-col my-5">
                <div className="w-full">
                  <label className="block text-sm font-semibold mb-2">
                    Bio<span className="text-red-500 ml-2">*</span>
                  </label>
                  <textarea
                    type="text"
                    className="rounded-xl bg-gray-50 focus:bg-white border-2 border-gray-200 hover:bg-gray-100 focus:border-nft-primary-light w-full p-4 outline-none resize-none h-40"
                    placeholder="Write a short bio about yourself"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>

                  {errors.bio && (
                    <span className="text-red-400 text-sm font-medium px-4">
                      {errors.bio}
                    </span>
                  )}
                </div>
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
                      <span>Continue</span>
                      <ArrowSmallRightIcon className="inline-block w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default RegisterUserDetails;
