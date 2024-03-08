const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Marketplace", function () {
  it("Should create, buy, and resell market items", async function () {
    const [owner, buyer, reseller] = await ethers.getSigners();

    const Market = await ethers.getContractFactory("Marketplace");
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftContractAddress = nft.address;

    // get the listing price
    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    // set an auction price
    const auctionPrice = ethers.utils.parseUnits("0.0001", "ether");

    // create test token and market item
    await nft.connect(owner).createToken("https://www.mytokenlocation.com");
    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice,
    });

    // Ensure the market item is created
    let items = await market.fetchMarketItems();
    expect(items.length).to.equal(1);

    // Connect the buyer and reseller to the market
    const marketWithBuyer = market.connect(buyer);
    const marketWithReseller = market.connect(reseller);

    // Buyer purchases the item
    await marketWithBuyer.createMarketSale(nftContractAddress, 1, {
      value: auctionPrice,
    });

    // Fetch updated market items
    items = await market.fetchMarketItems();
    expect(items.length).to.equal(0); // The item should no longer be listed

    // Ensure the buyer is the new owner of the sold item
    const soldItem = await market.getNFTDetails(1);
    expect(soldItem.owner).to.equal(buyer.address);

    // Ensure the seller is now the market contract address
    expect(soldItem.seller).to.equal(market.address);

    // Reseller attempts to resell the item
    const resellPrice = ethers.utils.parseUnits("150", "ether");
    await expect(
      marketWithReseller.resellToken(1, resellPrice, {
        value: listingPrice,
      })
    ).to.be.revertedWith("Only item owner can perform this operation");

    // Reseller becomes the owner of the item
    await marketWithReseller.createMarketSale(nftContractAddress, 1, {
      value: resellPrice,
    });

    // Fetch updated market items
    items = await market.fetchMarketItems();
    expect(items.length).to.equal(0); // The item should no longer be listed

    // Ensure the reseller is the new owner of the resold item
    const resoldItem = await market.getNFTDetails(1);
    expect(resoldItem.owner).to.equal(reseller.address);

    // Ensure the original buyer is now the seller
    expect(resoldItem.seller).to.equal(buyer.address);
  });
});
