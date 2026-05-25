/*
  recipes-page.js
  ---------------
  OWNS: Everything on recipes.html.
  Boots itself — no app.js needed on this page.

  FILTER LOGIC:
  Filters use AND across groups, OR within a group.

  Example:
  User selects: cuisine=[asian, italian] + diet=[vegan] + prepTime=30

  Result: recipes that are
    (asian OR italian)
    AND (vegan)
    AND (prepTime <= 30)

*/

const PageState = {
  category:   'all',
  search:     '',
  sortBy:     'default',
  filters: {
    cuisine:    [],   // multi-select → OR logic
    diet:       [],   // multi-select → OR logic
    difficulty: [],   // multi-select → OR logic
    prepTime:   999   // single value → <= logic
  }
};


function applyFilters(recipes) {
  let result = [...recipes];

  // 1. Category pill filter
  if (PageState.category !== 'all') {
    result = result.filter(r => r.category === PageState.category);
  }

  // 2. Search — title, description, tags, cuisine
  const q = PageState.search.trim().toLowerCase();
  if (q) {
    result = result.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  // 3. Cuisine — OR logic (asian OR italian)
  if (PageState.filters.cuisine.length > 0) {
    result = result.filter(r =>
      PageState.filters.cuisine.includes(r.cuisine)
    );
  }

  // 4. Diet — OR logic (vegan OR gluten-free)
  //    Recipe must match AT LEAST ONE selected diet
  if (PageState.filters.diet.length > 0) {
    result = result.filter(r =>
      PageState.filters.diet.some(d => r.diet.includes(d))
    );
  }

  // 5. Difficulty — OR logic
  if (PageState.filters.difficulty.length > 0) {
    result = result.filter(r =>
      PageState.filters.difficulty.includes(r.difficulty)
    );
  }

  // 6. Prep time — <= logic (under 30 min)
  if (PageState.filters.prepTime < 999) {
    result = result.filter(r => r.prepTime <= PageState.filters.prepTime);
  }

  // 7. Sort
  const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
  switch (PageState.sortBy) {
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'time-asc':
      result.sort((a, b) => a.prepTime - b.prepTime);
      break;
    case 'calories-asc':
      result.sort((a, b) => parseInt(a.calories) - parseInt(b.calories));
      break;
    case 'difficulty-asc':
      result.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
      break;
    case 'difficulty-desc':
      result.sort((a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]);
      break;
  }

  return result;
}

/*
  RENDER — reads PageState, filters data, writes to DOM
*/
function render() {
  const grid    = document.getElementById('recipeGrid');
  const filtered = applyFilters(RECIPES);

  // Update result count
  updateResultCount(filtered.length);

  // Update active filter tags
  updateActiveFilterTags();

  // Update filter badge on mobile toggle button
  updateFilterBadge();

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="rp-no-results">
        <div class="no-results-emoji">🍽️</div>
        <h3>No recipes found</h3>
        <p>Try removing a filter or adjusting your search.</p>
        <button class="btn-primary" onclick="clearAllFilters()">
          Clear All Filters
        </button>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(r => cardTemplate(r)).join('');
}

/*
  CARD TEMPLATE
 */
function cardTemplate(recipe) {
  const difficultyLabel = { easy: '🟢 Easy', medium: '🟡 Medium', hard: '🔴 Hard' };
  const difficultyClass = { easy: 'badge-easy', medium: 'badge-medium', hard: 'badge-hard' };

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
        <span class="difficulty-badge ${difficultyClass[recipe.difficulty]}">
          ${difficultyLabel[recipe.difficulty]}
        </span>
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
          ${recipe.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <span class="recipe-rating">★ ${recipe.rating}</span>
      </div>
    </article>
  `;
}

/* 
  RECIPE DETAIL MODAL — full detail, no login gate
 */
function openDetail(id) {
  const recipe  = RECIPES.find(r => r.id === id);
  if (!recipe) return;

  const overlay = document.getElementById('recipeModalOverlay');
  const content = document.getElementById('recipeModalContent');
  const difficultyLabel = { easy: '🟢 Easy', medium: '🟡 Medium', hard: '🔴 Hard' };
  const difficultyClass = { easy: 'badge-easy', medium: 'badge-medium', hard: 'badge-hard' };

  content.innerHTML = `
    <div class="recipe-detail-full">
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h2>${recipe.title}</h2>
      <div class="recipe-detail-meta">
        <span>⏱ ${recipe.time}</span>
        <span>🔥 ${recipe.calories}</span>
        <span>👤 Serves ${recipe.servings}</span>
        <span>★ ${recipe.rating}</span>
        <span class="difficulty-badge ${difficultyClass[recipe.difficulty]}">
          ${difficultyLabel[recipe.difficulty]}
        </span>
      </div>
      <p class="recipe-detail-desc">${recipe.description}</p>
      <div class="recipe-detail-tags">
        ${recipe.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        <span class="tag">${recipe.cuisine.charAt(0).toUpperCase() + recipe.cuisine.slice(1)}</span>
      </div>
    </div>
  `;

  overlay.classList.add('open');
}

function closeDetail() {
  document.getElementById('recipeModalOverlay').classList.remove('open');
}

/* 
  ACTIVE FILTER TAGS
  Shows what's currently active above the results.
  Each tag has an ✕ that removes only that filter.
 */
function updateActiveFilterTags() {
  const bar      = document.getElementById('activeFilters');
  const tagsEl   = document.getElementById('activeFilterTags');
  const tags     = [];

  // Build tag list from active filters
  PageState.filters.cuisine.forEach(v => {
    tags.push({ label: v.charAt(0).toUpperCase() + v.slice(1), group: 'cuisine', value: v });
  });

  PageState.filters.diet.forEach(v => {
    tags.push({ label: v.charAt(0).toUpperCase() + v.slice(1), group: 'diet', value: v });
  });

  PageState.filters.difficulty.forEach(v => {
    tags.push({ label: v.charAt(0).toUpperCase() + v.slice(1), group: 'difficulty', value: v });
  });

  if (PageState.filters.prepTime < 999) {
    tags.push({ label: `Under ${PageState.filters.prepTime} min`, group: 'prepTime', value: 999 });
  }

  if (PageState.search) {
    tags.push({ label: `"${PageState.search}"`, group: 'search', value: '' });
  }

  // Show or hide the bar
  bar.style.display = tags.length > 0 ? 'block' : 'none';

  tagsEl.innerHTML = tags.map(tag => `
    <span class="active-filter-tag">
      ${tag.label}
      <button onclick="removeFilter('${tag.group}', '${tag.value}')" aria-label="Remove ${tag.label} filter">✕</button>
    </span>
  `).join('');
}

function removeFilter(group, value) {
  if (group === 'cuisine' || group === 'diet' || group === 'difficulty') {
    PageState.filters[group] = PageState.filters[group].filter(v => v !== value);
    // Uncheck the corresponding checkbox
    const cb = document.querySelector(`input[data-filter="${group}"][value="${value}"]`);
    if (cb) cb.checked = false;
  } else if (group === 'prepTime') {
    PageState.filters.prepTime = 999;
    document.querySelectorAll('input[data-filter="prepTime"]').forEach(r => r.checked = false);
  } else if (group === 'search') {
    PageState.search = '';
    const input = document.getElementById('searchInput');
    if (input) input.value = '';
    closeSearch();
  }
  render();
}

function clearAllFilters() {
  PageState.filters = { cuisine: [], diet: [], difficulty: [], prepTime: 999 };
  PageState.search   = '';
  PageState.category = 'all';
  PageState.sortBy   = 'default';

  // Reset all checkboxes and radios
  document.querySelectorAll('.filter-option input').forEach(i => i.checked = false);

  // Reset sort
  const sort = document.getElementById('sortSelect');
  if (sort) sort.value = 'default';

  // Reset search input
  const input = document.getElementById('searchInput');
  if (input) input.value = '';
  closeSearch();

  // Reset category pills
  document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
  const allPill = document.querySelector('.category-pill[data-category="all"]');
  if (allPill) allPill.classList.add('active');

  render();
}

/*
  FILTER BADGE — shows active filter count on mobile toggle
 */
function updateFilterBadge() {
  const badge = document.getElementById('filterBadge');
  if (!badge) return;

  const count =
    PageState.filters.cuisine.length +
    PageState.filters.diet.length +
    PageState.filters.difficulty.length +
    (PageState.filters.prepTime < 999 ? 1 : 0);

  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

/*
  RESULT COUNT
 */
function updateResultCount(count) {
  const el = document.getElementById('resultCount');
  if (!el) return;
  const q = PageState.search.trim();
  el.textContent = q
    ? `${count} result${count !== 1 ? 's' : ''} for "${q}"`
    : `Showing ${count} of ${RECIPES.length} recipes`;
}

/* 
  SURPRISE ME
  */
function surpriseMe() {
  const available = applyFilters(RECIPES);
  if (available.length === 0) {
    alert('No recipes match your current filters for a surprise. Try clearing some filters!');
    return;
  }
  const random = available[Math.floor(Math.random() * available.length)];
  openDetail(random.id);
}

/* 
  EVENT BINDING — all listeners grouped here
 */
function bindSearch() {
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClose');
  if(!input) return;

  input.addEventListener('input', () => {
    PageState.search = input.value;
    if (clearBtn) clearBtn.style.display = input.value ? 'flex' : 'none';
    render();
  });

 if (clearBtn){
  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.style.display = 'none';
    PageState.search = '';
    render();
    input.focus();
  });
 }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDetail();
  });
}

function closeSearch() {
  const input  = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClose');
  if (input) input.value = '';
  if (clearBtn) clearBtn.style.display = 'none';
  PageState.search = '';
}

function bindCategoryPills() {
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      PageState.category = pill.dataset.category;
      render();
    });
  });
}

function bindFilters() {
  // Checkboxes — cuisine, diet, difficulty
  document.querySelectorAll('input[type="checkbox"][data-filter]').forEach(cb => {
    cb.addEventListener('change', () => {
      const group = cb.dataset.filter;
      if (cb.checked) {
        if (!PageState.filters[group].includes(cb.value)) {
          PageState.filters[group].push(cb.value);
        }
      } else {
        PageState.filters[group] = PageState.filters[group].filter(v => v !== cb.value);
      }
      render();
    });
  });

  // Radio buttons — prepTime
  document.querySelectorAll('input[type="radio"][data-filter="prepTime"]').forEach(radio => {
    radio.addEventListener('change', () => {
      PageState.filters.prepTime = parseInt(radio.value);
      render();
    });
  });

  // Reset buttons per group
  document.querySelectorAll('.filter-reset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.filter;
      if (group === 'prepTime') {
        PageState.filters.prepTime = 999;
        document.querySelectorAll('input[data-filter="prepTime"]').forEach(r => r.checked = false);
      } else {
        PageState.filters[group] = [];
        document.querySelectorAll(`input[data-filter="${group}"]`).forEach(cb => cb.checked = false);
      }
      render();
    });
  });

  // Sort
  document.getElementById('sortSelect').addEventListener('change', e => {
    PageState.sortBy = e.target.value;
    render();
  });

  // Clear all buttons
  ['clearAllBtn', 'sidebarClearBtn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', clearAllFilters);
  });
}

function bindCardClicks() {
  const grid = document.getElementById('recipeGrid');

  grid.addEventListener('click', e => {
    const card = e.target.closest('.recipe-card');
    if (!card) return;
    openDetail(parseInt(card.dataset.recipeId, 10));
  });

  grid.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const card = e.target.closest('.recipe-card');
    if (!card) return;
    openDetail(parseInt(card.dataset.recipeId, 10));
  });
}

function bindModal() {
  const closeBtn = document.getElementById('recipeModalCloseBtn');
  const overlay  = document.getElementById('recipeModalOverlay');
  if (closeBtn) closeBtn.addEventListener('click', closeDetail);
  if (overlay)  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeDetail();
  });
}

function bindSurprise() {
  const btn = document.getElementById('rpSurpriseBtn');
  if (btn) btn.addEventListener('click', surpriseMe);
}

/*
  Mobile sidebar — filter toggle button opens/closes the drawer.
  Overlay behind the drawer closes it when clicked.
*/
function bindMobileSidebar() {
  const toggle  = document.getElementById('filterToggle');
  const sidebar = document.getElementById('rpSidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (!toggle || !sidebar || !overlay) return;

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('is-open');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('active');

  });
}

/* 
  BOOT — this page boots itself, no app.js
 */
document.addEventListener('DOMContentLoaded', () => {
  render();
  bindSearch();
  bindCategoryPills();
  bindFilters();
  bindCardClicks();
  bindModal();
  bindSurprise();
  bindMobileSidebar();
});