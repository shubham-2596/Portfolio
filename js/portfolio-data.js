/**
 * Portfolio Data Store
 * Personalised for Shubham Gaikwad — Student Developer
 */
const PortfolioData = {
  profile: {
    name: "Shubham Gaikwad",
    preferredName: "Shubham",
    title: "Student Developer & Full-Stack Enthusiast",
    tagline: "Building practical web applications, AI-powered tools, and data-driven systems while growing as a software developer.",
    avatar: "assets/images/Shubham.jpeg",
    status: {
      available: true,
      text: "Open to internships, student opportunities & collaborative projects",
      badgeClass: "status-available"
    },
    location: "India • Open to Remote Opportunities",
    timezone: "Asia/Kolkata (IST • UTC+5:30)",
    email: "gaikwadshubham2596@gmail.com",
    roles: [
      "Full-Stack Developer",
      "AI & ML Project Builder",
      "Python & FastAPI Developer",
      "Java & DSA Learner",
      "Cloud & DevOps Learner"
    ],
    bio: [
      "I am a student developer who enjoys turning ideas into working software. My projects span full-stack web development, AI/ML, aviation data, cloud tooling, and developer-focused applications.",
      "I learn by building: designing APIs, connecting databases, creating responsive interfaces, debugging real project issues, and continuously improving my understanding of Java, Python, JavaScript, Docker, Kubernetes, and modern development workflows."
    ],
    socials: {
      github: "https://github.com/shubham-2596",
      linkedin: "https://www.linkedin.com/in/shubham-gaikwad-128433377/",
      twitter: "",
      discord: "",
      email: "gaikwadshubham2596@gmail.com"
    }
  },

  stats: [
    { label: "Major Projects", value: 3, suffix: "+", icon: "ri-rocket-line" },
    { label: "Core Development Areas", value: 4, suffix: "", icon: "ri-code-box-line" },
    { label: "Technologies Practiced", value: 15, suffix: "+", icon: "ri-stack-line" },
    { label: "Current Focus", value: 2026, suffix: "", icon: "ri-graduation-cap-line" }
  ],

  about: {
    philosophy: "I believe the best way to learn software development is to build real projects, understand why things break, and keep improving them.",
    highlights: [
      { title: "Full-Stack Development", desc: "Building responsive React frontends, Node.js/Express APIs, FastAPI services, and database-backed applications." },
      { title: "AI & ML Projects", desc: "Exploring NLP, semantic classification, anomaly detection, embeddings, and practical AI-assisted applications." },
      { title: "Problem Solving", desc: "Practicing Java and Data Structures & Algorithms through LeetCode and implementation-based learning." },
      { title: "Cloud & DevOps", desc: "Learning Docker, Kubernetes, Git, CI/CD, and deployment workflows through hands-on projects and workshops." }
    ]
  },

  skills: {
    categories: [
      { id: "all", name: "All Technologies" },
      { id: "frontend", name: "Frontend" },
      { id: "backend", name: "Backend & Databases" },
      { id: "ai", name: "AI / ML" },
      { id: "cloud", name: "Cloud & DevOps" }
    ],
    items: [
      { name: "HTML / CSS / JavaScript", category: "frontend", level: 85, experience: "Project-based", icon: "ri-html5-line", tags: ["Responsive UI", "DOM", "Web APIs"] },
      { name: "React", category: "frontend", level: 82, experience: "Project-based", icon: "ri-reactjs-line", tags: ["Components", "React Router", "Vite"] },
      { name: "Tailwind CSS", category: "frontend", level: 76, experience: "Project-based", icon: "ri-tailwind-css-line", tags: ["Responsive", "Utility CSS"] },
      { name: "Node.js & Express", category: "backend", level: 80, experience: "Project-based", icon: "ri-nodejs-line", tags: ["REST APIs", "Middleware", "MVC"] },
      { name: "Python & FastAPI", category: "backend", level: 82, experience: "Project-based", icon: "ri-terminal-box-line", tags: ["REST APIs", "Pydantic", "Async"] },
      { name: "MySQL", category: "backend", level: 78, experience: "Project-based", icon: "ri-database-2-line", tags: ["SQL", "Schema Design", "CRUD"] },
      { name: "Java", category: "backend", level: 78, experience: "Learning + DSA", icon: "ri-code-s-slash-line", tags: ["OOP", "DSA", "LeetCode"] },
      { name: "Machine Learning / NLP", category: "ai", level: 70, experience: "Project-based", icon: "ri-brain-line", tags: ["Classification", "Embeddings", "Anomaly Detection"] },
      { name: "Sentence Transformers", category: "ai", level: 68, experience: "Project-based", icon: "ri-cpu-line", tags: ["Semantic Search", "Embeddings"] },
      { name: "Docker", category: "cloud", level: 70, experience: "Hands-on", icon: "ri-instance-line", tags: ["Containers", "Images", "Compose"] },
      { name: "Kubernetes", category: "cloud", level: 58, experience: "Learning", icon: "ri-server-line", tags: ["kubectl", "Deployments", "Services"] },
      { name: "Git & GitHub", category: "cloud", level: 82, experience: "Project-based", icon: "ri-github-line", tags: ["Branches", "Commits", "Collaboration"] }
    ]
  },

  projects: [
    {
      id: "turbulence-risk-mapper",
      title: "Turbulence Risk Mapper",
      category: "ai",
      categoryLabel: "Aviation Data & AI",
      badge: "Hackathon Project",
      image: "assets/images/Aviation.png",
      tagline: "A spatial intelligence dashboard for mapping aircraft turbulence risk.",
      description: "A prototype platform that combines aircraft telemetry, atmospheric weather data, and turbulence predictions to help visualize areas of elevated clear-air turbulence risk.",
      technologies: ["React", "FastAPI", "Python", "MySQL", "Leaflet", "OpenStreetMap", "Redis"],
      metrics: [
        { label: "Architecture", value: "4D Data" },
        { label: "Frontend", value: "React" },
        { label: "Backend", value: "FastAPI" }
      ],
      caseStudy: {
        overview: "The project explores how aviation sensor data and atmospheric information can be presented on an interactive map. It includes aircraft fleet visualization, weather-grid data, risk predictions, and a dashboard for aviation-focused analysis.",
        problem: "Raw aircraft and weather information is difficult to understand when it is spread across separate data sources. A dispatcher-oriented interface needs spatial context and a clear way to inspect risk.",
        solution: "Built a full-stack prototype with a FastAPI backend, database models, simulated weather/PIREP data, and a React + Leaflet dashboard. The system is designed so live ADS-B and external weather sources can be integrated as the project evolves.",
        architecture: [
          "FastAPI backend exposing aviation and risk-analysis APIs.",
          "React frontend with Leaflet/OpenStreetMap for interactive aircraft and weather visualization.",
          "MySQL with SQLAlchemy models for aircraft, routes, weather observations, and risk predictions.",
          "Background ingestion/simulation workflow for atmospheric soundings and synthetic PIREPs."
        ],
        github: "",
        demo: ""
      }
    },
    {
      id: "cake-basket",
      title: "The Cake's Marvel",
      category: "frontend",
      categoryLabel: "Full-Stack E-Commerce",
      badge: "Full-Stack Project",
      image: "assets/images/cake marvel.png",
      tagline: "A modern cake ordering website with a React frontend and Node.js/MySQL backend.",
      description: "A responsive e-commerce application for browsing cakes, viewing product details, managing a cart, authentication, checkout, and admin product management.",
      technologies: ["React", "Node.js", "Express", "MySQL", "Axios", "Tailwind CSS", "Framer Motion"],
      metrics: [
        { label: "Architecture", value: "MVC" },
        { label: "Database", value: "MySQL" },
        { label: "API", value: "REST" }
      ],
      caseStudy: {
        overview: "The Cake's Marvel is a full-stack learning project focused on building a complete product-to-checkout workflow with separate frontend and backend layers.",
        problem: "An e-commerce application needs more than a product page: it requires structured APIs, persistent product data, authentication, cart state, checkout flow, and administration.",
        solution: "Implemented a React frontend connected to a Node.js/Express API and MySQL database. The project uses reusable pages and components for products, product details, cart, login, registration, checkout, and admin workflows.",
        architecture: [
          "React frontend using React Router for application navigation.",
          "Node.js and Express backend organized around controllers and API routes.",
          "MySQL database accessed through mysql2 for product and application data.",
          "Axios used to connect frontend views with REST endpoints."
        ],
        github: "https://github.com/shubham-2596/cake-basket",
        demo: ""
      }
    },
    {
      id: "hybrid-log-triage-agent",
      title: "Hybrid Log Triage Agent",
      category: "ai",
      categoryLabel: "AI / ML & Developer Tools",
      badge: "AI Project",
      image: "assets/images/hybrid-log-triage.png",
      tagline: "A multi-stage log analysis system combining rules, semantic classification, and anomaly detection.",
      description: "A developer-focused tool that analyzes application logs using a hybrid pipeline: regex/rule-based detection, transformer embeddings for semantic classification, and anomaly analysis.",
      technologies: ["Python", "FastAPI", "Node.js", "React", "scikit-learn", "Sentence Transformers", "MySQL"],
      metrics: [
        { label: "Tier 1", value: "Rules" },
        { label: "Tier 2", value: "Semantic" },
        { label: "Tier 3", value: "Anomaly" }
      ],
      caseStudy: {
        overview: "The Hybrid Log Triage Agent is designed to reduce the manual effort required to interpret application logs by routing different types of messages through increasingly intelligent analysis stages.",
        problem: "Large log streams contain familiar errors as well as messages whose meaning depends on context. A single rule-based approach can miss semantic relationships, while a model-only approach can be unnecessarily expensive.",
        solution: "The project combines deterministic regex classification for known patterns, sentence-transformer embeddings for semantic analysis, and anomaly detection for suspicious or unusual events.",
        architecture: [
          "Node.js backend layer for application/API integration.",
          "FastAPI ML service for log analysis and model inference.",
          "Rule-based Tier 1 classifier for known log patterns.",
          "Semantic Tier 2 classifier using sentence-transformer embeddings and cosine similarity.",
          "Tier 3 anomaly/security analysis for unusual log behaviour."
        ],
        github: "",
        demo: ""
      }
    }
  ],

  experience: [
    {
      period: "2026 — Present",
      role: "Student Developer",
      company: "Academic & Personal Projects",
      location: "India",
      type: "Student",
      description: "Building practical software projects while strengthening full-stack development, AI/ML, cloud, and problem-solving skills.",
      achievements: [
        "Developing full-stack applications with React, Node.js/Express, FastAPI, and MySQL.",
        "Building AI/ML prototypes involving semantic classification, embeddings, and anomaly detection.",
        "Practicing Java, Data Structures & Algorithms, and LeetCode problem solving.",
        "Learning Docker, Kubernetes, Git workflows, and modern development practices."
      ],
      tech: ["Java", "Python", "JavaScript", "React", "FastAPI", "MySQL", "Git"]
    },
    {
      period: "2026",
      role: "Hackathon Project Developer",
      company: "Turbulence Risk Mapper",
      location: "India",
      type: "Project",
      description: "Worked on an aviation-focused spatial data prototype that combines aircraft, weather, and turbulence-risk information.",
      achievements: [
        "Designed a React + Leaflet dashboard for spatial aviation data.",
        "Implemented FastAPI services and SQLAlchemy database models.",
        "Worked with simulated weather grids, atmospheric soundings, and PIREP data.",
        "Debugged real integration issues across the frontend map and backend data flow."
      ],
      tech: ["React", "FastAPI", "Python", "MySQL", "Leaflet", "Redis"]
    },
    {
      period: "2026",
      role: "Full-Stack Project Developer",
      company: "The Cake Basket",
      location: "India",
      type: "Project",
      description: "Built a cake ordering application to practice real-world frontend, backend, database, authentication, and admin workflows.",
      achievements: [
        "Created product, details, cart, login, registration, checkout, and admin pages.",
        "Built REST APIs with Node.js and Express.",
        "Connected the application to MySQL using mysql2.",
        "Used Git and GitHub for project version control and collaboration."
      ],
      tech: ["React", "Node.js", "Express", "MySQL", "Axios", "Git"]
    }
  ],

  testimonials: [],

  terminalFiles: {
    "welcome.txt": "Welcome to Shubham's Interactive Dev Terminal!\nType 'help' to explore the portfolio.",
    "about.txt": "Shubham Gaikwad — Student Developer\nInterested in full-stack development, AI/ML, Java DSA, cloud and DevOps.",
    "skills.txt": "Core Skills:\n- Frontend: HTML, CSS, JavaScript, React, Tailwind CSS\n- Backend: Node.js, Express, Python, FastAPI\n- Database: MySQL\n- AI/ML: NLP, embeddings, semantic classification, anomaly detection\n- Cloud/DevOps: Git, GitHub, Docker, Kubernetes\n- Problem Solving: Java, Data Structures & Algorithms, LeetCode",
    "projects.txt": "Projects:\n1. Turbulence Risk Mapper\n2. The Cake Basket\n3. Hybrid Log Triage Agent",
    "contact.txt": "GitHub: https://github.com/shubham-2596\nEmail: gaikwadshubham2596@gmail.com\nTimezone: Asia/Kolkata (IST)",
    "resume.txt": "=== RESUME SUMMARY ===\nName: Shubham Gaikwad\nRole: Student Developer\nFocus: Full-Stack Development, AI/ML, Java DSA, Cloud & DevOps\nProjects: Turbulence Risk Mapper, The Cake Basket, Hybrid Log Triage Agent",
    "easteregg.txt": "Try: help, projects, skills, cat resume.txt, theme cyberpunk, matrix"
  }
};
