import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setIsWalletConnected,
  setWaletAddress,
} from "../../../../redux/slices/UserSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CryptoWalletsConnect = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const closeModal = () => {
    setIsOpen(false);
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setIsOpen(true);
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length) {
        setIsOpen(false);
        dispatch(setWaletAddress(accounts[0]));
        dispatch(setIsWalletConnected(true));
      }
    } catch (error) {
      console.log(`Error connecting with smart contract: ${error}`);
    }
  };

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

  return (
    <div>
      <div className="flex items-center justify-center h-full w-full">
        <div>
          <div className="bg-white rounded-xl text-gray-800 shadow-lg shadow-gray-200 p-7 max-w-xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-800">
              Connect your Crypto Wallet
            </h2>
            <p className="text-gray-500 text-sm">
              Please Install one of our available wallet providers to continue
              with NFTs.
            </p>

            <div className="text-lg font-extrabold tracking-tight text-gray-800 my-5 flex justify-between items-center">
              <span>Available Wallets</span>
              <a
                href="https://opensea.io/learn/what-is-crypto-wallet"
                className="text-nft-primary-light font-semibold text-sm hover:underline"
              >
                What is a wallet?
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-gray-500 font-medium text-xs">
              <div className="text-center w-full flex-1">
                <img
                  src="https://lh3.googleusercontent.com/QW0gZ3yugzXDvTANa5-cc1EpabQ2MGnl6enW11O6kIerEaBQGOhgyUOvhRedndD9io8RJMmJZfIXq1rMxUsFHS2Ttw=s60"
                  className="mx-auto mb-2"
                  alt="MetaMask"
                />
                <p>MetaMask</p>
              </div>
              <div className="text-center w-full flex-1">
                <img
                  src="https://lh3.googleusercontent.com/dXvdD2VjLS-imsW8WG2oB3y7sBHhL9gFlv7KZnqZSA9_MU1VROSHRpJidav8-a77uQT1-8X_zK5ibsAC39IFn5tn=s60"
                  className="mx-auto mb-2"
                  alt="Phantom"
                />
                <p>Phantom</p>
              </div>
              <div className="text-center w-full flex-1">
                <img
                  src="https://lh3.googleusercontent.com/BmQtjccsO615vh8Dnc_SIATj9lQAFzBltJbW15pxEce8c3yHC_iXTn-Pa8_5jXL130l1hEIqiTn5_jUIjR6iNyif=s60"
                  className="mx-auto mb-2"
                  alt="Crypto.com"
                />
                <p>Crypto.com</p>
              </div>
              <div className="text-center w-full flex-1">
                <img
                  src="https://lh3.googleusercontent.com/HE43gZIKp76W3bCaCbPwiTf8uB__YpY8byc4dkb300gNQGDcAraTM4l1uiwfsjhre9rtsHGiok8d3TY11dirxvLq=s60"
                  className="mx-auto mb-2"
                  alt="Coinbase"
                />
                <p>Coinbase</p>
              </div>
              <div className="text-center w-full flex-1">
                <img
                  src="https://lh3.googleusercontent.com/np4HOumdAD8htlHsTMiuJz_CyjcWhaG8BUG7WW_GJx7g3nb370MuBYEE8fZbG8bdsBiQZxiX_uJqutp2fn99C7X1uQI=s60"
                  className="mx-auto mb-2"
                  alt="Trust Wallet"
                />
                <p>Trust Wallet</p>
              </div>
              <div className="text-center w-full flex-1">
                <img
                  src="https://lh3.googleusercontent.com/uSYrwIYFZ-7kwg0-P_0YKubeNhFUN_jGg9J8bPbCOYjwW94jbFCEMqHUaV35sn0bvqujkuy6M72gjIRD4NTCirsQpXc=s60"
                  className="mx-auto mb-2"
                  alt="Core"
                />
                <p>Core</p>
              </div>
              <div className="text-center w-full flex-1">
                <img
                  src="https://lh3.googleusercontent.com/swyt6mPcoM0CR2sGlvFfIEQp3KcpxFNR3L6yukbNuSHQe9aBNyQwOQ4axVF3nFazaQ4Pr98BI5ZiZNjehwy5PeZR=s60"
                  className="mx-auto mb-2"
                  alt="Rainbow"
                />
                <p>Rainbow</p>
              </div>
              <div className="text-center w-full flex-1">
                <img
                  src="https://lh3.googleusercontent.com/3IPcfAuQRJip3MVL7DxvkkXPBYmCHpieDbKngiUGN-XQwwDh-jViXidDv9wXXE5FWhvUARmSdh-gBKedfd71Wx9qevo=s60"
                  className="mx-auto mb-2"
                  alt="Zerion"
                />
                <p>Zerion</p>
              </div>
              <div className="text-center w-full flex-1">
                <img
                  src="https://lh3.googleusercontent.com/FX5p3lkSFGhNy888EmvEzuegJFhTnhB6ZdIAp9UyE_IuOWWVRigyEJeL0hi7cSu-4nApqY-MU3OqdEqROs070c_n=s60"
                  className="mx-auto mb-2"
                  alt="Exodus"
                />
                <p>Exodus</p>
              </div>
            </div>

            <button
              className="rounded-xl px-6 py-4 bg-nft-primary-light text-white font-semibold relative cursor-pointer hover:opacity-80 transition-colors shadow-lg shadow-purple-200 max-w-sm block w-full mx-auto mt-10"
              onClick={connectWallet}
            >
              <span>Connect</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-20 right-2 w-1/3 bg-white p-4 rounded-xl shadow-xl ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            No Crypto Wallet Extension Found
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={closeModal}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-600 mb-4">
          Please install any of the mentioned crypto wallet extensions to use
          our NFT Marketplace.
        </p>
        <a
          className="bg-[rgb(245,133,27)] text-white p-4 block rounded-xl hover:opacity-80 transition duration-300 text-center"
          href="https://metamask.io/download/"
          target="_blank"
          rel="noreferrer"
        >
          Download Metamask
        </a>
      </div>
    </div>
  );
};

export default CryptoWalletsConnect;
