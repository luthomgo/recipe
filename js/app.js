/*
  app.js
  ------
  THE ENTRY POINT. Loaded last. Calls nothing except .init().
 
  THIS FILE'S ONLY JOB: Start the app.
  It does not know HOW any feature works.
  It only knows WHICH features exist and that they need starting.
 
  WHY DOMContentLoaded?
  The browser parses HTML top to bottom. When it hits a <script>
  tag, it pauses HTML parsing to run the script.
  We put all <script> tags at the BOTTOM of <body> — so by
  the time app.js runs, all HTML elements exist.
  DOMContentLoaded is a safety net that says "even if somehow
  this runs before the DOM is ready, wait until it is."
  Belt AND braces. Good habit.
 
  THE WIRING PATTERN:
  Button IDs are defined in HTML.
  Feature logic lives in namespaces.
  app.js connects them.
  
  This means:
  - HTML doesn't know about JS logic
  - JS namespaces don't know about each other
  - app.js is the only file that sees the full picture
  
  This is called "loose coupling" and it's a core principle
  of maintainable software.
*/

document.addEventListener("DOMContentLoaded", () => {
  // Boot all features
  Navbar.init();
  Recipes.init();
  Modal.init();
  Surprise.init();
  Chat.init();

  // ---- WIRE UP BUTTONS ----
  // Why here and not inside each namespace?
  // Because these buttons trigger cross-feature behaviour.
  // "Sign up" opens Modal — that's Modal's job, but the
  // button lives near the Recipe grid. app.js is the right
  // place to bridge them.

  // Navbar
  document
    .getElementById("navLoginBtn")
    .addEventListener("click", () => Modal.open("login"));

  document
    .getElementById("navSignupBtn")
    .addEventListener("click", () => Modal.open("signup"));

  // Hero
  document
    .getElementById("heroSignupBtn")
    .addEventListener("click", () => Modal.open("signup"));

  document.getElementById("heroSurpriseBtn").addEventListener("click", () => {
    document.getElementById("surprise").scrollIntoView({ behavior: "smooth" });
    // Small delay so the scroll starts before the card appears
    setTimeout(() => Surprise.pick(), 400);
  });

  // Recipe grid — event delegation
  // WHY DELEGATION?
  // The cards are created dynamically by Recipes.render().
  // They don't exist in the DOM when app.js first runs.
  // So we can't attach listeners directly to them.
  // Instead we listen on the static parent (#recipeGrid)
  // and check if the click target was a card or inside one.
  // This is called "event delegation" — one listener handles
  // all cards, even ones added in the future.
  document.getElementById("recipeGrid").addEventListener("click", (e) => {
    const card = e.target.closest(".recipe-card");
    if (!card) return;
    const id = parseInt(card.dataset.recipeId, 10);
    Recipes.openDetail(id);
  });

  // Keyboard accessibility for recipe cards (Enter key = click)
  document.getElementById("recipeGrid").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const card = e.target.closest(".recipe-card");
    if (!card) return;
    const id = parseInt(card.dataset.recipeId, 10);
    Recipes.openDetail(id);
  });

  // "View All" — requires login
  document
    .getElementById("viewAllBtn")
    .addEventListener("click", () => Modal.open("signup"));

  // Features teaser CTA
  document
    .getElementById("teaserSignupBtn")
    .addEventListener("click", () => Modal.open("signup"));

  // Footer
  document.getElementById("footerSignupBtn").addEventListener("click", (e) => {
    e.preventDefault();
    Modal.open("signup");
  });

  document.getElementById("footerLoginBtn").addEventListener("click", (e) => {
    e.preventDefault();
    Modal.open("login");
  });
});
