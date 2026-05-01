/*
  navbar.js
  ---------
  NAMESPACE: Navbar
  DEPENDENCIES: none
  OWNS: Scroll shadow effect on navbar

  WHY NO DEPENDENCY ON AppState?
  The navbar scroll effect is purely visual — it reads
  window.scrollY and adds/removes a CSS class. It doesn't
  need to know about recipes, modals, or user state.

  If a feature has no dependencies, that's a sign it's
  well isolated. Treasure that — it means it can change
  without breaking anything else.
*/

const Navbar = {
  init() {
    this._bindScroll();
  },

  _bindScroll() {
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
      // Toggle class based on scroll position — CSS does the actual styling
      navbar.classList.toggle("scrolled", window.scrollY > 20);
    });
  },
};
