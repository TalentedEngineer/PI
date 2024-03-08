import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import DropDown from "../components/dropdown";
import StatsTable from "../components/table/StatsTable";

const Stats = () => {
  const [selectedOption, setSelectedOption] = useState("option1");

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <Header transparent={true} />
      <div className="mt-14">
        <div className="container mx-auto">
          <div className="mb-11">
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-4xl">
              Collection stats
            </h1>
          </div>

          <div className="flex flex-wrap">
            <Tabs className="w-full " selectedTabClassName="active-tab-look">
              <TabList className="border-b border-gray-200 w-full pb-7 mb-7 ">
                <Tab className="list-none rounded-xl px-6 py-3 text-gray-500 font-semibold inline-block relative cursor-pointer hover:text-black transition-colors">
                  Trending
                </Tab>
                <Tab className="list-none rounded-xl px-6 py-3 text-gray-500 font-semibold inline-block relative cursor-pointer hover:text-black transition-colors">
                  Top
                </Tab>
                <Tab className="list-none rounded-xl px-6 py-3 text-gray-500 font-semibold inline-block relative cursor-pointer hover:text-black transition-colors">
                  Watchlist
                </Tab>
              </TabList>

              <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                  <div>
                    <DropDown />
                  </div>
                  <div>
                    <div className="bg-gray-100 p-0.5 flex rounded-xl gap-2">
                      <label className="flex items-center cursor-pointer overflow-hidden">
                        <input
                          type="radio"
                          value="option1"
                          checked={selectedOption === "option1"}
                          onChange={handleChange}
                          className={"hidden w-4 h-4"}
                        />
                        <span
                          className={`rounded-xl outline-none text-md py-2.5 px-3 font-semibold ${
                            selectedOption === "option1"
                              ? "bg-white shadow-xl"
                              : "bg-transparent text-gray-500"
                          }`}
                        >
                          All chains
                        </span>
                      </label>

                      <label className="flex items-center cursor-pointer overflow-hidden">
                        <input
                          type="radio"
                          value="option2"
                          checked={selectedOption === "option2"}
                          onChange={handleChange}
                          className={"hidden w-4 h-4"}
                        />
                        <span
                          className={`rounded-xl outline-none text-md py-2.5 px-3 font-semibold ${
                            selectedOption === "option2"
                              ? "bg-white shadow-xl"
                              : "bg-transparent text-gray-500"
                          }`}
                        >
                          <svg
                            data-name="Layer 1"
                            id="Layer_1"
                            viewBox="0 0 128 128"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                          >
                            <title />
                            <path d="M45,104.68H20a5.3,5.3,0,0,1-4.62-7.9L59.46,18.59a5.3,5.3,0,0,1,9.23,0L81.9,41.91a5.3,5.3,0,0,1,0,5.31L49.59,102.07A5.29,5.29,0,0,1,45,104.68Z" />
                            <path d="M73.48,96.76,88.33,70.27a5.31,5.31,0,0,1,9.24,0l15,26.48a5.31,5.31,0,0,1-4.61,7.93H78.11A5.31,5.31,0,0,1,73.48,96.76Z" />
                          </svg>
                        </span>
                      </label>

                      <label className="flex items-center cursor-pointer overflow-hidden">
                        <input
                          type="radio"
                          value="option3"
                          checked={selectedOption === "option3"}
                          onChange={handleChange}
                          className={"hidden w-4 h-4"}
                        />
                        <span
                          className={`rounded-xl outline-none text-md py-2.5 px-3 font-semibold ${
                            selectedOption === "option3"
                              ? "bg-white shadow-xl"
                              : "bg-transparent text-gray-500"
                          }`}
                        >
                          <svg
                            viewBox="0 0 32 32"
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title />
                            <g data-name="2" id="_2">
                              <path
                                d="M27.38,20.8A3,3,0,0,0,28,19a3,3,0,0,0-2-2.82V14H24v2H23V14H21v2H19v2h1v8H19v2h2v2h2V28h1v2h2V27.86a4,4,0,0,0,1.38-7.06ZM25,18a1,1,0,0,1,0,2H22V18Zm0,8H22V22h3a2,2,0,0,1,0,4ZM4,12h7a1,1,0,0,0,1-1V4a1,1,0,0,0-1-1H4A1,1,0,0,0,3,4v7A1,1,0,0,0,4,12ZM5,5h5v5H5ZM9,7V8A1,1,0,0,1,8,9H7A1,1,0,0,1,6,8V7A1,1,0,0,1,7,6H8A1,1,0,0,1,9,7ZM3,16V15a1,1,0,0,1,1-1H5a1,1,0,0,1,1,1v1H7a1,1,0,0,1,1,1v1a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V17H4A1,1,0,0,1,3,16ZM14,5V4a1,1,0,0,1,1-1h1a1,1,0,0,1,1,1V5a1,1,0,0,1-1,1H15A1,1,0,0,1,14,5Zm0,6V10a1,1,0,0,1,1-1h1a1,1,0,0,1,1,1v1h1a1,1,0,0,1,1,1v1a1,1,0,0,1-1,1H17a1,1,0,0,1-1-1V12H15A1,1,0,0,1,14,11Zm5,9a1,1,0,0,1-1,1H17v1a1,1,0,0,1-1,1H15a1,1,0,0,1-1-1V21a1,1,0,0,1,1-1h1V19a1,1,0,0,1,1-1h1a1,1,0,0,1,1,1Zm-5-3a1,1,0,0,1-1,1H10a1,1,0,0,1-1-1V14a1,1,0,0,1,1-1h1a1,1,0,0,1,1,1v1h1a1,1,0,0,1,1,1Zm0-1V15a1,1,0,0,1,1-1h1a1,1,0,0,1,1,1v1a1,1,0,0,1-1,1H15A1,1,0,0,1,14,16Zm3,11v1a1,1,0,0,1-1,1H15a1,1,0,0,1-1-1V27a1,1,0,0,1,1-1h1A1,1,0,0,1,17,27Zm-6-7H4a1,1,0,0,0-1,1v7a1,1,0,0,0,1,1h7a1,1,0,0,0,1-1V21A1,1,0,0,0,11,20Zm-1,7H5V22h5ZM6,25V24a1,1,0,0,1,1-1H8a1,1,0,0,1,1,1v1a1,1,0,0,1-1,1H7A1,1,0,0,1,6,25ZM28,3H21a1,1,0,0,0-1,1v7a1,1,0,0,0,1,1h7a1,1,0,0,0,1-1V4A1,1,0,0,0,28,3Zm-1,7H22V5h5ZM23,8V7a1,1,0,0,1,1-1h1a1,1,0,0,1,1,1V8a1,1,0,0,1-1,1H24A1,1,0,0,1,23,8Z"
                                data-name="bitcoin address qr code"
                                id="bitcoin_address_qr_code"
                              />
                            </g>
                          </svg>
                        </span>
                      </label>

                      <label className="flex items-center cursor-pointer overflow-hidden">
                        <input
                          type="radio"
                          value="option4"
                          checked={selectedOption === "option4"}
                          onChange={handleChange}
                          className={"hidden w-4 h-4"}
                        />
                        <span
                          className={`rounded-xl outline-none text-md py-2.5 px-3 font-semibold ${
                            selectedOption === "option4"
                              ? "bg-white shadow-xl"
                              : "bg-transparent text-gray-500"
                          }`}
                        >
                          <svg
                            enable-background="new 0 0 80 80"
                            id="Layer_1"
                            version="1.1"
                            viewBox="0 0 80 80"
                            xmlSpace="preserve"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className="w-4 h-4"
                          >
                            <g>
                              <polygon
                                fill="none"
                                points="   18,40 40,5 62,40 40,53  "
                                stroke="#000000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                stroke-miterlimit="10"
                                strokeWidth="4"
                              />
                              <polygon
                                fill="none"
                                points="   18,48 40,75 62,48 40,61  "
                                stroke="#000000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                stroke-miterlimit="10"
                                strokeWidth="4"
                              />
                            </g>
                          </svg>
                        </span>
                      </label>

                      <label className="flex items-center cursor-pointer overflow-hidden">
                        <input
                          type="radio"
                          value="option5"
                          checked={selectedOption === "option5"}
                          onChange={handleChange}
                          className={"hidden w-5 h-5"}
                        />
                        <span
                          className={`rounded-xl outline-none text-md py-2.5 px-3 font-semibold ${
                            selectedOption === "option5"
                              ? "bg-white shadow-xl"
                              : "bg-transparent text-gray-500"
                          }`}
                        >
                          <svg
                            enable-background="new 0 0 128 128"
                            id="Layer_1"
                            version="1.1"
                            viewBox="0 0 128 128"
                            xmlSpace="preserve"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className="w-4 h-4"
                          >
                            <path d="M32.692,114.2c-4.73,0-9.178-1.842-12.524-5.188c-6.903-6.905-6.902-18.142,0.002-25.048l13.548-13.547  c7.112-7.114,17.633-8.607,25.205-8.607c3.736,0,6.269,0.377,6.375,0.394c0.902,0.136,1.598,0.867,1.69,1.776  c0.087,0.862,2.021,21.241-8.223,31.485l-13.549,13.548C41.871,112.358,37.423,114.2,32.692,114.2z M58.923,65.811  c-5.58,0-15.908,0.966-22.377,7.436L22.998,86.793c-5.345,5.346-5.346,14.047-0.002,19.393c2.591,2.589,6.034,4.015,9.696,4.015  c3.663,0,7.106-1.426,9.696-4.017l13.549-13.546c7.396-7.399,7.4-21.839,7.176-26.651C62.097,65.898,60.646,65.811,58.923,65.811z" />
                            <path d="M71.076,66.557L71.076,66.557c-3.737,0-6.271-0.377-6.378-0.395c-0.902-0.137-1.599-0.867-1.69-1.775  c-0.087-0.863-2.019-21.241,8.225-31.486l13.547-13.545c3.346-3.345,7.794-5.188,12.524-5.188c4.731,0,9.18,1.843,12.524,5.189  c3.346,3.344,5.188,7.792,5.188,12.523c-0.001,4.731-1.844,9.179-5.19,12.524L96.279,57.953  C89.168,65.063,78.648,66.557,71.076,66.557z M66.883,62.38c1.018,0.088,2.469,0.176,4.192,0.176c5.581,0,15.908-0.965,22.376-7.431  l13.547-13.549c2.591-2.591,4.019-6.035,4.019-9.697c0-3.661-1.427-7.104-4.017-9.694c-2.59-2.59-6.033-4.017-9.696-4.017  c-3.662,0-7.105,1.427-9.696,4.017L74.061,35.729C66.664,43.127,66.659,57.566,66.883,62.38z" />
                          </svg>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                {/* hours */}
                <div>
                  <div className="bg-gray-100 p-0.5 flex rounded-xl gap-2">
                    <label className="flex items-center cursor-pointer overflow-hidden">
                      <input
                        type="radio"
                        value="option1"
                        checked={selectedOption === "option1"}
                        onChange={handleChange}
                        className={"hidden w-4 h-4"}
                      />
                      <span
                        className={`rounded-xl outline-none text-md py-2.5 px-3.5 font-semibold ${
                          selectedOption === "option1"
                            ? "bg-white shadow-xl"
                            : "bg-transparent text-gray-500"
                        }`}
                      >
                        1h
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer overflow-hidden">
                      <input
                        type="radio"
                        value="o5"
                        checked={selectedOption === "o5"}
                        onChange={handleChange}
                        className={"hidden w-4 h-4"}
                      />
                      <span
                        className={`rounded-xl outline-none text-md py-2.5 px-3.5 font-semibold ${
                          selectedOption === "o5"
                            ? "bg-white shadow-xl"
                            : "bg-transparent text-gray-500"
                        }`}
                      >
                        6h
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer overflow-hidden">
                      <input
                        type="radio"
                        value="option5"
                        checked={selectedOption === "option5"}
                        onChange={handleChange}
                        className={"hidden w-4 h-4"}
                      />
                      <span
                        className={`rounded-xl outline-none text-md py-2.5 px-3.5 font-semibold ${
                          selectedOption === "option5"
                            ? "bg-white shadow-xl"
                            : "bg-transparent text-gray-500"
                        }`}
                      >
                        24h
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer overflow-hidden">
                      <input
                        type="radio"
                        value="o1"
                        checked={selectedOption === "o1"}
                        onChange={handleChange}
                        className={"hidden w-4 h-4"}
                      />
                      <span
                        className={`rounded-xl outline-none text-md py-2.5 px-3.5 font-semibold ${
                          selectedOption === "o1"
                            ? "bg-white shadow-xl"
                            : "bg-transparent text-gray-500"
                        }`}
                      >
                        7d
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer overflow-hidden">
                      <input
                        type="radio"
                        value="o2"
                        checked={selectedOption === "o2"}
                        onChange={handleChange}
                        className={"hidden w-4 h-4"}
                      />
                      <span
                        className={`rounded-xl outline-none text-md py-2.5 px-3.5 font-semibold ${
                          selectedOption === "o2"
                            ? "bg-white shadow-xl"
                            : "bg-transparent text-gray-500"
                        }`}
                      >
                        30d
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer overflow-hidden">
                      <input
                        type="radio"
                        value="o3"
                        checked={selectedOption === "o3"}
                        onChange={handleChange}
                        className={"hidden w-4 h-4"}
                      />
                      <span
                        className={`rounded-xl outline-none text-md py-2.5 px-3.5 font-semibold ${
                          selectedOption === "o3"
                            ? "bg-white shadow-xl"
                            : "bg-transparent text-gray-500"
                        }`}
                      >
                        All
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <TabPanel>
                <StatsTable />
              </TabPanel>

              <TabPanel>Top</TabPanel>

              <TabPanel>Watchlist</TabPanel>
            </Tabs>
          </div>

          {/* <div className="text-center mt-14">
            <button className="bg-nft-primary-transparent rounded-full px-6 py-3 font-semibold text-sm text-nft-primary-light w-1/5 hover:bg-nft-primary-light hover:text-white duration-300 transition-colors">
              <span>Load More</span>
            </button>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Stats;
