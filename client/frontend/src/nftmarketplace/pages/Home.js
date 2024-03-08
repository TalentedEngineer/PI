import React, { useEffect, useState } from "react";
import "../styles/style.css";
import Header from "../components/Header";

import "react-tabs/style/react-tabs.css";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import {
  setIsWalletConnected,
  setWaletAddress,
} from "../../redux/slices/UserSlice";
import NotableDrops from "../components/home/NotableDrops";
import TopSellingCollections from "../components/home/TopSellingCollections";
import TrendingNFTs from "../components/home/TrendingNFTs";
import PopularNFTs from "../components/home/PopularNFTs";
import BlogResources from "../components/home/BlogResources";
import { setSearchQuery } from "../../redux/slices/SearchNftSlice";
import { useNavigate } from "react-router-dom";
import TopCreators from "../components/home/TopCreators";
import NotableCollectionByCategory from "../components/home/NotableCollectionByCategory";

function Home() {
  const dispatch = useDispatch();

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) {
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        dispatch(setWaletAddress(accounts[0]));
        dispatch(setIsWalletConnected(true));
      } else {
        console.log("No authorized account found");
        dispatch(setIsWalletConnected(false));
        dispatch(setWaletAddress(null));
      }
    } catch (error) {
      console.log(`Error connecting with smart contract: ${error}`);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const navigate = useNavigate();

  const [query, setquery] = useState("");
  const handleSearch = (e) => {
    setquery(e);
    dispatch(setSearchQuery(e));
  };

  const handlekeywordInputKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      navigate("/marketplace/explore");
    }
  };

  return (
    <>
      <div className="bg-transparent">
        <Header />

        <div className="relative isolate px-6 pt-14 lg:px-8 overflow-x-clip overflow-y-visible">
          <div className="relative">
            <div className="absolute left-36 top-60 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-28 h-28 rounded-full bg-cover bg-center bg-transparent shadow-xl left-hero-2"></div>
            </div>
            <div className="absolute -left-4 top-60 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-40 h-40 rounded-full bg-cover bg-center bg-transparent shadow-xl left-hero-1"></div>
            </div>
            <div className="absolute left-28 top-96 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 rounded-full bg-cover bg-center bg-transparent shadow-xl left-hero-3"></div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-60 right-20 transform -translate-y-1/2">
              <div className="w-40 h-40 rounded-full bg-cover bg-center right-hero-1 shadow-xl"></div>
            </div>
            <div className="absolute top-60 -right-12 transform">
              <div className="w-20 h-20 rounded-full bg-cover bg-center right-hero-2 shadow-xl"></div>
            </div>
            <div className="absolute top-96 right-11 transform -translate-y-1/2">
              <div className="w-28 h-28 rounded-full bg-cover bg-center right-hero-3 shadow-xl"></div>
            </div>
          </div>

          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-90 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            ></div>
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">
                Discover and collect extraordinary NFTs
              </h1>
              <p className="mt-6 text-lg leading-8 text-black">
                Our marketplace is the world's first and largest NFT market with
                100s of collections
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="w-full py-7 font-bold pl-10 placeholder-black rounded-full shadow-2xl focus:outline-none bg-gradient-to-r from-pink-50 to-white backdrop-filter backdrop-blur-3xl focus:ring-2 focus:ring-nft-primary-light focus:bg-white focus:backdrop-filter-none focus:backdrop-blur-none"
                    value={query}
                    // onChange={(e) => setquery(e.target.value)}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={handlekeywordInputKeyDown}
                    placeholder="Search items, collections"
                  />

                  <button
                    className="absolute inset-y-0 right-0 flex items-center justify-center pr-3"
                    onClick={() => navigate("/explore")}
                  >
                    <svg
                      className=" text-white h-11 w-11 bg-nft-primary-light rounded-full"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M15 11a4 4 0 11-8 0 4 4 0 018 0zM21 21l-4.35-4.35"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div
                  className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(20%-30rem)] "
                  aria-hidden="true"
                >
                  <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-90 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] rotate-[100deg]"
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                  ></div>
                </div>

                <div
                  className="absolute top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] sm:left-[calc(0%-30rem)]"
                  aria-hidden="true"
                >
                  <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#9228e9b6] to-[#b10aff98] opacity-50 sm:left-[calc(20%+36rem)] sm:w-[72.1875rem] rotate-[10deg]"
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-80 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            ></div>
          </div>
        </div>
      </div>

      <NotableDrops />

      <TopSellingCollections />

      <TopCreators />

      <NotableCollectionByCategory />

      {/* <TrendingNFTs /> */}

      {/* <BlogResources /> */}

      {/* <PopularNFTs /> */}

      <Footer />
    </>
  );
}

export default Home;
