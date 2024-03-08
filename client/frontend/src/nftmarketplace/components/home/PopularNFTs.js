import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const PopularNFTs = () => {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-11">
        <h1 className="text-4xl font-extrabold tracking-tight text-black sm:text-4xl">
          Browse Popular NFTs
        </h1>
      </div>

      <div className="flex flex-wrap justify-center">
        <Tabs
          className="w-full text-center"
          selectedTabClassName="active-tab-look"
        >
          <TabList className="border-b border-gray-200 w-full">
            <Tab className="list-none pb-3 text-gray-400 text-sm font-semibold mr-10 inline-block relative cursor-pointer">
              All
            </Tab>
            <Tab className="list-none pb-3 text-gray-400 text-sm font-semibold mr-10 inline-block relative cursor-pointer">
              Trending
            </Tab>
            <Tab className="list-none pb-3 text-gray-400 text-sm font-semibold mr-10 inline-block relative cursor-pointer">
              Gaming
            </Tab>
            <Tab className="list-none pb-3 text-gray-400 text-sm font-semibold mr-10 inline-block relative cursor-pointer">
              Photography
            </Tab>
          </TabList>

          <TabPanel>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <div className="w-72">
                <a
                  href="#sd"
                  className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0  block"
                >
                  <div className="relative shadow-sm rounded-xl shadow-gray-100">
                    <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                      <div className="absolute top-2 right-2 p-2 px-3 bg-white text-black rounded-full">
                        <button className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            ></path>
                          </svg>
                          <span className="pl-2 font-bold text-sm">36</span>
                        </button>
                      </div>
                      <img
                        src={require("../../assets/nft29.PNG")}
                        alt="Card Imagea"
                        className="h-80 w-full object-cover"
                      />
                      <div className="flex items-center justify-center">
                        <div className="rounded-full overflow-hidden w-14 h-14 -mt-7 border-2 border-white">
                          <img
                            src={require("../../assets/user1.jpeg")}
                            alt="User Idmage"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="px-6 py-4 pt-2 text-center">
                        <div className="font-bold text-lg">Election Season</div>
                        <div className="text-gray-500 text-xs">
                          category{" "}
                          <span className="font-bold text-xs text-gray-600">
                            Art
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 justify-center pt-2 text-sm mt-2">
                          <img
                            src={require("../../assets/eth.png")}
                            alt="sd"
                            className="h-5 w-5 object-contain"
                          />
                          <span className="pl-2">
                            <span className="font-bold text-sm text-black">
                              450 ETH
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
                  </div>
                </a>
              </div>

              <div className="w-72">
                <a
                  href="#sd"
                  className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0  block"
                >
                  <div className="relative shadow-sm rounded-xl shadow-gray-100">
                    <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                      <div className="absolute top-2 right-2 p-2 px-3 bg-white text-black rounded-full">
                        <button className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            ></path>
                          </svg>
                          <span className="pl-2 font-bold text-sm">19</span>
                        </button>
                      </div>
                      <img
                        src={require("../../assets/nft28.PNG")}
                        alt="Card Imagea"
                        className="h-80 w-full object-cover"
                      />
                      <div className="flex items-center justify-center">
                        <div className="rounded-full overflow-hidden w-14 h-14 -mt-7 border-2 border-white">
                          <img
                            src={require("../../assets/user2.jpeg")}
                            alt="User Idmage"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="px-6 py-4 pt-2 text-center">
                        <div className="font-bold text-lg">
                          Lorr's Ad Issues
                        </div>
                        <div className="text-gray-500 text-xs">
                          category{" "}
                          <span className="font-bold text-xs text-gray-600">
                            Shapes
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 justify-center pt-2 text-sm mt-2">
                          <img
                            src={require("../../assets/bitcoin.png")}
                            alt="sd"
                            className="h-5 w-5 object-contain"
                          />
                          <span className="pl-2">
                            <span className="font-bold text-sm text-black">
                              17.59 BC
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
                  </div>
                </a>
              </div>

              <div className="w-72">
                <a
                  href="#sd"
                  className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0  block"
                >
                  <div className="relative shadow-sm rounded-xl shadow-gray-100">
                    <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                      <div className="absolute top-2 right-2 p-2 px-3 bg-white text-black rounded-full">
                        <button className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            ></path>
                          </svg>
                          <span className="pl-2 font-bold text-sm">20</span>
                        </button>
                      </div>
                      <img
                        src={require("../../assets/nft26.PNG")}
                        alt="Card Imagea"
                        className="h-80 w-full object-cover"
                      />
                      <div className="flex items-center justify-center">
                        <div className="rounded-full overflow-hidden w-14 h-14 -mt-7 border-2 border-white">
                          <img
                            src={require("../../assets/user3.webp")}
                            alt="User Idmage"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="px-6 py-4 pt-2 text-center">
                        <div className="font-bold text-lg">Science Jobs</div>
                        <div className="text-gray-500 text-xs">
                          category{" "}
                          <span className="font-bold text-xs text-gray-600">
                            science
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 justify-center pt-2 text-sm mt-2">
                          <img
                            src={require("../../assets/litecoin.png")}
                            alt="sd"
                            className="h-5 w-5 object-contain"
                          />
                          <span className="pl-2">
                            <span className="font-bold text-sm text-black">
                              7 XTZ
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
                  </div>
                </a>
              </div>

              <div className="w-72">
                <a
                  href="#sd"
                  className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0  block"
                >
                  <div className="relative shadow-sm rounded-xl shadow-gray-100">
                    <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                      <div className="absolute top-2 right-2 p-2 px-3 bg-white text-black rounded-full">
                        <button className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            ></path>
                          </svg>
                          <span className="pl-2 font-bold text-sm">12</span>
                        </button>
                      </div>
                      <img
                        src={require("../../assets/nft27.PNG")}
                        alt="Card Imagea"
                        className="h-80 w-full object-cover"
                      />
                      <div className="flex items-center justify-center">
                        <div className="rounded-full overflow-hidden w-14 h-14 -mt-7 border-2 border-white">
                          <img
                            src={require("../../assets/user1.jpeg")}
                            alt="User Idmage"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="px-6 py-4 pt-2 text-center">
                        <div className="font-bold text-lg">
                          Venture Capitalist
                        </div>
                        <div className="text-gray-500 text-xs">
                          category{" "}
                          <span className="font-bold text-xs text-gray-600">
                            PFPS
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 justify-center pt-2 text-sm mt-2">
                          <img
                            src={require("../../assets/uniswap.png")}
                            alt="sd"
                            className="h-5 w-5 object-contain"
                          />
                          <span className="pl-2">
                            <span className="font-bold text-sm text-black">
                              20 Flow
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
                  </div>
                </a>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <div className="w-72">
                <a
                  href="#sd"
                  className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0  block"
                >
                  <div className="relative shadow-sm rounded-xl shadow-gray-100">
                    <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                      <div className="absolute top-2 right-2 p-2 px-3 bg-white text-black rounded-full">
                        <button className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            ></path>
                          </svg>
                          <span className="pl-2 font-bold text-sm">36</span>
                        </button>
                      </div>
                      <img
                        src={require("../../assets/nft19.jpg")}
                        alt="Card Imagea"
                        className="h-80 w-full object-cover"
                      />
                      <div className="flex items-center justify-center">
                        <div className="rounded-full overflow-hidden w-14 h-14 -mt-7 border-2 border-white">
                          <img
                            src={require("../../assets/user1.jpeg")}
                            alt="User Idmage"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="px-6 py-4 pt-2 text-center">
                        <div className="font-bold text-lg">
                          Interesting Lemur
                        </div>
                        <div className="text-gray-500 text-xs">
                          category{" "}
                          <span className="font-bold text-xs text-gray-600">
                            Art
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 justify-center pt-2 text-sm mt-2">
                          <img
                            src={require("../../assets/eth.png")}
                            alt="sd"
                            className="h-5 w-5 object-contain"
                          />
                          <span className="pl-2">
                            <span className="font-bold text-sm text-black">
                              450 ETH
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
                  </div>
                </a>
              </div>

              <div className="w-72">
                <a
                  href="#sd"
                  className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0  block"
                >
                  <div className="relative shadow-sm rounded-xl shadow-gray-100">
                    <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                      <div className="absolute top-2 right-2 p-2 px-3 bg-white text-black rounded-full">
                        <button className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            ></path>
                          </svg>
                          <span className="pl-2 font-bold text-sm">19</span>
                        </button>
                      </div>
                      <img
                        src={require("../../assets/nft9.jpg")}
                        alt="Card Imagea"
                        className="h-80 w-full object-cover"
                      />
                      <div className="flex items-center justify-center">
                        <div className="rounded-full overflow-hidden w-14 h-14 -mt-7 border-2 border-white">
                          <img
                            src={require("../../assets/user2.jpeg")}
                            alt="User Idmage"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="px-6 py-4 pt-2 text-center">
                        <div className="font-bold text-lg">Cold Bear</div>
                        <div className="text-gray-500 text-xs">
                          category{" "}
                          <span className="font-bold text-xs text-gray-600">
                            Shapes
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 justify-center pt-2 text-sm mt-2">
                          <img
                            src={require("../../assets/bitcoin.png")}
                            alt="sd"
                            className="h-5 w-5 object-contain"
                          />
                          <span className="pl-2">
                            <span className="font-bold text-sm text-black">
                              17.59 BC
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
                  </div>
                </a>
              </div>

              <div className="w-72">
                <a
                  href="#sd"
                  className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0  block"
                >
                  <div className="relative shadow-sm rounded-xl shadow-gray-100">
                    <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                      <div className="absolute top-2 right-2 p-2 px-3 bg-white text-black rounded-full">
                        <button className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            ></path>
                          </svg>
                          <span className="pl-2 font-bold text-sm">20</span>
                        </button>
                      </div>
                      <img
                        src={require("../../assets/nft5.jpg")}
                        alt="Card Imagea"
                        className="h-80 w-full object-cover"
                      />
                      <div className="flex items-center justify-center">
                        <div className="rounded-full overflow-hidden w-14 h-14 -mt-7 border-2 border-white">
                          <img
                            src={require("../../assets/user3.webp")}
                            alt="User Idmage"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="px-6 py-4 pt-2 text-center">
                        <div className="font-bold text-lg">Ancient Monk</div>
                        <div className="text-gray-500 text-xs">
                          category{" "}
                          <span className="font-bold text-xs text-gray-600">
                            science
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 justify-center pt-2 text-sm mt-2">
                          <img
                            src={require("../../assets/litecoin.png")}
                            alt="sd"
                            className="h-5 w-5 object-contain"
                          />
                          <span className="pl-2">
                            <span className="font-bold text-sm text-black">
                              7 XTZ
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
                  </div>
                </a>
              </div>

              <div className="w-72">
                <a
                  href="#sd"
                  className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0  block"
                >
                  <div className="relative shadow-sm rounded-xl shadow-gray-100">
                    <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                      <div className="absolute top-2 right-2 p-2 px-3 bg-white text-black rounded-full">
                        <button className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            ></path>
                          </svg>
                          <span className="pl-2 font-bold text-sm">12</span>
                        </button>
                      </div>
                      <img
                        src={require("../../assets/nft11.jpeg")}
                        alt="Card Imagea"
                        className="h-80 w-full object-cover"
                      />
                      <div className="flex items-center justify-center">
                        <div className="rounded-full overflow-hidden w-14 h-14 -mt-7 border-2 border-white">
                          <img
                            src={require("../../assets/user1.jpeg")}
                            alt="User Idmage"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="px-6 py-4 pt-2 text-center">
                        <div className="font-bold text-lg">
                          President Candidate
                        </div>
                        <div className="text-gray-500 text-xs">
                          category{" "}
                          <span className="font-bold text-xs text-gray-600">
                            PFPS
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 justify-center pt-2 text-sm mt-2">
                          <img
                            src={require("../../assets/uniswap.png")}
                            alt="sd"
                            className="h-5 w-5 object-contain"
                          />
                          <span className="pl-2">
                            <span className="font-bold text-sm text-black">
                              20 Flow
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
                  </div>
                </a>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <div className="w-72">
                <a
                  href="#sd"
                  className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0  block"
                >
                  <div className="relative shadow-sm rounded-xl shadow-gray-100">
                    <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                      <div className="absolute top-2 right-2 p-2 px-3 bg-white text-black rounded-full">
                        <button className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            ></path>
                          </svg>
                          <span className="pl-2 font-bold text-sm">36</span>
                        </button>
                      </div>
                      <img
                        src={require("../../assets/nft30.jpg")}
                        alt="Card Imagea"
                        className="h-80 w-full object-cover"
                      />
                      <div className="flex items-center justify-center">
                        <div className="rounded-full overflow-hidden w-14 h-14 -mt-7 border-2 border-white">
                          <img
                            src={require("../../assets/user1.jpeg")}
                            alt="User Idmage"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="px-6 py-4 pt-2 text-center">
                        <div className="font-bold text-lg">Election Season</div>
                        <div className="text-gray-500 text-xs">
                          category{" "}
                          <span className="font-bold text-xs text-gray-600">
                            Art
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 justify-center pt-2 text-sm mt-2">
                          <img
                            src={require("../../assets/eth.png")}
                            alt="sd"
                            className="h-5 w-5 object-contain"
                          />
                          <span className="pl-2">
                            <span className="font-bold text-sm text-black">
                              450 ETH
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
                  </div>
                </a>
              </div>

              <div className="w-72">
                <a
                  href="#sd"
                  className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0  block"
                >
                  <div className="relative shadow-sm rounded-xl shadow-gray-100">
                    <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                      <div className="absolute top-2 right-2 p-2 px-3 bg-white text-black rounded-full">
                        <button className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            ></path>
                          </svg>
                          <span className="pl-2 font-bold text-sm">19</span>
                        </button>
                      </div>
                      <img
                        src={require("../../assets/nft31.jpg")}
                        alt="Card Imagea"
                        className="h-80 w-full object-cover"
                      />
                      <div className="flex items-center justify-center">
                        <div className="rounded-full overflow-hidden w-14 h-14 -mt-7 border-2 border-white">
                          <img
                            src={require("../../assets/user2.jpeg")}
                            alt="User Idmage"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="px-6 py-4 pt-2 text-center">
                        <div className="font-bold text-lg">
                          Lorr's Ad Issues
                        </div>
                        <div className="text-gray-500 text-xs">
                          category{" "}
                          <span className="font-bold text-xs text-gray-600">
                            Shapes
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 justify-center pt-2 text-sm mt-2">
                          <img
                            src={require("../../assets/bitcoin.png")}
                            alt="sd"
                            className="h-5 w-5 object-contain"
                          />
                          <span className="pl-2">
                            <span className="font-bold text-sm text-black">
                              17.59 BC
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
                  </div>
                </a>
              </div>

              <div className="w-72">
                <a
                  href="#sd"
                  className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0  block"
                >
                  <div className="relative shadow-sm rounded-xl shadow-gray-100">
                    <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                      <div className="absolute top-2 right-2 p-2 px-3 bg-white text-black rounded-full">
                        <button className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            ></path>
                          </svg>
                          <span className="pl-2 font-bold text-sm">20</span>
                        </button>
                      </div>
                      <img
                        src={require("../../assets/nft32.PNG")}
                        alt="Card Imagea"
                        className="h-80 w-full object-cover"
                      />
                      <div className="flex items-center justify-center">
                        <div className="rounded-full overflow-hidden w-14 h-14 -mt-7 border-2 border-white">
                          <img
                            src={require("../../assets/user3.webp")}
                            alt="User Idmage"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="px-6 py-4 pt-2 text-center">
                        <div className="font-bold text-lg">Science Jobs</div>
                        <div className="text-gray-500 text-xs">
                          category{" "}
                          <span className="font-bold text-xs text-gray-600">
                            science
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 justify-center pt-2 text-sm mt-2">
                          <img
                            src={require("../../assets/litecoin.png")}
                            alt="sd"
                            className="h-5 w-5 object-contain"
                          />
                          <span className="pl-2">
                            <span className="font-bold text-sm text-black">
                              7 XTZ
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
                  </div>
                </a>
              </div>

              <div className="w-72">
                <a
                  href="#sd"
                  className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0  block"
                >
                  <div className="relative shadow-sm rounded-xl shadow-gray-100">
                    <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                      <div className="absolute top-2 right-2 p-2 px-3 bg-white text-black rounded-full">
                        <button className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            ></path>
                          </svg>
                          <span className="pl-2 font-bold text-sm">12</span>
                        </button>
                      </div>
                      <img
                        src={require("../../assets/nft15.jpg")}
                        alt="Card Imagea"
                        className="h-80 w-full object-cover"
                      />
                      <div className="flex items-center justify-center">
                        <div className="rounded-full overflow-hidden w-14 h-14 -mt-7 border-2 border-white">
                          <img
                            src={require("../../assets/user1.jpeg")}
                            alt="User Idmage"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="px-6 py-4 pt-2 text-center">
                        <div className="font-bold text-lg">
                          Venture Capitalist
                        </div>
                        <div className="text-gray-500 text-xs">
                          category{" "}
                          <span className="font-bold text-xs text-gray-600">
                            PFPS
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 justify-center pt-2 text-sm mt-2">
                          <img
                            src={require("../../assets/uniswap.png")}
                            alt="sd"
                            className="h-5 w-5 object-contain"
                          />
                          <span className="pl-2">
                            <span className="font-bold text-sm text-black">
                              20 Flow
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
                  </div>
                </a>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <div className="w-72">
                <a
                  href="#sd"
                  className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0  block"
                >
                  <div className="relative shadow-sm rounded-xl shadow-gray-100">
                    <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                      <div className="absolute top-2 right-2 p-2 px-3 bg-white text-black rounded-full">
                        <button className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            ></path>
                          </svg>
                          <span className="pl-2 font-bold text-sm">12</span>
                        </button>
                      </div>
                      <img
                        src={require("../../assets/nft11.jpeg")}
                        alt="Card Imagea"
                        className="h-80 w-full object-cover"
                      />
                      <div className="flex items-center justify-center">
                        <div className="rounded-full overflow-hidden w-14 h-14 -mt-7 border-2 border-white">
                          <img
                            src={require("../../assets/user1.jpeg")}
                            alt="User Idmage"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="px-6 py-4 pt-2 text-center">
                        <div className="font-bold text-lg">
                          President Candidate
                        </div>
                        <div className="text-gray-500 text-xs">
                          category{" "}
                          <span className="font-bold text-xs text-gray-600">
                            PFPS
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 justify-center pt-2 text-sm mt-2">
                          <img
                            src={require("../../assets/uniswap.png")}
                            alt="sd"
                            className="h-5 w-5 object-contain"
                          />
                          <span className="pl-2">
                            <span className="font-bold text-sm text-black">
                              20 Flow
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
                  </div>
                </a>
              </div>

              <div className="w-72">
                <a
                  href="#sd"
                  className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0  block"
                >
                  <div className="relative shadow-sm rounded-xl shadow-gray-100">
                    <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                      <div className="absolute top-2 right-2 p-2 px-3 bg-white text-black rounded-full">
                        <button className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            ></path>
                          </svg>
                          <span className="pl-2 font-bold text-sm">20</span>
                        </button>
                      </div>
                      <img
                        src={require("../../assets/nft5.jpg")}
                        alt="Card Imagea"
                        className="h-80 w-full object-cover"
                      />
                      <div className="flex items-center justify-center">
                        <div className="rounded-full overflow-hidden w-14 h-14 -mt-7 border-2 border-white">
                          <img
                            src={require("../../assets/user3.webp")}
                            alt="User Idmage"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="px-6 py-4 pt-2 text-center">
                        <div className="font-bold text-lg">Ancient Monk</div>
                        <div className="text-gray-500 text-xs">
                          category{" "}
                          <span className="font-bold text-xs text-gray-600">
                            science
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 justify-center pt-2 text-sm mt-2">
                          <img
                            src={require("../../assets/litecoin.png")}
                            alt="sd"
                            className="h-5 w-5 object-contain"
                          />
                          <span className="pl-2">
                            <span className="font-bold text-sm text-black">
                              7 XTZ
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
                  </div>
                </a>
              </div>

              <div className="w-72">
                <a
                  href="#sd"
                  className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0  block"
                >
                  <div className="relative shadow-sm rounded-xl shadow-gray-100">
                    <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                      <div className="absolute top-2 right-2 p-2 px-3 bg-white text-black rounded-full">
                        <button className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            ></path>
                          </svg>
                          <span className="pl-2 font-bold text-sm">36</span>
                        </button>
                      </div>
                      <img
                        src={require("../../assets/nft19.jpg")}
                        alt="Card Imagea"
                        className="h-80 w-full object-cover"
                      />
                      <div className="flex items-center justify-center">
                        <div className="rounded-full overflow-hidden w-14 h-14 -mt-7 border-2 border-white">
                          <img
                            src={require("../../assets/user1.jpeg")}
                            alt="User Idmage"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="px-6 py-4 pt-2 text-center">
                        <div className="font-bold text-lg">
                          Interesting Lemur
                        </div>
                        <div className="text-gray-500 text-xs">
                          category{" "}
                          <span className="font-bold text-xs text-gray-600">
                            Art
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 justify-center pt-2 text-sm mt-2">
                          <img
                            src={require("../../assets/eth.png")}
                            alt="sd"
                            className="h-5 w-5 object-contain"
                          />
                          <span className="pl-2">
                            <span className="font-bold text-sm text-black">
                              450 ETH
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
                  </div>
                </a>
              </div>

              <div className="w-72">
                <a
                  href="#sd"
                  className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0  block"
                >
                  <div className="relative shadow-sm rounded-xl shadow-gray-100">
                    <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                      <div className="absolute top-2 right-2 p-2 px-3 bg-white text-black rounded-full">
                        <button className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            ></path>
                          </svg>
                          <span className="pl-2 font-bold text-sm">19</span>
                        </button>
                      </div>
                      <img
                        src={require("../../assets/nft9.jpg")}
                        alt="Card Imagea"
                        className="h-80 w-full object-cover"
                      />
                      <div className="flex items-center justify-center">
                        <div className="rounded-full overflow-hidden w-14 h-14 -mt-7 border-2 border-white">
                          <img
                            src={require("../../assets/user2.jpeg")}
                            alt="User Idmage"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="px-6 py-4 pt-2 text-center">
                        <div className="font-bold text-lg">Cold Bear</div>
                        <div className="text-gray-500 text-xs">
                          category{" "}
                          <span className="font-bold text-xs text-gray-600">
                            Shapes
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 justify-center pt-2 text-sm mt-2">
                          <img
                            src={require("../../assets/bitcoin.png")}
                            alt="sd"
                            className="h-5 w-5 object-contain"
                          />
                          <span className="pl-2">
                            <span className="font-bold text-sm text-black">
                              17.59 BC
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
                  </div>
                </a>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>

      <div className="text-center mt-14">
        <button className="bg-nft-primary-transparent rounded-full px-6 py-3 font-semibold text-sm text-nft-primary-light w-1/5 hover:bg-nft-primary-light hover:text-white duration-300 transition-colors">
          <span>Load More</span>
        </button>
      </div>
    </div>
  );
};

export default PopularNFTs;
