import React, { useState } from "react";
import Header from "../components/Header";
import "../styles/style.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import {
  BuildingStorefrontIcon,
  ChartBarSquareIcon,
  CommandLineIcon,
  ComputerDesktopIcon,
  FilmIcon,
  LanguageIcon,
  MicrophoneIcon,
  PaintBrushIcon,
} from "@heroicons/react/24/outline";
import {
  setSearchedCategory,
  setServiceSearchQuery,
} from "../../redux/slices/SearchServiceSlice";
import { useDispatch } from "react-redux";

function LandingPage() {
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
  const responsive2 = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    dispatch(setServiceSearchQuery(e));
  };

  const handlekeywordInputKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      navigate("/services");
    }
  };

  const categories = [
    { name: "Influencer Services" },
    { name: "Live Streaming" },
    { name: "Music Services" },
    { name: "Art Services" },
    { name: "Consulting Services" },
    { name: "Coaching Services" },
  ];

  const handleCategorySearch = (cat) => {
    dispatch(setSearchedCategory(cat));
    navigate("/services");
  };

  return (
    <>
      <div className="bg-transparent hombg lg:h-screen">
        <Header />

        <div className="relative container mx-auto h-full">
          <div className="flex flex-wrap items-center h-full w-full">
            <div className="w-full md:w-1/2">
              <div className="p-1 py-0">
                <div className="text-left">
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    Freelance Services For Your Business
                  </h1>
                </div>

                <div className="flex flex-col md:flex-row bg-white rounded-xl p-4 py-2 pr-2 w-full mt-10 items-center gap-2">
                  <div className="w-full flex-1">
                    <div className=" relative items-center w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="gray"
                        className="w-5 h-5 absolute top-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>

                      <input
                        type="text"
                        placeholder="What are you looking for?"
                        className="p-2 outline-none px-6 pl-10 text-gray-800 placeholder:text-gray-800 text-sm w-full block"
                        onChange={(e) => handleSearch(e.target.value)}
                        onKeyDown={handlekeywordInputKeyDown}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      className="hover:opacity-80 bg-nft-primary-dark h-full py-5 w-fit px-10 rounded-xl font-semibold text-white transition-colors text-sm"
                      onClick={() => navigate("/services")}
                    >
                      Search
                    </button>
                  </div>
                </div>

                <div className="mt-12 text-white">
                  <span className="mb-5 block">Recommended Searches</span>
                  <div className="w-full gap-2">
                    {categories.map((cat, index) => (
                      <button
                        key={index}
                        className="rounded-full bg-white text-gray-800 backdrop-blur-sm hover:bg-nft-primary-light text-sm p-2 px-4 hover:text-white transition-colors m-0.5"
                        onClick={() => handleCategorySearch(cat.name)}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-44 mb-20">
        <div>
          <h2 className="text-3xl mb-1 font-extrabold text-gray-800">
            Browse talent by category​
          </h2>
          <p className="text-sm text-gray-600">
            Get some Inspirations from 1800+ skills
          </p>
          <div className="text-right flex flex-row justify-end items-center font-bold text-sm gap-2 hover:text-nft-primary-light text-gray-800">
            <a href="sd">All Categories</a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
            <a
              href="s"
              className="bg-white block rounded-xl hover:bg-nft-primary-light shadow-lg border-gray-100 group hover:border-nft-primary-light hover:shadow-purple-200 overflow-hidden border p-7 py-8 transition-colors"
            >
              <div className="relative inline-block">
                <ComputerDesktopIcon className="w-10 h-10 text-gray-400 group-hover:text-gray-100" />
                {/* <img
                  src={require("../assets/it.PNG")}
                  className="w-16 h-16 object-cover"
                  alt=""
                /> */}
                <span className="text-sm mt-5 mb-2 block group-hover:text-gray-50">
                  8 Services
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-white">
                  Development & IT
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-white">
                  Software Engineer, Web / Mobile Developer & More
                </p>
              </div>
            </a>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
            <a
              href="s"
              className="bg-white block rounded-xl hover:bg-nft-primary-light shadow-lg border-gray-100 group hover:border-nft-primary-light hover:shadow-purple-200 overflow-hidden border p-7 py-8 transition-colors"
            >
              <div className="relative inline-block">
                {/* <img
                  src={require("../assets/design.PNG")}
                  className="w-16 h-16 object-cover"
                  alt=""
                /> */}
                <PaintBrushIcon className="w-10 h-10 text-gray-400 group-hover:text-gray-100" />
                <span className="text-sm mt-5 mb-2 block group-hover:text-gray-50">
                  8 Services
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-white">
                  Design & Creative
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-white">
                  Website Design Adobe XD, Figma, Adobe Photoshop
                </p>
              </div>
            </a>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
            <a
              href="s"
              className="bg-white block rounded-xl hover:bg-nft-primary-light shadow-lg border-gray-100 group hover:border-nft-primary-light hover:shadow-purple-200 overflow-hidden border p-7 py-8 transition-colors"
            >
              <div className="relative inline-block">
                {/* <img
                  src={require("../assets/marketing.PNG")}
                  className="w-16 h-16 object-cover"
                  alt=""
                /> */}
                <BuildingStorefrontIcon className="w-10 h-10 text-gray-400 group-hover:text-gray-100" />

                <span className="text-sm mt-5 mb-2 block group-hover:text-gray-50">
                  3 Services
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-white">
                  Digital Marketing
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-white">
                  Service Digital and Social Media Management
                </p>
              </div>
            </a>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
            <a
              href="s"
              className="bg-white block rounded-xl hover:bg-nft-primary-light shadow-lg border-gray-100 group hover:border-nft-primary-light hover:shadow-purple-200 overflow-hidden border p-7 py-8 transition-colors"
            >
              <div className="relative inline-block">
                {/* <img
                  src={require("../assets/writing.PNG")}
                  className="w-16 h-16 object-cover"
                  alt=""
                /> */}
                <LanguageIcon className="w-10 h-10 text-gray-400 group-hover:text-gray-100" />
                <span className="text-sm mt-5 mb-2 block group-hover:text-gray-50">
                  1 Service
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-white">
                  Writing & Translation
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-white">
                  Writing , Translation Project, get It Quickly done
                </p>
              </div>
            </a>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
            <a
              href="s"
              className="bg-white block rounded-xl hover:bg-nft-primary-light shadow-lg border-gray-100 group hover:border-nft-primary-light hover:shadow-purple-200 overflow-hidden border p-7 py-8 transition-colors"
            >
              <div className="relative inline-block">
                {/* <img
                  src={require("../assets/music.PNG")}
                  className="w-16 h-16 object-cover"
                  alt=""
                /> */}
                <MicrophoneIcon className="w-10 h-10 text-gray-400 group-hover:text-gray-100" />
                <span className="text-sm mt-5 mb-2 block group-hover:text-gray-50">
                  4 Services
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-white">
                  Music & Audio
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-white">
                  Freelancer Music, Audio Services, Music Projects
                </p>
              </div>
            </a>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
            <a
              href="s"
              className="bg-white block rounded-xl hover:bg-nft-primary-light shadow-lg border-gray-100 group hover:border-nft-primary-light hover:shadow-purple-200 overflow-hidden border p-7 py-8 transition-colors"
            >
              <div className="relative inline-block">
                {/* <img
                  src={require("../assets/video.PNG")}
                  className="w-16 h-16 object-cover"
                  alt=""
                /> */}
                <FilmIcon className="w-10 h-10 text-gray-400 group-hover:text-gray-100" />
                <span className="text-sm mt-5 mb-2 block group-hover:text-gray-50">
                  8 Services
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-white">
                  Video & Animation
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-white">
                  Animation Video Maker that Brings Studio Quality
                </p>
              </div>
            </a>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
            <a
              href="s"
              className="bg-white block rounded-xl hover:bg-nft-primary-light shadow-lg border-gray-100 group hover:border-nft-primary-light hover:shadow-purple-200 overflow-hidden border p-7 py-8 transition-colors"
            >
              <div className="relative inline-block">
                {/* <img
                  src={require("../assets/construct.PNG")}
                  className="w-16 h-16 object-cover"
                  alt=""
                /> */}
                <CommandLineIcon className="w-10 h-10 text-gray-400 group-hover:text-gray-100" />
                <span className="text-sm mt-5 mb-2 block group-hover:text-gray-50">
                  12 Services
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-white">
                  Programming & Tech
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-white">
                  Programmers and coders Both for Your Project
                </p>
              </div>
            </a>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
            <a
              href="s"
              className="bg-white block rounded-xl hover:bg-nft-primary-light shadow-lg border-gray-100 group hover:border-nft-primary-light hover:shadow-purple-200 overflow-hidden border p-7 py-8 transition-colors"
            >
              <div className="relative inline-block">
                {/* <img
                  src={require("../assets/finance.PNG")}
                  className="w-16 h-16 object-cover"
                  alt=""
                /> */}
                <ChartBarSquareIcon className="w-10 h-10 text-gray-400 group-hover:text-gray-100" />
                <span className="text-sm mt-5 mb-2 block group-hover:text-gray-50">
                  5 Services
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-white">
                  Finance & Accounting
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-white">
                  Team Works , Collaboration Meet for Your Business
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="py-20 bg-2">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-1/2">
              <img src={require("../assets/h34.png")} alt="s" />
            </div>
            <div className="w-1/2 md:p-8">
              <div>
                <h2 className="text-3xl mb-1 font-extrabold text-gray-800">
                  Trusted By Best
                  <br /> Freelancers
                </h2>
                <p className="text-md text-gray-800 my-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </p>
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-nft-primary-light rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 stroke-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    <div className="font-semibold">
                      Last Education of Bachelor Degree
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-nft-primary-light rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 stroke-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    <div className="font-semibold">
                      More Than 15 Years Experience
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-nft-primary-light rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 stroke-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    <div className="font-semibold">
                      12 Education Award Winning
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button className=" hover:opacity-80 bg-nft-primary-dark h-full py-5 px-10 rounded-xl font-semibold text-white hover:bg-nft-primary-dark transition-colors text-sm">
                    <span>See More</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 inline-block stroke-1 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-44 mb-20">
        <div className="mb-10">
          <h2 className="text-3xl mb-1 font-extrabold text-gray-800">
            Trending Services
          </h2>
          <p className="text-sm text-gray-600">
            Most viewed and all-time top-selling services
          </p>
          <div className="text-right flex flex-row justify-end items-center font-bold text-sm gap-2 text-gray-800 hover:text-nft-primary-light">
            <a href="sd">All Services</a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </div>
        <div>
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            infinite={true}
            // focusOnSelect={true}
            dotListclassName="custom-dot-list-style"
            itemclassName="carousel-item-padding-40-px"
          >
            <div
              href="#sd"
              className="decoration-transparent shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0 m-2 block cursor-pointer"
            >
              <div className="relative shadow-md rounded-xl shadow-gray-200">
                <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                  <div className="absolute top-2 right-2 p-2 bg-white hover:bg-nft-primary-light text-gray-800 rounded-full">
                    <button className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 hover:stroke-white hover:fill-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <img
                    src={require("../assets/trend1.jpg")}
                    alt="Card Imagea"
                    className="h-60 w-full object-cover"
                  />
                  <div className="mt-4 p-2">
                    <a
                      href="s"
                      className="block text-sm text-gray-500 mb-3 hover:text-gray-800"
                    >
                      Development & IT
                    </a>
                    <Link
                      to="/gigdetails"
                      className="mb-4 font-semibold text-lg block hover:text-nft-primary-light hover:underline"
                    >
                      Management software to help you manage your mobile workers
                    </Link>
                    <div className="flex items-center gap-2 border-b pb-5 mb-5">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 fill-yellow-400"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="text-md font-semibold text-sm">4.7</div>
                      <div className="text-gray-500 text-sm">(3 Reviews)</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <img
                          src={require("../assets/slider8.png")}
                          alt="s"
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm">Agent Pakulla</span>
                      </div>
                      <div className="flex gap-2 items-center text-sm text-gray-500">
                        Starting at:
                        <span className="text-lg text-gray-800 font-bold">
                          $29
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <img src={require("../assets/nft1.jpg")} alt="" /> */}
              </div>
            </div>
            <div
              href="#sd"
              className="decoration-transparent shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0 m-2 block cursor-pointer"
            >
              <div className="relative shadow-md rounded-xl shadow-gray-200">
                <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                  <div className="absolute top-2 right-2 p-2 bg-white hover:bg-nft-primary-light text-gray-800 rounded-full">
                    <button className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 hover:stroke-white hover:fill-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <img
                    src={require("../assets/trend2.jpg")}
                    alt="Card Imagea"
                    className="h-60 w-full object-cover"
                  />
                  <div className="mt-4 p-2">
                    <a
                      href="s"
                      className="block text-sm text-gray-500 mb-3 hover:text-gray-800"
                    >
                      Development & IT
                    </a>
                    <a
                      href="d"
                      className="mb-4 font-semibold text-lg block hover:text-nft-primary-light hover:underline"
                    >
                      Management software to help you manage your mobile workers
                    </a>
                    <div className="flex items-center gap-2 border-b pb-5 mb-5">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 fill-yellow-400"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="text-md font-semibold text-sm">4.7</div>
                      <div className="text-gray-500 text-sm">(3 Reviews)</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <img
                          src={require("../assets/slider8.png")}
                          alt="s"
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm">Agent Pakulla</span>
                      </div>
                      <div className="flex gap-2 items-center text-sm text-gray-500">
                        Starting at:
                        <span className="text-lg text-gray-800 font-bold">
                          $29
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <img src={require("../assets/nft1.jpg")} alt="" /> */}
              </div>
            </div>
            <div
              href="#sd"
              className="decoration-transparent shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0 m-2 block cursor-pointer"
            >
              <div className="relative shadow-md rounded-xl shadow-gray-200">
                <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                  <div className="absolute top-2 right-2 p-2 bg-white hover:bg-nft-primary-light text-gray-800 rounded-full">
                    <button className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 hover:stroke-white hover:fill-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <img
                    src={require("../assets/trend3.webp")}
                    alt="Card Imagea"
                    className="h-60 w-full object-cover"
                  />
                  <div className="mt-4 p-2">
                    <a
                      href="s"
                      className="block text-sm text-gray-500 mb-3 hover:text-gray-800"
                    >
                      Development & IT
                    </a>
                    <a
                      href="d"
                      className="mb-4 font-semibold text-lg block hover:text-nft-primary-light hover:underline"
                    >
                      Management software to help you manage your mobile workers
                    </a>
                    <div className="flex items-center gap-2 border-b pb-5 mb-5">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 fill-yellow-400"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="text-md font-semibold text-sm">4.7</div>
                      <div className="text-gray-500 text-sm">(3 Reviews)</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <img
                          src={require("../assets/slider8.png")}
                          alt="s"
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm">Agent Pakulla</span>
                      </div>
                      <div className="flex gap-2 items-center text-sm text-gray-500">
                        Starting at:
                        <span className="text-lg text-gray-800 font-bold">
                          $29
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <img src={require("../assets/nft1.jpg")} alt="" /> */}
              </div>
            </div>
            <div
              href="#sd"
              className="decoration-transparent shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0 m-2 block cursor-pointer"
            >
              <div className="relative shadow-md rounded-xl shadow-gray-200">
                <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                  <div className="absolute top-2 right-2 p-2 bg-white hover:bg-nft-primary-light text-gray-800 rounded-full">
                    <button className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 hover:stroke-white hover:fill-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <img
                    src={require("../assets/trend4.png")}
                    alt="Card Imagea"
                    className="h-60 w-full object-cover"
                  />
                  <div className="mt-4 p-2">
                    <a
                      href="s"
                      className="block text-sm text-gray-500 mb-3 hover:text-gray-800"
                    >
                      Development & IT
                    </a>
                    <a
                      href="d"
                      className="mb-4 font-semibold text-lg block hover:text-nft-primary-light hover:underline"
                    >
                      Management software to help you manage your mobile workers
                    </a>
                    <div className="flex items-center gap-2 border-b pb-5 mb-5">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 fill-yellow-400"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="text-md font-semibold text-sm">4.7</div>
                      <div className="text-gray-500 text-sm">(3 Reviews)</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <img
                          src={require("../assets/slider8.png")}
                          alt="s"
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm">Agent Pakulla</span>
                      </div>
                      <div className="flex gap-2 items-center text-sm text-gray-500">
                        Starting at:
                        <span className="text-lg text-gray-800 font-bold">
                          $29
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <img src={require("../assets/nft1.jpg")} alt="" /> */}
              </div>
            </div>
            <div
              href="#sd"
              className="decoration-transparent shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0 m-2 block cursor-pointer"
            >
              <div className="relative shadow-md rounded-xl shadow-gray-200">
                <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                  <div className="absolute top-2 right-2 p-2 bg-white hover:bg-nft-primary-light text-gray-800 rounded-full">
                    <button className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 hover:stroke-white hover:fill-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <img
                    src={require("../assets/trend5.webp")}
                    alt="Card Imagea"
                    className="h-60 w-full object-cover"
                  />
                  <div className="mt-4 p-2">
                    <a
                      href="s"
                      className="block text-sm text-gray-500 mb-3 hover:text-gray-800"
                    >
                      Development & IT
                    </a>
                    <a
                      href="d"
                      className="mb-4 font-semibold text-lg block hover:text-nft-primary-light hover:underline"
                    >
                      Management software to help you manage your mobile workers
                    </a>
                    <div className="flex items-center gap-2 border-b pb-5 mb-5">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 fill-yellow-400"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="text-md font-semibold text-sm">4.7</div>
                      <div className="text-gray-500 text-sm">(3 Reviews)</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <img
                          src={require("../assets/slider8.png")}
                          alt="s"
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm">Agent Pakulla</span>
                      </div>
                      <div className="flex gap-2 items-center text-sm text-gray-500">
                        Starting at:
                        <span className="text-lg text-gray-800 font-bold">
                          $29
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <img src={require("../assets/nft1.jpg")} alt="" /> */}
              </div>
            </div>
            <div
              href="#sd"
              className="decoration-transparent shadow-sm shadow-gray-50 rounded-xl transition-colors duration-300 p-0 m-2 block cursor-pointer"
            >
              <div className="relative shadow-md rounded-xl shadow-gray-200">
                <div className="max-w-sm rounded-xl overflow-hidden pb-2">
                  <div className="absolute top-2 right-2 p-2 bg-white hover:bg-nft-primary-light text-gray-800 rounded-full">
                    <button className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 hover:stroke-white hover:fill-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <img
                    src={require("../assets/trend6.jpg")}
                    alt="Card Imagea"
                    className="h-60 w-full object-cover"
                  />
                  <div className="mt-4 p-2">
                    <a
                      href="s"
                      className="block text-sm text-gray-500 mb-3 hover:text-gray-800"
                    >
                      Development & IT
                    </a>
                    <a
                      href="d"
                      className="mb-4 font-semibold text-lg block hover:text-nft-primary-light hover:underline"
                    >
                      Management software to help you manage your mobile workers
                    </a>
                    <div className="flex items-center gap-2 border-b pb-5 mb-5">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 fill-yellow-400"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="text-md font-semibold text-sm">4.7</div>
                      <div className="text-gray-500 text-sm">(3 Reviews)</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <img
                          src={require("../assets/slider8.png")}
                          alt="s"
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm">Agent Pakulla</span>
                      </div>
                      <div className="flex gap-2 items-center text-sm text-gray-500">
                        Starting at:
                        <span className="text-lg text-gray-800 font-bold">
                          $29
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <img src={require("../assets/nft1.jpg")} alt="" /> */}
              </div>
            </div>
          </Carousel>
        </div>
      </div>

      <div className="py-0 bg-web-secondary-transparent">
        <div className="container text-gray-800">
          <div className="flex flex-wrap items-center">
            <div className="w-1/2">
              <img src={require("../assets/h1.jpg")} alt="s" />
            </div>
            <div className="w-1/2 md:p-8 md:pl-20">
              <div>
                <h2 className="text-3xl mb-1 font-extrabold">
                  A whole world of freelance talent at your fingertips
                </h2>

                <div className="mt-14">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="rounded-full p-1">
                      <img src={require("../assets/medal.PNG")} alt="s" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg mb-2">
                        Proof of quality
                      </div>
                      <p className="text-sm">
                        Check any pro’s work samples, client reviews, and
                        identity verification.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="rounded-full p-1">
                      <img src={require("../assets/cost.PNG")} alt="s" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg mb-2">
                        No cost until you hire
                      </div>
                      <p className="text-sm">
                        Check any pro’s work samples, client reviews, and
                        identity verification.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="rounded-full p-1">
                      <img src={require("../assets/safe.PNG")} alt="s" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg mb-2">
                        Safe and secure
                      </div>
                      <p className="text-sm">
                        Check any pro’s work samples, client reviews, and
                        identity verification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-36 mb-20 text-gray-800">
        <h2 className="text-3xl mb-2 font-extrabold text-center">
          Need something done?
        </h2>
        <p className="text-sm text-center">
          Most viewed and all-time top-selling services
        </p>

        <div className="flex flex-wrap mt-14">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 text-left p-4">
            <div href="s" className="block overflow-hidden">
              <div className="relative inline-block">
                <img
                  src={require("../assets/job.PNG")}
                  className="object-cover"
                  alt=""
                />
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 mt-4">Post a job</h3>
                <p className="text-md">
                  It’s free and easy to post a job. Simply fill in a title,
                  description.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 text-left p-4">
            <div href="s" className="block overflow-hidden">
              <div className="relative inline-block">
                <img
                  src={require("../assets/freelancer.PNG")}
                  className="object-cover"
                  alt=""
                />
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 mt-4">
                  Choose freelancers
                </h3>
                <p className="text-md">
                  It’s free and easy to post a job. Simply fill in a title,
                  description.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 text-left p-4">
            <div href="s" className="block overflow-hidden">
              <div className="relative inline-block">
                <img
                  src={require("../assets/pay.PNG")}
                  className="object-cover"
                  alt=""
                />
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 mt-4">Pay safely</h3>
                <p className="text-md">
                  It’s free and easy to post a job. Simply fill in a title,
                  description.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 text-left p-4">
            <div href="s" className="block overflow-hidden">
              <div className="relative inline-block">
                <img
                  src={require("../assets/help.PNG")}
                  className="object-cover"
                  alt=""
                />
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 mt-4">
                  We’re here to help
                </h3>
                <p className="text-md">
                  It’s free and easy to post a job. Simply fill in a title,
                  description.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 bg-nft-primary-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-1/2 md:p-8">
              <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive2}
                infinite={true}
                arrows={false}
                autoPlay={true}
                autoPlaySpeed={7000}
                // focusOnSelect={true}
                dotListclassName="custom-dot-list-style"
                itemclassName="carousel-item-padding-40-px"
              >
                <div className="text-white">
                  <h3 className="text-purple-300 text-3xl font-bold mb-5">
                    Envato
                  </h3>
                  <div className="font-semibold text-xl mb-10">
                    “ I have used Freeio numerous times for several different
                    companies. I have always had great experiences. I once tried
                    using someone else and I ended up having to cancel the order
                    and move back to Freeio. ”
                  </div>
                  <div>
                    <span className="font-semibold text-md block">
                      Jane Cooper
                    </span>
                    <span className="text-sm">Marketing Manager</span>
                  </div>
                </div>
                <div className="text-white">
                  <h3 className="text-purple-300 text-3xl font-bold mb-5">
                    Envato
                  </h3>
                  <div className="font-semibold text-xl mb-10">
                    “ I have used Freeio numerous times for several different
                    companies. I have always had great experiences. I once tried
                    using someone else and I ended up having to cancel the order
                    and move back to Freeio. ”
                  </div>
                  <div>
                    <span className="font-semibold text-md block">
                      Jane Cooper
                    </span>
                    <span className="text-sm">Marketing Manager</span>
                  </div>
                </div>
                <div className="text-white">
                  <h3 className="text-purple-300 text-3xl font-bold mb-5">
                    Themeforest
                  </h3>
                  <div className="font-semibold text-xl mb-10">
                    “ I have used Freeio numerous times for several different
                    companies. I have always had great experiences. I once tried
                    using someone else and I ended up having to cancel the order
                    and move back to Freeio. ”
                  </div>
                  <div>
                    <span className="font-semibold text-md block">
                      Jane Cooper
                    </span>
                    <span className="text-sm">Marketing Manager</span>
                  </div>
                </div>
              </Carousel>
            </div>
            <div className="w-1/2">
              <img src={require("../assets/h1.jpg")} alt="s" />
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 pt-0 text-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-wrap mt-10 border-b pb-7">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 text-left p-4">
              <div href="s" className="block overflow-hidden text-center">
                <h1 className="text-4xl mb-3 font-bold">890M</h1>
                <p className="text-sm">Total Freelancer</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 text-left p-4">
              <div href="s" className="block overflow-hidden text-center">
                <h1 className="text-4xl mb-3 font-bold">750M</h1>
                <p className="text-sm">Positive Review</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 text-left p-4">
              <div href="s" className="block overflow-hidden text-center">
                <h1 className="text-4xl mb-3 font-bold">98M</h1>
                <p className="text-sm">Order recieved</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 text-left p-4">
              <div href="s" className="block overflow-hidden text-center">
                <h1 className="text-4xl mb-3 font-bold">336M</h1>
                <p className="text-sm">Projects Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 pt-0 mt-20">
        <div className="container mx-auto">
          <h6 className="text-center text-sm">Trusted by the world’s best</h6>
          <div className="flex flex-wrap mt-10 pb-7">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/6 text-left p-4">
              <img
                src={require("../assets/amazon.png")}
                alt=""
                className="opacity-80 hover:opacity-100"
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/6 text-left p-4">
              <img
                src={require("../assets/amd.png")}
                alt=""
                className="opacity-80 hover:opacity-100"
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/6 text-left p-4">
              <img
                src={require("../assets/cisco.png")}
                alt=""
                className="opacity-80 hover:opacity-100"
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/6 text-left p-4">
              <img
                src={require("../assets/dropcam.png")}
                alt=""
                className="opacity-80 hover:opacity-100"
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/6 text-left p-4">
              <img
                src={require("../assets/logitech.png")}
                alt=""
                className="opacity-80 hover:opacity-100"
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/6 text-left p-4">
              <img
                src={require("../assets/spotify.png")}
                alt=""
                className="opacity-80 hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-web-secondary-light">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-1/2 md:p-8">
              <div>
                <h2 className="text-3xl mb-1 font-extrabold">
                  Find the talent needed to get your business growing.
                </h2>
                <p className="text-md text-gray-800 my-5">
                  Advertise your jobs to millions of monthly users and search
                  15.8 million CVs
                </p>

                <div className="mt-4">
                  <button className=" hover:opacity-80 bg-nft-primary-dark h-full py-5 px-10 rounded-xl font-semibold text-white hover:bg-nft-primary-dark transition-colors text-sm">
                    <span>Find Talent</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 inline-block stroke-1 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-1/2 text-right">
              <img
                src={require("../assets/h16.png")}
                alt="s"
                className="h-72 mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default LandingPage;
