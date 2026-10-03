/**
 * Main Application Controller
 * Handles themes, dynamic rendering, modals, animations, validation, and interactivity.
 */

// Global Toast Notification Helper
window.showToast = function(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast-item toast-${type}`;
  
  let icon = "ri-information-line";
  if (type === "success") icon = "ri-checkbox-circle-line";
  if (type === "warning") icon = "ri-alert-line";
  if (type === "error") icon = "ri-error-warning-line";

  toast.innerHTML = `
    <i class="${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  if (window.soundEngine) {
    if (type === "success") window.soundEngine.playSuccess();
    else window.soundEngine.playPop();
  }

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3600);
};

// Global Theme Switcher Helper
window.setPortfolioTheme = function(themeName) {
  const root = document.documentElement;
  root.setAttribute("data-theme", themeName);
  localStorage.setItem("portfolio_theme", themeName);

  // Update theme buttons
  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-theme-val") === themeName);
  });

  if (window.soundEngine) window.soundEngine.playSwitch();
  if (window.heroCanvas) window.heroCanvas.createParticles();
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Theme
  const savedTheme = localStorage.getItem("portfolio_theme") || "dark";
  window.setPortfolioTheme(savedTheme);

  // 2. Sound Toggle Button
  const soundBtn = document.getElementById("sound-toggle-btn");
  if (soundBtn && window.soundEngine) {
    soundBtn.innerHTML = window.soundEngine.isMuted() 
      ? `<i class="ri-volume-mute-line"></i>` 
      : `<i class="ri-volume-up-line"></i>`;

    soundBtn.addEventListener("click", () => {
      const muted = window.soundEngine.toggleMute();
      soundBtn.innerHTML = muted 
        ? `<i class="ri-volume-mute-line"></i>` 
        : `<i class="ri-volume-up-line"></i>`;
      window.showToast(muted ? "Sound muted" : "Sound active", "info");
    });
  }

  // Theme Dropdown / Buttons
  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTheme = btn.getAttribute("data-theme-val");
      window.setPortfolioTheme(targetTheme);
      window.showToast(`Theme switched to ${btn.textContent.trim()}`, "info");
    });
  });

  // 3. Typing Effect in Hero
  initTypingEffect();

  // 4. Live Timezone Clock
  initTimezoneClock();

  // 5. Render Skills Matrix
  renderSkills("all");
  initSkillCategoryFilters();

  // 6. Render Projects Showcase
  renderProjects("all");
  initProjectCategoryFilters();

  // 7. Render Experience Timeline
  renderExperience();


  // 9. Stats Counter Animation on Scroll
  initStatsCounter();

  // 10. Contact Form Logic
  initContactForm();

  // 11. Navigation Scrollspy & Mobile Drawer
  initNavigation();

  // 12. Copy Email Buttons
  initCopyEmailButtons();

  // 13. Project Detail Modal
  initProjectModal();

  // 14. Custom Magnetic Cursor
  initCustomCursor();

  // 15. Scroll Reveal Animations
  initScrollReveals();
});

/* =========================================================================
   Typing Effect for Hero Roles
   ========================================================================= */
