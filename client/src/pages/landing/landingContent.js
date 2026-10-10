export const landingContent = {
  nav: {
    logo: "AptiFlow",
    links: [
      { label: "Features", href: "#features" },
      { label: "Topics", href: "#topics" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Quality & FAQ", href: "#faq" }
    ]
  },
  hero: {
    eyebrow: "Aptitude prep for placements & competitive exams",
    headline: "Practice smarter. Perform better under pressure.",
    headlineHighlight: "under pressure.",
    subtext: "Master Quantitative, Logical Reasoning, and Verbal Ability with curated problem sets, high-yield shortcuts, and AI-generated challenges rigorously vetted by exam toppers.",
    primaryCTA: "Start practicing free",
    secondaryCTA: "See how it works",
    trustChips: ["Admin-reviewed questions", "Realistic timed tests", "Step-by-step shortcuts"]
  },
  stats: [
    { value: "4+", label: "Core Domains", desc: "Quant, Reasoning, Verbal & Probability" },
    { value: "3", label: "Difficulty Tiers", desc: "Foundational drills to CAT/GATE Hard" },
    { value: "100%", label: "Admin Reviewed", desc: "Zero hallucinated keys or broken logic" },
    { value: "24/7", label: "Anytime Drills", desc: "On-demand simulations on all devices" }
  ],
  topics: {
    eyebrow: "COMPREHENSIVE SYLLABUS",
    headline: "Master every section tested in campus drives",
    subtext: "Targeted practice banks designed to sharpen specific mental models, speed techniques, and rapid pattern recognition.",
    items: [
      { id: "quant", title: "Quantitative Aptitude", icon: "Calculator", desc: "Speed arithmetic, algebraic equations, number systems, and percentage models taught with 30-second shortcut formulas.", chips: ["Number Systems", "Algebra", "Geometry", "Speed Math", "Data Interpretation"], dark: false },
      { id: "prob", title: "Probability & PnC", icon: "Dices", desc: "Combinatorics, Bayes' theorem, and probability puzzles that separate top 1% candidates in tier-1 product assessments.", chips: ["Permutations", "Combinations", "Bayes Theorem", "Distributions"], dark: true, tag: "HIGH YIELD TOPIC" },
      { id: "logical", title: "Logical Reasoning", icon: "Brain", desc: "Deductive matrices, syllogisms, circular seating arrangements, and pattern recognition matrices for top tech drives.", chips: ["Seating Layouts", "Syllogisms", "Blood Relations", "Coding-Decoding"], dark: false },
      { id: "verbal", title: "Verbal Ability", icon: "BookOpen", desc: "Sentence correction rules, parajumbles, vocabulary nuances, and high-speed passage comprehension frameworks.", chips: ["Reading Comprehension", "Sentence Correction", "Para Jumbles", "Vocabulary & Idioms"], dark: false }
    ]
  },
  features: [
    {
      id: "01",
      title: "Topic-wise practice with instant step-by-step solutions",
      desc: "No more flipping to back pages or deciphering cryptic answer sheets. Every problem is paired with a direct conceptual breakdown and a speed shortcut method.",
      bullets: [
        { title: "Targeted focus:", desc: "Select specific subjects or topics to strengthen your weakest areas." },
        { title: "Instant feedback:", desc: "See correct answers and detailed explanations immediately after submitting." },
        { title: "Step-by-step solutions:", desc: "Understand the core concepts and mathematical formulas behind every problem." }
      ],
      image: "/images/landing/feature-practice.webp",
      reverse: false
    },
    {
      id: "02",
      title: "Vetted AI questions with zero ambiguity",
      desc: "Standard question banks reuse the same stale problems from 2012. AptiFlow continuously generates fresh problem variations, but passes each one through human gatekeepers before publishing.",
      bullets: [
        { title: "Never memorize answers:", desc: "Train intuition on novel problem setups that test underlying theory." },
        { title: "Flawless keys:", desc: "Every distracter option is hand-verified by an admin to ensure true mathematical uniqueness." },
        { title: "Realistic company styles:", desc: "Questions tailored to match modern placement and competitive exam standards." }
      ],
      image: "/images/landing/feature-review.webp",
      reverse: true
    },
    {
      id: "03",
      title: "Realistic timed tests & national benchmarking",
      desc: "Doing problems untimed is easy. Solving under the ticking clock of a placement drive is completely different. Replicate true exam pressure in a distraction-free cockpit.",
      bullets: [
        { title: "Strict countdown timers:", desc: "Train your time-management for strict countdown blocks." },
        { title: "Mixed topic assessments:", desc: "Simulate real exam conditions by testing multiple subjects simultaneously." },
        { title: "Peer percentiles:", desc: "See exactly where your speed and accuracy stand among top aspirants on the leaderboard." }
      ],
      image: "/images/landing/feature-test.webp",
      reverse: false
    }
  ],
  howItWorks: {
    eyebrow: "METHODICAL PREPARATION",
    title: "How AptiFlow accelerates readiness",
    subtext: "From your first diagnostic practice session to exam day confidence in four clear steps.",
    steps: [
      { num: "01", title: "Choose a Topic", desc: "Select Quantitative, Logical Reasoning, Verbal, or Probability." },
      { num: "02", title: "Practice or Drill", desc: "Engage in untimed practice drills or jump into strict real-time countdown mock tests." },
      { num: "03", title: "Absorb Shortcuts", desc: "Learn the optimal approach for every failed question to eliminate unnecessary steps." },
      { num: "04", title: "Track & Excel", desc: "Benchmark performance, review history analytics, and climb into top 1% percentiles." }
    ]
  },
  trust: {
    eyebrow: "HUMAN + AI VERIFICATION PIPELINE",
    title: "Quality You Can Rely On: AI Drafted, Human Admin Verified",
    desc: "Generic AI test tools hallucinate incorrect answer keys and impossible constraints. AptiFlow combines the rapid scalability of LLMs with stringent human pedagogical oversight.",
    stages: [
      { num: "STAGE 01", title: "AI Problem Generation", desc: "Models synthesize realistic word scenarios, diverse mathematical variables, and realistic distracter choices." },
      { num: "STAGE 02 • CORE GUARD", title: "Subject Expert Audit", desc: "Administrators recalculate step solutions, eliminate semantic ambiguity, and verify solvability." },
      { num: "STAGE 03", title: "Published to Test Pool", desc: "Question is digitally stamped, tagged with accurate difficulty parameters, and unlocked for live evaluations." }
    ]
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      { q: "Do I need an account?", a: "Yes, an account is required to track your progress, save your test history, and appear on the leaderboard." },
      { q: "How are questions checked?", a: "Every AI-generated question is manually reviewed and approved by an administrator before it is published to students." },
      { q: "How does the timer work?", a: "Timed tests have a strict countdown. Once the time is up, your test is automatically submitted." },
      { q: "Can I practice without a timed test?", a: "Absolutely! Our practice mode allows you to answer questions at your own pace with instant explanations." },
      { q: "Which exams is this for?", a: "AptiFlow is designed to help with campus placements and general competitive exams that test quantitative, logical, and verbal aptitude." }
    ]
  },
  cta: {
    title: "Ready to ace your next exam?",
    desc: "Join today and start practicing with high-quality aptitude questions.",
    buttonText: "Create your free account"
  },
  footer: {
    description: "Your ultimate platform for aptitude preparation and competitive exam practice.",
    copyright: "© 2026 AptiFlow. All rights reserved."
  }
};
