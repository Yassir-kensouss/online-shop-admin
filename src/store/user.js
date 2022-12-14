import { createReducer } from "@reduxjs/toolkit";

/* Reducer */

const initialState = {
  stories: [
    {
      id: 1,
      name: "TypeScript — What is it all about?",
      claps: 699,
      route:
        "https://levelup.gitconnected.com/typescript-what-is-it-all-about-4c9dea82cd32",
    },
    {
      id: 2,
      name: "JavaScript — A brief introduction",
      claps: 164,
      route:
        "https://medium.com/@abongsjoel/javascript-a-brief-introduction-e995ae5a2494",
    },
    {
      id: 3,
      name: "Redux — A birds-eye view",
      claps: 699,
      route:
        "https://levelup.gitconnected.com/redux-a-birds-eye-view-58925fc5ee8",
    },
  ],
};

const reducer = createReducer(initialState, {});

export default reducer;
