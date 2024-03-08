import React, { useEffect } from "react";
import herobg from "../assets/img/vr-glasses2.PNG";
import BalanceChart from "../components/charts/BalanceChart";
import { Link } from "react-router-dom";
import TopCreators from "../components/nft/TopCreators";
import YourNFTs from "../components/nft/YourNFTs";
import CryptoWalletsConnect from "../components/nft/CryptoWalletsConnect";
import { useSelector } from "react-redux";
import PurchasedNFTs from "../components/nft/PurchasedNFTs";
import NotableDrops from "../../../nftmarketplace/components/home/NotableDrops";

const MyItems = () => {
  const user = useSelector((state) => state.user.user);
  const isWalletConnected = useSelector(
    (state) => state.user.isWalletConnected
  );

  useEffect(() => {
    window.ethereum.on("accountsChanged", async function (accounts) {
      window.location.reload();
    });
  }, []);

  return (
    <div className="w-full">
      {isWalletConnected ? (
        <div>lorem ipsum</div>
      ) : (
        <CryptoWalletsConnect user={user} />
      )}
    </div>
  );
};

export default MyItems;
