# ✦ ProgressCard Studio

**Create stunning, customizable progress cards** for LinkedIn, GitHub, and social media — right in your browser.

No sign-up. No frameworks. No build step. Just open `index.html` and start creating.

---

![Built With](https://img.shields.io/badge/Built%20With-HTML%20%2F%20CSS%20%2F%20JS-blueviolet?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![No Dependencies](https://img.shields.io/badge/Dependencies-Zero*-orange?style=flat-square)

*\*Only uses html2canvas via CDN for image export*

---

## What Is This?

ProgressCard Studio is a browser-based tool that lets you design beautiful progress cards — the kind you see on LinkedIn posts like *"Week 5 of learning DSA"* or *"Sprint 4 complete."*

Instead of spending hours in Figma or Canva, you fill in your details, pick a theme, and download a pixel-perfect PNG in seconds.

**Use it for:**
- 📚 Weekly/monthly learning updates
- 💻 Developer sprint summaries
- 🎯 Goal tracking and habit streaks
- 🏋️ Fitness journey logs
- 📊 Freelancer client reports
- 🎨 Creative portfolio recaps

---

## Features

- **🎨 8 Color Themes** — Midnight Purple, Ocean Blue, Forest Green, Rose Gold, Ember, Cosmos, Arctic, Grape Soda — plus full custom color control
- **📋 6 Pre-built Templates** — Pick a starting point if you're unsure where to begin
- **📊 Flexible Stats** — Add 2–5 stat boxes with 10 color options each
- **📈 Progress Panels** — 1–3 draggable progress panels with detailed item tracking
- **🏷️ Concept Chips** — Tag your skills, achievements, and milestones in 7 colors
- **💬 Motivational Quote** — Add your favorite quote with bold formatting
- **👤 Social Links** — GitHub, LinkedIn, Email, Twitter/X, and Website — shown as clean footer icons
- **📋 One-click Copy** — Copy the card image directly to your clipboard
- **🖼️ PNG Download** — High-res (2.5x scale) export with correct background rendering
- **📄 HTML Export** — Get a standalone HTML file with your card and custom theme baked in
- **💾 Auto-save** — Your work persists in localStorage across sessions
- **📱 Responsive** — Works on desktop, tablet, and mobile

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/DevrajCharan1208/ProgressCardStudio.git

# Open in your browser
# Just double-click index.html, or:
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux
```

That's it. No `npm install`, no build step, no server needed.

---

## How to Use

1. **Open `index.html`** in any modern browser
2. **Fill in your details** in the editor sidebar (left panel)
3. **Switch tabs** to edit Stats, Progress Lists, Content (chips/quote), and Theme
4. **Pick a template** if you want a pre-made starting point (click 📋 Templates)
5. **Customize colors** in the Theme tab — try the preset themes or go fully custom
6. **Export your card**:
   - 📋 **Copy to Clipboard** → paste directly into LinkedIn/Discord/Slack
   - 🖼️ **Download PNG** → save a high-res image file
   - 📄 **Export HTML** → get a standalone web page

---

## Tech Stack

| What | How |
|------|-----|
| Structure | HTML5 |
| Styling | Vanilla CSS (CSS custom properties for theming) |
| Logic | Vanilla JavaScript (no frameworks) |
| Image Export | [html2canvas](https://html2canvas.hertzen.com/) via CDN |
| Fonts | [Inter](https://fonts.google.com/specimen/Inter) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts |

**Why single-file?** Simplicity. Anyone can download and use it. No build tools, no node_modules, no config files. The entire app lives in one `index.html` — which also makes it trivially easy to host on GitHub Pages.

---

## Deploy on GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to **"Deploy from a branch"** → select `main` / `root`
4. Your site will be live at `https://yourusername.github.io/ProgressCardStudio/`

---

## Contributing

Found a bug? Want to add a feature? PRs are welcome.

1. Fork the repo
2. Create a branch (`git checkout -b feature/cool-thing`)
3. Make your changes
4. Submit a Pull Request

---

## License

MIT License — see [LICENSE](./LICENSE) for details.

---

Built by [DevrajCharan](https://github.com/DevrajCharan1208) 🚀
