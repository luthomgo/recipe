/*
  recipes.js
  ----------
  NAMESPACE: Recipes
  DEPENDENCIES: RECIPES (data.js), AppState (state.js)
  OWNS: Recipe grid rendering, category filtering, search, recipe detail modal
*/

const Recipes = {
  init() {
    this.render();
    this._bindCategoryPills();
    this._bindSearch();
  },

  /*
    render()
    Handles BOTH category filter AND search filter in one pass.
    Step 1 — filter by category
    Step 2 — filter that result by search query
    Both read from AppState so they always stay in sync.
  */
  render() {
    const grid = document.getElementById("recipeGrid");

    // Step 1: category filter
    let filtered =
      AppState.activeCategory === "all"
        ? RECIPES
        : RECIPES.filter((r) => r.category === AppState.activeCategory);

    // Step 2: search filter on top of category result
    const query = (AppState.searchQuery || "").trim().toLowerCase();
    if (query) {
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          r.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          r.category.toLowerCase().includes(query),
      );
    }

    // No results state
    if (filtered.length === 0) {
      const msg = query
        ? `No recipes found for "<strong>${query}</strong>". Try a different search.`
        : "No recipes in this category yet. Check back soon!";
      grid.innerHTML = `
        <div class="search-no-results">
          <p>🍽️</p>
          <p>${msg}</p>
        </div>`;
      return;
    }

    grid.innerHTML = filtered
      .map((recipe) => this._cardTemplate(recipe))
      .join("");
  },

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
    _bindSearch()
    Wires up all search interactions:
    1. Click circle  → expand widget
    2. Type          → filter recipes in real time
    3. Click ✕       → clear + collapse
    4. Click outside → collapse
    5. Escape key    → collapse
  */
  _bindSearch() {
    const widget = document.getElementById("searchWidget");
    const trigger = document.getElementById("searchTrigger");
    const input = document.getElementById("searchInput");
    const closeBtn = document.getElementById("searchClose");

    if (!widget || !trigger || !input || !closeBtn) return;

    // 1. Circle → expand
    trigger.addEventListener("click", () => {
      widget.classList.add("is-open");
      setTimeout(() => input.focus(), 300);
    });

    // 2. Typing → real-time filter
    input.addEventListener("input", () => {
      AppState.searchQuery = input.value;
      this.render();
      if (input.value.trim()) {
        document
          .getElementById("trending")
          .scrollIntoView({ behavior: "smooth" });
      }
    });

    // 3. ✕ → clear and collapse
    closeBtn.addEventListener("click", () => this._closeSearch());

    // 4. Click outside → collapse
    document.addEventListener("click", (e) => {
      if (!widget.contains(e.target)) this._closeSearch();
    });

    // 5. Escape → collapse
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && widget.classList.contains("is-open")) {
        this._closeSearch();
      }
    });
  },

  /*
    _closeSearch()
    Single method called from three places — DRY principle.
    Collapses widget, clears input, resets state, re-renders.
  */
  _closeSearch() {
    const widget = document.getElementById("searchWidget");
    const input = document.getElementById("searchInput");
    if (!widget || !input) return;

    widget.classList.remove("is-open");
    input.value = "";
    AppState.searchQuery = "";
    this.render();
  },

  _bindCategoryPills() {
    const pills = document.querySelectorAll(".category-pill");
    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        pills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        AppState.activeCategory = pill.dataset.category;

        // Clear search when switching category
        const input = document.getElementById("searchInput");
        if (input) input.value = "";
        AppState.searchQuery = "";

        this.render();
        document
          .getElementById("trending")
          .scrollIntoView({ behavior: "smooth" });
      });
    });
  },
};
