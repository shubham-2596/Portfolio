/**
 * Interactive Developer Terminal
 * Features command history, auto-completion, rich output formatting, and theme switching.
 */
class InteractiveTerminal {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.output = this.container.querySelector(".terminal-output");
    this.input = this.container.querySelector(".terminal-input");
    this.form = this.container.querySelector(".terminal-form");
    
    this.history = [];
    this.historyIndex = -1;
    this.isMatrixRunning = false;

    this.commands = {
      help: "Display list of all available commands",
      about: "Print biography and architectural background",
      skills: "List core technical proficiencies & stack",
      projects: "Showcase featured production systems",
      experience: "Display engineering career journey",
      contact: "Show direct contact details & socials",
      theme: "Switch theme: theme [dark | cyberpunk | space | light]",
      cat: "Read virtual file: cat <filename> (e.g. cat resume.txt)",
      ls: "List files in the virtual directory",
      matrix: "Toggle matrix digital rain effect",
      clear: "Clear the terminal screen",
      whoami: "Display user persona",
      date: "Show current system time in IST",
      quote: "Get an engineering philosophy quote"
    };

    this.quotes = [
      "“Simplicity is prerequisite for reliability.” — Edsger W. Dijkstra",
      "“Make it work, make it right, make it fast.” — Kent Beck",
      "“Any fool can write code that a computer can understand. Good programmers write code that humans can understand.” — Martin Fowler",
      "“Premature optimization is the root of all evil.” — Donald Knuth"
    ];

