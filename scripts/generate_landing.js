const fs = require('fs');
const path = require('path');

const clientDir = path.join(__dirname, '..', 'client');
const componentsDir = path.join(clientDir, 'src', 'components', 'landing');
const pagesDir = path.join(clientDir, 'src', 'pages', 'landing');
const publicImagesDir = path.join(clientDir, 'public', 'images', 'landing');

[componentsDir, pagesDir, publicImagesDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// landingContent.js
const landingContent = `
export const landingContent = {
  nav: {
    logo: "AptiFlow",
    links: [
      { label: "Features", href: "#features" },
      { label: "Topics", href: "#topics" },
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" }
    ]
  },
  hero: {
    eyebrow: "Aptitude prep for placements and competitive exams",
    headline: "Practice smarter. Perform better under pressure.",
    subtext: "Topic-wise practice, realistic timed tests, step-by-step explanations, and a leaderboard to keep you going.",
    primaryCTA: "Start practicing free",
    secondaryCTA: "See how it works",
    trustChips: ["Reviewed questions", "Timed tests", "Instant explanations"]
  },
  stats: [
    { value: "4+", label: "Topic Areas" },
    { value: "3", label: "Difficulty Levels" },
    { value: "100%", label: "Admin-reviewed" },
    { value: "24/7", label: "Platform Access" } // REPLACE with actual numbers later
  ],
  topics: [
    { id: "quant", title: "Quantitative", icon: "Calculator", desc: "Master numerical ability, equations, and data interpretation.", chips: ["Algebra", "Geometry", "Data"] },
    { id: "logical", title: "Logical Reasoning", icon: "Brain", desc: "Enhance your puzzle solving, sequences, and critical thinking.", chips: ["Puzzles", "Series", "Deduction"] },
    { id: "verbal", title: "Verbal Ability", icon: "BookOpen", desc: "Improve vocabulary, reading comprehension, and grammar.", chips: ["Grammar", "Comprehension", "Vocab"] },
    { id: "prob", title: "Probability & Permutations", icon: "Dices", desc: "Tackle advanced counting, combinations, and chance.", chips: ["Combinatorics", "Chance", "Arrangements"] }
  ],
  features: [
    { id: "practice", title: "Topic-wise practice", desc: "Focus on your weak areas by selecting specific topics. Get instant feedback and learn step-by-step.", image: "/images/landing/feature-practice.webp", reverse: false },
    { id: "test", title: "Realistic timed tests", desc: "Simulate real exam conditions with strict timers and mixed topic assessments.", image: "/images/landing/feature-test.webp", reverse: true },
    { id: "review", title: "Reviewed AI-assisted questions", desc: "Every question is generated with AI and rigorously reviewed by human experts for accuracy.", image: "/images/landing/feature-review.webp", reverse: false },
    { id: "leaderboard", title: "Progress tracking and leaderboard", desc: "See where you stand among your peers and track your improvement over time.", image: "/images/landing/feature-leaderboard.webp", reverse: true }
  ],
  howItWorks: {
    title: "How it works",
    steps: [
      { num: "1", title: "Choose a topic", desc: "Select a specific subject or opt for a mixed practice session." },
      { num: "2", title: "Practice or take a timed test", desc: "Learn at your own pace or challenge yourself against the clock." },
      { num: "3", title: "Review explanations", desc: "Understand your mistakes with detailed, step-by-step solutions." },
      { num: "4", title: "Climb the leaderboard", desc: "Earn points, improve your accuracy, and rank up." }
    ]
  },
  trust: {
    title: "Quality you can trust",
    desc: "Our questions are drafted by advanced AI models and rigorously verified by human administrators. You only see approved, high-quality content."
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
`;
fs.writeFileSync(path.join(pagesDir, 'landingContent.js'), landingContent);

console.log('Files generated successfully.');
