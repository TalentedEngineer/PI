import React, { Fragment, useState } from "react";
import {
  ChevronUpIcon,
  EllipsisHorizontalIcon,
  LightBulbIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setFormStep } from "../../../../redux/slices/NewGigSlice";

const FAQTab = ({ faqs, setFAQs }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errors, setErrors] = useState({});

  const AddQuestion = () => {
    const errors = {};

    if (!question) {
      errors.question = "Question cannot be empty";
    }
    if (!answer) {
      errors.answer = "Answer cannot be empty";
    }
    if (answer.trim().length > 450 || answer.trim().length < 10) {
      errors.answer = "Answer must be between 10 and 450 characters long";
    }

    setErrors(errors);
    if (question && answer) {
      setFAQs([...faqs, { question, answer }]);
      setQuestion("");
      setAnswer("");
    }
  };

  const CancelQuestion = () => {
    setQuestion("");
    setAnswer("");
  };

  const DeleteFAQ = (index) => {
    setFAQs(faqs.filter((faq, i) => i !== index));
  };

  const dispatch = useDispatch();
  const formStep = useSelector((state) => state.gig.formStep);

  const validateForm = () => {
    let errors = {};

    if (faqs.length === 0) {
      errors.description = "Add at least one FAQ";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(setFormStep(formStep + 1));
    }
  };

  const handlePrev = () => {
    dispatch(setFormStep(formStep - 1));
  };

  return (
    <div id="overview" className="mb-10">
      <div className="p-4 pb-5 text-3xl mb-0 pt-2 text-gray-800 font-normal">
        <h2>Frequently Asked Questions</h2>
        <p className="text-sm mt-1 text-gray-500">
          Add Questions and Answers to help buyers learn more about your gig.
        </p>
      </div>

      <div className="flex justify-between">
        <div className="text-gray-500 p-4 md:w-2/3 w-full">
          <div className="flex items-center space-x-4">
            <hr className="flex-1 border-t border-gray-100" />
            <div className="text-sm font-semibold uppercase flex items-center gap-1">
              <span>Your FAQs</span>
              <span>
                <QuestionMarkCircleIcon className="h-5 w-5" />
              </span>
            </div>
            <hr className="flex-1 border-t border-gray-100" />
          </div>

          <div className="bg-gray-100 rounded-xl p-4 text-gray-700 mt-10 text-sm">
            <div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Add a Question. i.e. What is your refund policy?"
                  className="w-full outline-none border-2 border-gray-300 p-3 resize-none rounded-xl focus:border-nft-primary-light"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                {errors.question && (
                  <span className="text-red-400 text-sm font-medium px-2">
                    {errors.question}
                  </span>
                )}
              </div>
              <div>
                <textarea
                  className="w-full h-40 outline-none border-2 border-gray-300 p-3 resize-none rounded-xl focus:border-nft-primary-light"
                  placeholder="Add an Answer. i.e. If you're unhappy with your purchase for any reason"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                ></textarea>
                <div className="flex justify-between items-center">
                  <span>
                    {errors.answer && (
                      <span className="text-red-400 text-sm font-medium px-2">
                        {errors.answer}
                      </span>
                    )}
                  </span>

                  <span className="italic block text-right text-xs text-gray-500">
                    {answer.length}/450 Characters
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="rounded-xl p-1.5 px-3 bg-gray-200 text-gray-500 font-semibold cursor-pointer hover:opacity-80 transition-colors border border-gray-300"
                  onClick={CancelQuestion}
                >
                  Cancel
                </button>
                <button
                  className="rounded-xl p-1.5 px-5 bg-nft-primary-light text-white font-semibold cursor-pointer hover:opacity-80 transition-colors border border-nft-primary-light"
                  onClick={AddQuestion}
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col my-7 gap-5">
            <div>
              {/*  */}
              <div className="w-full">
                <div className="flex flex-col gap-3">
                  {faqs.map((faq, index) => (
                    <Disclosure key={index}>
                      {({ open }) => (
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex-1">
                            <Disclosure.Button className="flex w-full justify-between border border-gray-200 items-center p-3 py-4 rounded-xl text-gray-700 ring-2 ring-gray-100 hover:bg-gray-50 text-sm">
                              <span>{faq.question}</span>
                              <ChevronUpIcon
                                className={`${
                                  open ? "rotate-180 transform" : ""
                                } h-5 w-5 text-purple-500`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="text-sm px-4 mt-2 pt-4 pb-4 text-gray-700 bg-gray-100 rounded-xl flex justify-between gap-3 items-center w-full">
                              <p>{faq.answer}</p>
                            </Disclosure.Panel>
                          </div>
                          <div className="text-right">
                            <button
                              className="text-red-500 p-2 bg-red-200 border-red-500 rounded-full hover:opacity-80"
                              onClick={(e) => DeleteFAQ(index)}
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </div>
              {/*  */}
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

export default FAQTab;
