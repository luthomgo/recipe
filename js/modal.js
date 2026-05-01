/*
  modal.js
  --------
  NAMESPACE: Modal
  DEPENDENCIES: AppState (state.js)
  OWNS: Auth modal (login/signup), recipe detail modal, form validation, toasts

  DESIGN DECISION — ONE MODAL ELEMENT, MULTIPLE STATES:
  We have one <div id="modal"> in the HTML.
  Modal.open('login') and Modal.open('signup') both use it,
  injecting different content via innerHTML.
  
  WHY NOT TWO SEPARATE MODAL DIVS?
  DRY — Don't Repeat Yourself. The overlay animation,
  the close button, the max-width — all defined once.
  Only the inner content changes. This is the same principle
  behind React's conditional rendering.
*/

const Modal = {
  init() {
    this._bindClose();
    this._bindKeyboard();
  },

  /* ---- AUTH MODAL ---- */

  open(mode) {
    AppState.modalMode = mode;
    AppState.signupStep = 1;
    AppState.signupData = {};
    AppState.selectedChips = { dietary: [], cuisine: [] };
    this._renderAuth();
    document.getElementById("modalOverlay").classList.add("open");
  },

  close() {
    document.getElementById("modalOverlay").classList.remove("open");
  },

  /*
    _renderAuth()
    Decides which form to render based on AppState.
    It reads state and calls the right template method.
    No logic lives here — just routing.
  */
  _renderAuth() {
    const content = document.getElementById("modalContent");

    if (AppState.modalMode === "login") {
      content.innerHTML = this._loginTemplate();
    } else if (AppState.signupStep === 1) {
      content.innerHTML = this._signupStep1Template();
    } else {
      content.innerHTML = this._signupStep2Template();
    }
  },

  _loginTemplate() {
    return `
      <h2 class="modal-title">Welcome back 👋</h2>
      <p class="modal-subtitle">Log in to see your personalised meal plans and saved recipes.</p>
      <div class="form-group">
        <label>Email</label>
        <input type="email" placeholder="you@example.com" id="loginEmail" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" placeholder="••••••••" id="loginPassword" />
      </div>
      <button class="btn-primary form-submit" onclick="Modal.handleLogin()">Log In</button>
      <p class="modal-switch">
        Don't have an account?
        <a onclick="Modal.open('signup')">Sign up free</a>
      </p>
    `;
  },

  _signupStep1Template() {
    return `
      <div class="modal-step-indicator">
        <div class="step-dot active"></div>
        <div class="step-dot"></div>
      </div>
      <h2 class="modal-title">Create your account</h2>
      <p class="modal-subtitle">Step 1 of 2 — Let's get the basics.</p>
      <div class="form-group">
        <label>Your Name</label>
        <input type="text" placeholder="Jamie Oliver (or close enough)" id="signupName" />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" placeholder="you@example.com" id="signupEmail" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" placeholder="Min 8 characters" id="signupPassword" />
      </div>
      <button class="btn-primary form-submit" onclick="Modal.handleSignupStep1()">Continue →</button>
      <p class="modal-switch">
        Already have an account?
        <a onclick="Modal.open('login')">Log in</a>
      </p>
    `;
  },

  _signupStep2Template() {
    const dietOptions = [
      "No Restrictions",
      "Vegan",
      "Vegetarian",
      "Keto",
      "Gluten-Free",
      "Halal",
      "Kosher",
      "Dairy-Free",
    ];
    const cuisineOptions = [
      "Italian",
      "Asian",
      "Mediterranean",
      "Mexican",
      "Indian",
      "Middle Eastern",
      "American",
      "French",
    ];

    return `
      <div class="modal-step-indicator">
        <div class="step-dot active"></div>
        <div class="step-dot active"></div>
      </div>
      <h2 class="modal-title">Personalise your feed ✨</h2>
      <p class="modal-subtitle">Step 2 of 2 — Help us tailor recipes just for you.</p>

      <div class="form-group">
        <label>Dietary Restrictions</label>
        <div class="chip-group">
          ${dietOptions
            .map(
              (opt) => `
            <button class="chip" onclick="Modal.toggleChip('dietary', '${opt}', this)">${opt}</button>
          `,
            )
            .join("")}
        </div>
      </div>

      <div class="form-group">
        <label>Favourite Cuisines</label>
        <div class="chip-group">
          ${cuisineOptions
            .map(
              (opt) => `
            <button class="chip" onclick="Modal.toggleChip('cuisine', '${opt}', this)">${opt}</button>
          `,
            )
            .join("")}
        </div>
      </div>

      <div class="form-group">
        <label>Cooking Skill Level</label>
        <select id="skillLevel">
          <option value="">Select your level...</option>
          <option value="beginner">🥄 Beginner — I can boil water</option>
          <option value="intermediate">🍳 Intermediate — I follow recipes well</option>
          <option value="advanced">👨‍🍳 Advanced — I improvise freely</option>
        </select>
      </div>

      <button class="btn-primary form-submit" onclick="Modal.handleSignupStep2()">
        🎉 Let's Start Cooking!
      </button>
    `;
  },

  /* ---- FORM HANDLERS ---- */

  handleLogin() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
      this._showError("Please fill in all fields.");
      return;
    }

    // Phase 2: replace this with a real API call
    this.close();
    this.showToast("Welcome back! 👋 (Demo mode — no real auth yet)");
  },

  handleSignupStep1() {
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;

    if (!name || !email || !password) {
      this._showError("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      this._showError("Password must be at least 8 characters.");
      return;
    }

    AppState.signupData = { name, email, password };
    AppState.signupStep = 2;
    this._renderAuth();
  },

  handleSignupStep2() {
    const skill = document.getElementById("skillLevel").value;

    if (!skill) {
      this._showError("Please select your cooking skill level.");
      return;
    }

    const prefs = {
      ...AppState.signupData,
      dietary: AppState.selectedChips.dietary,
      cuisines: AppState.selectedChips.cuisine,
      skill,
    };

    // Phase 2: send prefs to backend here
    console.log("Registered with preferences:", prefs);
    this.close();
    this.showToast(
      `Welcome, ${prefs.name}! 🎉 Your recipes are being personalised...`,
    );
  },

  toggleChip(group, value, el) {
    const arr = AppState.selectedChips[group];
    const idx = arr.indexOf(value);
    if (idx === -1) {
      arr.push(value);
      el.classList.add("selected");
    } else {
      arr.splice(idx, 1);
      el.classList.remove("selected");
    }
  },

  _showError(msg) {
    const existing = document.querySelector(".form-error");
    if (existing) existing.remove();

    const err = document.createElement("p");
    err.className = "form-error";
    err.textContent = msg;

    const submit = document.querySelector(".form-submit");
    if (submit) submit.parentNode.insertBefore(err, submit);

    setTimeout(() => err.remove(), 3000);
  },

  /* ---- RECIPE MODAL ---- */

  closeRecipe() {
    document.getElementById("recipeModalOverlay").classList.remove("open");
  },

  /* ---- TOAST ----
     Lives in Modal because it's feedback for modal actions.
     Could move to a Utils namespace later if other features need it. */
  showToast(message) {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    // Force reflow so the transition fires correctly
    toast.getBoundingClientRect();
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  /* ---- PRIVATE EVENT BINDING ---- */

  _bindClose() {
    // Close button — auth modal
    document
      .getElementById("modalCloseBtn")
      .addEventListener("click", () => this.close());

    // Click outside — auth modal
    document.getElementById("modalOverlay").addEventListener("click", (e) => {
      if (e.target === document.getElementById("modalOverlay")) this.close();
    });

    // Close button — recipe modal
    document
      .getElementById("recipeModalCloseBtn")
      .addEventListener("click", () => this.closeRecipe());

    // Click outside — recipe modal
    document
      .getElementById("recipeModalOverlay")
      .addEventListener("click", (e) => {
        if (e.target === document.getElementById("recipeModalOverlay"))
          this.closeRecipe();
      });
  },

  _bindKeyboard() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close();
        this.closeRecipe();
      }
    });
  },
};
