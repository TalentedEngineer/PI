import { NotableCollectionCarousel } from "./NotableCollectionCarousel";
import React, { useEffect } from "react";
import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import {
  NFTMarketplaceContractABI,
  NFTMarketplaceContractAddress,
} from "../../../constants/ContractDetails";
import Loader from "../../../utils/Loader";

const NotableCollectionByCategory = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const [nfts, setNFTs] = useState([]);
  const [isNFTLoading, setIsNFTLoading] = useState(false);
  const [trendingArtNFTs, setTrendingArtNFTs] = useState([]);
  const [trendingGamingNFTs, setTrendingGamingNFTs] = useState([]);
  const [trendingMembershipsNFTs, setTrendingMembershipsNFTs] = useState([]);
  const [trendingMusicNFTs, setTrendingMusicNFTs] = useState([]);
  const [trendingPFPsNFTs, setTrendingPFPsNFTs] = useState([]);
  const [trendingPhotographyNFTs, setTrendingPhotographyNFTs] = useState([]);

  const fetchContract = (signerOrProvider) => {
    const marketplaceContract = new ethers.Contract(
      NFTMarketplaceContractAddress,
      NFTMarketplaceContractABI,
      signerOrProvider
    );

    return { marketplaceContract };
  };

  const fetchNFTs = async () => {
    setIsNFTLoading(true);
    const artNFTs = [];
    const gamingNFTs = [];
    const membershipsNFTs = [];
    const musicNFTs = [];
    const pfpNFTs = [];
    const photographyNFTs = [];

    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_ALCHEMY_SEPOLIA_URL
    );

    const { marketplaceContract } = fetchContract(provider);
    const fetchedMarketItems = await marketplaceContract.fetchMarketItems();

    const items = await Promise.all(
      fetchedMarketItems.map(async (i) => {
        const tokenUri = await marketplaceContract.tokenURI(i.itemId);
        const meta = await axios.get(tokenUri);
        console.log(meta);
        if (meta.data.isRewardItem === false) {
          if (meta.data.category.toLowerCase() === "art") {
            artNFTs.push({
              ...meta.data,
              likes: i.likes.toString(),
              itemId: Number(i.itemId),
              weiPrice: i.price,
            });
          } else if (meta.data.category.toLowerCase() === "gaming") {
            gamingNFTs.push({
              ...meta.data,
              likes: i.likes.toString(),
              itemId: Number(i.itemId),
              weiPrice: i.price,
            });
          } else if (meta.data.category.toLowerCase() === "memberships") {
            membershipsNFTs.push({
              ...meta.data,
              likes: i.likes.toString(),
              itemId: Number(i.itemId),
              weiPrice: i.price,
            });
          } else if (meta.data.category.toLowerCase() === "music") {
            musicNFTs.push({
              ...meta.data,
              likes: i.likes.toString(),
              itemId: Number(i.itemId),
              weiPrice: i.price,
            });
          } else if (meta.data.category.toLowerCase() === "pfps") {
            pfpNFTs.push({
              ...meta.data,
              likes: i.likes.toString(),
              itemId: Number(i.itemId),
              weiPrice: i.price,
            });
          } else if (meta.data.category.toLowerCase() === "photography") {
            photographyNFTs.push({
              ...meta.data,
              likes: i.likes.toString(),
              itemId: Number(i.itemId),
              weiPrice: i.price,
            });
          }
        }

        // return {
        //   ...meta.data,
        //   likes: i.likes.toString(),
        //   itemId: Number(i.itemId),
        //   weiPrice: i.price,
        // };
      })
    );

    // items.reverse();
    // setNFTs(items);

    console.log(artNFTs);

    artNFTs.sort(
      (a, b) => b.ownershipHistory.length - a.ownershipHistory.length
    );
    gamingNFTs.sort(
      (a, b) => b.ownershipHistory.length - a.ownershipHistory.length
    );
    membershipsNFTs.sort(
      (a, b) => b.ownershipHistory.length - a.ownershipHistory.length
    );
    musicNFTs.sort(
      (a, b) => b.ownershipHistory.length - a.ownershipHistory.length
    );
    pfpNFTs.sort(
      (a, b) => b.ownershipHistory.length - a.ownershipHistory.length
    );
    photographyNFTs.sort(
      (a, b) => b.ownershipHistory.length - a.ownershipHistory.length
    );

    setTrendingArtNFTs(artNFTs);
    setTrendingGamingNFTs(gamingNFTs);
    setTrendingMembershipsNFTs(membershipsNFTs);
    setTrendingMusicNFTs(musicNFTs);
    setTrendingPFPsNFTs(pfpNFTs);
    setTrendingPhotographyNFTs(photographyNFTs);

    setIsNFTLoading(false);
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  if (isNFTLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="mt-28">
        {trendingArtNFTs.length > 0 && (
          <NotableCollectionCarousel
            responsive={responsive}
            nfts={trendingArtNFTs}
            title={"Art"}
          />
        )}

        {trendingGamingNFTs.length > 0 && (
          <NotableCollectionCarousel
            responsive={responsive}
            nfts={trendingGamingNFTs}
            title={"Gaming"}
          />
        )}

        {trendingMembershipsNFTs.length > 0 && (
          <NotableCollectionCarousel
            responsive={responsive}
            nfts={trendingMembershipsNFTs}
            title={"Memberships"}
          />
        )}

        {trendingMusicNFTs.length > 0 && (
          <NotableCollectionCarousel
            responsive={responsive}
            nfts={trendingMusicNFTs}
            title={"Music"}
          />
        )}

        {trendingPFPsNFTs.length > 0 && (
          <NotableCollectionCarousel
            responsive={responsive}
            nfts={trendingPFPsNFTs}
            title={"PFPs"}
          />
        )}

        {trendingPhotographyNFTs.length > 0 && (
          <NotableCollectionCarousel
            responsive={responsive}
            nfts={trendingPhotographyNFTs}
            title={"Photography"}
          />
        )}
      </div>
    </>
  );
};

export default NotableCollectionByCategory;
