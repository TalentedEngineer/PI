import React from "react";

const BlogResources = () => {
  return (
    <div className="mt-28 py-20" style={{ background: "#F0F4F7" }}>
      <div className="container mx-auto">
        <div className="text-center mb-11">
          <h1 className="text-4xl font-extrabold tracking-tight text-black sm:text-4xl">
            Resources for getting started
          </h1>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3 px-4 mb-4">
            <div className="bg-white rounded-xl shadow-lg p-5">
              <img
                className="h-48 object-cover rounded-t-lg w-full rounded-xl"
                src={require("../../assets/recource1.jpg")}
                alt="Card 1"
              />
              <div className="pt-6">
                <h3 className="text-lg font-bold mb-2">
                  I should have recieved NFTs
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Scammers and bad actors could easily steal an artist's work
                  and open a fake OpenSea account where they list counterfeit
                  artwork for auction.
                </p>
                <a
                  href="#s"
                  className="flex items-center gap-3 text-black font-bold text-sm hover:translate-x-1 transition-transform"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                  See more details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogResources;
