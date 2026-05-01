/*
  state.js
  --------
  SINGLE RESPONSIBILITY: Hold the application's current state.

  STATE = the answers to "what is the app doing right now?"
  - Which category is selected?
  - Is a modal open? What mode?
  - What has the user typed into the signup form so far?

  WHY ONE OBJECT INSTEAD OF SCATTERED VARIABLES?
  Imagine debugging: if state is spread across 5 files as
  random variables, you have no single place to look.
  With one AppState object, you can console.log(AppState)
  at any moment and see everything. This is called a
  "single source of truth" — the most important concept
  in frontend architecture. React's useState, Vue's ref,
  Redux store — they're all this same idea, fancier.

  WHY NOT JUST USE 'state' AS THE NAME?
  'state' is too generic — it could mean anything.
  'AppState' is a namespace that signals "this is THE
  application state object." Naming is architecture.
*/

const AppState = {
  activeCategory: "all",
  modalMode: null, // 'login' | 'signup' | null
  signupStep: 1, // 1 | 2
  signupData: {}, // holds step 1 data while on step 2
  selectedChips: {
    dietary: [],
    cuisine: [],
  },
};
