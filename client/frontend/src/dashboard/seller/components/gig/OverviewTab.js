import React, { useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckIcon,
  ChevronUpDownIcon,
  LightBulbIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { setFormStep } from "../../../../redux/slices/NewGigSlice";

const categories = [
  // Main Categories
  {
    name: "Influencer Services",
    subcategories: [
      {
        name: "Social Media Promotion",
      },
      {
        name: "Sponsored Posts",
      },
    ],
  },
  {
    name: "Live Streaming",
    subcategories: [
      {
        name: "Freelance Services",
      },
      {
        name: "Writing and Editing",
      },
      {
        name: "Graphic Design",
      },
      {
        name: "Web Development",
      },
      {
        name: "Video Editing",
      },
    ],
  },
  {
    name: "Music Services",
    subcategories: [
      {
        name: "Music Production",
      },
      {
        name: "Songwriting",
      },
      {
        name: "Instrumental Services",
      },
      {
        name: "Music Lessons",
      },
    ],
  },
  {
    name: "Art Services",
    subcategories: [
      {
        name: "Digital Art",
      },
      {
        name: "Traditional Art",
      },
      {
        name: "Custom Art Commissions",
      },
      {
        name: "Art Tutorials",
      },
    ],
  },
  {
    name: "Consulting Services",
    subcategories: [
      {
        name: "Business Consulting",
      },
      {
        name: "Marketing Strategy",
      },
      {
        name: "Career Counseling",
      },
      {
        name: "Financial Advice",
      },
    ],
  },
  {
    name: "Coaching Services",
    subcategories: [
      {
        name: "Life Coaching",
      },
      {
        name: "Fitness Coaching",
      },
      {
        name: "Career Coaching",
      },
      {
        name: "Personal Development",
      },
    ],
  },
];

const OverviewTab = ({
  title,
  keywords,
  setTitle,
  setKeywords,
  keywordInput,
  setKeywordInput,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
}) => {
  const dispatch = useDispatch();
  const formStep = useSelector((state) => state.gig.formStep);
  const [errors, setErrors] = useState({});

  const handlekeywordInputKeyDown = (e) => {
    if (e.key === "Enter" && keywordInput.trim() !== "") {
      if (keywords.length < 5) {
        setKeywords([...keywords, keywordInput.trim()]);
        setKeywordInput("");
      }
    }
  };

  const handleRemoveTag = (index) => {
    const newkeyword = [...keywords];
    newkeyword.splice(index, 1);
    setKeywords(newkeyword);
  };

  const subcategories = selectedCategory ? selectedCategory.subcategories : [];

  const validateForm = () => {
    const errors = {};
    if (selectedCategory === null) {
      errors.category = "Category is required";
    }
    if (selectedSubcategory === null) {
      errors.subcategory = "Subcategory is required";
    }
    if (keywords.length === 0) {
      errors.tags = "Tags are required";
    }
    if (title.trim() === "") {
      errors.title = "Title is required";
    }
    if (title.trim().length > 80) {
      errors.title = "Title must be less than 80 characters";
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
    <div id="overview">
      <div className="p-4 text-3xl border-b mb-6 pt-2 text-gray-800 font-normal border-gray-100">
        <h2>Overview</h2>
      </div>

      <div className="flex justify-between">
        <div className="text-gray-600 p-4 md:w-2/3 w-full">
          <div className="flex flex-col gap-10">
            <div>
              <label className="uppercase font-bold text-sm mb-2 block">
                Git Title
              </label>
              <textarea
                type="text"
                placeholder="I will do something I'm really good at"
                className="w-full text-5xl font-medium rounded-xl border-gray-200 border p-3 py-4 resize-none outline-none placeholder:text-gray-200 focus:ring-2 focus:ring-nft-primary-light"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="flex items-center justify-between">
                <span>
                  {errors.title && (
                    <span className="text-red-400 text-sm font-medium px-2">
                      {errors.title}
                    </span>
                  )}
                </span>
                <span className="text-right text-xs text-gray-400">
                  {title.length}/80 max
                </span>
              </div>
            </div>

            <div className="flex justify-between gap-8">
              <div className="w-full">
                <label className="uppercase font-bold text-sm mb-2 block">
                  Category
                </label>
                <div>
                  <Listbox
                    value={selectedCategory}
                    onChange={(newCategory) => {
                      setSelectedCategory(newCategory);
                      // setSelectedSubcategory(null);
                    }}
                  >
                    <div className="relative">
                      <Listbox.Button className="relative w-full cursor-pointer rounded-xl text-left font-medium hover:bg-gray-200 bg-gray-100 py-3 px-6 focus:ring-2 focus:ring-nft-primary-light text-sm">
                        <span className="block truncate text-md">
                          {selectedCategory
                            ? selectedCategory.name
                            : "Select a subcategory"}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                          <ChevronUpDownIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm rounded-xl bg-white shadow-2xl p-2 z-50">
                          {categories.map((cat, index) => (
                            <Listbox.Option
                              key={index}
                              className={({ active }) =>
                                `block py-4 rounded-lg relative cursor-default select-none pl-8 hover:bg-gray-100 text-gray-900`
                              }
                              value={cat}
                            >
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate text-md`}>
                                    {cat.name} {selected}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
                                      <CheckIcon
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>

                {errors.category && (
                  <span className="text-red-400 text-sm font-medium px-2">
                    {errors.category}
                  </span>
                )}
              </div>

              {subcategories.length > 0 && (
                <div className="w-full">
                  <label className="uppercase font-bold text-sm mb-2 block">
                    Sub-Category
                  </label>

                  <div>
                    <Listbox
                      value={selectedSubcategory}
                      onChange={(newSubcategory) => {
                        setSelectedSubcategory(newSubcategory);
                      }}
                    >
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-xl text-left font-medium hover:bg-gray-200 bg-gray-100 py-3 px-6 focus:ring-2 focus:ring-nft-primary-light text-sm">
                          <span className="block truncate text-md">
                            {selectedSubcategory
                              ? selectedSubcategory.name
                              : "Select a subcategory"}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                            <ChevronUpDownIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm rounded-xl bg-white shadow-2xl p-2 z-50">
                            {subcategories.map((subcategory, index) => (
                              <Listbox.Option
                                key={index}
                                className={({ active }) =>
                                  `block py-4 rounded-lg relative cursor-default select-none pl-8 hover:bg-gray-100 text-gray-900`
                                }
                                value={subcategory}
                              >
                                {({ selected }) => (
                                  <>
                                    <span className={`block truncate text-md`}>
                                      {subcategory.name}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
                                        <CheckIcon
                                          className="h-4 w-4"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>

                  {errors.subcategory && (
                    <span className="text-red-400 text-sm font-medium px-2">
                      {errors.subcategory}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="uppercase font-bold text-sm block">
                Search Tags
              </label>

              {/*  */}
              <div className="my-2">
                <ul className="flex flex-wrap gap-2">
                  {keywords.map((tag, index) => (
                    <li
                      key={index}
                      className="bg-nft-primary-light text-white text-sm border border-nft-primary-light p-2 rounded-full flex items-center cursor-pointer gap-1 hover:opacity-80"
                      onClick={() => handleRemoveTag(index)}
                    >
                      <span>{tag}</span>
                      <XMarkIcon className="h-4 w-4" />
                    </li>
                  ))}
                </ul>
              </div>
              {/*  */}

              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handlekeywordInputKeyDown}
                placeholder="Add tag..."
                className="w-full text-base font-normal rounded-xl border-gray-200 border p-3 resize-none outline-none placeholder:text-gray-300 focus:ring-2 focus:ring-nft-primary-light"
                disabled={keywords.length === 5}
              />

              <span className="block text-left text-xs text-gray-400 italic">
                5 tags maximum. Use letters and numbers only.
              </span>

              {errors.tags && (
                <span className="text-red-400 text-sm font-medium px-2">
                  {errors.tags}
                </span>
              )}
            </div>
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
            onClick={handleSubmit}
          >
            Save and Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
