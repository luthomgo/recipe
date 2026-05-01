/*
  surprise.js
  -----------
  NAMESPACE: Surprise
  DEPENDENCIES: RECIPES (data.js)
  OWNS: "Surprise Me" random recipe feature

  This is the smallest namespace in the project.
  That's fine — not everything needs to be big.
  Small, focused files are a sign of good design.
  
  Future: when Spoonacular is connected, replace the
  random pick from RECIPES with a call to their /random endpoint.
  Only this file changes.
*/

const Surprise = {
  init() {
    this._bindButton();
  },

  pick() {
    const random = RECIPES[Math.floor(Math.random() * RECIPES.length)];

    const resultEl = document.getElementById("surpriseResult");
    const cardEl = document.getElementById("surpriseCard");

    cardEl.innerHTML = `
      <img src="${random.image}" alt="${random.title}" />
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.4rem;">
        <span style="font-size:0.7rem;background:var(--color-accent);color:white;padding:0.2rem 0.6rem;border-radius:20px;text-transform:uppercase;letter-spacing:0.05em;">
          🎲 Your Pick
        </span>
        <span style="font-size:0.75rem;color:rgba(250,247,242,0.6);">⏱ ${random.time}</span>
      </div>
      <h3>${random.title}</h3>
      <p>${random.description}</p>
      <button
        class="btn-primary"
        style="margin-top:1rem;width:100%;"
        onclick="Recipes.openDetail(${random.id})"
      >
        See Recipe →
      </button>
    `;

    resultEl.style.display = "block";
    resultEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  },

  _bindButton() {
    document
      .getElementById("surpriseMeBtn")
      .addEventListener("click", () => this.pick());
  },
};
