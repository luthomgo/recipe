/*
  chat.js
  -------
  NAMESPACE: Chat
  DEPENDENCIES: none (fully self-contained)
  OWNS: Floating chat widget, AI conversation via Anthropic API

  HOW THE API CALL WORKS:
  We POST to https://api.anthropic.com/v1/messages
  with a conversation history array. Claude reads the full
  history each time so it has context of prior messages.
  We use a system prompt to make it a cooking specialist.

  WHY NO API KEY IN THIS FILE?
  In production, API calls go through YOUR backend server.
  Your server holds the key, calls Anthropic, returns the
  response to the browser. The key never touches the browser.

  For this demo/development version we call the API directly
  from the browser. This is fine for local development and
  learning — just never ship a real key in frontend code.

  CONVERSATION HISTORY PATTERN:
  Anthropic's API is stateless — it remembers nothing between
  calls. We maintain the conversation ourselves in Chat.history
  and send the entire array with every request. This is how
  every AI chatbot works under the hood, including ChatGPT.
*/

const Chat = {
  // Full conversation history sent with every API call
  history: [],

  // Whether we're waiting for a response right now
  isLoading: false,

  // System prompt — defines Claude's personality and scope
  SYSTEM_PROMPT: `You are Savour's AI cooking assistant — warm, knowledgeable, and genuinely excited about food.

Your role:
- Help users find recipes based on ingredients they have
- Suggest meals based on dietary needs, skill level, or mood
- Explain cooking techniques clearly and simply
- Offer ingredient substitutions when something is missing
- Give practical tips that make cooking easier and more enjoyable

Your tone: friendly and encouraging, like a talented friend who happens to love cooking. Not overly formal, not overly casual. Concise — 2-4 sentences per response unless a recipe or technique genuinely needs more.

When suggesting recipes, mention: name, key ingredients, approximate time, and difficulty.

You only discuss food, cooking, recipes, ingredients, kitchen equipment, and nutrition. If asked about anything else, warmly redirect: "I'm best in the kitchen! Ask me about recipes, ingredients, or cooking tips."`,

  // Quick suggestion prompts shown before first message
  SUGGESTIONS: [
    "🥗 Quick vegetarian dinner?",
    "🍳 Using up leftover chicken",
    "🔪 How do I julienne?",
    "🌶️ Make it spicier?",
  ],

  /* ============================================================
    init()
    Builds the widget HTML, injects it into the page,
    then binds all events.

    WHY BUILD HTML IN JS HERE?
    The chat widget is entirely optional — a self-contained
    feature. Putting its HTML in index.html would pollute
    the HTML with feature-specific markup.
    By building it here, the entire feature is removable
    by deleting one file and two lines.
  ============================================================ */
  init() {
    // this._buildWidget();
    this._bindEvents();
    this._showWelcome();
  },

  // _buildWidget() {
  //   const widget = document.createElement("div");
  //   widget.id = "chatWidget";
  //   widget.innerHTML = `

  //     <!-- TRIGGER BUTTON -->
  //     <button class="chat-trigger" id="chatTrigger" aria-label="Open cooking assistant">
  //       <span class="icon-open">👨‍🍳</span>
  //       <span class="icon-close">✕</span>
  //       <span class="chat-dot"></span>
  //     </button>

  //     <!-- CHAT PANEL -->
  //     <div class="chat-panel" id="chatPanel" role="dialog" aria-label="Cooking assistant">

  //       <!-- HEADER -->
  //       <div class="chat-header">
  //         <div class="chat-avatar">👨‍🍳</div>
  //         <div class="chat-header-info">
  //           <div class="chat-header-name">Savour AI</div>
  //           <div class="chat-header-status">Cooking assistant</div>
  //         </div>
  //         <button class="chat-clear-btn" id="chatClearBtn">Clear chat</button>
  //       </div>

  //       <!-- MESSAGES -->
  //       <div class="chat-messages" id="chatMessages"></div>

  //       <!-- QUICK SUGGESTIONS -->
  //       <div class="chat-suggestions" id="chatSuggestions">
  //         ${this.SUGGESTIONS.map(
  //           (s) => `
  //           <button class="chat-suggestion-btn">${s}</button>
  //         `,
  //         ).join("")}
  //       </div>

  //       <!-- INPUT -->
  //       <div class="chat-input-area">
  //         <textarea
  //           class="chat-input"
  //           id="chatInput"
  //           placeholder="Ask me anything about cooking..."
  //           rows="1"
  //           aria-label="Message input"
  //         ></textarea>
  //         <button class="chat-send-btn" id="chatSendBtn" aria-label="Send message" disabled>
  //           ➤
  //         </button>
  //       </div>

  //     </div>
  //   `;

  //   document.body.appendChild(widget);
  // },

  /* ============================================================
    _bindEvents()
    All event listeners for the chat widget.
    Grouped here so there's one place to look for "why isn't
    this click working?"
  ============================================================ */
  _bindEvents() {
    const trigger = document.getElementById("chatTrigger");
    const input = document.getElementById("chatInput");
    const sendBtn = document.getElementById("chatSendBtn");
    const clearBtn = document.getElementById("chatClearBtn");
    const suggestions = document.getElementById("chatSuggestions");

    // Toggle open/close
    trigger.addEventListener("click", () => this._togglePanel());

    // Enable/disable send button based on input content
    input.addEventListener("input", () => {
      sendBtn.disabled = input.value.trim() === "";
      this._autoGrow(input);
    });

    // Send on Enter (but Shift+Enter = new line)
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (!sendBtn.disabled && !this.isLoading) this._send();
      }
    });

    // Send button click
    sendBtn.addEventListener("click", () => {
      if (!this.isLoading) this._send();
    });

    // Clear conversation
    clearBtn.addEventListener("click", () => this._clearHistory());

    // Quick suggestion buttons — event delegation on the container
    suggestions.addEventListener("click", (e) => {
      const btn = e.target.closest(".chat-suggestion-btn");
      if (!btn) return;
      input.value = btn.textContent.replace(/^[^\w]+/, "").trim();
      sendBtn.disabled = false;
      this._send();
    });
  },

  /* ============================================================
    _togglePanel()
    Opens or closes the chat panel.
  ============================================================ */
  _togglePanel() {
    const trigger = document.getElementById("chatTrigger");
    const panel = document.getElementById("chatPanel");
    const isOpen = panel.classList.contains("is-open");

    trigger.classList.toggle("is-open", !isOpen);
    trigger.classList.add("seen"); // hides the notification dot permanently
    panel.classList.toggle("is-open", !isOpen);

    if (!isOpen) {
      // Focus input when opening
      setTimeout(() => document.getElementById("chatInput").focus(), 280);
    }
  },

  /* ============================================================
    _showWelcome()
    Renders the first assistant message — no API call needed.
    Sets context for the user and makes the widget feel alive.
  ============================================================ */
  _showWelcome() {
    this._addMessage(
      "assistant",
      "Hey there! 👋 I'm your Savour cooking assistant. Ask me what to cook tonight, how to use up ingredients, or anything else about food. What's in your fridge?",
    );
  },

  /* ============================================================
    _send()
    Core method. Grabs the input, adds user message to the UI,
    adds it to history, calls the API, renders the response.
  ============================================================ */
  async _send() {
    const input = document.getElementById("chatInput");
    const sendBtn = document.getElementById("chatSendBtn");
    const text = input.value.trim();

    if (!text || this.isLoading) return;

    // Hide suggestions after first real message
    document.getElementById("chatSuggestions").style.display = "none";

    // Render user message immediately — don't wait for API
    this._addMessage("user", text);

    // Add to history for API context
    this.history.push({ role: "user", content: text });

    // Reset input
    input.value = "";
    input.style.height = "auto";
    sendBtn.disabled = true;

    // Show typing indicator
    this.isLoading = true;
    const typingEl = this._showTyping();

    try {
      const reply = await this._callAPI();

      // Remove typing indicator
      typingEl.remove();

      // Add to history and render
      this.history.push({ role: "assistant", content: reply });
      this._addMessage("assistant", reply);
    } catch (err) {
      typingEl.remove();

      // Graceful error — don't crash, show a human message
      const errorMsg = err.message.includes("API key")
        ? "I need an API key to work! Add your Anthropic key to chat.js to enable AI responses."
        : "Sorry, I had trouble connecting. Try again in a moment!";

      this._addMessage("assistant", errorMsg);
      console.error("Chat API error:", err);
    }

    this.isLoading = false;
  },

  /* ============================================================
    _callAPI()
    Makes the actual Anthropic API request.

    KEY CONCEPT — ASYNC/AWAIT:
    API calls take time. If we blocked the page waiting for a
    response, the UI would freeze. async/await lets JS say:
    "start this task, come back when it's done, do other stuff
    in the meantime."

    fetch() returns a Promise — a placeholder for a future value.
    await unwraps the Promise when it resolves.

    THE CONVERSATION HISTORY:
    We send this.history — the full array of every message so far.
    Claude reads all of it and responds with context.
    Without this, every message would feel like a fresh conversation.
  ============================================================ */
  async _callAPI() {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        /*
          ⚠️  API KEY — FOR DEVELOPMENT ONLY
          Replace the empty string below with your Anthropic API key
          to enable live AI responses during development.

          NEVER commit a real key to version control.
          In production: make the fetch call to YOUR backend
          server instead. Your server holds the key and proxies
          the request to Anthropic. The browser never sees the key.

          Get a key at: https://console.anthropic.com
        */
        "x-api-key": "",
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 600,
        system: this.SYSTEM_PROMPT,
        messages: this.history,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      if (response.status === 401)
        throw new Error("API key invalid or missing.");
      if (response.status === 429)
        throw new Error("Rate limit hit. Wait a moment.");
      throw new Error(err.error?.message || `API error ${response.status}`);
    }

    const data = await response.json();

    // The API returns content as an array of blocks
    // We grab the first text block
    return (
      data.content?.[0]?.text || "I couldn't generate a response. Try again!"
    );
  },

  /* ============================================================
    _addMessage(role, text)
    Renders a message bubble into the chat.

    WHY TEXTCONTENT NOT INNERHTML FOR USER MESSAGES?
    If a user types <script>alert('xss')</script>, innerHTML
    would execute it. textContent treats everything as plain text.
    For assistant messages we use a light markdown parser
    we control — we never pass raw assistant text to innerHTML directly.
  ============================================================ */
  _addMessage(role, text) {
    const messages = document.getElementById("chatMessages");

    const msgEl = document.createElement("div");
    msgEl.className = `chat-message ${role}`;

    const bubble = document.createElement("div");
    bubble.className = "chat-bubble";

    if (role === "assistant") {
      // Parse basic markdown from AI responses — safe because
      // we control the source (Anthropic API, not user input)
      bubble.innerHTML = this._parseMarkdown(text);
    } else {
      // User input — always use textContent to prevent XSS
      bubble.textContent = text;
    }

    const time = document.createElement("div");
    time.className = "chat-time";
    time.textContent = this._getTime();

    msgEl.appendChild(bubble);
    msgEl.appendChild(time);
    messages.appendChild(msgEl);

    // Scroll to the new message
    messages.scrollTop = messages.scrollHeight;
  },

  /* ============================================================
    _showTyping()
    Renders the three-dot typing animation.
    Returns the element so the caller can remove it when done.
  ============================================================ */
  _showTyping() {
    const messages = document.getElementById("chatMessages");

    const typingEl = document.createElement("div");
    typingEl.className = "chat-typing";
    typingEl.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;

    messages.appendChild(typingEl);
    messages.scrollTop = messages.scrollHeight;

    return typingEl;
  },

  /* ============================================================
    _parseMarkdown(text)
    Converts basic markdown patterns from AI responses into HTML.
    We only handle what Claude actually uses: bold, bullets, newlines.

    WHY NOT USE A MARKDOWN LIBRARY?
    Because we only need 4 patterns. Importing a full library
    (marked.js, showdown.js) for 4 regexes is over-engineering.
    This is the "right tool for the job" principle.
  ============================================================ */
  _parseMarkdown(text) {
    return (
      text
        // **bold**
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        // *italic*
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        // Bullet lines starting with - or •
        .replace(/^[-•]\s(.+)$/gm, "<li>$1</li>")
        // Wrap consecutive <li> in <ul>
        .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")
        // Double newline = paragraph break
        .replace(/\n\n/g, "<br><br>")
        // Single newline = line break
        .replace(/\n/g, "<br>")
    );
  },

  /* ============================================================
    _clearHistory()
    Resets the conversation — both the UI and the history array.
  ============================================================ */
  _clearHistory() {
    this.history = [];
    document.getElementById("chatMessages").innerHTML = "";
    document.getElementById("chatSuggestions").style.display = "flex";
    this._showWelcome();
  },

  /* ============================================================
    _autoGrow(textarea)
    Makes the textarea grow as the user types.
    CSS sets a min-height; JS expands it up to max-height.
  ============================================================ */
  _autoGrow(el) {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 100) + "px";
  },

  _getTime() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  },
};