function initTypingEffect() {
  const roleEl = document.getElementById("hero-dynamic-role");
  if (!roleEl) return;

  const roles = PortfolioData.profile.roles || [
    "Senior Full-Stack Architect",
    "AI Systems Engineer",
    "Cloud & DevOps Specialist"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeLoop() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      charIdx--;
      roleEl.textContent = currentRole.substring(0, charIdx);
      typingSpeed = 40;
    } else {
      charIdx++;
      roleEl.textContent = currentRole.substring(0, charIdx);
      typingSpeed = 80;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      typingSpeed = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();
}

/* =========================================================================
   Live Timezone Clock (IST UTC+5:30)
   ========================================================================= */
function initTimezoneClock() {
  const clockEl = document.getElementById("live-time-display");
  if (!clockEl) return;

  function updateClock() {
    const options = {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    };
    const nowStr = new Intl.DateTimeFormat("en-US", options).format(new Date());
    clockEl.textContent = `${nowStr} IST (UTC+5:30)`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* =========================================================================
   Skills Matrix Rendering & Filtering
   ========================================================================= */
function renderSkills(category = "all") {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;

  const items = category === "all"
    ? PortfolioData.skills.items
    : PortfolioData.skills.items.filter(s => s.category === category);

  grid.innerHTML = items.map((skill, i) => `
    <div class="skill-card reveal" style="--delay: ${i * 0.05}s">
      <div class="skill-card-top">
        <div class="skill-icon-wrap">
          <i class="${skill.icon}"></i>
        </div>
        <div class="skill-meta">
          <h4 class="skill-name">${skill.name}</h4>
          <span class="skill-exp">${skill.experience} exp</span>
        </div>
        <span class="skill-pct">${skill.level}%</span>
      </div>
      <div class="skill-bar-track">
        <div class="skill-bar-fill" style="width: ${skill.level}%"></div>
      </div>
      <div class="skill-tags">
        ${skill.tags.map(t => `<span class="skill-tag">${t}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

function initSkillCategoryFilters() {
  const container = document.getElementById("skills-category-tabs");
  if (!container) return;

  container.innerHTML = PortfolioData.skills.categories.map(c => `
    <button class="filter-pill ${c.id === 'all' ? 'active' : ''}" data-cat="${c.id}">
      ${c.name}
    </button>
  `).join("");

  container.querySelectorAll(".filter-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      container.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      if (window.soundEngine) window.soundEngine.playPop();
      renderSkills(pill.getAttribute("data-cat"));
    });
  });
}

/* =========================================================================
   Projects Showcase Rendering & Filtering
   ========================================================================= */
function renderProjects(category = "all") {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const items = category === "all"
    ? PortfolioData.projects
    : PortfolioData.projects.filter(p => p.category === category);

  grid.innerHTML = items.map((proj, i) => `
    <article class="project-card reveal" style="--delay: ${i * 0.08}s" data-project-id="${proj.id}">
      <div class="project-media">
        <img src="${proj.image}" alt="${proj.title} preview" loading="lazy" class="project-img" />
        <div class="project-overlay">
          <button class="btn btn-sm btn-primary view-case-btn" data-project-id="${proj.id}">
            <i class="ri-eye-line"></i> Deep Dive Case Study
          </button>
        </div>
        <span class="project-badge">${proj.badge}</span>
      </div>
      <div class="project-body">
        <div class="project-cat-row">
          <span class="project-cat">${proj.categoryLabel}</span>
          <div class="project-quick-links">
            ${proj.caseStudy.github ? `
            <a href="${proj.caseStudy.github}" target="_blank" rel="noopener" class="icon-link" title="View Source" aria-label="GitHub Source">
              <i class="ri-github-line"></i>
            </a>` : ""}
            ${proj.caseStudy.demo ? `
            <a href="${proj.caseStudy.demo}" target="_blank" rel="noopener" class="icon-link" title="Live Preview" aria-label="Live Demo">
              <i class="ri-external-link-line"></i>
            </a>` : ""}
          </div>
        </div>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.description}</p>
        <div class="project-metrics-row">
          ${proj.metrics.map(m => `
            <div class="project-metric">
              <span class="p-metric-val">${m.value}</span>
              <span class="p-metric-lbl">${m.label}</span>
            </div>
          `).join("")}
        </div>
        <div class="project-tech-tags">
          ${proj.technologies.map(t => `<span class="tech-tag">${t}</span>`).join("")}
        </div>
      </div>
    </article>
  `).join("");

  // Attach card click handlers for case study modal
  grid.querySelectorAll(".view-case-btn, .project-title").forEach(el => {
    el.addEventListener("click", (e) => {
      const card = e.target.closest(".project-card");
      if (card) {
        const id = card.getAttribute("data-project-id");
        openProjectModal(id);
      }
    });
  });

  // 3D Card Hover Tilt effect
  initProjectTilt();
}

function initProjectCategoryFilters() {
  const container = document.getElementById("projects-filter-tabs");
  if (!container) return;

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "ai", label: "AI & LLM Systems" },
    { id: "cloud", label: "Cloud & DevOps" },
    { id: "frontend", label: "Frontend & UI/UX" }
  ];

  container.innerHTML = categories.map(c => `
    <button class="filter-pill ${c.id === 'all' ? 'active' : ''}" data-project-filter="${c.id}">
      ${c.label}
    </button>
  `).join("");

  container.querySelectorAll(".filter-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      if (window.soundEngine) window.soundEngine.playPop();
      renderProjects(btn.getAttribute("data-project-filter"));
    });
  });
}

