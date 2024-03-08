import React, { useState } from "react";
import { LightBulbIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setFormStep } from "../../../../redux/slices/NewGigSlice";

const PricingTab = ({
  packag1Name,
  setPackag1Name,
  packag1Desc,
  setPackag1Desc,
  packag1Price,
  setPackag1Price,
  packag1DeliveryTime,
  setPackag1DeliveryTime,
  packag1Revisions,
  setPackag1Revisions,
  packag1Support,
  setPackag1Support,
  offer3Packages,
  setOffer3Packages,
  packag2Name,
  setPackag2Name,
  packag2Desc,
  setPackag2Desc,
  packag2Price,
  setPackag2Price,
  packag2DeliveryTime,
  setPackag2DeliveryTime,
  packag2Revisions,
  setPackag2Revisions,
  packag2Support,
  setPackag2Support,
  packag3Name,
  setPackag3Name,
  packag3Desc,
  setPackag3Desc,
  packag3Price,
  setPackag3Price,
  packag3DeliveryTime,
  setPackag3DeliveryTime,
  packag3Revisions,
  setPackag3Revisions,
  packag3Support,
  setPackag3Support,
  offerExtraFastDelivery,
  setOfferExtraFastDelivery,
  extraBasicDeliveryTime,
  setExtraBasicDeliveryTime,
  extraBasicDeliveryPrice,
  setExtraBasicDeliveryPrice,
  extraStandardDeliveryPrice,
  setExtraStandardDeliveryPrice,
  extraStandardDeliveryTime,
  setExtraStandardDeliveryTime,
  extraPremiumDeliveryTime,
  setExtraPremiumDeliveryTime,
  extraPremiumDeliveryPrice,
  setExtraPremiumDeliveryPrice,
  offerExtraRevision,
  setOfferExtraRevision,
  extraBasicRevision,
  setExtraBasicRevision,
  extraBasicRevisionPrice,
  setExtraBasicRevisionPrice,
  extraStandardRevisionPrice,
  setExtraStandardRevisionPrice,
  extraStandardRevision,
  setExtraStandardRevision,
  extraPremiumRevisionPrice,
  setExtraPremiumRevisionPrice,
  extraPremiumRevision,
  setExtraPremiumRevision,
}) => {
  const offerPackagesHandler = (e) => {
    setOffer3Packages(e.target.checked);
  };

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (packag1Name === null) {
      errors.packag1Name = "Package name cannot be empty";
    }
    if (packag1Name && packag1Name.trim().length < 5) {
      errors.packag1Name = "Package name must be at least 5 characters long";
    }
    if (packag1Name && packag1Name.trim().length > 50) {
      errors.packag1Name = "Package name cannot exceed 50 characters";
    }
    if (packag1Desc === null) {
      errors.packag1Desc = "Package description cannot be empty";
    }
    if (packag1Desc && packag1Desc.trim().length < 10) {
      errors.packag1Desc =
        "Package description must be at least 10 characters long";
    }
    if (packag1Desc && packag1Desc.trim().length > 200) {
      errors.packag1Desc = "Package description cannot exceed 200 characters";
    }
    if (packag1DeliveryTime === null) {
      errors.packag1DeliveryTime = "Package delivery time cannot be empty";
    }
    if (packag1Price === null) {
      errors.packag1Price = "Package price cannot be empty";
    }
    if (packag1Price && packag1Price < 5) {
      errors.packag1Price = "Package price must be at least $5";
    }
    if (packag1Price && packag1Price > 1000) {
      errors.packag1Price = "Package price cannot exceed $1000";
    }
    if (packag1Revisions === null) {
      errors.packag1Revisions = "Package revisions cannot be empty";
    }

    // for package 2
    if (offer3Packages) {
      if (packag2Name === null) {
        errors.packag2Name = "Package name cannot be empty";
      }
      if (packag2Name && packag2Name.trim().length < 5) {
        errors.packag2Name = "Package name must be at least 5 characters long";
      }
      if (packag2Name && packag2Name.trim().length > 50) {
        errors.packag2Name = "Package name cannot exceed 50 characters";
      }
      if (packag2Desc === null) {
        errors.packag2Desc = "Package description cannot be empty";
      }
      if (packag2Desc && packag2Desc.trim().length < 10) {
        errors.packag2Desc =
          "Package description must be at least 10 characters long";
      }
      if (packag2Desc && packag2Desc.trim().length > 200) {
        errors.packag2Desc = "Package description cannot exceed 200 characters";
      }
      if (packag2DeliveryTime === null) {
        errors.packag2DeliveryTime = "Package delivery time cannot be empty";
      }
      if (packag2Price === null) {
        errors.packag2Price = "Package price cannot be empty";
      }
      if (packag2Price && packag2Price < 5) {
        errors.packag2Price = "Package price must be at least $5";
      }
      if (packag2Price && packag2Price > 1000) {
        errors.packag2Price = "Package price cannot exceed $1000";
      }
      if (packag2Revisions === null) {
        errors.packag2Revisions = "Package revisions cannot be empty";
      }
    }

    // for package 3
    if (offer3Packages) {
      if (packag3Name === null) {
        errors.packag3Name = "Package name cannot be empty";
      }
      if (packag3Name && packag3Name.trim().length < 5) {
        errors.packag3Name = "Package name must be at least 5 characters long";
      }
      if (packag3Name && packag3Name.trim().length > 50) {
        errors.packag3Name = "Package name cannot exceed 50 characters";
      }
      if (packag3Desc === null) {
        errors.packag3Desc = "Package description cannot be empty";
      }
      if (packag3Desc && packag3Desc.trim().length < 10) {
        errors.packag3Desc =
          "Package description must be at least 10 characters long";
      }
      if (packag3Desc && packag3Desc.trim().length > 200) {
        errors.packag3Desc = "Package description cannot exceed 200 characters";
      }
      if (packag3DeliveryTime === null) {
        errors.packag3DeliveryTime = "Package delivery time cannot be empty";
      }
      if (packag3Price === null) {
        errors.packag3Price = "Package price cannot be empty";
      }
      if (packag3Price && packag3Price < 5) {
        errors.packag3Price = "Package price must be at least $5";
      }
      if (packag3Price && packag3Price > 1000) {
        errors.packag3Price = "Package price cannot exceed $1000";
      }
      if (packag3Revisions === null) {
        errors.packag3Revisions = "Package revisions cannot be empty";
      }
    }

    // now if extra fast delivery is checked
    // for package 1
    if (offerExtraFastDelivery) {
      if (extraBasicDeliveryTime === null) {
        errors.extraBasicDeliveryTime =
          "Extra fast delivery time for basic package cannot be empty";
      }
      if (extraBasicDeliveryPrice === null) {
        errors.extraBasicDeliveryPrice =
          "Extra fast delivery price for basic package cannot be empty";
      }
      if (extraBasicDeliveryPrice && extraBasicDeliveryPrice < 5) {
        errors.extraBasicDeliveryPrice =
          "Extra fast delivery price for basic package must be at least $5";
      }
      if (extraBasicDeliveryPrice && extraBasicDeliveryPrice > 1000) {
        errors.extraBasicDeliveryPrice =
          "Extra fast delivery price for basic package cannot exceed $1000";
      }
    }

    // for package 2
    if (offerExtraFastDelivery && offer3Packages) {
      if (extraStandardDeliveryTime === null) {
        errors.extraStandardDeliveryTime =
          "Extra fast delivery time for standard package cannot be empty";
      }
      if (extraStandardDeliveryPrice === null) {
        errors.extraStandardDeliveryPrice =
          "Extra fast delivery price for standard package cannot be empty";
      }
      if (extraStandardDeliveryPrice && extraStandardDeliveryPrice < 5) {
        errors.extraStandardDeliveryPrice =
          "Extra fast delivery price for standard package must be at least $5";
      }
      if (extraStandardDeliveryPrice && extraStandardDeliveryPrice > 1000) {
        errors.extraStandardDeliveryPrice =
          "Extra fast delivery price for standard package cannot exceed $1000";
      }
    }

    // for package 3
    if (offerExtraFastDelivery && offer3Packages) {
      if (extraPremiumDeliveryTime === null) {
        errors.extraPremiumDeliveryTime =
          "Extra fast delivery time for premium package cannot be empty";
      }
      if (extraPremiumDeliveryPrice === null) {
        errors.extraPremiumDeliveryPrice =
          "Extra fast delivery price for premium package cannot be empty";
      }
      if (extraPremiumDeliveryPrice && extraPremiumDeliveryPrice < 5) {
        errors.extraPremiumDeliveryPrice =
          "Extra fast delivery price for premium package must be at least $5";
      }
      if (extraPremiumDeliveryPrice && extraPremiumDeliveryPrice > 1000) {
        errors.extraPremiumDeliveryPrice =
          "Extra fast delivery price for premium package cannot exceed $1000";
      }
    }

    // now if extra revision is checked
    // for package 1
    if (offerExtraRevision) {
      if (extraBasicRevision === null) {
        errors.extraBasicRevision =
          "Extra revision for basic package cannot be empty";
      }
      if (extraBasicRevisionPrice === null) {
        errors.extraBasicRevisionPrice =
          "Extra revision price for basic package cannot be empty";
      }
      if (extraBasicRevisionPrice && extraBasicRevisionPrice < 5) {
        errors.extraBasicRevisionPrice =
          "Extra revision price for basic package must be at least $5";
      }
      if (extraBasicRevisionPrice && extraBasicRevisionPrice > 1000) {
        errors.extraBasicRevisionPrice =
          "Extra revision price for basic package cannot exceed $1000";
      }
    }

    // for package 2
    if (offerExtraRevision && offer3Packages) {
      if (extraStandardRevision === null) {
        errors.extraStandardRevision =
          "Extra revision for standard package cannot be empty";
      }
      if (extraStandardRevisionPrice === null) {
        errors.extraStandardRevisionPrice =
          "Extra revision price for standard package cannot be empty";
      }
      if (extraStandardRevisionPrice && extraStandardRevisionPrice < 5) {
        errors.extraStandardRevisionPrice =
          "Extra revision price for standard package must be at least $5";
      }
      if (extraStandardRevisionPrice && extraStandardRevisionPrice > 1000) {
        errors.extraStandardRevisionPrice =
          "Extra revision price for standard package cannot exceed $1000";
      }
    }

    // for package 3
    if (offerExtraRevision && offer3Packages) {
      if (extraPremiumRevision === null) {
        errors.extraPremiumRevision =
          "Extra revision for premium package cannot be empty";
      }
      if (extraPremiumRevisionPrice === null) {
        errors.extraPremiumRevisionPrice =
          "Extra revision price for premium package cannot be empty";
      }
      if (extraPremiumRevisionPrice && extraPremiumRevisionPrice < 5) {
        errors.extraPremiumRevisionPrice =
          "Extra revision price for premium package must be at least $5";
      }
      if (extraPremiumRevisionPrice && extraPremiumRevisionPrice > 1000) {
        errors.extraPremiumRevisionPrice =
          "Extra revision price for premium package cannot exceed $1000";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const dispatch = useDispatch();
  const formStep = useSelector((state) => state.gig.formStep);

  const handleSubmit = (e) => {
    if (validateForm()) {
      dispatch(setFormStep(formStep + 1));
    }
  };

  const handlePrev = () => {
    dispatch(setFormStep(formStep - 1));
  };

  return (
    <div id="overview">
      <div className="p-4 text-3xl border-b mb-6 pt-2 text-gray-800 font-normal border-gray-100">
        <h2>Scope & Pricing</h2>
      </div>

      <div className="flex justify-between">
        <div className="text-gray-600 p-4 md:w-3/4 w-full">
          <div className="flex justify-between items-center">
            <div className="font-bold text-sm mb-2 block">Packages</div>
            <div className="flex items-center gap-2">
              <span className="text-sm">3 packages</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={offer3Packages}
                  onChange={offerPackagesHandler}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-nft-primary-light"></div>
              </label>
            </div>
          </div>

          <div className="w-full mt-10">
            <div className="overflow-x-auto w-full">
              <table
                className="border-collapse border border-gray-300 text-left w-full text-sm"
                cellPadding={0}
              >
                <thead>
                  <tr>
                    <th className="bg-gray-50"></th>
                    <th className="border-collapse border border-gray-300 pl-4 py-7 bg-gray-100">
                      BASIC
                    </th>
                    {offer3Packages && (
                      <th className="border-collapse border border-gray-300 pl-4 py-7 bg-gray-100">
                        STANDARD
                      </th>
                    )}
                    {offer3Packages && (
                      <th className="border-collapse border border-gray-300 pl-4 py-7 bg-gray-100">
                        PREMIUM
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="bg-gray-50 p-0"></td>
                    <td className="border-collapse border border-gray-300 p-0">
                      <div className="relative">
                        <span className="absolute right-2 top-2">
                          <PencilIcon className="w-4 fill-gray-200" />
                        </span>
                        <textarea
                          placeholder="Name your package"
                          className="w-full resize-none p-1.5 pr-5 outline-none h-full"
                          rows={4}
                          value={packag1Name}
                          onChange={(e) => setPackag1Name(e.target.value)}
                        ></textarea>
                        {errors.packag1Name && (
                          <span className="text-red-400 text-xs font-medium">
                            {errors.packag1Name}
                          </span>
                        )}
                      </div>
                    </td>
                    {offer3Packages && (
                      <td className="border-collapse border border-gray-300 p-0">
                        <div className="relative">
                          <span className="absolute right-2 top-2">
                            <PencilIcon className="w-4 fill-gray-200" />
                          </span>
                          <textarea
                            placeholder="Name your package"
                            className="w-full resize-none p-1.5 pr-5 outline-none h-full"
                            rows={4}
                            value={packag2Name}
                            onChange={(e) => setPackag2Name(e.target.value)}
                          ></textarea>

                          {errors.packag2Name && (
                            <span className="text-red-400 text-xs font-medium">
                              {errors.packag2Name}
                            </span>
                          )}
                        </div>
                      </td>
                    )}
                    {offer3Packages && (
                      <td className="border-collapse border border-gray-300 p-0">
                        <div className="relative">
                          <span className="absolute right-2 top-2">
                            <PencilIcon className="w-4 fill-gray-200" />
                          </span>
                          <textarea
                            placeholder="Name your package"
                            className="w-full resize-none p-1.5 pr-5 outline-none h-full"
                            rows={4}
                            value={packag3Name}
                            onChange={(e) => setPackag3Name(e.target.value)}
                          ></textarea>

                          {errors.packag3Name && (
                            <span className="text-red-400 text-xs font-medium">
                              {errors.packag3Name}
                            </span>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>

                  <tr>
                    <td className="bg-gray-50"></td>

                    <td className="border-collapse border border-gray-300 p-0">
                      <div className="relative">
                        <span className="absolute right-2 top-2">
                          <PencilIcon className="w-4 fill-gray-200" />
                        </span>
                        <textarea
                          placeholder="Describe the details of your offering"
                          className="w-full resize-none p-1.5 pr-5 outline-none h-full"
                          rows={6}
                          value={packag1Desc}
                          onChange={(e) => setPackag1Desc(e.target.value)}
                        ></textarea>

                        {errors.packag1Desc && (
                          <span className="text-red-400 text-xs font-medium">
                            {errors.packag1Desc}
                          </span>
                        )}
                      </div>
                    </td>

                    {offer3Packages && (
                      <td className="border-collapse border border-gray-300 p-0">
                        <div className="relative">
                          <span className="absolute right-2 top-2">
                            <PencilIcon className="w-4 fill-gray-200" />
                          </span>
                          <textarea
                            placeholder="Describe the details of your offering"
                            className="w-full resize-none p-1.5 pr-5 outline-none h-full"
                            rows={6}
                            value={packag2Desc}
                            onChange={(e) => setPackag2Desc(e.target.value)}
                          ></textarea>

                          {errors.packag2Desc && (
                            <span className="text-red-400 text-xs font-medium">
                              {errors.packag2Desc}
                            </span>
                          )}
                        </div>
                      </td>
                    )}

                    {offer3Packages && (
                      <td className="border-collapse border border-gray-300 p-0">
                        <div className="relative">
                          <span className="absolute right-2 top-2">
                            <PencilIcon className="w-4 fill-gray-200" />
                          </span>
                          <textarea
                            placeholder="Describe the details of your offering"
                            className="w-full resize-none p-1.5 pr-5 outline-none h-full"
                            rows={6}
                            value={packag3Desc}
                            onChange={(e) => setPackag3Desc(e.target.value)}
                          ></textarea>

                          {errors.packag3Desc && (
                            <span className="text-red-400 text-xs font-medium">
                              {errors.packag3Desc}
                            </span>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>

                  <tr>
                    <td className="bg-gray-50"></td>
                    <td className="border-collapse border border-gray-300">
                      <select
                        className="w-full p-3 font-semibold outline-none cursor-pointer py-5"
                        value={packag1DeliveryTime}
                        onChange={(e) => setPackag1DeliveryTime(e.target.value)}
                      >
                        <option value="" selected>
                          Delivery time
                        </option>
                        <option value="1">1 Day</option>
                        <option value="4">4 Day</option>
                        <option value="7">7 Day</option>
                      </select>

                      {errors.packag1DeliveryTime && (
                        <span className="text-red-400 text-xs font-medium">
                          {errors.packag1DeliveryTime}
                        </span>
                      )}
                    </td>
                    {offer3Packages && (
                      <td className="border-collapse border border-gray-300">
                        <select
                          className="w-full p-3 font-semibold outline-none cursor-pointer py-5"
                          value={packag2DeliveryTime}
                          onChange={(e) =>
                            setPackag2DeliveryTime(e.target.value)
                          }
                        >
                          <option value="" selected>
                            Delivery time
                          </option>
                          <option value="1">1 Day</option>
                          <option value="4">4 Day</option>
                          <option value="7">7 Day</option>
                        </select>

                        {errors.packag2DeliveryTime && (
                          <span className="text-red-400 text-xs font-medium">
                            {errors.packag2DeliveryTime}
                          </span>
                        )}
                      </td>
                    )}
                    {offer3Packages && (
                      <td className="border-collapse border border-gray-300">
                        <select
                          className="w-full p-3 font-semibold outline-none cursor-pointer py-5"
                          value={packag3DeliveryTime}
                          onChange={(e) =>
                            setPackag3DeliveryTime(e.target.value)
                          }
                        >
                          <option value="" selected>
                            Delivery time
                          </option>
                          <option value="1">1 Day</option>
                          <option value="4">4 Day</option>
                          <option value="7">7 Day</option>
                        </select>

                        {errors.packag3DeliveryTime && (
                          <span className="text-red-400 text-xs font-medium">
                            {errors.packag3DeliveryTime}
                          </span>
                        )}
                      </td>
                    )}
                  </tr>

                  <tr>
                    <td className="bg-gray-50 px-3 py-7 font-semibold">
                      Support
                    </td>

                    <td className="border-collapse border border-gray-300">
                      <div className="flex justify-center items-center">
                        <input
                          type="checkbox"
                          className="h-5 w-5 border-gray-100 border cursor-pointer accent-nft-primary-light"
                          checked={packag1Support}
                          onChange={(e) => setPackag1Support(e.target.checked)}
                        />
                      </div>
                    </td>

                    {offer3Packages && (
                      <td className="border-collapse border border-gray-300">
                        <div className="flex justify-center items-center">
                          <input
                            type="checkbox"
                            className="h-5 w-5 border-gray-100 border cursor-pointer accent-nft-primary-light"
                            checked={packag2Support}
                            onChange={(e) =>
                              setPackag2Support(e.target.checked)
                            }
                          />
                        </div>
                      </td>
                    )}

                    {offer3Packages && (
                      <td className="border-collapse border border-gray-300">
                        <div className="flex justify-center items-center">
                          <input
                            type="checkbox"
                            className="h-5 w-5 border-gray-100 border cursor-pointer accent-nft-primary-light"
                            checked={packag3Support}
                            onChange={(e) =>
                              setPackag3Support(e.target.checked)
                            }
                          />
                        </div>
                      </td>
                    )}
                  </tr>

                  <tr>
                    <td className="bg-gray-50 px-3 py-7 font-semibold">
                      Revisions
                    </td>
                    <td className="border-collapse border border-gray-300">
                      <select
                        className="w-full p-3 font-semibold outline-none cursor-pointer py-7"
                        value={packag1Revisions}
                        onChange={(e) => setPackag1Revisions(e.target.value)}
                      >
                        <option value="" selected>
                          Select
                        </option>
                        <option value="None">None</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>

                      {errors.packag1Revisions && (
                        <span className="text-red-400 text-xs font-medium">
                          {errors.packag1Revisions}
                        </span>
                      )}
                    </td>
                    {offer3Packages && (
                      <td className="border-collapse border border-gray-300">
                        <select
                          className="w-full p-3 font-semibold outline-none cursor-pointer py-7"
                          value={packag2Revisions}
                          onChange={(e) => setPackag2Revisions(e.target.value)}
                        >
                          <option value="" selected>
                            Select
                          </option>
                          <option value="None">None</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>

                        {errors.packag2Revisions && (
                          <span className="text-red-400 text-xs font-medium">
                            {errors.packag2Revisions}
                          </span>
                        )}
                      </td>
                    )}
                    {offer3Packages && (
                      <td className="border-collapse border border-gray-300">
                        <select
                          className="w-full p-3 font-semibold outline-none cursor-pointer py-7"
                          value={packag3Revisions}
                          onChange={(e) => setPackag3Revisions(e.target.value)}
                        >
                          <option value="" selected>
                            Select
                          </option>
                          <option value="None">None</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>

                        {errors.packag3Revisions && (
                          <span className="text-red-400 text-xs font-medium">
                            {errors.packag3Revisions}
                          </span>
                        )}
                      </td>
                    )}
                  </tr>

                  <tr>
                    <td className="bg-gray-50 px-3 py-7 font-semibold">
                      Price
                    </td>
                    <td className="border-collapse border border-gray-300">
                      <div className="flex items-center h-full w-full p-3">
                        <input
                          type="number"
                          min={5}
                          className="p-3 pl-0 w-full h-full outline-none font-semibold"
                          value={packag1Price}
                          onChange={(e) => setPackag1Price(e.target.value)}
                        />
                        <span className="font-semibold">$</span>
                      </div>

                      {errors.packag1Price && (
                        <span className="text-red-400 text-xs font-medium">
                          {errors.packag1Price}
                        </span>
                      )}
                    </td>
                    {offer3Packages && (
                      <td className="border-collapse border border-gray-300">
                        <div className="flex items-center h-full w-full p-3">
                          <input
                            type="number"
                            min={5}
                            className="p-3 pl-0 w-full h-full outline-none font-semibold"
                            value={packag2Price}
                            onChange={(e) => setPackag2Price(e.target.value)}
                          />
                          <span className="font-semibold">$</span>
                        </div>

                        {errors.packag2Price && (
                          <span className="text-red-400 text-xs font-medium">
                            {errors.packag2Price}
                          </span>
                        )}
                      </td>
                    )}
                    {offer3Packages && (
                      <td className="border-collapse border border-gray-300">
                        <div className="flex items-center h-full w-full p-3">
                          <input
                            type="number"
                            min={5}
                            className="p-3 pl-0 w-full h-full outline-none font-semibold"
                            value={packag3Price}
                            onChange={(e) => setPackag3Price(e.target.value)}
                          />
                          <span className="font-semibold">$</span>
                        </div>

                        {errors.packag3Price && (
                          <span className="text-red-400 text-xs font-medium">
                            {errors.packag3Price}
                          </span>
                        )}
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-sm font-semibold mt-14">
                Add extra services
              </h3>

              <div className="border border-gray-300 bg-white text-sm mt-6">
                <div>
                  <div className="flex gap-3 items-center p-4 py-6 border-b">
                    <div>
                      <input
                        type="checkbox"
                        className="h-4 w-4 border cursor-pointer accent-nft-primary-light"
                        checked={offerExtraFastDelivery}
                        onChange={(e) =>
                          setOfferExtraFastDelivery(e.target.checked)
                        }
                      />
                    </div>
                    <div className="font-medium">Extra fast delivery</div>
                  </div>

                  <div
                    className={`bg-gray-100 p-4 pl-11 border-b border-gray-300 ${
                      offerExtraFastDelivery ? "block" : "hidden"
                    }`}
                  >
                    {errors.extraBasicDeliveryTime && (
                      <span className="text-red-400 text-xs font-medium block">
                        {errors.extraBasicDeliveryTime}
                      </span>
                    )}
                    {errors.extraBasicDeliveryPrice && (
                      <span className="text-red-400 text-xs font-medium block">
                        {errors.extraBasicDeliveryPrice}
                      </span>
                    )}
                    <div className="flex justify-between items-center mb-4">
                      <div>Basic</div>
                      <div className="flex gap-3 items-center">
                        <div>I'll deliver in only</div>
                        <div>
                          <select
                            className="p-2 border border-gray-300 rounded-md outline-none cursor-pointer w-32 focus:ring-2 focus:ring-nft-primary-light"
                            value={extraBasicDeliveryTime}
                            onChange={(e) =>
                              setExtraBasicDeliveryTime(e.target.value)
                            }
                          >
                            <option value="" selected>
                              SELECT
                            </option>
                            <option value="1">1 Day</option>
                            <option value="2">2 Days</option>
                            <option value="3">3 Days</option>
                            <option value="4">4 Days</option>
                          </select>
                        </div>
                        <div>for an extra</div>
                        <div>
                          <input
                            type="number"
                            className="p-2 border border-gray-300 rounded-md outline-none w-32 focus:ring-2 focus:ring-nft-primary-light"
                            value={extraBasicDeliveryPrice}
                            onChange={(e) =>
                              setExtraBasicDeliveryPrice(e.target.value)
                            }
                          />
                        </div>
                        <div>$</div>
                      </div>
                    </div>

                    {errors.extraStandardDeliveryTime && (
                      <span className="text-red-400 text-xs font-medium block">
                        {errors.extraStandardDeliveryTime}
                      </span>
                    )}
                    {errors.extraStandardDeliveryPrice && (
                      <span className="text-red-400 text-xs font-medium block">
                        {errors.extraStandardDeliveryPrice}
                      </span>
                    )}
                    {offer3Packages && (
                      <div className="flex justify-between items-center mb-4">
                        <div>Standard</div>
                        <div className="flex gap-3 items-center">
                          <div>I'll deliver in only</div>
                          <div>
                            <select
                              className="p-2 border border-gray-300 rounded-md outline-none cursor-pointer w-32 focus:ring-2 focus:ring-nft-primary-light"
                              value={extraStandardDeliveryTime}
                              onChange={(e) =>
                                setExtraStandardDeliveryTime(e.target.value)
                              }
                            >
                              <option value="" selected>
                                SELECT
                              </option>
                              <option value="1">1 Day</option>
                              <option value="2">2 Days</option>
                              <option value="3">3 Days</option>
                              <option value="4">4 Days</option>
                            </select>
                          </div>
                          <div>for an extra</div>
                          <div>
                            <input
                              type="number"
                              className="p-2 border border-gray-300 rounded-md outline-none w-32 focus:ring-2 focus:ring-nft-primary-light"
                              value={extraStandardDeliveryPrice}
                              onChange={(e) =>
                                setExtraStandardDeliveryPrice(e.target.value)
                              }
                            />
                          </div>
                          <div>$</div>
                        </div>
                      </div>
                    )}

                    {errors.extraPremiumDeliveryTime && (
                      <span className="text-red-400 text-xs font-medium block">
                        {errors.extraPremiumDeliveryTime}
                      </span>
                    )}
                    {errors.extraPremiumDeliveryPrice && (
                      <span className="text-red-400 text-xs font-medium block">
                        {errors.extraPremiumDeliveryPrice}
                      </span>
                    )}
                    {offer3Packages && (
                      <div className="flex justify-between items-center">
                        <div>Premium</div>
                        <div className="flex gap-3 items-center">
                          <div>I'll deliver in only</div>
                          <div>
                            <select
                              className="p-2 border border-gray-300 rounded-md outline-none cursor-pointer w-32 focus:ring-2 focus:ring-nft-primary-light"
                              value={extraPremiumDeliveryTime}
                              onChange={(e) =>
                                setExtraPremiumDeliveryTime(e.target.value)
                              }
                            >
                              <option value="" selected>
                                SELECT
                              </option>
                              <option value="1">1 Day</option>
                              <option value="2">2 Days</option>
                              <option value="3">3 Days</option>
                              <option value="4">4 Days</option>
                            </select>
                          </div>
                          <div>for an extra</div>
                          <div>
                            <input
                              type="number"
                              className="p-2 border border-gray-300 rounded-md outline-none w-32 focus:ring-2 focus:ring-nft-primary-light"
                              value={extraPremiumDeliveryPrice}
                              onChange={(e) =>
                                setExtraPremiumDeliveryPrice(e.target.value)
                              }
                            />
                          </div>
                          <div>$</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex gap-3 items-center p-4 py-6">
                    <div>
                      <input
                        type="checkbox"
                        className="h-4 w-4 border cursor-pointer accent-nft-primary-light"
                        checked={offerExtraRevision}
                        onChange={(e) =>
                          setOfferExtraRevision(e.target.checked)
                        }
                      />
                    </div>
                    <div className="font-medium">Additional revision</div>
                  </div>

                  <div
                    className={`bg-gray-100 p-4 pl-11 border-b border-gray-300 ${
                      offerExtraRevision ? "block" : "hidden"
                    }`}
                  >
                    {errors.extraBasicRevision && (
                      <span className="text-red-400 text-xs font-medium block">
                        {errors.extraBasicRevision}
                      </span>
                    )}
                    {errors.extraBasicRevisionPrice && (
                      <span className="text-red-400 text-xs font-medium block">
                        {errors.extraBasicRevisionPrice}
                      </span>
                    )}
                    <div className="flex justify-between items-center mb-4">
                      <div>Basic</div>
                      <div className="flex gap-3 items-center">
                        <div>I'll deliver in only</div>
                        <div>
                          <select
                            className="p-2 border border-gray-300 rounded-md outline-none cursor-pointer w-32 focus:ring-2 focus:ring-nft-primary-light"
                            value={extraBasicRevision}
                            onChange={(e) =>
                              setExtraBasicRevision(e.target.value)
                            }
                          >
                            <option value="" selected>
                              SELECT
                            </option>
                            <option value="1">1 Day</option>
                            <option value="2">2 Days</option>
                            <option value="3">3 Days</option>
                            <option value="4">4 Days</option>
                          </select>
                        </div>
                        <div>for an extra</div>
                        <div>
                          <input
                            type="number"
                            className="p-2 border border-gray-300 rounded-md outline-none w-32 focus:ring-2 focus:ring-nft-primary-light"
                            value={extraBasicRevisionPrice}
                            onChange={(e) =>
                              setExtraBasicRevisionPrice(e.target.value)
                            }
                          />
                        </div>
                        <div>$</div>
                      </div>
                    </div>

                    {errors.extraStandardRevision && (
                      <span className="text-red-400 text-xs font-medium block">
                        {errors.extraStandardRevision}
                      </span>
                    )}
                    {errors.extraStandardRevisionPrice && (
                      <span className="text-red-400 text-xs font-medium block">
                        {errors.extraStandardRevisionPrice}
                      </span>
                    )}
                    {offer3Packages && (
                      <div className="flex justify-between items-center mb-4">
                        <div>Standard</div>
                        <div className="flex gap-3 items-center">
                          <div>I'll deliver in only</div>
                          <div>
                            <select
                              className="p-2 border border-gray-300 rounded-md outline-none cursor-pointer w-32 focus:ring-2 focus:ring-nft-primary-light"
                              value={extraStandardRevision}
                              onChange={(e) =>
                                setExtraStandardRevision(e.target.value)
                              }
                            >
                              <option value="" selected>
                                SELECT
                              </option>
                              <option value="1">1 Day</option>
                              <option value="2">2 Days</option>
                              <option value="3">3 Days</option>
                              <option value="4">4 Days</option>
                            </select>
                          </div>
                          <div>for an extra</div>
                          <div>
                            <input
                              type="number"
                              className="p-2 border border-gray-300 rounded-md outline-none w-32 focus:ring-2 focus:ring-nft-primary-light"
                              value={extraStandardRevisionPrice}
                              onChange={(e) =>
                                setExtraStandardRevisionPrice(e.target.value)
                              }
                            />
                          </div>
                          <div>$</div>
                        </div>
                      </div>
                    )}

                    {errors.extraPremiumRevision && (
                      <span className="text-red-400 text-xs font-medium block">
                        {errors.extraPremiumRevision}
                      </span>
                    )}
                    {errors.extraPremiumRevisionPrice && (
                      <span className="text-red-400 text-xs font-medium block">
                        {errors.extraPremiumRevisionPrice}
                      </span>
                    )}
                    {offer3Packages && (
                      <div className="flex justify-between items-center">
                        <div>Premium</div>
                        <div className="flex gap-3 items-center">
                          <div>I'll deliver in only</div>
                          <div>
                            <select
                              className="p-2 border border-gray-300 rounded-md outline-none cursor-pointer w-32 focus:ring-2 focus:ring-nft-primary-light"
                              value={extraPremiumRevision}
                              onChange={(e) =>
                                setExtraPremiumRevision(e.target.value)
                              }
                            >
                              <option value="" selected>
                                SELECT
                              </option>
                              <option value="1">1 Day</option>
                              <option value="2">2 Days</option>
                              <option value="3">3 Days</option>
                              <option value="4">4 Days</option>
                            </select>
                          </div>
                          <div>for an extra</div>
                          <div>
                            <input
                              type="number"
                              className="p-2 border border-gray-300 rounded-md outline-none w-32 focus:ring-2 focus:ring-nft-primary-light"
                              value={extraPremiumRevisionPrice}
                              onChange={(e) =>
                                setExtraPremiumRevisionPrice(e.target.value)
                              }
                            />
                          </div>
                          <div>$</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-between p-4 px-0 pb-0 mt-10">
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

        <div className="p-4 md:w-1/4 md:block hidden">
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
    </div>
  );
};

export default PricingTab;
