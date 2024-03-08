import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { CubeIcon } from "@heroicons/react/24/solid";
import {
  HeartIcon,
  StarIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Menu } from "@headlessui/react";
import { useSelector } from "react-redux";

const categories = [
  { name: "All" },
  { name: "Influencer Services" },
  { name: "Live Streaming" },
  { name: "Music Services" },
  { name: "Art Services" },
  { name: "Consulting Services" },
  { name: "Coaching Services" },
];

const sortingOptions = [{ name: "Sort by Latest" }, { name: "Sort by Oldest" }];

const Services = () => {
  const [gigs, setGigs] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [inputQuery, setInputQuery] = useState("");
  const nftStatuses = [{ name: "All" }, { name: "hasNFTReward" }];
  const packagesOffer = [{ name: "All" }, { name: "Yes" }];
  const [selectedNFTStatus, setselectedNFTStatus] = useState(
    nftStatuses[0].name
  );
  const [selectedPackageOffer, setselectedPackageOffer] = useState(
    packagesOffer[0].name
  );
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    sortingOptions[0].name
  );
  const [ratings, setRatings] = useState({});

  const fetchGigs = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/gig/getallgigs`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      let data = await response.json();
      console.log(data);
      const gigs = data.gigs.filter((item) => item.user !== null);
      setGigs(gigs);
      console.log(data.averageRatings);
      setRatings(data.averageRatings);
    } catch (error) {
      console.error(error);
    }
  };

  const searchServiceQuery = useSelector(
    (state) => state.serviceSearch.searchQuery
  );
  const searchedCategory = useSelector(
    (state) => state.serviceSearch.searchedCategory
  );

  useEffect(() => {
    fetchGigs();

    if (searchServiceQuery) {
      setInputQuery(searchServiceQuery);
    }
    if (searchedCategory) {
      setSelectedCategories([searchedCategory]);
    }
  }, []);

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    if (selectedCategories.includes(value)) {
      const newSelectedCategories = selectedCategories.filter(
        (category) => category !== value
      );
      setSelectedCategories(newSelectedCategories);
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const filteredGigs = gigs
    .filter(
      (item) =>
        item.title.toLowerCase().includes(inputQuery.toLowerCase()) ||
        item.keywords.includes(inputQuery.toLowerCase())
    )
    .filter((item) => {
      if (
        selectedCategories.includes("All") ||
        selectedCategories.length === 0
      ) {
        return true;
      }
      return selectedCategories.includes(item.category);
    })
    .filter((item) =>
      selectedNFTStatus === "All"
        ? true
        : selectedNFTStatus === "hasNFTReward"
        ? item.offerReward && item.offerReward === true
        : true
    )
    .filter((item) =>
      selectedPackageOffer === "All"
        ? true
        : selectedPackageOffer === "Yes"
        ? item.offer3Packages && item.offer3Packages === true
        : true
    )
    .sort((a, b) => {
      if (selectedSortingOption === "Sort by Oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      else if (selectedSortingOption === "Sort by Latest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      else return 0;
    });

  return (
    <>
      <div className="bg-transparent hombg">
        <Header transparent={true} />
      </div>

      <div className="relative">
        <div className="bg-cover bg-center h-64">
          <img
            src={require("../assets/fluid_background.jpg")}
            alt="Background Iamage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 serv-hero"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-start justify-center text-white p-5">
          <h1 className="text-4xl font-bold mb-5">Design & Creative</h1>
          <p className="mt-2">
            Give your visitor a smooth online experience with a solid UX design
          </p>
        </div>
      </div>

      <div className="container mx-auto my-10 mb-16">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/4 text-gray-800">
              <div className="p-4 mb-5 bg-white shadow-md shadow-gray-100 rounded-xl border border-gray-100">
                <div className="font-semibold text-md mb-3">Categories</div>
                <ul className="list-none">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="flex p-3 gap-4 rounded-xl hover:bg-gray-100  items-center"
                    >
                      <input
                        id={`category-${category.name}-${index}`}
                        name={`${category.name}[]`}
                        defaultValue={category.name}
                        type="checkbox"
                        value={category.name}
                        checked={selectedCategories.includes(category.name)}
                        onChange={(e) => handleCategoryChange(e)}
                        className="h-5 w-5 accent-nft-primary-light"
                      />
                      <label
                        htmlFor={`category-${category.name}-${index}`}
                        className="cursor-pointer text-gray-600"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </ul>
              </div>

              <div className="p-4 mb-5 bg-white shadow-md shadow-gray-100 rounded-xl border border-gray-100">
                <div className="font-semibold text-md mb-3">Offer Packages</div>
                {packagesOffer.map((offer, index) => (
                  <div
                    key={index}
                    className="flex p-3 gap-4 rounded-xl hover:bg-gray-100  items-center"
                  >
                    <input
                      id={`offer-${offer.name}-${index}`}
                      name="offer"
                      type="radio"
                      value={offer.name}
                      defaultChecked={offer.name === selectedPackageOffer}
                      onChange={(e) => setselectedPackageOffer(e.target.value)}
                      className="h-5 w-5 accent-nft-primary-light"
                    />
                    <label
                      htmlFor={`offer-${offer.name}-${index}`}
                      className="cursor-pointer text-gray-600"
                    >
                      {offer.name}
                    </label>
                  </div>
                ))}
              </div>

              <div className="p-4 mb-5 bg-white shadow-md shadow-gray-100 rounded-xl border border-gray-100">
                <div className="font-semibold text-md mb-3">NFT Status</div>
                {nftStatuses.map((status, index) => (
                  <div
                    key={index}
                    className="flex p-3 gap-4 rounded-xl hover:bg-gray-100  items-center"
                  >
                    <input
                      id={`status-${status.name}-${index}`}
                      name="status"
                      type="radio"
                      value={status.name}
                      defaultChecked={status.name === selectedNFTStatus}
                      onChange={(e) => setselectedNFTStatus(e.target.value)}
                      className="h-5 w-5 accent-nft-primary-light"
                    />
                    <label
                      htmlFor={`status-${status.name}-${index}`}
                      className="cursor-pointer text-gray-600"
                    >
                      {status.name}
                    </label>
                  </div>
                ))}
              </div>

              <div className="p-4 mb-5 bg-white shadow-md shadow-gray-100 rounded-xl border border-gray-100">
                <div className="font-semibold text-md mb-3">Price</div>
                <div>
                  <div className="mt-0 border w-full p-5 rounded-xl text-gray-500 outline-none focus:border-nft-primary-light flex justify-between">
                    <input
                      type="number"
                      min={0}
                      className="flex-1 w-full outline-none text-center"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      min={0}
                      className="flex-1 w-full outline-none text-center"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Right Column (Grid Layout) --> */}
            <div className="w-full lg:w-3/4 p-4">
              <div className="flex justify-between items-center mb-6">
                {/* <!-- Total Result Text --> */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 flex items-center pl-2 text-gray-100">
                      <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="text-base rounded-xl border-gray-200 shadow-sm focus:border-nft-primary-light pl-9 block w-full p-3 outline-none border ring-purple-700 focus:ring-1 focus:bg-transparent placeholder-gray-500 text-gray-800"
                      placeholder="Search by item name"
                      value={inputQuery}
                      onChange={(e) => setInputQuery(e.target.value)}
                    />
                  </div>
                </div>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-between  text-gray-800 gap-20 items-center border border-gray-200 shadow-sm focus:border-nft-primary-light p-3 rounded-xl font-semibold focus:ring-nft-primary-light focus:ring-1">
                      <span>{selectedSortingOption}</span>
                      <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                    </Menu.Button>
                  </div>

                  <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-xl bg-white shadow-2xl p-2 focus:outline-none">
                    {sortingOptions.map((option, index) => (
                      <Menu.Item key={index}>
                        <button
                          onClick={() => setSelectedSortingOption(option.name)}
                          className="font-medium text-gray-800 hover:bg-gray-100 block p-3 rounded-lg w-full text-left"
                        >
                          {option.name}
                        </button>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </div>

              {/* <!-- Grid Layout (Cards) --> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
                {filteredGigs.map((gig, index) => (
                  <div
                    className="decoration-transparent shadow-sm shadow-gray-50 rounded-xl transition-all duration-300 p-0 m-2 block hover:scale-105 transform"
                    key={index}
                  >
                    <div className="relative shadow-lg rounded-md shadow-gray-200">
                      <div className="max-w-sm rounded-md overflow-hidden pb-2">
                        <button
                          className={`rounded-xl p-2 flex gap-1 items-center absolute top-2 right-2 text-sm font-semibold text-nft-primary-light bg-white`}
                        >
                          <HeartIcon className="w-5 h-5 fill-nft-primary-light" />
                          <span className="text-gray-800">1.2k</span>
                        </button>

                        <img
                          src={gig.images[0]}
                          alt={gig.title}
                          className="h-60 w-full object-cover rounded-t-xl"
                        />

                        <div className="p-3 py-2 mt-2 rounded-b-xl">
                          <div className="flex justify-between items-center border-b pb-3 mb-3">
                            <div className="flex gap-2 items-center">
                              <img
                                src={gig.user.avatar}
                                alt="s"
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <span className="text-sm font-semibold text-gray-800">
                                {gig.user.name}
                              </span>
                            </div>
                          </div>

                          <Link
                            to={`/gigdetails/${gig.title.replace(/ /g, "-")}/${
                              gig._id
                            }`}
                            className="block text-sm text-gray-500 mb-3 hover:text-gray-800"
                          >
                            {gig.category}
                          </Link>
                          <Link
                            to={`/gigdetails/${gig.title.replace(/ /g, "-")}/${
                              gig._id
                            }`}
                            className="mb-0 font-semibold text-lg text-gray-800 block hover:text-nft-primary-light hover:underline"
                          >
                            {gig.title}
                          </Link>

                          <div className="flex justify-between items-center border-b p-2 mb-3">
                            <div className="flex items-center gap-2 p-2 px-0">
                              <StarIcon className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                              <div className="font-semibold text-sm">
                                {(ratings[gig._id] &&
                                  ratings[gig._id].rating) ||
                                  0}
                              </div>
                              <div className="text-gray-500 text-xs">
                                (
                                {(ratings[gig._id] && ratings[gig._id].total) ||
                                  0}{" "}
                                reviews)
                              </div>
                            </div>

                            {gig.offerReward && gig.offerReward === true && (
                              <div className="flex items-center gap-2 text-nft-primary-light p-2 rounded-lg bg-nft-primary-transparent">
                                <div>
                                  <CubeIcon className="w-4 h-4" />
                                </div>
                                <div className="font-semibold text-xs">
                                  NFT Reward
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <div className="flex gap-2 items-center text-sm text-gray-500">
                              Starting at:
                              <span className="text-lg text-gray-800 font-bold">
                                ${gig.packages.basic.price}
                              </span>
                            </div>

                            <div className="flex-1 justify-end flex">
                              <Link
                                to={`/gigdetails/${gig.title.replace(
                                  / /g,
                                  "-"
                                )}/${gig._id}`}
                                className="text-sm text-white block bg-nft-primary-light hover:bg-nft-primary-dark rounded-xl py-2 font-semibold w-fit text-center px-8"
                              >
                                View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Services;
