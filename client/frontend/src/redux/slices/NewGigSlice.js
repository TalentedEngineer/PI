import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentGig: null,
  gig: {
    overview: {},
    description: {},
    pricing: {},
    gallery: {},
    nft: {},
    requirements: {},
    faqs: {},
    publish: {},
  },
  formStep: 1,
};

const gigSlice = createSlice({
  name: "gig",
  initialState,
  reducers: {
    setGigData(state, action) {
      state.gig.currentGig = action.payload;
    },
    setGigOverview(state, action) {
      state.gig.overview = action.payload;
    },
    setGigDescription(state, action) {
      state.gig.description = action.payload;
    },
    setGigPricing(state, action) {
      state.gig.pricing = action.payload;
    },
    setGigGallery(state, action) {
      state.gig.gallery = action.payload;
    },
    setGigNft(state, action) {
      state.gig.nft = action.payload;
    },
    setGigRequirements(state, action) {
      state.gig.requirements = action.payload;
    },
    setGigFaqs(state, action) {
      state.gig.faqs = action.payload;
    },
    setGigPublish(state, action) {
      state.gig.publish = action.payload;
    },
    setFormStep(state, action) {
      state.formStep = action.payload;
    },
    setCurrentGig(state, action) {
      state.currentGig = action.payload;
    },
  },
});

export const {
  setFormStep,
  setGigOverview,
  setGigDescription,
  setGigPricing,
  setGigGallery,
  setGigNft,
  setGigRequirements,
  setGigFaqs,
  setGigPublish,
  setGigData,
  setCurrentGig,
} = gigSlice.actions;
export default gigSlice.reducer;
