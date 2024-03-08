import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const TrendingNFTs = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className="container mx-auto">
      <div className="mt-28">
        <div className="text-center mb-11">
          <h1 className="text-4xl font-extrabold tracking-tight text-black sm:text-4xl">
            Trending NFTs
          </h1>
        </div>
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          infinite={true}
          // focusOnSelect={true}
          dotListclassName="custom-dot-list-style"
          itemclassName="carousel-item-padding-40-px"
        >
          <a
            href="#sd"
            className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0 m-2 block"
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
                  src={require("../../assets/nft7.jpeg")}
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
                  <div className="font-bold text-lg">Week Ahead</div>
                  <div className="text-gray-500 text-xs">
                    category{" "}
                    <span className="font-bold text-xs text-gray-600">Art</span>
                  </div>
                  <p className="text-black font-normal mt-4 text-sm">
                    You can't fall if you don't climb. But there's no joy in
                    living your whole
                  </p>
                </div>
              </div>
              {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
            </div>
          </a>

          <a
            href="#sd"
            className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0 m-2 block"
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
                  src={require("../../assets/nft25.PNG")}
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
                  <div className="font-bold text-lg">Week Ahead</div>
                  <div className="text-gray-500 text-xs">
                    category{" "}
                    <span className="font-bold text-xs text-gray-600">Art</span>
                  </div>
                  <p className="text-black font-normal mt-4 text-sm">
                    You can't fall if you don't climb. But there's no joy in
                    living your whole
                  </p>
                </div>
              </div>
              {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
            </div>
          </a>

          <a
            href="#sd"
            className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0 m-2 block"
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
                  src={require("../../assets/nft6.PNG")}
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
                  <div className="font-bold text-lg">Week Ahead</div>
                  <div className="text-gray-500 text-xs">
                    category{" "}
                    <span className="font-bold text-xs text-gray-600">Art</span>
                  </div>
                  <p className="text-black font-normal mt-4 text-sm">
                    You can't fall if you don't climb. But there's no joy in
                    living your whole
                  </p>
                </div>
              </div>
              {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
            </div>
          </a>

          <a
            href="#sd"
            className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0 m-2 block"
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
                  src={require("../../assets/nft21.PNG")}
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
                  <div className="font-bold text-lg">Week Ahead</div>
                  <div className="text-gray-500 text-xs">
                    category{" "}
                    <span className="font-bold text-xs text-gray-600">Art</span>
                  </div>
                  <p className="text-black font-normal mt-4 text-sm">
                    You can't fall if you don't climb. But there's no joy in
                    living your whole
                  </p>
                </div>
              </div>
              {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
            </div>
          </a>

          <a
            href="#sd"
            className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0 m-2 block"
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
                  src={require("../../assets/nft22.PNG")}
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
                  <div className="font-bold text-lg">Week Ahead</div>
                  <div className="text-gray-500 text-xs">
                    category{" "}
                    <span className="font-bold text-xs text-gray-600">Art</span>
                  </div>
                  <p className="text-black font-normal mt-4 text-sm">
                    You can't fall if you don't climb. But there's no joy in
                    living your whole
                  </p>
                </div>
              </div>
              {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
            </div>
          </a>

          <a
            href="#sd"
            className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0 m-2 block"
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
                  src={require("../../assets/nft23.png")}
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
                  <div className="font-bold text-lg">Week Ahead</div>
                  <div className="text-gray-500 text-xs">
                    category{" "}
                    <span className="font-bold text-xs text-gray-600">Art</span>
                  </div>
                  <p className="text-black font-normal mt-4 text-sm">
                    You can't fall if you don't climb. But there's no joy in
                    living your whole
                  </p>
                </div>
              </div>
              {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
            </div>
          </a>

          <a
            href="#sd"
            className="decoration-transparent hover:bg-purple-50 shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0 m-2 block"
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
                  src={require("../../assets/nft24.PNG")}
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
                  <div className="font-bold text-lg">Week Ahead</div>
                  <div className="text-gray-500 text-xs">
                    category{" "}
                    <span className="font-bold text-xs text-gray-600">Art</span>
                  </div>
                  <p className="text-black font-normal mt-4 text-sm">
                    You can't fall if you don't climb. But there's no joy in
                    living your whole
                  </p>
                </div>
              </div>
              {/* <img src={require("../../assets/nft1.jpg")} alt="" /> */}
            </div>
          </a>
        </Carousel>
      </div>
    </div>
  );
};

export default TrendingNFTs;
