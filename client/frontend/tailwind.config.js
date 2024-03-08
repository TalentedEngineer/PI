module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "Graphik", "sans-serif"],
      serif: ["Inter", "Merriweather", "serif"],
    },
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        "nft-primary-light": "rgb(120,82,243)",
        "nft-primary-dark": "rgb(96,66,196)",
        "nft-primary-transparent": "rgb(226,221,251)",
        "fb-color": "#3b5998",
        "twitter-color": "#55acee",
        "pinterest-color": "#bd081c",
        "linkedin-color": "#0077b5",
        "web-primary-light": "#5BBB7B",
        "web-primary-dark": "#1F4B3F",
        "web-primary-transparent": "#F1FCFA",
        "web-secondary-light": "#FFEDE8",
        "web-secondary-transparent": "#FBF7ED",
      },
      // backgroundImage: {
      //   "hero-left1": "url('./src/nftmarketplace/assets/nft1.jpg')",
      //   "hero-left2": "url('./src/nftmarketplace/assets/nft2.jpg')",
      //   "hero-left3": "url('./src/nftmarketplace/assets/nft4.jpg')",
      // },
    },
  },
};
