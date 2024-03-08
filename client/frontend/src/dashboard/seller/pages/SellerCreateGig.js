import OverviewTab from "../components/gig/OverviewTab";
import DescriptionTab from "../components/gig/DescriptionTab";
import PricingTab from "../components/gig/PricingTab";
import GalleryTab from "../components/gig/GalleryTab";
import RequirementsTab from "../components/gig/RequirementsTab";
import FAQTab from "../components/gig/FAQTab";
import PublishTab from "../components/gig/PublishTab";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GigStepForm from "../components/partials/GigStepForm";
import {
  CubeTransparentIcon,
  CurrencyDollarIcon,
  DocumentMagnifyingGlassIcon,
  DocumentTextIcon,
  DocumentCheckIcon,
  PhotoIcon,
  QuestionMarkCircleIcon,
  CheckCircleIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import NFTTab from "../components/gig/NFTTab";
import { Link, useNavigate } from "react-router-dom";
import { setFormStep } from "../../../redux/slices/NewGigSlice";

const SellerCreateGig = () => {
  const formStep = useSelector((state) => state.gig.formStep);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [description, setDescription] = useState(null);

  // pricing
  const [packag1Name, setPackag1Name] = useState(null);
  const [packag1Desc, setPackag1Desc] = useState(null);
  const [packag1Price, setPackag1Price] = useState(null);
  const [packag1DeliveryTime, setPackag1DeliveryTime] = useState(null);
  const [packag1Revisions, setPackag1Revisions] = useState(null);
  const [packag1Support, setPackag1Support] = useState(null);
  const [offer3Packages, setOffer3Packages] = useState(false);

  const [packag2Name, setPackag2Name] = useState(null);
  const [packag2Desc, setPackag2Desc] = useState(null);
  const [packag2Price, setPackag2Price] = useState(null);
  const [packag2DeliveryTime, setPackag2DeliveryTime] = useState(null);
  const [packag2Revisions, setPackag2Revisions] = useState(null);
  const [packag2Support, setPackag2Support] = useState(null);

  const [packag3Name, setPackag3Name] = useState(null);
  const [packag3Desc, setPackag3Desc] = useState(null);
  const [packag3Price, setPackag3Price] = useState(null);
  const [packag3DeliveryTime, setPackag3DeliveryTime] = useState(null);
  const [packag3Revisions, setPackag3Revisions] = useState(null);
  const [packag3Support, setPackag3Support] = useState(null);

  const [offerExtraFastDelivery, setOfferExtraFastDelivery] = useState(false);
  const [extraBasicDeliveryTime, setExtraBasicDeliveryTime] = useState(null);
  const [extraBasicDeliveryPrice, setExtraBasicDeliveryPrice] = useState(null);
  const [extraStandardDeliveryPrice, setExtraStandardDeliveryPrice] =
    useState(null);
  const [extraStandardDeliveryTime, setExtraStandardDeliveryTime] =
    useState(null);
  const [extraPremiumDeliveryTime, setExtraPremiumDeliveryTime] =
    useState(null);
  const [extraPremiumDeliveryPrice, setExtraPremiumDeliveryPrice] =
    useState(null);

  const [offerExtraRevision, setOfferExtraRevision] = useState(false);
  const [extraBasicRevision, setExtraBasicRevision] = useState(null);
  const [extraBasicRevisionPrice, setExtraBasicRevisionPrice] = useState(null);
  const [extraStandardRevisionPrice, setExtraStandardRevisionPrice] =
    useState(null);
  const [extraStandardRevision, setExtraStandardRevision] = useState(null);
  const [extraPremiumRevisionPrice, setExtraPremiumRevisionPrice] =
    useState(null);
  const [extraPremiumRevision, setExtraPremiumRevision] = useState(null);

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(["", "", ""]);
  const [video, setVideo] = useState(null);

  const [requirements, setRequirements] = useState([]);

  const [faqs, setFAQs] = useState([]);

  const [offerReward, setOfferReward] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);

  const formSteps = [
    {
      icon: <DocumentMagnifyingGlassIcon className="h-6 w-6" />,
      title: "Overview",
    },
    {
      icon: <DocumentTextIcon className="h-6 w-6" />,
      title: "Description",
    },
    {
      icon: <CurrencyDollarIcon className="h-6 w-6" />,
      title: "Scope & Pricing",
    },
    {
      icon: <PhotoIcon className="h-6 w-6" />,
      title: "Gallery",
    },
    {
      icon: <CubeTransparentIcon className="h-6 w-6" />,
      title: "NFT",
    },
    {
      icon: <DocumentCheckIcon className="h-6 w-6" />,
      title: "Requirements",
    },
    {
      icon: <QuestionMarkCircleIcon className="h-6 w-6" />,
      title: "FAQs",
    },
    {
      icon: <CheckCircleIcon className="h-6 w-6" />,
      title: "Publish",
    },
  ];

  const tabs = [
    <OverviewTab
      title={title}
      keywords={keywords}
      setTitle={setTitle}
      setKeywords={setKeywords}
      keywordInput={keywordInput}
      setKeywordInput={setKeywordInput}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      selectedSubcategory={selectedSubcategory}
      setSelectedSubcategory={setSelectedSubcategory}
    />,
    <DescriptionTab
      description={description}
      setDescription={setDescription}
    />,
    <PricingTab
      packag1Name={packag1Name}
      setPackag1Name={setPackag1Name}
      packag1Desc={packag1Desc}
      setPackag1Desc={setPackag1Desc}
      packag1Price={packag1Price}
      setPackag1Price={setPackag1Price}
      packag1DeliveryTime={packag1DeliveryTime}
      setPackag1DeliveryTime={setPackag1DeliveryTime}
      packag1Revisions={packag1Revisions}
      setPackag1Revisions={setPackag1Revisions}
      packag1Support={packag1Support}
      setPackag1Support={setPackag1Support}
      offer3Packages={offer3Packages}
      setOffer3Packages={setOffer3Packages}
      packag2Name={packag2Name}
      setPackag2Name={setPackag2Name}
      packag2Desc={packag2Desc}
      setPackag2Desc={setPackag2Desc}
      packag2Price={packag2Price}
      setPackag2Price={setPackag2Price}
      packag2DeliveryTime={packag2DeliveryTime}
      setPackag2DeliveryTime={setPackag2DeliveryTime}
      packag2Revisions={packag2Revisions}
      setPackag2Revisions={setPackag2Revisions}
      packag2Support={packag2Support}
      setPackag2Support={setPackag2Support}
      packag3Name={packag3Name}
      setPackag3Name={setPackag3Name}
      packag3Desc={packag3Desc}
      setPackag3Desc={setPackag3Desc}
      packag3Price={packag3Price}
      setPackag3Price={setPackag3Price}
      packag3DeliveryTime={packag3DeliveryTime}
      setPackag3DeliveryTime={setPackag3DeliveryTime}
      packag3Revisions={packag3Revisions}
      setPackag3Revisions={setPackag3Revisions}
      packag3Support={packag3Support}
      setPackag3Support={setPackag3Support}
      offerExtraFastDelivery={offerExtraFastDelivery}
      setOfferExtraFastDelivery={setOfferExtraFastDelivery}
      extraBasicDeliveryTime={extraBasicDeliveryTime}
      setExtraBasicDeliveryTime={setExtraBasicDeliveryTime}
      extraBasicDeliveryPrice={extraBasicDeliveryPrice}
      setExtraBasicDeliveryPrice={setExtraBasicDeliveryPrice}
      extraStandardDeliveryPrice={extraStandardDeliveryPrice}
      setExtraStandardDeliveryPrice={setExtraStandardDeliveryPrice}
      extraStandardDeliveryTime={extraStandardDeliveryTime}
      setExtraStandardDeliveryTime={setExtraStandardDeliveryTime}
      extraPremiumDeliveryTime={extraPremiumDeliveryTime}
      setExtraPremiumDeliveryTime={setExtraPremiumDeliveryTime}
      extraPremiumDeliveryPrice={extraPremiumDeliveryPrice}
      setExtraPremiumDeliveryPrice={setExtraPremiumDeliveryPrice}
      offerExtraRevision={offerExtraRevision}
      setOfferExtraRevision={setOfferExtraRevision}
      extraBasicRevision={extraBasicRevision}
      setExtraBasicRevision={setExtraBasicRevision}
      extraBasicRevisionPrice={extraBasicRevisionPrice}
      setExtraBasicRevisionPrice={setExtraBasicRevisionPrice}
      extraStandardRevisionPrice={extraStandardRevisionPrice}
      setExtraStandardRevisionPrice={setExtraStandardRevisionPrice}
      extraStandardRevision={extraStandardRevision}
      setExtraStandardRevision={setExtraStandardRevision}
      extraPremiumRevisionPrice={extraPremiumRevisionPrice}
      setExtraPremiumRevisionPrice={setExtraPremiumRevisionPrice}
      extraPremiumRevision={extraPremiumRevision}
      setExtraPremiumRevision={setExtraPremiumRevision}
    />,
    <GalleryTab
      images={images}
      setImages={setImages}
      imagePreviews={imagePreviews}
      setImagePreviews={setImagePreviews}
      video={video}
      setVideo={setVideo}
    />,
    <NFTTab
      offerReward={offerReward}
      setOfferReward={setOfferReward}
      selectedNFT={selectedNFT}
      setSelectedNFT={setSelectedNFT}
    />,
    <RequirementsTab
      requirements={requirements}
      setRequirements={setRequirements}
    />,
    <FAQTab faqs={faqs} setFAQs={setFAQs} />,
    <PublishTab />,
  ];

  const [error, setError] = useState(null);
  const [gigCreationSuccess, setGigCreationSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newGig, setNewGig] = useState(null);

  const handleGigSubmit = async () => {
    setIsSubmitting(true);
    // let images = images.filter(img=>img!=="");

    const rewardNFT = selectedNFT ? selectedNFT.tokenId : null;

    const gig = {
      title,
      keywords,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      description,
      offer3Packages,
      packages: {
        basic: {
          name: packag1Name,
          description: packag1Desc,
          price: packag1Price,
          deliveryTime: packag1DeliveryTime,
          revisions: packag1Revisions,
          support: packag1Support,
        },
        standard: {
          name: packag2Name,
          description: packag2Desc,
          price: packag2Price,
          deliveryTime: packag2DeliveryTime,
          revisions: packag2Revisions,
          support: packag2Support,
        },
        premium: {
          name: packag3Name,
          description: packag3Desc,
          price: packag3Price,
          deliveryTime: packag3DeliveryTime,
          revisions: packag3Revisions,
          support: packag3Support,
        },
        extras: {
          extraFastDelivery: {
            offer: offerExtraFastDelivery,
            basic: {
              deliveryTime: extraBasicDeliveryTime,
              price: extraBasicDeliveryPrice,
            },
            standard: {
              deliveryTime: extraStandardDeliveryTime,
              price: extraStandardDeliveryPrice,
            },
            premium: {
              deliveryTime: extraPremiumDeliveryTime,
              price: extraPremiumDeliveryPrice,
            },
          },
          extraRevision: {
            offer: offerExtraRevision,
            basic: {
              revisions: extraBasicRevision,
              price: extraBasicRevisionPrice,
            },
            standard: {
              revisions: extraStandardRevision,
              price: extraStandardRevisionPrice,
            },
            premium: {
              revisions: extraPremiumRevision,
              price: extraPremiumRevisionPrice,
            },
          },
        },
      },
      images: images,
      hasVideo: video !== null,
      video: video,
      requirements,
      faqs,
      offerReward,
      rewardNFT,
    };

    // console.log(gig);

    const request = await fetch(`${process.env.REACT_APP_API_URL}/api/gig`, {
      method: "POST",
      headers: {
        "x-auth-token": user.jwtToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        keywords,
        category: selectedCategory.name,
        subcategory: selectedSubcategory.name,
        description,
        packages: gig.packages,
        images,
        video,
        hasVideo: video !== null,
        requirements,
        faqs,
        username: user.username,
        offer3Packages,
        offerReward,
        rewardNFT,
      }),
    });
    const response = await request.json();

    if (response.error) {
      setIsSubmitting(false);
      setError(response.message);
      setGigCreationSuccess(false);
      return;
    }

    setError(null);
    setGigCreationSuccess(true);
    setIsSubmitting(false);
    setNewGig(response);
  };

  const Navigate = useNavigate();
  const Done = () => {
    Navigate("/dashboard/gigs");
  };

  const dispatch = useDispatch();
  const handlePrev = () => {
    dispatch(setFormStep(formStep - 1));
    setError(null);
  };

  useEffect(() => {
    // remove ths lien
    // dispatch(setFormStep(5));

    // remove ths lien
    return () => {
      dispatch(setFormStep(1));
      // Reset all state variables to their initial values
      setTitle("");
      setKeywords([]);
      setKeywordInput("");
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setDescription(null);
      setPackag1Name(null);
      setPackag1Desc(null);
      setPackag1Price(null);
      setPackag1DeliveryTime(null);
      setPackag1Revisions(null);
      setPackag1Support(null);
      setOffer3Packages(false);
      setPackag2Name(null);
      setPackag2Desc(null);
      setPackag2Price(null);
      setPackag2DeliveryTime(null);
      setPackag2Revisions(null);
      setPackag2Support(null);
      setPackag3Name(null);
      setPackag3Desc(null);
      setPackag3Price(null);
      setPackag3DeliveryTime(null);
      setPackag3Revisions(null);
      setPackag3Support(null);
      setOfferExtraFastDelivery(false);
      setExtraBasicDeliveryTime(null);
      setExtraBasicDeliveryPrice(null);
      setExtraStandardDeliveryPrice(null);
      setExtraStandardDeliveryTime(null);
      setExtraPremiumDeliveryTime(null);
      setExtraPremiumDeliveryPrice(null);
      setOfferExtraRevision(false);
      setExtraBasicRevision(null);
      setExtraBasicRevisionPrice(null);
      setExtraStandardRevisionPrice(null);
      setExtraStandardRevision(null);
      setExtraPremiumRevisionPrice(null);
      setExtraPremiumRevision(null);
      setImages([]);
      setImagePreviews(["", "", ""]);
      setVideo(null);
      setRequirements([]);
      setFAQs([]);
      setOfferReward(false);
      setSelectedNFT(null);
    };
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center rounded-xl w-fit m-auto bg-white shadow-xl shadow-gray-200 p-3">
        {formSteps.map((step, index) => {
          const stepNumber = index + 1;

          let disabled = false;
          let currentStep = false;
          let completedStep = false;
          if (stepNumber > formStep) {
            disabled = true;
          }
          if (stepNumber === formStep) {
            currentStep = true;
          }
          if (stepNumber < formStep) {
            completedStep = true;
            disabled = true;
          }

          return (
            <GigStepForm
              key={index}
              icon={step.icon}
              title={step.title}
              step={index + 1}
              disabled={disabled}
              currentStep={currentStep}
              completedStep={completedStep}
            />
          );
        })}
      </div>

      <div className="my-10 bg-white shadow-xl shadow-gray-200 p-5 rounded-xl">
        {tabs[formStep - 1]}

        {formStep === 8 && (
          <>
            {error && (
              <div className="mb-5 w-full text-center flex flex-col items-center">
                <span className="rounded-xl p-3 bg-red-100 text-red-500 text-sm inline-block w-fit ">
                  {error}
                </span>

                <button
                  className="my-3 rounded-xl px-10 py-3 bg-nft-primary-light text-white font-semibold inline-block relative cursor-pointer hover:opacity-80 transition-colors shadow-lg shadow-purple-200 w-fit"
                  onClick={handlePrev}
                >
                  Previous
                </button>
              </div>
            )}

            <div className="justify-center flex items-center w-full">
              {gigCreationSuccess && (
                <div>
                  <Link
                    to={`/gigdetails/${newGig.title.replace(/ /g, "-")}/${
                      newGig._id
                    }`}
                    className="w-fit p-3 rounded-xl border-nft-primary-light border-2 mx-auto flex items-center gap-3 cursor-pointer text-nft-primary-light font-medium"
                  >
                    <LinkIcon className="h-6 w-6 inline-block" />
                    <div>{`${
                      process.env.REACT_APP_API_URL
                    }/gigdetails/${newGig.title.replace(/ /g, "-")}/${
                      newGig._id
                    }`}</div>
                  </Link>

                  <div className="flex gap-4 mt-6 w-full justify-center">
                    <Link
                      to={`/gigdetails/${newGig.title
                        .replace(/[^a-zA-Z0-9-]+/g, "-")
                        .replace(/-+/g, "-")
                        .toLowerCase()}/${newGig._id}`}
                      className="rounded-xl px-6 py-3 bg-gray-200 text-gray-800 font-semibold inline-block relative cursor-pointer hover:opacity-80 transition-colors border border-gray-300"
                    >
                      Preview
                    </Link>
                    <button
                      className="rounded-xl px-6 py-3 bg-nft-primary-light text-white font-semibold inline-block relative cursor-pointer hover:opacity-80 transition-colors shadow-lg shadow-purple-200"
                      onClick={Done}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}

              {!gigCreationSuccess && (
                <button
                  className="rounded-xl px-10 py-4 bg-nft-primary-light text-white font-semibold inline-block relative cursor-pointer hover:opacity-80 transition-colors shadow-lg shadow-purple-200 text-base"
                  onClick={handleGigSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 mx-auto rounded-full border-t border-r animate-spin border-white"></div>
                  ) : (
                    <>
                      <span> Publish Gig</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SellerCreateGig;
