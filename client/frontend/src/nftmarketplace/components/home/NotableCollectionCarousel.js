import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import {
  ArrowUpRightIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";
import { ethers } from "ethers";

export const NotableCollectionCarousel = ({ responsive, nfts, title }) => {
  const getFormattedPrice = (price) => {
    return ethers.utils.formatEther(price.toString());
  };
  return (
    <div className="container mx-auto">
      <div className="mb-10">
        <div className="text-center mb-10">
          <div className="flex items-center justify-start">
            <h1 className="text-4xl font-extrabold tracking-tight text-black sm:text-4xl mr-4">
              Trending in {title}
            </h1>
          </div>
        </div>

        <div className="container mx-auto">
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            infinite={false}
            autoPlay={false}
            transitionDuration={10000}
            pauseOnHover={true}
            // focusOnSelect={true}
            dotListclassName="custom-dot-list-style"
            itemclassName="carousel-item-padding-40-px"
          >
            {nfts.map((nft, index) => (
              <div className="decoration-transparent rounded-xl transition-colors duration-300 p-0 m-2 block h-fit relative w-fit">
                <div
                  to={`/marketplace/nft/${nft.itemId}`}
                  className="relative h-fit group block bg-gray-100 rounded-xl w-fit"
                >
                  <div className="max-w-sm rounded-xl overflow-hidden w-full h-full shadow-xl shadow-gray-200 relative">
                    <Link to={`/marketplace/nft/${nft.itemId}`}>
                      <img
                        src={nft.fileUrl}
                        alt="nft"
                        className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </Link>
                    <Link
                      class="rounded-md text-white bg-nft-primary-light p-1 absolute top-2 right-2 text-sm"
                      to={nft.fileUrl}
                      target="_blank"
                      title="View Original Media File"
                    >
                      <ArrowTopRightOnSquareIcon className="w-5 h-5 fill-white" />
                    </Link>
                    <div className="flex justify-between items-center z-50 absolute top-0 p-1">
                      <div className="flex -space-x-3 z-20">
                        {nft.ownershipHistory.map((history, index) => (
                          <>
                            <img
                              key={index}
                              className={`w-9 h-9 rounded-full object-cover ${
                                index > 0 && "border-l-2"
                              }`}
                              src={history.avatar}
                              alt="User Imageas"
                            />
                          </>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 p-3 flex w-full rounded-b-xl flex-col bg-white overflow-hidden">
                    <div className="text-lg font-semibold">
                      <div className="p-2">
                        <Link
                          className="text-xl font-bold tracking-tight text-black"
                          to={`/marketplace/nft/${nft.itemId}`}
                          target="_blank"
                        >
                          {nft.name}
                        </Link>
                        <div className="flex items-center text-gray-500 text-sm mt-2 justify-between">
                          <div>
                            <span className="block text-sm font-normal">
                              Price
                            </span>
                            <span className="font-bold text-sm text-gray-800">
                              <span className="text-gray-800 pr-1">
                                {getFormattedPrice(nft.weiPrice)}
                              </span>
                              ETH
                            </span>
                          </div>
                          <div>
                            <span className="block text-sm font-normal">
                              Collection
                            </span>
                            <Link
                              to={`/marketplace/collection/${nft.collection._id}`}
                              target="_blank"
                              className="text-nft-primary-light font-semibold"
                            >
                              <span>
                                {nft.collection.name.substring(0, 10)}..
                              </span>
                              <ArrowUpRightIcon className="w-4 h-4 inline-block" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
