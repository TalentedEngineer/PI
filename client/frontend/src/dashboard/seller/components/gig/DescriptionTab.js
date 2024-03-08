import { LightBulbIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { setFormStep } from "../../../../redux/slices/NewGigSlice";

const DescriptionTab = ({ description, setDescription }) => {
  const dispatch = useDispatch();
  const formStep = useSelector((state) => state.gig.formStep);
  const [errors, setErrors] = useState({});

  const formats = [
    // "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "color",
  ];
  const quillmodules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const handlePrev = () => {
    dispatch(setFormStep(formStep - 1));
  };

  const validateForm = () => {
    let errors = {};

    if (description === null) {
      errors.description = "Description cannot be empty";
    }
    if (description && description.trim().length < 120) {
      errors.description = "Description must be at least 120 characters long";
    }
    if (description && description.trim().length > 1200) {
      errors.description = "Description cannot exceed 1200 characters";
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
    <div id="description">
      <div className="p-4 text-3xl border-b mb-6 pt-2 text-gray-800 font-normal border-gray-100">
        <h2>Description</h2>
      </div>

      <div className="flex justify-between">
        <div className="text-gray-600 p-4 md:w-2/3 w-full">
          <div className="flex flex-col gap-10">
            <div>
              <label className="capitalize font-bold text-sm mb-2 block">
                Briefly Describe Your Gig
              </label>
              <div style={{ height: "250px" }}>
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  formats={formats}
                  modules={quillmodules}
                  className="resize-none block outline-none placeholder:text-gray-200 focus:ring-2 focus:ring-nft-primary-light max-h-full h-full"
                />
              </div>
            </div>

            <div className="mt-2 flex justify-between items-center">
              <span className="block text-right text-xs text-gray-400 italic">
                min. 120
              </span>
              <span className="block text-right text-xs text-gray-400 italic">
                {description && description.trim().length}/1200 characters
              </span>
            </div>

            {errors.description && (
              <span className="text-red-400 text-sm font-medium px-2">
                {errors.description}
              </span>
            )}
          </div>
        </div>

        <div className="p-4 md:w-1/3 md:block hidden">
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

      <div className="flex w-full justify-between md:w-2/3 p-4 pb-0 mt-5">
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
  );
};

export default DescriptionTab;
