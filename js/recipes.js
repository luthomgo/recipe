/*
  recipes.js
  ----------
  NAMESPACE: Recipes
  DEPENDENCIES: RECIPES (data.js), AppState (state.js)
  OWNS: Recipe grid rendering, category filtering, recipe detail modal

  THE NAMESPACE PATTERN:
  Everything in this file lives inside the Recipes object.
  From outside this file, you call Recipes.render() or Recipes.init().
  You cannot accidentally overwrite a function in modal.js
  because they live in different objects (Modal.open vs Recipes.open).

  This is manual encapsulation — the same thing ES Modules
  (import/export) give you automatically. We do it by hand
  so you understand the problem they solve.
*/

const Recipes = {
  /*
    init()
    Called once by app.js on DOMContentLoaded.
    Sets up event listeners and renders the first view.
    
    WHY AN init() PATTERN?
    Because init() only runs when we call it.
    If this code ran immediately on file load, the DOM
    might not be ready yet and querySelector would return null.
    DOMContentLoaded in app.js guarantees the DOM exists first.
  */
  init() {
    this.render();
    this._bindCategoryPills();
  },

  /*
    render()
    Builds recipe cards from filtered data and injects them
    into #recipeGrid in one DOM write (innerHTML).

    WHY ONE innerHTML ASSIGNMENT?
    Each time you touch the DOM, the browser potentially
    recalculates layout (a "reflow"). Building the full HTML
    string first and writing once = one reflow.
    Writing card by card in a loop = N reflows. Slow.
  */
  render() {
    const grid = document.getElementById("recipeGrid");
    const filtered =
      AppState.activeCategory === "all"
        ? RECIPES
        : RECIPES.filter((r) => r.category === AppState.activeCategory);

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--color-text-muted);">
          <p style="font-size:2rem;margin-bottom:0.5rem;">🍽️</p>
          <p>No recipes in this category yet. Check back soon!</p>
        </div>`;
      return;
    }

    grid.innerHTML = filtered
      .map((recipe) => this._cardTemplate(recipe))
      .join("");
  },

  /*
    _cardTemplate(recipe)
    Returns the HTML string for a single recipe card.

    WHY A SEPARATE METHOD?
    Because render() shouldn't know how a card looks.
    _cardTemplate() knows the card structure.
    render() knows how to inject cards into the grid.
    Single responsibility again.

    WHY THE UNDERSCORE PREFIX?
    Convention: _method means "private — only used inside
    this object, don't call it from outside."
    JS doesn't enforce this, but the underscore is a signal
    to your future self and teammates.
  */
  _cardTemplate(recipe) {
    return `
      <article
        class="recipe-card"
        data-recipe-id="${recipe.id}"
        role="button"
        tabindex="0"
        aria-label="View ${recipe.title}"
      >
        <div class="recipe-card-img">
          <img src="${recipe.image}" alt="${recipe.title}" loading="lazy" />
          <span class="recipe-badge">${recipe.badge}</span>
        </div>
        <div class="recipe-card-body">
          <div class="recipe-card-meta">
            <span>⏱ ${recipe.time}</span>
            <span>🔥 ${recipe.calories}</span>
            <span>👤 ${recipe.servings}</span>
          </div>
          <h3>${recipe.title}</h3>
          <p>${recipe.description}</p>
        </div>
        <div class="recipe-card-footer">
          <div class="recipe-tags">
            ${recipe.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
          </div>
          <span class="recipe-rating">★ ${recipe.rating}</span>
        </div>
      </article>
    `;
  },

  /*
    openDetail(id)
    Shows the recipe detail modal with a login prompt.
    This is the "gate" from the PDF spec:
    users must sign up to see full recipe details.
  */
  openDetail(id) {
    const recipe = RECIPES.find((r) => r.id === id);
    if (!recipe) return;

    const overlay = document.getElementById("recipeModalOverlay");
    const content = document.getElementById("recipeModalContent");

    content.innerHTML = `
      <div class="recipe-detail">
        <img class="recipe-detail-img" src="${recipe.image}" alt="${recipe.title}" />
        <h2>${recipe.title}</h2>
        <div class="recipe-detail-meta">
          <span>⏱ ${recipe.time}</span>
          <span>🔥 ${recipe.calories}</span>
          <span>📊 ${recipe.difficulty}</span>
          <span>★ ${recipe.rating}</span>
        </div>
        <p class="recipe-detail-desc">${recipe.description}</p>
        <div class="login-prompt">
          <p>🔒 <strong>Sign up free</strong> to unlock full ingredients, step-by-step instructions, and save this recipe.</p>
          <button class="btn-primary" onclick="Modal.closeRecipe(); Modal.open('signup');">
            Unlock Full Recipe
          </button>
        </div>
      </div>
    `;

    overlay.classList.add("open");
  },

  /*
    _bindCategoryPills()
    Attaches click events to all category pills.
    Updates AppState and re-renders on click.

    WHY READ data-category FROM THE ELEMENT?
    Because we never want JS to know the list of categories
    by heart — that's the HTML's job. The JS just reads
    whatever the HTML says. Change the HTML, JS adapts.
    This is called "data-driven" behaviour.
  */
  _bindCategoryPills() {
    const pills = document.querySelectorAll(".category-pill");

    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        // Update visual state
        pills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");

        // Update app state
        AppState.activeCategory = pill.dataset.category;

        // Re-render with new filter
        this.render();

        // Scroll to the grid
        document
          .getElementById("trending")
          .scrollIntoView({ behavior: "smooth" });
      });
    });
  },
};
