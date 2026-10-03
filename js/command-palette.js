/**
 * Command Palette Controller (Cmd+K / Ctrl+K)
 * Fast navigation, instant actions, and theme switcher with fuzzy search.
 */
class CommandPalette {
  constructor() {
    this.modal = document.getElementById("command-palette-modal");
    this.input = document.getElementById("palette-search-input");
    this.resultsList = document.getElementById("palette-results");
    this.isOpen = false;
    this.selectedIndex = 0;

    this.actions = [
      { id: "nav-hero", title: "Go to Home / Hero", category: "Navigation", icon: "ri-home-4-line", action: () => this.navigate("#hero") },
      { id: "nav-about", title: "Go to About Me & Philosophy", category: "Navigation", icon: "ri-user-3-line", action: () => this.navigate("#about") },
      { id: "nav-skills", title: "Go to Skills & Tech Stack", category: "Navigation", icon: "ri-code-box-line", action: () => this.navigate("#skills") },
      { id: "nav-projects", title: "Go to Featured Projects", category: "Navigation", icon: "ri-folder-shield-2-line", action: () => this.navigate("#projects") },
      { id: "nav-experience", title: "Go to Career Milestones", category: "Navigation", icon: "ri-briefcase-4-line", action: () => this.navigate("#experience") },
      { id: "nav-terminal", title: "Go to Interactive Terminal", category: "Navigation", icon: "ri-terminal-window-line", action: () => this.navigate("#terminal") },
      { id: "nav-contact", title: "Go to Contact & Scheduling", category: "Navigation", icon: "ri-mail-send-line", action: () => this.navigate("#contact") },

      { id: "act-copy-email", title: "Copy Email to Clipboard", category: "Action", icon: "ri-file-copy-line", action: () => this.copyEmail() },
      { id: "act-download-cv", title: "Download Resume / CV", category: "Action", icon: "ri-download-cloud-2-line", action: () => this.downloadCV() },
      { id: "act-mute-toggle", title: "Toggle UI Sound Effects", category: "Action", icon: "ri-volume-up-line", action: () => this.toggleAudio() },
      
      { id: "theme-dark", title: "Theme: Dark Onyx", category: "Theme", icon: "ri-moon-line", action: () => this.setTheme("dark") },
      { id: "theme-cyber", title: "Theme: Cyberpunk Neon", category: "Theme", icon: "ri-flashlight-line", action: () => this.setTheme("cyberpunk") },
      { id: "theme-space", title: "Theme: Deep Space Midnight", category: "Theme", icon: "ri-planet-line", action: () => this.setTheme("space") },
      { id: "theme-light", title: "Theme: Clean Light", category: "Theme", icon: "ri-sun-line", action: () => this.setTheme("light") },

      { id: "ext-github", title: "Open GitHub Profile", category: "External", icon: "ri-github-line", action: () => window.open(PortfolioData.profile.socials.github, "_blank") },
      { id: "ext-linkedin", title: "Open LinkedIn Profile", category: "External", icon: "ri-linkedin-box-line", action: () => window.open(PortfolioData.profile.socials.linkedin, "_blank") }
    ];

    this.filteredActions = [...this.actions];
    this.init();
  }

  init() {
    if (!this.modal || !this.input) return;

    // Keyboard shortcut listeners (Ctrl+K or Cmd+K)
    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        this.toggle();
      } else if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    // Triggers across the page
    document.querySelectorAll("[data-open-palette]").forEach(btn => {
      btn.addEventListener("click", () => this.open());
    });

    // Search input typing
    this.input.addEventListener("input", () => {
      this.filter(this.input.value);
    });

    // Arrow keys & Enter inside palette
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredActions.length - 1);
        this.render();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
        this.render();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (this.filteredActions[this.selectedIndex]) {
          this.execute(this.filteredActions[this.selectedIndex]);
        }
      }
    });

    // Click outside to close
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    const closeBtn = this.modal.querySelector(".palette-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  open() {
    if (window.soundEngine) window.soundEngine.playPop();
    this.isOpen = true;
    this.modal.classList.add("active");
    this.modal.setAttribute("aria-hidden", "false");
    this.input.value = "";
    this.filter("");
    setTimeout(() => this.input.focus(), 50);
  }

  close() {
    this.isOpen = false;
    this.modal.classList.remove("active");
    this.modal.setAttribute("aria-hidden", "true");
  }

  filter(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      this.filteredActions = [...this.actions];
    } else {
      this.filteredActions = this.actions.filter(item => 
        item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
      );
    }
    this.selectedIndex = 0;
    this.render();
  }

  render() {
    if (!this.resultsList) return;
    this.resultsList.innerHTML = "";

    if (this.filteredActions.length === 0) {
      this.resultsList.innerHTML = `
        <div class="palette-empty">
          <i class="ri-search-line"></i>
          <p>No matching commands found. Try searching 'projects', 'theme', or 'contact'.</p>
        </div>
      `;
      return;
    }

    let lastCategory = "";
    this.filteredActions.forEach((item, index) => {
      if (item.category !== lastCategory) {
        lastCategory = item.category;
        const catHeader = document.createElement("div");
        catHeader.className = "palette-category-label";
        catHeader.textContent = item.category;
        this.resultsList.appendChild(catHeader);
      }

      const row = document.createElement("div");
      row.className = `palette-item ${index === this.selectedIndex ? "selected" : ""}`;
      row.innerHTML = `
        <div class="palette-item-left">
          <i class="${item.icon}"></i>
          <span>${item.title}</span>
        </div>
        <span class="palette-item-shortcut">${item.category === "Theme" ? "Switch" : "Jump"}</span>
      `;

      row.addEventListener("mouseenter", () => {
        this.selectedIndex = index;
        this.highlightSelected();
      });

      row.addEventListener("click", () => {
        this.execute(item);
      });

      this.resultsList.appendChild(row);
    });

    this.scrollSelectedIntoView();
  }

  highlightSelected() {
    const items = this.resultsList.querySelectorAll(".palette-item");
    items.forEach((it, idx) => {
      it.classList.toggle("selected", idx === this.selectedIndex);
    });
  }

  scrollSelectedIntoView() {
    const selected = this.resultsList.querySelector(".palette-item.selected");
    if (selected) {
      selected.scrollIntoView({ block: "nearest" });
    }
  }

  execute(item) {
    if (window.soundEngine) window.soundEngine.playClick();
    this.close();
    if (item.action) {
      item.action();
    }
  }

  navigate(hash) {
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  setTheme(theme) {
    if (window.setPortfolioTheme) {
      window.setPortfolioTheme(theme);
    }
  }

  copyEmail() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PortfolioData.profile.email);
      if (window.showToast) {
        window.showToast(`Copied ${PortfolioData.profile.email} to clipboard!`, "success");
      }
    }
  }

  downloadCV() {
    if (window.showToast) {
      window.showToast("Preparing resume download...", "info");
    }
    window.print();
  }

  toggleAudio() {
    if (window.soundEngine) {
      const muted = window.soundEngine.toggleMute();
      if (window.showToast) {
        window.showToast(muted ? "Sound effects muted 🔇" : "Sound effects enabled 🔊", "info");
      }
      const audioBtn = document.getElementById("sound-toggle-btn");
      if (audioBtn) {
        audioBtn.innerHTML = muted ? `<i class="ri-volume-mute-line"></i>` : `<i class="ri-volume-up-line"></i>`;
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.commandPalette = new CommandPalette();
});
