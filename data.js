/* ═══════════════════════════════════════════════════
     THEME PRESETS
     ═══════════════════════════════════════════════════ */
  const themePresets = {
    'midnight-purple': {
      name: 'Midnight Purple', emoji: '🌑',
      bg: '#060a12', accent: '#a855f7', accentLight: '#c084fc',
      orb1: 'rgba(168,85,247,0.10)', orb2: 'rgba(59,130,246,0.08)', orb3: 'rgba(34,197,94,0.05)',
      t1: '#f1f5f9', t2: '#94a3b8', t3: '#475569'
    },
    'ocean-blue': {
      name: 'Ocean Blue', emoji: '🌊',
      bg: '#040d1a', accent: '#0ea5e9', accentLight: '#38bdf8',
      orb1: 'rgba(14,165,233,0.10)', orb2: 'rgba(99,102,241,0.07)', orb3: 'rgba(6,182,212,0.05)',
      t1: '#f0f9ff', t2: '#7dd3fc', t3: '#0c4a6e'
    },
    'forest-green': {
      name: 'Forest Green', emoji: '🌲',
      bg: '#051208', accent: '#22c55e', accentLight: '#4ade80',
      orb1: 'rgba(34,197,94,0.10)', orb2: 'rgba(20,184,166,0.07)', orb3: 'rgba(132,204,22,0.05)',
      t1: '#f0fdf4', t2: '#86efac', t3: '#14532d'
    },
    'rose-gold': {
      name: 'Rose Gold', emoji: '🌸',
      bg: '#150a0d', accent: '#f43f5e', accentLight: '#fb7185',
      orb1: 'rgba(244,63,94,0.10)', orb2: 'rgba(236,72,153,0.07)', orb3: 'rgba(245,158,11,0.05)',
      t1: '#fff1f2', t2: '#fda4af', t3: '#881337'
    },
    'ember': {
      name: 'Ember', emoji: '🔥',
      bg: '#120a04', accent: '#f97316', accentLight: '#fb923c',
      orb1: 'rgba(249,115,22,0.10)', orb2: 'rgba(239,68,68,0.07)', orb3: 'rgba(245,158,11,0.05)',
      t1: '#fff7ed', t2: '#fdba74', t3: '#7c2d12'
    },
    'cosmos': {
      name: 'Cosmos', emoji: '🌌',
      bg: '#050510', accent: '#8b5cf6', accentLight: '#a78bfa',
      orb1: 'rgba(139,92,246,0.12)', orb2: 'rgba(236,72,153,0.08)', orb3: 'rgba(59,130,246,0.06)',
      t1: '#ede9fe', t2: '#c4b5fd', t3: '#4c1d95'
    },
    'arctic': {
      name: 'Arctic', emoji: '❄️',
      bg: '#0a1019', accent: '#38bdf8', accentLight: '#7dd3fc',
      orb1: 'rgba(56,189,248,0.08)', orb2: 'rgba(99,102,241,0.06)', orb3: 'rgba(148,163,184,0.04)',
      t1: '#f0f9ff', t2: '#bae6fd', t3: '#0c4a6e'
    },
    'grape-soda': {
      name: 'Grape Soda', emoji: '🍇',
      bg: '#100818', accent: '#d946ef', accentLight: '#e879f9',
      orb1: 'rgba(217,70,239,0.10)', orb2: 'rgba(168,85,247,0.07)', orb3: 'rgba(99,102,241,0.05)',
      t1: '#fdf4ff', t2: '#f0abfc', t3: '#701a75'
    }
  };

  /* ═══════════════════════════════════════════════════
     TEMPLATE PRESETS
     ═══════════════════════════════════════════════════ */
  const templatePresets = {
    'student': {
      name: 'Student Progress', emoji: '📚',
      desc: 'Weekly learning tracker for courses and study goals',
      themePreset: 'midnight-purple',
      header: { weekText: 'Weekly Update', dateText: "", title: 'Learning Journey 📚', subtitle: 'Self Study · <b>Consistency</b> · Growth Mindset' },
      stats: [
        { label: 'Courses', value: '3', sub: 'enrolled', theme: 'blue' },
        { label: 'Hours', value: '25', sub: 'this week', theme: 'green' },
        { label: 'Topics', value: '12', sub: 'completed', theme: 'purple' },
        { label: 'Streak', value: '7', sub: 'days', theme: 'amber' }
      ],
      panels: [
        { title: '📖 Currently Learning', dotColor: '#3b82f6', items: [
          { label: 'Mathematics', fillClass: 'done-green', width: 100, isNew: false, badgeText: '✅', badgeClass: 'ok' },
          { label: 'Programming', fillClass: 'done-blue', width: 80, isNew: false, badgeText: 'WIP', badgeClass: 'wip' },
          { label: 'Data Science', fillClass: 'done-purple', width: 45, isNew: true, badgeText: 'WIP', badgeClass: 'wip' },
          { label: 'Databases', fillClass: 'none', width: 6, isNew: false, badgeText: '🔲', badgeClass: 'no' }
        ]},
        { title: '✅ Achievements', dotColor: '#22c55e', items: [
          { label: 'Assignment 1', fillClass: 'done-green', width: 100, isNew: false, badgeText: '✅', badgeClass: 'ok' },
          { label: 'Quiz Scores', fillClass: 'done-green', width: 92, isNew: false, badgeText: '✅', badgeClass: 'ok' },
          { label: 'Group Project', fillClass: 'done-purple', width: 60, isNew: true, badgeText: 'WIP', badgeClass: 'wip' },
          { label: 'Research Paper', fillClass: 'none', width: 6, isNew: false, badgeText: '🔲', badgeClass: 'no' }
        ]}
      ],
      chips: [
        { text: 'Time Management', theme: 'p' }, { text: 'Note Taking', theme: 'b' },
        { text: 'Problem Solving', theme: 'g' }, { text: 'Active Recall', theme: 'p' },
        { text: 'Study Groups', theme: 'o' }, { text: 'Deep Focus', theme: 'b' }
      ],
      chipsLabel: '🎯 Skills Developed',
      quote: '"The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice." 🔥'
    },
    'developer': {
      name: 'Developer Sprint', emoji: '💻',
      desc: 'Sprint summary with PRs, commits, and issues',
      themePreset: 'ocean-blue',
      header: { weekText: 'Sprint Review', dateText: "", title: 'Sprint 4 Complete 🚀', subtitle: 'Full Stack · <b>React</b> · <b>Node.js</b> · PostgreSQL' },
      stats: [
        { label: 'PRs Merged', value: '8', sub: 'this sprint', theme: 'green' },
        { label: 'Commits', value: '47', sub: 'pushed', theme: 'blue' },
        { label: 'Issues', value: '12', sub: 'resolved', theme: 'purple' },
        { label: 'Coverage', value: '89%', sub: 'unit tests', theme: 'cyan' }
      ],
      panels: [
        { title: '🔧 Features Shipped', dotColor: '#0ea5e9', items: [
          { label: 'Auth System', fillClass: 'done-green', width: 100, isNew: false, badgeText: '✅', badgeClass: 'ok' },
          { label: 'Dashboard UI', fillClass: 'done-green', width: 100, isNew: false, badgeText: '✅', badgeClass: 'ok' },
          { label: 'API Endpoints', fillClass: 'done-blue', width: 100, isNew: true, badgeText: '✅', badgeClass: 'ok' },
          { label: 'WebSocket Layer', fillClass: 'done-purple', width: 60, isNew: true, badgeText: 'WIP', badgeClass: 'wip' },
          { label: 'CI/CD Pipeline', fillClass: 'none', width: 6, isNew: false, badgeText: '🔲', badgeClass: 'no' }
        ]},
        { title: '🐛 Bugs Squashed', dotColor: '#22c55e', items: [
          { label: 'Memory Leak Fix', fillClass: 'done-green', width: 100, isNew: false, badgeText: '✅', badgeClass: 'ok' },
          { label: 'Auth Token Refresh', fillClass: 'done-green', width: 100, isNew: true, badgeText: '✅', badgeClass: 'ok' },
          { label: 'CSS Layout Shift', fillClass: 'done-green', width: 100, isNew: false, badgeText: '✅', badgeClass: 'ok' },
          { label: 'Race Condition', fillClass: 'done-blue', width: 80, isNew: true, badgeText: 'WIP', badgeClass: 'wip' }
        ]}
      ],
      chips: [
        { text: 'React Hooks', theme: 'b' }, { text: 'REST API', theme: 'b' },
        { text: 'Unit Testing', theme: 'g' }, { text: 'Docker', theme: 'c' },
        { text: 'TypeScript', theme: 'p' }, { text: 'WebSockets', theme: 'o' }
      ],
      chipsLabel: '🛠️ Technologies Used',
      quote: '"First, solve the problem. Then, write the code." — John Johnson 💡'
    },
    'goals': {
      name: 'Goal Tracker', emoji: '🎯',
      desc: 'Monthly goals with habits and personal growth',
      themePreset: 'cosmos',
      header: { weekText: 'Monthly Goals', dateText: 'June 2026', title: 'June Progress Report 🎯', subtitle: 'Personal Growth · <b>Habits</b> · Focus' },
      stats: [
        { label: 'Goals', value: '5/8', sub: 'achieved', theme: 'green' },
        { label: 'Streak', value: '22', sub: 'days', theme: 'amber' },
        { label: 'Books', value: '2', sub: 'finished', theme: 'purple' },
        { label: 'Savings', value: '85%', sub: 'of target', theme: 'blue' }
      ],
      panels: [
        { title: '✅ Achieved', dotColor: '#22c55e', items: [
          { label: 'Morning Routine', fillClass: 'done-green', width: 100, isNew: false, badgeText: '✅', badgeClass: 'ok' },
          { label: 'Read 30min/day', fillClass: 'done-green', width: 100, isNew: false, badgeText: '✅', badgeClass: 'ok' },
          { label: 'Exercise 4x/week', fillClass: 'done-green', width: 100, isNew: true, badgeText: '✅', badgeClass: 'ok' },
          { label: 'No Social Media', fillClass: 'done-purple', width: 85, isNew: false, badgeText: 'WIP', badgeClass: 'wip' },
          { label: 'Budget Tracking', fillClass: 'done-blue', width: 70, isNew: true, badgeText: 'WIP', badgeClass: 'wip' }
        ]},
        { title: '🔄 In Progress', dotColor: '#8b5cf6', items: [
          { label: 'Learn Guitar', fillClass: 'done-purple', width: 40, isNew: false, badgeText: 'WIP', badgeClass: 'wip' },
          { label: 'Side Project', fillClass: 'done-blue', width: 30, isNew: true, badgeText: 'WIP', badgeClass: 'wip' },
          { label: 'Meditate Daily', fillClass: 'done-green', width: 60, isNew: false, badgeText: 'WIP', badgeClass: 'wip' }
        ]}
      ],
      chips: [
        { text: 'Discipline', theme: 'p' }, { text: 'Consistency', theme: 'g' },
        { text: 'Focus', theme: 'b' }, { text: 'Mindfulness', theme: 'p' },
        { text: 'Growth', theme: 'o' }, { text: 'Reflection', theme: 'b' }
      ],
      chipsLabel: '💪 Habits Built',
      quote: '"Small daily improvements are the key to staggering long-term results." 🌟'
    },
    'fitness': {
      name: 'Fitness Journey', emoji: '🏋️',
      desc: 'Workout tracker with PRs and nutrition',
      themePreset: 'ember',
      header: { weekText: 'Fitness Log', dateText: "", title: 'Getting Stronger 💪', subtitle: '<b>Strength</b> · Cardio · Nutrition' },
      stats: [
        { label: 'Workouts', value: '5/7', sub: 'completed', theme: 'green' },
        { label: 'Calories', value: '2.1K', sub: 'avg/day', theme: 'amber' },
        { label: 'New PRs', value: '3', sub: 'this week', theme: 'red' },
        { label: 'Sleep', value: '7.5h', sub: 'average', theme: 'blue' }
      ],
      panels: [
        { title: '🏋️ Workouts Done', dotColor: '#f97316', items: [
          { label: 'Push Day', fillClass: 'done-green', width: 100, isNew: false, badgeText: '✅', badgeClass: 'ok' },
          { label: 'Pull Day', fillClass: 'done-green', width: 100, isNew: false, badgeText: '✅', badgeClass: 'ok' },
          { label: 'Leg Day', fillClass: 'done-green', width: 100, isNew: true, badgeText: '✅', badgeClass: 'ok' },
          { label: 'Cardio HIIT', fillClass: 'done-amber', width: 100, isNew: false, badgeText: '✅', badgeClass: 'ok' },
          { label: 'Rest & Recovery', fillClass: 'done-blue', width: 100, isNew: false, badgeText: '✅', badgeClass: 'ok' }
        ]},
        { title: '🥗 Nutrition Goals', dotColor: '#22c55e', items: [
          { label: 'Protein Target', fillClass: 'done-green', width: 95, isNew: false, badgeText: '✅', badgeClass: 'ok' },
          { label: 'Water Intake', fillClass: 'done-blue', width: 88, isNew: false, badgeText: 'WIP', badgeClass: 'wip' },
          { label: 'Meal Prep', fillClass: 'done-green', width: 100, isNew: true, badgeText: '✅', badgeClass: 'ok' },
          { label: 'Supplements', fillClass: 'done-purple', width: 70, isNew: false, badgeText: 'WIP', badgeClass: 'wip' }
        ]}
      ],
      chips: [
        { text: 'Bench PR: 80kg', theme: 'r' }, { text: 'Squat PR: 100kg', theme: 'r' },
        { text: '10K Run', theme: 'g' }, { text: 'Meal Planning', theme: 'o' },
        { text: 'Consistency', theme: 'p' }, { text: 'Deadlift PR: 120kg', theme: 'r' }
      ],
      chipsLabel: '🏆 Achievements',
      quote: '"The only bad workout is the one that didn\'t happen." 💪'
    },
    'freelancer': {
      name: 'Freelancer Report', emoji: '📊',
      desc: 'Client deliverables, hours, and milestones',
      themePreset: 'arctic',
      header: { weekText: 'Project Update', dateText: "", title: 'Client Deliverables 📊', subtitle: '<b>Web Dev</b> · Design · Consulting' },
      stats: [
        { label: 'Tasks Done', value: '15', sub: 'completed', theme: 'green' },
        { label: 'Hours', value: '38', sub: 'billed', theme: 'blue' },
        { label: 'Revenue', value: '$2.4K', sub: 'this week', theme: 'amber' },
        { label: 'Rating', value: '4.9', sub: '/5 average', theme: 'pink' }
      ],
      panels: [
        { title: '✅ Delivered', dotColor: '#38bdf8', items: [
          { label: 'Landing Page v2', fillClass: 'done-green', width: 100, isNew: false, badgeText: '✅', badgeClass: 'ok' },
          { label: 'Logo Redesign', fillClass: 'done-green', width: 100, isNew: false, badgeText: '✅', badgeClass: 'ok' },
          { label: 'API Integration', fillClass: 'done-blue', width: 100, isNew: true, badgeText: '✅', badgeClass: 'ok' },
          { label: 'SEO Audit Report', fillClass: 'done-green', width: 100, isNew: false, badgeText: '✅', badgeClass: 'ok' }
        ]},
        { title: '📋 In Queue', dotColor: '#f59e0b', items: [
          { label: 'Dashboard UI', fillClass: 'done-purple', width: 55, isNew: true, badgeText: 'WIP', badgeClass: 'wip' },
          { label: 'Email Templates', fillClass: 'done-blue', width: 30, isNew: false, badgeText: 'WIP', badgeClass: 'wip' },
          { label: 'Mobile App Screens', fillClass: 'none', width: 6, isNew: false, badgeText: '🔲', badgeClass: 'no' }
        ]}
      ],
      chips: [
        { text: 'Client A: Happy', theme: 'g' }, { text: 'Figma', theme: 'p' },
        { text: 'React', theme: 'b' }, { text: '5★ Review', theme: 'o' },
        { text: 'On Schedule', theme: 'g' }, { text: 'Repeat Client', theme: 'p' }
      ],
      chipsLabel: '📌 Highlights',
      quote: '"Deliver value first. Revenue follows." ✨'
    },
    'creative': {
      name: 'Creative Portfolio', emoji: '🎨',
      desc: 'Design projects, tools learned, and inspiration',
      themePreset: 'grape-soda',
      header: { weekText: 'Creative Log', dateText: "", title: 'Design Week Recap 🎨', subtitle: '<b>UI/UX</b> · Illustration · Branding' },
      stats: [
        { label: 'Designs', value: '6', sub: 'completed', theme: 'pink' },
        { label: 'Clients', value: '3', sub: 'active', theme: 'purple' },
        { label: 'Dribbble', value: '142', sub: 'likes', theme: 'red' },
        { label: 'Tools', value: '4', sub: 'mastered', theme: 'cyan' }
      ],
      panels: [
        { title: '🎨 Projects', dotColor: '#d946ef', items: [
          { label: 'App Redesign', fillClass: 'done-green', width: 100, isNew: false, badgeText: '✅', badgeClass: 'ok' },
          { label: 'Brand Identity', fillClass: 'done-purple', width: 100, isNew: true, badgeText: '✅', badgeClass: 'ok' },
          { label: 'Icon Set (40 icons)', fillClass: 'done-pink', width: 85, isNew: true, badgeText: 'WIP', badgeClass: 'wip' },
          { label: 'Motion Graphics', fillClass: 'done-blue', width: 40, isNew: false, badgeText: 'WIP', badgeClass: 'wip' }
        ]},
        { title: '🛠️ Tools Explored', dotColor: '#8b5cf6', items: [
          { label: 'Figma', fillClass: 'done-green', width: 100, isNew: false, badgeText: '✅', badgeClass: 'ok' },
          { label: 'After Effects', fillClass: 'done-purple', width: 70, isNew: true, badgeText: 'WIP', badgeClass: 'wip' },
          { label: 'Blender', fillClass: 'done-blue', width: 35, isNew: true, badgeText: 'WIP', badgeClass: 'wip' },
          { label: 'Procreate', fillClass: 'done-green', width: 90, isNew: false, badgeText: '✅', badgeClass: 'ok' }
        ]}
      ],
      chips: [
        { text: 'Typography', theme: 'k' }, { text: 'Color Theory', theme: 'p' },
        { text: 'Responsive Design', theme: 'b' }, { text: 'User Research', theme: 'g' },
        { text: 'Prototyping', theme: 'p' }, { text: 'Design Systems', theme: 'c' }
      ],
      chipsLabel: '✨ Skills Sharpened',
      quote: '"Design is not just what it looks like, design is how it works." — Steve Jobs 🎨'
    }
  };

  /* ═══════════════════════════════════════════════════
     DEFAULT DATA STATE
     ═══════════════════════════════════════════════════ */
  const defaultData = {
    profile: {
      name: "DevrajCharan",
      avatar: "DC",
      handle: "github.com/DevrajCharan1208",
      email: "",
      linkedin: "linkedin.com/in/devrajcharan",
      twitter: "",
      website: ""
    },
    profileBadges: [
      { icon: "🚀", label: "Builder" },
      { icon: "🧠", label: "Learner" }
    ],
    header: {
      weekText: "Progress Update",
      dateText: "",
      title: "Building in Public 🚀",
      subtitle: "B.Tech CSE (AI & ML)"
    },
    stats: [
      { label: "Projects", value: "3", sub: "completed", theme: "blue" },
      { label: "Hours", value: "120+", sub: "invested", theme: "green" },
      { label: "Skills", value: "8", sub: "learned", theme: "java" },
      { label: "Streak", value: "30", sub: "days", theme: "pink" }
    ],
    panels: [
      {
        title: "📚 Learning Path",
        dotColor: "#3b82f6",
        items: [
          { label: "Fundamentals", fillClass: "done-green", width: 100, isNew: false, badgeText: "✅", badgeClass: "ok" },
          { label: "Core Concepts", fillClass: "done-green", width: 100, isNew: false, badgeText: "✅", badgeClass: "ok" },
          { label: "Advanced Topics", fillClass: "done-purple", width: 65, isNew: true, badgeText: "WIP", badgeClass: "wip" },
          { label: "Projects", fillClass: "done-blue", width: 40, isNew: false, badgeText: "WIP", badgeClass: "wip" },
          { label: "Mastery", fillClass: "none", width: 6, isNew: false, badgeText: "🔲", badgeClass: "no" }
        ]
      },
      {
        title: "💻 Projects",
        dotColor: "#22c55e",
        items: [
          { label: "Project Alpha", fillClass: "done-green", width: 100, isNew: false, badgeText: "✅", badgeClass: "ok" },
          { label: "Project Beta", fillClass: "done-green", width: 100, isNew: false, badgeText: "✅", badgeClass: "ok" },
          { label: "Project Gamma", fillClass: "done-purple", width: 75, isNew: true, badgeText: "WIP", badgeClass: "wip" },
          { label: "Open Source", fillClass: "none", width: 6, isNew: false, badgeText: "🔲", badgeClass: "no" }
        ]
      }
    ],
    chips: [
      { text: "Problem Solving", theme: "p" },
      { text: "Web Development", theme: "b" },
      { text: "Data Structures", theme: "p" },
      { text: "Version Control", theme: "g" },
      { text: "API Design", theme: "b" },
      { text: "Consistency", theme: "o" }
    ],
    chipsLabel: "Skills & Achievements",
    quote: '"1% better every day = 37 times better in a year." 🔥',
    theme: {
      preset: 'midnight-purple',
      bg: '#060a12',
      accent: '#a855f7',
      accentLight: '#c084fc',
      orb1: 'rgba(168,85,247,0.10)',
      orb2: 'rgba(59,130,246,0.08)',
      orb3: 'rgba(34,197,94,0.05)',
      t1: '#f1f5f9',
      t2: '#94a3b8',
      t3: '#475569'
    }
  };