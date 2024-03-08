import React, { useState } from "react";
import {
  LightBulbIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setFormStep } from "../../../../redux/slices/NewGigSlice";

const GalleryTab = ({
  images,
  setImages,
  imagePreviews,
  setImagePreviews,
  video,
  setVideo,
}) => {
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoLoading, setIsVideoLoaing] = useState(false);

  const handleVideoUpload = async (e) => {
    setIsVideoLoaing(true);
    const fd = new FormData();
    fd.append("video", e.target.files[0]);
    const request = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/uploadVideoToCloudinary`,
      {
        method: "POST",
        headers: {
          "x-auth-token": user.jwtToken,
        },
        body: fd,
      }
    );

    const response = await request.json();
    console.log(response);
    setVideo(response.result.url);
    setIsVideoLoaing(false);
  };

  const uploadImagetoCloudinary = async (image, index) => {
    const fd = new FormData();
    fd.append("images", image);
    const request = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/uploadImagetoCloudinary`,
      {
        method: "POST",
        headers: {
          "x-auth-token": user.jwtToken,
        },
        body: fd,
      }
    );

    const response = await request.json();
    console.log(response.response);

    const updatedImages = [...images];
    updatedImages[index] = response.response.url;

    // Use the state updater function to correctly update the state
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = response.response.url;
      return newImages;
    });

    setImagePreviews((prevImagePreviews) => {
      const newImagePreviews = [...prevImagePreviews];
      newImagePreviews[index] = response.response.url;
      return newImagePreviews;
    });
  };

  const handleImageChange = async (e, index) => {
    setIsLoading(true);
    if (!e.target.files[0]) {
      setIsLoading(false);
      return;
    }
    await uploadImagetoCloudinary(e.target.files[0], index);
    setIsLoading(false);
    return;
  };

  const dispatch = useDispatch();
  const formStep = useSelector((state) => state.gig.formStep);
  const handlePrev = () => {
    dispatch(setFormStep(formStep - 1));
  };

  const validateForm = () => {
    let errors = {};

    if (images && images.length === 0) {
      errors.images = "Please upload at least one image";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(setFormStep(formStep + 1));
    }
  };

  return (
    <div id="gallery" className="text-sm">
      <div className="p-4 pb-5 text-3xl border-b mb-6 pt-2 text-gray-800 font-normal border-gray-100">
        <h2>Gallery & Media</h2>
        <p className="text-sm mt-1">
          Show off Your Gig with eye-catching Images and Videos
        </p>
      </div>

      <div className="flex justify-between">
        <div className="text-gray-600 p-4 md:w-3/4 w-full">
          <div className="border-b border-gray-100 pb-8 mb-7">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <span className="text-xl">Gig Photos</span>
                <span>
                  Upload photos that describe or are related to your Gig.
                </span>
              </div>
              <div>(0/3)</div>
            </div>

            <div className="flex justify-evenly mt-10 gap-3">
              {isLoading ? (
                <div className="flex w-full h-52 justify-center items-center m-auto gap-1 flex-col z-50">
                  <div className="border-t-gray-700 border-4 w-10 h-10 flex items-center justify-center rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-700 font-medium">
                    Uploading...
                  </span>
                </div>
              ) : (
                imagePreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center h-52 w-1/3 cursor-pointer text-center relative"
                  >
                    <input
                      type="file"
                      id={`image${index + 1}`}
                      name={`image${index + 1}`}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        handleImageChange(e, index);
                      }}
                    />
                    <label
                      for={`image${index + 1}`}
                      className={`cursor-pointer border-2 border-gray-300 text-gray-600 rounded-lg overflow-hidden py-0 px-0 hover:opacity-80 w-full h-full flex items-center flex-col justify-center border-dashed gap-0 group`}
                    >
                      {preview ? (
                        <img
                          src={preview}
                          alt="Selected"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <PhotoIcon className="w-16 h-16 text-gray-300" />
                      )}
                      <p className="text-sm font-semibold block">
                        {!preview && "Browse a Photo to Upload"}
                      </p>

                      {preview && (
                        <div className="absolute top-0 right-0 w-full h-full items-center justify-center bg-black rounded-xl bg-opacity-50 text-white text-sm hidden group-hover:flex">
                          <span className="bg-gray-800 p-2 rounded-xl">
                            Change Photo
                          </span>
                        </div>
                      )}
                    </label>
                  </div>
                ))
              )}
            </div>

            {errors.images && (
              <div className="text-red-500 text-sm mt-2">{errors.images}</div>
            )}
          </div>

          <div className="border-b border-gray-100 pb-8 mb-7">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <span className="text-xl">Gig Video</span>
                <span>
                  Capture buyers’ attention with a short video that showcases.
                </span>
              </div>
              <div>(0/1)</div>
            </div>

            <div className="flex justify-start mt-10 gap-3">
              {isVideoLoading ? (
                <div className="flex w-full h-52 justify-center items-center m-auto gap-1 flex-col z-50">
                  <div className="border-t-gray-700 border-4 w-10 h-10 flex items-center justify-center rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-700 font-medium">
                    Uploading...
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center h-52 w-1/3 cursor-pointer text-center relative">
                  <input
                    type="file"
                    id="video"
                    name="video"
                    className="hidden"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    required
                  />
                  <label
                    className={`cursor-pointer border-2 border-gray-300 text-gray-600 rounded-lg overflow-hidden py-0 px-0 hover:opacity-80 w-full h-full flex items-center flex-col justify-center border-dashed gap-0 group`}
                    htmlFor="video"
                  >
                    {video ? (
                      <video
                        src={video}
                        alt="Selected"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <VideoCameraIcon className="w-16 h-16 text-gray-300" />
                    )}
                    <p className="text-sm font-semibold block">
                      {!video && "Browse a Photo to Upload"}
                    </p>

                    {video && (
                      <div className="absolute top-0 right-0 w-full h-full items-center justify-center bg-black rounded-xl bg-opacity-50 text-white text-sm hidden group-hover:flex">
                        <span className="bg-gray-800 p-2 rounded-xl">
                          Change Video
                        </span>
                      </div>
                    )}
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="flex w-full justify-between p-4 px-0 pb-0 mt-5 text-base">
            <div>
              <button className="rounded-xl px-6 py-3 bg-gray-200 text-gray-800 font-semibold inline-block relative cursor-pointer hover:opacity-80 transition-colors border border-gray-300">
                Cancel
              </button>
            </div>
            <div className="flex gap-4">
              <button
                className="rounded-xl px-6 py-3 bg-nft-primary-light text-white font-semibold inline-block relative cursor-pointer hover:opacity-80 transition-colors shadow-lg shadow-purple-200"
                onClick={handlePrev}
              >
                Previous
              </button>
              <button
                className="rounded-xl px-6 py-3 bg-nft-primary-light text-white font-semibold inline-block relative cursor-pointer hover:opacity-80 transition-colors shadow-lg shadow-purple-200"
                onClick={handleSubmit}
              >
                Save and Continue
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 md:w-1/4 md:block hidden">
          <div className="flex justify-center items-center sticky top-0">
            <div className=" bg-purple-200 w-full p-3 rounded-xl">
              <div className="text-center -mt-8">
                <span className="rounded-full bg-nft-primary-light p-2 inline-block">
                  <LightBulbIcon className=" w-7 h-7 text-white" />
                </span>
              </div>

              <div>
                <h2 className="text-center font-semibold mb-3 text-gray-600">
                  Start Defining Your Gig
                </h2>
                <div>
                  <ul className="list-disc px-7 pb-0 pt-0 text-md text-gray-600">
                    <li className="mb-2">Choose a catchy title.</li>
                    <li className="mb-2">
                      Choose a category and subcategory that best describe
                    </li>
                    <li className="mb-2">
                      Add metadata tags to help buyers find your gig in
                    </li>
                    <li className="mb-2">
                      Add tags that describe your gig. Use letters and numbers.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryTab;
