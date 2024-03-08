import React from "react";

function Footer() {
  return (
    <footer className="py-0" style={{ background: "rgb(34,34,34)" }}>
      <div className="container mx-auto">
        <div className="border-b border-gray-700 mb-12">
          <div className="container mx-auto">
            <div className="flex flex-col justify-between md:flex-row gap-4 py-6">
              <div className="flex items-center justify-center gap-7 text-sm">
                <a href="sd" className="font-semibold text-white text-[16px]">
                  Terms of Service
                </a>
                <a href="sd" className="font-semibold text-white text-[16px]">
                  Privacy Policy
                </a>
                <a href="sd" className="font-semibold text-white text-[16px]">
                  Site Map
                </a>
              </div>

              <div>
                <ul className="list-none flex justify-start items-center gap-4">
                  <li>
                    <span className="text-[16px] font-semibold block text-white">
                      Follow Us
                    </span>
                  </li>
                  <li>
                    <a
                      href="s"
                      className="hover:bg-nft-primary-light transition-colors rounded-full block p-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        className="w-4 h-4 fill-white"
                      >
                        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="s"
                      className="hover:bg-nft-primary-light transition-colors rounded-full block p-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-4 h-4 fill-white "
                      >
                        <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="s"
                      className="hover:bg-nft-primary-light transition-colors rounded-full block p-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        className="w-4 h-4 fill-white "
                      >
                        <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="s"
                      className="hover:bg-nft-primary-light transition-colors rounded-full block p-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="w-4 h-4 fill-white "
                      >
                        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap flex-row">
          <div className="w-full sm:w-1/2 md:w-auto md:flex-[2]">
            <div>
              <h2 className="mb-5 text-md font-semibold block text-white">
                About
              </h2>
              <ul>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Become Seller
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Jobs
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-auto md:flex-[2]">
            <div>
              <h2 className="mb-5 text-md font-semibold block text-white">
                Categories
              </h2>
              <ul>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Design & Creative
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Development & IT
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Music & Audio
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Programming & Tech
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Digital Marketing
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Finance & Accounting
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Writing & Translation
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Trending
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Lifestyle
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-auto md:flex-[2]">
            <div>
              <h2 className="mb-5 text-md font-semibold block text-white">
                Support
              </h2>
              <ul>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Help & Support
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ Freeio
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-auto md:flex-[3]">
            <span className="mb-5 text-md font-semibold block text-white">
              Subscribe
            </span>
            <div className="relative">
              <input
                type="text"
                placeholder="Your email address"
                className="rounded-xl p-4 w-full bg-transparent border-2 text-white font-normal text-sm outline-none placeholder:text-gray-400 bg-neutral-600 border-gray-600 focus:border-nft-primary-light"
              />
              <button className="text-md font-semibold block text-white absolute top-3.5 right-4 transform hover:text-nft-primary-light">
                Send
              </button>
            </div>

            <div className="mt-7">
              <span className="mb-5 text-md font-semibold block text-white">
                Apps
              </span>
              <ul>
                <li className="mb-3">
                  <a
                    href="we"
                    className="font-normal text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Android App
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-16">
          <div className="container mx-auto">
            <div className="flex flex-col justify-between md:flex-row gap-4 py-6">
              <div className="flex items-center justify-center gap-7 font-normal text-xs text-gray-400">
                © 2022 All rights reserved.
              </div>

              <div>
                <select className="bg-transparent outline-none appearance-none text-gray-400 bg-neutral-600 p-2 rounded text-sm text-center cursor-pointer">
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