function initProjectTilt() {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
}

/* =========================================================================
   Project Deep Dive Modal
   ========================================================================= */
function initProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  const closeBtns = modal.querySelectorAll(".modal-close-btn");
  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => closeProjectModal());
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeProjectModal();
    }
  });
}

function openProjectModal(projectId) {
  const project = PortfolioData.projects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("project-modal-body");
  if (!modal || !modalBody) return;

  if (window.soundEngine) window.soundEngine.playPop();

  modalBody.innerHTML = `
    <div class="modal-project-header">
      <div class="modal-header-top">
        <span class="project-badge">${project.badge}</span>
        <span class="project-cat">${project.categoryLabel}</span>
      </div>
      <h2 class="modal-project-title">${project.title}</h2>
      <p class="modal-project-tagline">${project.tagline}</p>
    </div>

    <div class="modal-project-media">
      <img src="${project.image}" alt="${project.title}" class="modal-hero-img" />
    </div>

    <div class="modal-metrics-grid">
      ${project.metrics.map(m => `
        <div class="modal-metric-card">
          <span class="modal-m-val">${m.value}</span>
          <span class="modal-m-lbl">${m.label}</span>
        </div>
      `).join("")}
    </div>

    <div class="modal-section">
      <h3 class="modal-subheading"><i class="ri-information-line"></i> Executive Overview</h3>
      <p class="modal-paragraph">${project.caseStudy.overview}</p>
    </div>

    <div class="modal-grid-2col">
      <div class="modal-col-card">
        <h4 class="col-title text-danger"><i class="ri-alert-line"></i> The Core Challenge</h4>
        <p>${project.caseStudy.problem}</p>
      </div>
      <div class="modal-col-card">
        <h4 class="col-title text-success"><i class="ri-shield-check-line"></i> The Solution & Impact</h4>
        <p>${project.caseStudy.solution}</p>
      </div>
    </div>

    <div class="modal-section">
      <h3 class="modal-subheading"><i class="ri-cpu-line"></i> Technical Architecture Highlights</h3>
      <ul class="modal-arch-list">
        ${project.caseStudy.architecture.map(arch => `
          <li><i class="ri-checkbox-circle-fill"></i> <span>${arch}</span></li>
        `).join("")}
      </ul>
    </div>

    <div class="modal-section">
      <h3 class="modal-subheading"><i class="ri-stack-line"></i> Applied Technologies</h3>
      <div class="project-tech-tags">
        ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join("")}
      </div>
    </div>

    <div class="modal-actions-footer">
      ${project.caseStudy.demo ? `
      <a href="${project.caseStudy.demo}" target="_blank" rel="noopener" class="btn btn-primary">
        <i class="ri-external-link-line"></i> Open Live Demo
      </a>` : ""}
      ${project.caseStudy.github ? `
      <a href="${project.caseStudy.github}" target="_blank" rel="noopener" class="btn btn-outline">
        <i class="ri-github-line"></i> View GitHub Source
      </a>` : ""}
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

/* =========================================================================
   Experience Timeline
   ========================================================================= */
function renderExperience() {
  const container = document.getElementById("experience-timeline");
  if (!container) return;

  container.innerHTML = PortfolioData.experience.map((exp, i) => `
    <div class="timeline-item reveal" style="--delay: ${i * 0.1}s">
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="timeline-header">
          <div class="timeline-meta">
            <span class="timeline-period"><i class="ri-calendar-line"></i> ${exp.period}</span>
            <span class="timeline-loc"><i class="ri-map-pin-line"></i> ${exp.location}</span>
          </div>
          <span class="timeline-type">${exp.type}</span>
        </div>
        <h3 class="timeline-role">${exp.role}</h3>
        <h4 class="timeline-company">${exp.company}</h4>
        <p class="timeline-desc">${exp.description}</p>
        <div class="timeline-achievements">
          <h5 class="achieve-title">Key Impact & Deliverables:</h5>
          <ul>
            ${exp.achievements.map(a => `<li><i class="ri-arrow-right-s-line"></i> <span>${a}</span></li>`).join("")}
          </ul>
        </div>
        <div class="timeline-tech">
          ${exp.tech.map(t => `<span class="tech-tag">${t}</span>`).join("")}
        </div>
      </div>
    </div>
  `).join("");
}


/* =========================================================================
   Animated Stats Count-Up on Scroll
   ========================================================================= */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseFloat(stat.getAttribute("data-target"));
          const suffix = stat.getAttribute("data-suffix") || "";
          const isDecimal = target % 1 !== 0;
          const duration = 1800;
          const startTime = performance.now();

          function update(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOutQuad = 1 - (1 - progress) * (1 - progress);
            const current = progress * target;

            stat.textContent = isDecimal 
              ? current.toFixed(2) + suffix 
              : Math.floor(current) + suffix;

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              stat.textContent = (isDecimal ? target.toFixed(2) : target) + suffix;
            }
          }

          requestAnimationFrame(update);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById("stats-section");
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* =========================================================================
   Interactive Contact Form
   ========================================================================= */

function initContactForm() {
  const form = document.getElementById("contact-form");
  const msgInput = document.getElementById("contact-message");
  const charCounter = document.getElementById("char-counter");

  // Character counter
  if (msgInput && charCounter) {
    msgInput.addEventListener("input", () => {
      const len = msgInput.value.length;

      charCounter.textContent = `${len}/500`;

      charCounter.style.color =
        len > 450
          ? "var(--warning)"
          : "var(--text-muted)";
    });
  }

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");
    const submitBtn = form.querySelector("button[type='submit']");

    // Name validation
    if (!nameInput.value.trim()) {
      window.showToast("Please enter your name.", "warning");
      nameInput.focus();
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value.trim())) {
      window.showToast("Please enter a valid email address.", "warning");
      emailInput.focus();
      return;
    }

    // Message validation
    if (!messageInput.value.trim()) {
      window.showToast("Please enter a brief message.", "warning");
      messageInput.focus();
      return;
    }

    // Loading state
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;

    submitBtn.innerHTML =
      `<i class="ri-loader-4-line spin-anim"></i> Sending message...`;

    try {
      // Send form to Formspree
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        submitBtn.innerHTML =
          `<i class="ri-check-line"></i> Message Sent!`;

        window.showToast(
          "Thank you! Your message has been sent successfully.",
          "success"
        );

        // Clear form
        form.reset();

        if (charCounter) {
          charCounter.textContent = "0/500";
        }

        // Restore button
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 3500);

      } else {
        throw new Error("Form submission failed");
      }

    } catch (error) {
      console.error("Contact form error:", error);

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      window.showToast(
        "Unable to send your message. Please try again.",
        "warning"
      );
    }
  });
}


/* =========================================================================
   Navigation Scrollspy & Mobile Drawer
   ========================================================================= */
function initNavigation() {
  const header = document.getElementById("main-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-nav-drawer");

  // Sticky Navbar blur enhancement
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Active link highlight
    let currentId = "";
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = sec.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
  });

  // Mobile Menu Toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("active");
      mobileToggle.classList.toggle("active", isOpen);
      mobileToggle.setAttribute("aria-expanded", isOpen);
      if (window.soundEngine) window.soundEngine.playPop();
    });

    mobileMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        mobileToggle.classList.remove("active");
      });
    });
  }
}

/* =========================================================================
   Copy Email Quick Buttons
   ========================================================================= */
function initCopyEmailButtons() {
  document.querySelectorAll("[data-copy-email]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const email = PortfolioData.profile.email;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          window.showToast(`Email copied: ${email}`, "success");
        });
      } else {
        window.showToast(`Email: ${email}`, "info");
      }
    });
  });
}

/* =========================================================================
   Custom Magnetic Fluid Cursor
   ========================================================================= */
function initCustomCursor() {
  // Only enable on non-touch devices
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  const ring = document.createElement("div");
  ring.className = "cursor-ring";

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover states on clickable items
  const clickables = "a, button, input, textarea, .filter-pill, .project-card, .skill-card";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(clickables)) {
      ring.classList.add("hover");
      dot.classList.add("hover");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(clickables)) {
      ring.classList.remove("hover");
      dot.classList.remove("hover");
    }
  });

  document.addEventListener("mousedown", () => {
    ring.classList.add("click");
  });

  document.addEventListener("mouseup", () => {
    ring.classList.remove("click");
  });
}

/* =========================================================================
   Scroll Reveal Animations
   ========================================================================= */
function initScrollReveals() {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

  reveals.forEach(el => observer.observe(el));
}
