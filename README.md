<div align="center">

# 🖼️ Digital Image Format Guide

**An interactive, accessibility-first educational website that breaks down how PNG, JPG, and SVG actually store image data — and when to use each one.**

Built for the *Pengantar Multimedia* practicum at Institut Teknologi PLN.

[![Status](https://img.shields.io/badge/status-completed-2E7D32?style=for-the-badge)](#)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![Accessible](https://img.shields.io/badge/a11y-WCAG--aware-8A2BE2?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-Educational-lightgrey?style=for-the-badge)](#-license)

[Overview](#-overview) •
[Features](#-features) •
[Format Deep Dive](#-format-deep-dive) •
[Architecture](#-architecture--how-it-works) •
[Project Structure](#-project-structure) •
[Getting Started](#-getting-started) •
[Accessibility](#-accessibility) •
[Author](#-author)

</div>

---

## 📖 Overview

Most students learn that "PNG is for graphics and JPG is for photos" without ever seeing *why*. **Digital Image Format Guide** is a four-page micro-site that treats each format as a specimen: what algorithm compresses it, what it costs you, and what it's actually good for.

The site is a magazine-style editorial layout — not a slide deck — built with plain HTML, CSS custom properties, and vanilla JavaScript. No frameworks, no build step: clone it and open `index.html`.

| Page | Format | Category | Release |
|---|---|---|---|
| `png.html` | **PNG** — Portable Network Graphics | Raster · Lossless | 03/1996 |
| `jpg.html` | **JPG** — Joint Photographic Experts Group | Raster · Lossy | 09/1992 |
| `svg.html` | **SVG** — Scalable Vector Graphics | Vector · XML-based | 09/2001 |

---

## ✨ Features

- **Editorial specimen layout** — each format page reads like a spec sheet: a `.page-hero` header with format tag and release date, a two-column `.spec-sheet` pairing prose explanation with a quick-reference attribute table (compression type, transparency support, best-use case, generation loss behavior).
- **Reveal-on-demand image viewer** — sample images stay hidden behind a checkerboard transparency backdrop until the visitor clicks **"Tampilkan Gambar"**, which toggles a `.revealed` class and flips the button to **"Sembunyikan Gambar."** This turns a static example into a small interaction instead of a wall of images.
- **JS-driven active navigation state** — `script.js` reads `window.location.pathname` on load and sets `aria-current="page"` on the matching nav link automatically, so the navbar never falls out of sync with the current page.
- **Home page comparison grid** — three format cards on `index.html` each carry a hand-built CSS/SVG motif: a raster pixel grid for PNG, a DCT-style gradient block for JPG, and a Bézier curve with anchor-point nodes for SVG — visually reinforcing *raster vs. vector* before the visitor even clicks through.
- **Fully responsive** — grid layouts collapse from 3 columns to 1 at `800px`, and nav/spacing tighten further at `480px` for mobile.
- **Zero dependencies** — no npm install, no bundler, no CDN calls. Pure HTML/CSS/JS.

---

## 🔬 Format Deep Dive

### 🟢 PNG — Portable Network Graphics
Lossless compression via **DEFLATE** (LZ77 dictionary matching + Huffman coding) — every pixel survives the round trip intact. Supports a full 8-bit alpha channel for genuine transparency. The lossless guarantee is exactly why PNG owns sharp-edge content: logos, icons, UI screenshots, flat-color illustrations. The trade-off is file size on photographic, gradient-heavy content, where lossless encoding can't compete with lossy compression.

### 🔵 JPG — Joint Photographic Experts Group
Lossy compression built on the **Discrete Cosine Transform (DCT)**: pixel blocks are converted into the frequency domain, then high-frequency components — the ones human vision is least sensitive to — are rounded off during quantization. This is *intentional, irreversible* data loss, which is precisely why JPG excels at photographs and complex gradients but degrades sharp edges and text into visible block artifacts, especially under repeated re-saves (generation loss). No alpha channel.

### 🟣 SVG — Scalable Vector Graphics
Not pixels at all — an XML document describing geometry: paths, Bézier curves, circles, polygons, anchor coordinates, and fill/stroke attributes. Because it's math rather than a pixel grid, SVG is resolution-independent by definition: one file scales from a 16px favicon to a building-sized banner without blur. Being DOM-based, it's also the only one of the three that's natively stylable and animatable via CSS or JavaScript.

<details>
<summary><strong>Quick comparison table</strong></summary>

| Attribute | PNG | JPG | SVG |
|---|---|---|---|
| Data model | Raster (pixels) | Raster (pixels) | Vector (XML/math) |
| Compression | Lossless (DEFLATE) | Lossy (DCT + quantization) | N/A — structural markup |
| Transparency | Yes, 8-bit alpha | No | Yes, native |
| Re-save degradation | None | Cumulative (generation loss) | None |
| Best for | Logos, icons, screenshots, text | Photos, complex gradients | Logos, icons, scalable illustrations |
| Editable via CSS/JS | No | No | Yes (DOM-based) |

</details>

---

## 🏗️ Architecture & How It Works

```
User clicks "Tampilkan Gambar"
        │
        ▼
toggleBtn "click" listener fires (script.js)
        │
        ▼
frame.classList.toggle("revealed")
        │
        ├─▶ revealed = true  → img display:block, placeholder hidden,
        │                       button label → "Sembunyikan Gambar",
        │                       aria-pressed="true"
        │
        └─▶ revealed = false → reverts to placeholder state,
                                 aria-pressed="false"
```

Every page shares one `css/style.css` and one `js/script.js`, so the whole site's visual language — the paper/ink color system, the monospace "spec label" typography, the red accent (`--red-primary`) — is driven by a single set of CSS custom properties defined once in `:root`. Change a token there and it propagates across all four pages.

---

## 📂 Project Structure

```
digital-image-format-guide/
│
├── css/
│   └── style.css          # Design tokens, layout, responsive rules
│
├── images/
│   ├── sample.png          # RGBA, transparent badge illustration
│   ├── sample.jpg          # RGB photo-style gradient sample
│   └── sample.svg          # Vector logo sample
│
├── js/
│   └── script.js           # Reveal/hide toggle + active-nav detection
│
├── index.html               # Home — format comparison grid
├── png.html                  # PNG specimen page
├── jpg.html                   # JPG specimen page
├── svg.html                    # SVG specimen page
└── README.md
```

---

## 🚀 Getting Started

No build tools, no dependencies, no installation. This is intentional — the whole point is that anyone can inspect the source directly in the browser's DevTools.

```bash
# Clone the repository
git clone https://github.com/ariprimm/digital-image-format-guide.git

# Move into the project folder
cd digital-image-format-guide

# Open it — any of these works:
open index.html            # macOS
start index.html            # Windows
xdg-open index.html          # Linux
```

Or serve it locally if you prefer (useful for testing relative paths exactly as they'll behave on GitHub Pages):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

### 🌐 Deploying to GitHub Pages
1. Go to **Settings → Pages** in this repository.
2. Under **Source**, select the `main` branch and `/ (root)` folder.
3. Save — GitHub will publish the site at `https://ariprimm.github.io/digital-image-format-guide/`.

---

## ♿ Accessibility

Accessibility wasn't bolted on afterward — it's built into the markup:

- A `.skip-link` lets keyboard users jump straight to `#konten-utama`, bypassing the header on every page.
- The navbar uses `aria-current="page"`, kept accurate automatically by `script.js` rather than hardcoded per page.
- The image toggle button exposes its state via `aria-pressed` and links to its target via `aria-controls="viewerFrame"`, so screen readers announce the reveal/hide state correctly.
- Custom `:focus-visible` outlines ensure keyboard focus is never invisible, even where default browser outlines were overridden.
- All illustrative motifs (the pixel-grid and Bézier-node graphics) are marked `aria-hidden="true"` since they're decorative, not informative — screen readers skip them instead of announcing meaningless SVG paths.

---

## 🎯 Learning Objectives

Working through this project reinforces:
- The structural difference between **raster** (pixel-grid) and **vector** (geometry-described) image data
- Why **lossy** and **lossless** compression exist as a deliberate trade-off, not a quality hierarchy
- How **DCT-based** compression (JPG) and **dictionary-based** compression (PNG's DEFLATE) actually work under the hood
- Practical format selection: matching a format's technical properties to a real use case
- Building accessible, responsive, dependency-free front-end interfaces

---

## 👨‍💻 Author

**Arif Prima Rahadian**
Information Systems Student — Institut Teknologi PLN
NIM 202432107

GitHub: [@ariprimm](https://github.com/ariprimm)

---

## 📄 License

Created for educational purposes as part of a university practicum. Feel free to explore, fork, and adapt it for your own learning.

<div align="center">

⭐ **If this helped you understand image formats a little better, consider starring the repo.**

</div>
