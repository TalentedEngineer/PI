//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//prevents re-entrancy attacks
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "hardhat/console.sol";

contract Marketplace is ERC721URIStorage, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds; //total number of items ever created
    Counters.Counter private _itemsSold; //total number of items sold

    address payable owner; //owner of the smart contract
    uint256 listingPrice = 0.000082 ether;

    //a way to store the activity of an item
    struct Activity {
        uint256 itemId;
        address from;
        address to;
        string eventType;
        uint256 price;
        uint256 timestamp;
    }

    // a way to store price history of an item
    struct PriceHistory {
        uint256 itemId;
        uint256 price;
        uint256 timestamp;
    }

    // a way to store the likes of an item
    struct Like {
        uint256 itemId;
        address from;
        uint256 timestamp;
    }

    struct MarketItem {
        uint itemId;
        address payable seller; //person selling the nft
        address payable owner; //owner of the nft
        address payable creator; //creator of the nft
        uint256 price;
        bool sold;
        bool isRewardItem;
        uint likes;
        uint views;
        bool isListed;
    }

    //a way to access values of the MarketItem struct above by passing an integer ID
    mapping(uint256 => MarketItem) private marketItems;
    mapping(uint256 => Activity[]) public activities;
    mapping(uint256 => PriceHistory[]) public priceHistories;
    mapping(uint256 => Like[]) public likes;

    //log message (when Item is sold)
    event MarketItemCreated(
        uint indexed itemId,
        address seller,
        address owner,
        address creator,
        uint256 price,
        bool sold,
        bool isRewardItem,
        uint likes,
        uint views,
        bool isListed
    );

    event RewardItemStatusUpdated(uint256 indexed tokenId, bool isRewardItem);

    constructor() ERC721("Nfluencer-Marketplace", "NFMP") {
        owner = payable(msg.sender);
    }

    /* Mints a token and lists it in the marketplace */
    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint256) {
        _itemIds.increment();
        uint256 newTokenId = _itemIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    /// @notice function to create market item
    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        marketItems[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            payable(msg.sender),
            price,
            false,
            false,
            0,
            0,
            true
        );

        addActivity(tokenId, address(0), msg.sender, "Mint", 0.0005 ether);
        _transfer(msg.sender, address(this), tokenId);
        addActivity(tokenId, address(0), msg.sender, "List", listingPrice);
        addPriceHistory(tokenId, price);

        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            msg.sender,
            price,
            false,
            false,
            0,
            0,
            true
        );
    }

    /// @notice function to buy an NFT
    function buyMarketItem(uint256 tokenId) public payable {
        uint256 price = marketItems[tokenId].price;
        address seller = marketItems[tokenId].seller;

        marketItems[tokenId].owner = payable(msg.sender);
        marketItems[tokenId].sold = true;
        marketItems[tokenId].seller = payable(address(0));
        marketItems[tokenId].isListed = false;
        _itemsSold.increment();

        addActivity(tokenId, address(this), msg.sender, "Sale", price);
        _transfer(address(this), msg.sender, tokenId);
        addActivity(tokenId, address(0), msg.sender, "Transfer", 0);

        payable(owner).transfer(listingPrice);
        payable(seller).transfer(msg.value);
    }

    /// @notice total number of items unsold on our platform
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (
                marketItems[i + 1].owner == address(this) &&
                marketItems[i + 1].isRewardItem == false
            ) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = marketItems[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /// @notice function to resell an NFT
    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(
            marketItems[tokenId].owner == msg.sender,
            "Only item owner can perform this operation"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        marketItems[tokenId].sold = false;
        marketItems[tokenId].price = price;
        marketItems[tokenId].seller = payable(msg.sender);
        marketItems[tokenId].owner = payable(address(this));
        marketItems[tokenId].isListed = true;
        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
        addActivity(tokenId, address(0), msg.sender, "List", listingPrice);
        addPriceHistory(tokenId, price);
    }

    /// @notice fetch list of NFTS purchased by this user
    function fetchPurchasedNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                marketItems[i + 1].owner == msg.sender &&
                marketItems[i + 1].isRewardItem == false
            ) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                marketItems[i + 1].owner == msg.sender &&
                marketItems[i + 1].isRewardItem == false
            ) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = marketItems[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /// @notice fetch list of NFTS created by this user
    function fetchItemsCreated() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                marketItems[i + 1].seller == msg.sender &&
                marketItems[i + 1].isRewardItem == false
            ) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                marketItems[i + 1].seller == msg.sender &&
                marketItems[i + 1].isRewardItem == false
            ) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = marketItems[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /// @notice fetch list of NFTS created by user and are reward items
    function fetchRewardItemsCreated()
        public
        view
        returns (MarketItem[] memory)
    {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                marketItems[i + 1].seller == msg.sender &&
                marketItems[i + 1].isRewardItem == true
            ) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                marketItems[i + 1].seller == msg.sender &&
                marketItems[i + 1].isRewardItem == true
            ) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = marketItems[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /// @notice function to update listing price
    function updateListingPrice(uint256 _price) public payable {
        listingPrice = _price;
    }

    /// @notice function to get listingprice
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function addActivity(
        uint256 tokenId,
        address from,
        address to,
        string memory eventType,
        uint256 price
    ) public {
        Activity memory activity = Activity(
            tokenId,
            from,
            to,
            eventType,
            price,
            block.timestamp
        );
        activities[tokenId].push(activity);
    }

    function addPriceHistory(uint256 tokenId, uint256 price) public {
        PriceHistory memory priceHistory = PriceHistory(
            tokenId,
            price,
            block.timestamp
        );
        priceHistories[tokenId].push(priceHistory);
    }

    /// @notice function to get price history of an NFT
    function getPriceHistory(
        uint256 tokenId
    ) public view returns (PriceHistory[] memory) {
        return priceHistories[tokenId];
    }

    function getActivities(
        uint256 tokenId
    ) public view returns (Activity[] memory) {
        return activities[tokenId];
    }

    /// @notice function to update whether an NFT is a reward item
    function updateIsRewardItem(uint256 itemId, bool isRewardItem) public {
        // require(msg.sender == owner, "Only the owner can update isRewardItem");
        marketItems[itemId].isRewardItem = isRewardItem;
        marketItems[itemId].isListed = isRewardItem ? false : true;

        emit RewardItemStatusUpdated(itemId, isRewardItem);
    }

    /// @notice function to get NFT details by TokenId/ItemId
    function getNFTDetails(
        uint256 itemId
    ) public view returns (MarketItem memory) {
        require(itemId > 0 && itemId <= _itemIds.current(), "Invalid Item ID");
        return marketItems[itemId];
    }

    /// @notice function to update the tokenURI of an item
    function updateTokenURI(uint256 tokenId, string memory newTokenURI) public {
        _setTokenURI(tokenId, newTokenURI);
    }

    /// @notice function to add a like to an NFT
    function addLike(uint256 itemId) public {
        Like memory like = Like(itemId, msg.sender, block.timestamp);
        likes[itemId].push(like);
        marketItems[itemId].likes += 1;
    }

    /// @notice function to get likes of an NFT
    function getLikes(uint256 itemId) public view returns (Like[] memory) {
        return likes[itemId];
    }

    /// @notice function to remove a like from an NFT
    function removeLike(uint256 itemId) public {
        uint256 totalLikes = likes[itemId].length;
        for (uint256 i = 0; i < totalLikes; i++) {
            if (likes[itemId][i].from == msg.sender) {
                delete likes[itemId][i];
                marketItems[itemId].likes -= 1;
            }
        }
    }
}