    this.init();
  }

  init() {
    if (!this.form || !this.input) return;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const rawCmd = this.input.value.trim();
      if (!rawCmd) return;

      this.executeCommand(rawCmd);
      this.history.push(rawCmd);
      this.historyIndex = this.history.length;
      this.input.value = "";
      this.scrollToBottom();
    });

    this.input.addEventListener("keydown", (e) => {
      if (window.soundEngine) window.soundEngine.playTerminal();

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex] || "";
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex] || "";
        } else {
          this.historyIndex = this.history.length;
          this.input.value = "";
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        this.handleAutocomplete();
      }
    });

    // Terminal quick focus on click
    this.container.addEventListener("click", (e) => {
      if (e.target.tagName !== "A" && e.target.tagName !== "BUTTON") {
        this.input.focus();
      }
    });
  }

  handleAutocomplete() {
    const current = this.input.value.trim();
    if (!current) return;

    const parts = current.split(" ");
    if (parts.length === 1) {
      const match = Object.keys(this.commands).find(c => c.startsWith(parts[0].toLowerCase()));
      if (match) {
        this.input.value = match + " ";
      }
    } else if (parts[0] === "cat" || parts[0] === "theme") {
      if (parts[0] === "cat" && PortfolioData.terminalFiles) {
        const files = Object.keys(PortfolioData.terminalFiles);
        const match = files.find(f => f.startsWith(parts[1].toLowerCase()));
        if (match) {
          this.input.value = `cat ${match}`;
        }
      } else if (parts[0] === "theme") {
        const themes = ["dark", "cyberpunk", "space", "light"];
        const match = themes.find(t => t.startsWith(parts[1].toLowerCase()));
        if (match) {
          this.input.value = `theme ${match}`;
        }
      }
    }
  }

  printLine(text, className = "") {
    const div = document.createElement("div");
    div.className = `terminal-line ${className}`;
    div.innerHTML = text;
    this.output.appendChild(div);
  }

  scrollToBottom() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  executeCommand(commandLine) {
    // Echo entered command
    this.printLine(`<span class="term-prompt">shubham@terminal:~$</span> <span class="term-cmd">${this.escapeHTML(commandLine)}</span>`);

    const parts = commandLine.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case "help":
        this.printLine("<span class='term-highlight'>Available commands:</span>");
        Object.entries(this.commands).forEach(([name, desc]) => {
          this.printLine(`  <span class='term-keyword'>${name.padEnd(12, " ")}</span> - ${desc}`);
        });
        break;

      case "about":
      case "bio":
        this.printLine(`<span class='term-title'>=== ${PortfolioData.profile.name} ===</span>`);
        this.printLine(`<span class='term-accent'>${PortfolioData.profile.title}</span>`);
        this.printLine(`Location: ${PortfolioData.profile.location}`);
        this.printLine(`Status: ${PortfolioData.profile.status.text}`);
        PortfolioData.profile.bio.forEach(p => this.printLine(`\n${p}`));
        break;

      case "skills":
        this.printLine("<span class='term-highlight'>=== TECHNICAL CAPABILITIES ===</span>");
        const grouped = {};
        PortfolioData.skills.items.forEach(s => {
          if (!grouped[s.category]) grouped[s.category] = [];
          grouped[s.category].push(s.name);
        });
        Object.entries(grouped).forEach(([cat, list]) => {
          this.printLine(`\n<span class='term-keyword'>[${cat.toUpperCase()}]</span>:`);
          this.printLine(`  ${list.join(", ")}`);
        });
        break;

      case "projects":
        this.printLine("<span class='term-highlight'>=== FEATURED PROJECTS ===</span>");
        PortfolioData.projects.forEach((proj, idx) => {
          this.printLine(`\n[${idx + 1}] <span class='term-keyword'>${proj.title}</span> (${proj.categoryLabel})`);
          this.printLine(`    ${proj.tagline}`);
          this.printLine(`    Tech: <span class='term-sub'>${proj.technologies.join(", ")}</span>`);
        });
        this.printLine("\n💡 Tip: Scroll to Projects section or use Cmd+K to inspect interactive case studies.");
        break;

      case "experience":
      case "history":
        this.printLine("<span class='term-highlight'>=== LEARNING & PROJECT JOURNEY ===</span>");
        PortfolioData.experience.forEach(exp => {
          this.printLine(`\n<span class='term-keyword'>${exp.period}</span> — <span class='term-accent'>${exp.role}</span> @ <strong>${exp.company}</strong>`);
          this.printLine(`  ${exp.description}`);
        });
        break;

      case "contact":
        this.printLine("<span class='term-highlight'>=== GET IN TOUCH ===</span>");
        this.printLine(`Email:    <a href='mailto:${PortfolioData.profile.email}' class='term-link'>${PortfolioData.profile.email}</a>`);
        this.printLine(`GitHub:   <a href='${PortfolioData.profile.socials.github}' target='_blank' class='term-link'>GitHub Profile</a>`);
        this.printLine(`LinkedIn: <a href='${PortfolioData.profile.socials.linkedin}' target='_blank' class='term-link'>LinkedIn Profile</a>`);
        this.printLine(`Timezone: ${PortfolioData.profile.timezone}`);
        break;

      case "ls":
      case "dir":
        this.printLine("<span class='term-sub'>total 6 files</span>");
        if (PortfolioData.terminalFiles) {
          const files = Object.keys(PortfolioData.terminalFiles).map(f => `<span class='term-file'>${f}</span>`);
          this.printLine(files.join("    "));
        }
        break;

      case "cat":
        if (!args[0]) {
          this.printLine("<span class='term-error'>Usage: cat &lt;filename&gt; (try: cat resume.txt, cat skills.txt)</span>");
        } else {
          const fileName = args[0].toLowerCase();
          if (PortfolioData.terminalFiles && PortfolioData.terminalFiles[fileName]) {
            const content = PortfolioData.terminalFiles[fileName].replace(/\n/g, "<br>");
            this.printLine(`<div class='term-file-box'>${content}</div>`);
          } else {
            this.printLine(`<span class='term-error'>cat: ${this.escapeHTML(args[0])}: No such file or directory. Run 'ls' to view files.</span>`);
          }
        }
        break;

      case "theme":
        if (!args[0]) {
          this.printLine("<span class='term-error'>Usage: theme [dark | cyberpunk | space | light]</span>");
        } else {
          const targetTheme = args[0].toLowerCase();
          if (["dark", "cyberpunk", "space", "light"].includes(targetTheme)) {
            if (window.setPortfolioTheme) {
              window.setPortfolioTheme(targetTheme);
              this.printLine(`<span class='term-success'>✓ Switched theme to: <strong>${targetTheme}</strong></span>`);
            }
          } else {
            this.printLine(`<span class='term-error'>Unknown theme '${this.escapeHTML(targetTheme)}'. Options: dark, cyberpunk, space, light.</span>`);
          }
        }
        break;

      case "clear":
      case "cls":
        this.output.innerHTML = "";
        return;

      case "whoami":
        this.printLine("<span class='term-accent'>recruiter@talent-discovery-workstation</span>");
        break;

      case "sudo":
      case "su":
        this.printLine("<span class='term-success'>🚀 Superuser privileges recognized! Root access unlocked. Let's build something great together!</span>");
        break;

      case "date":
      case "time":
        const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "medium" });
        this.printLine(`Current IST Time: <span class='term-highlight'>${now} (Asia/Kolkata)</span>`);
        break;

      case "quote":
        const randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        this.printLine(`<span class='term-quote'>${randomQuote}</span>`);
        break;

      case "matrix":
        this.toggleMatrix();
        break;

      default:
        this.printLine(`<span class='term-error'>command not found: ${this.escapeHTML(cmd)}. Type '<span class='term-keyword'>help</span>' to view all commands.</span>`);
        break;
    }
  }

  toggleMatrix() {
    this.printLine("<span class='term-matrix-text'>Entering the Matrix... Wake up, Neo...</span>");
    const matrixLines = [
      "01000010 01110101 01101001 01101100 01100100",
      "SYSTEM OVERRIDE: NEURAL CIPHER INITIATED...",
      "STREAMING QUANTUM VECTORS: [OK]",
      "CONSCIOUSNESS_LAYER == INITIALIZED"
    ];
    matrixLines.forEach((l, i) => {
      setTimeout(() => {
        this.printLine(`<span class='term-matrix-text'>${l}</span>`);
        this.scrollToBottom();
      }, (i + 1) * 350);
    });
  }

  escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.portfolioTerminal = new InteractiveTerminal("developer-terminal");
});
