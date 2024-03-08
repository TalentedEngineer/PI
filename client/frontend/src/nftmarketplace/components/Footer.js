import React from "react";

function Footer() {
  return (
    <footer
      className="p-4 sm:py-16 py-10 sm:p-6 mt-28"
      style={{ background: "rgb(240, 244, 247)" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-wrap flex-row">
          <div className="w-full sm:w-1/2 md:w-auto md:flex-[3]">
            <span className="text-md font-bold mb-4 block">
              Subscribe to Updates
            </span>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your e-mail"
                className="rounded-full p-4 w-full bg-transparent border-2 font-semibold text-sm outline-none placeholder:text-gray-500 text-gray-500 focus:border-gray-300"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 text-gray-500 absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>

            <div className="mt-14">
              <span className="text-md font-bold mb-4 block">Follow us</span>
              <ul className="list-none flex justify-start items-center gap-4">
                <li>
                  <a
                    href="s"
                    className="hover:bg-white transition-colors rounded-full block p-4 hover:shadow-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      className="w-4 h-4 fill-fb-color"
                    >
                      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="s"
                    className="hover:bg-white transition-colors rounded-full block p-4 hover:shadow-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-4 h-4 fill-twitter-color"
                    >
                      <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="s"
                    className="hover:bg-white transition-colors rounded-full block p-4 hover:shadow-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      className="w-4 h-4 fill-pinterest-color"
                    >
                      <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="s"
                    className="hover:bg-white transition-colors rounded-full block p-4 hover:shadow-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-4 h-4 fill-linkedin-color"
                    >
                      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-auto md:flex-[2] md:pl-14 max-md:pl-14 max-sm:pl-0">
            <div>
              <h2 className="mb-5 text-md font-bold block">Marketplace</h2>
              <ul>
                <li className="mb-2">
                  <a
                    href="we"
                    className="font-bold text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    Explore
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="we"
                    className="font-bold text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="we"
                    className="font-bold text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="we"
                    className="font-bold text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    Platform Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-auto md:flex-[2] md:pl-14">
            <div>
              <h2 className="mb-5 text-md font-bold block">Community</h2>
              <ul>
                <li className="mb-2">
                  <a
                    href="we"
                    className="font-bold text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    Profile
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="we"
                    className="font-bold text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    Favorites
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="we"
                    className="font-bold text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    Watchlist
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="we"
                    className="font-bold text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    Collections
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="we"
                    className="font-bold text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    Rankings
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="we"
                    className="font-bold text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    Activity
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-auto md:flex-[3]">
            <h2 className="mb-5 text-md font-bold block">Region</h2>
            <p className="text-sm text-gray-700">
              The world's first marketplace for collectibles and non-fungible
              tokens NFTs where anything is possible and all are welcome
            </p>
            <div className="py-4 px-4 rounded-full text-gray-500 font-semibold border-2 inline-block mt-10">
              <label className="text-sm pr-1">Currency -</label>
              <select className="bg-transparent outline-none text-sm">
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gbp">GBP</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t mt-14 py-7 pt-14 pb-4">
        <div className="container mx-auto">
          <div className="flex flex-col justify-between md:flex-row gap-4">
            <div className="flex items-center justify-center gap-7 text-sm">
              <a href="sd" className="font-bold">
                Privacy Policy
              </a>
              <a href="sd" className="font-bold">
                License
              </a>
              <a href="sd" className="font-bold">
                API
              </a>
            </div>

            <div className="flex items-center justify-center gap-6">
              <div className="text-sm rounded-full text-gray-500 font-semibold bg-transparent flex gap-0">
                <select className="bg-transparent outline-none appearance-none">
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6.262 6.072a8.25 8.25 0 1010.562-.766 4.5 4.5 0 01-1.318 1.357L14.25 7.5l.165.33a.809.809 0 01-1.086 1.085l-.604-.302a1.125 1.125 0 00-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 01-2.288 4.04l-.723.724a1.125 1.125 0 01-1.298.21l-.153-.076a1.125 1.125 0 01-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 01-.21-1.298L9.75 12l-1.64-1.64a6 6 0 01-1.676-3.257l-.172-1.03z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <select className="py-4 px-8 text-sm rounded-full text-gray-500 font-semibold border-2 inline-block bg-transparent outline-none">
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>

            <div className="flex mt-4 space-x-6 justify-center items-center sm:mt-0 text-center text-sm text-gray-700">
              <span className="text-sm sm:text-center">
                © 2023{" "}
                <a href="sa" className="hover:underline">
                  Nfluencer™
                </a>
                . All Rights Reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
