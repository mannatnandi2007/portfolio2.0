# PORTFOLIO 2.0 - 3D React + Three.js + Anime.js

An interactive 3D portfolio application built with **React**, **Three.js**, **Anime.js**, and **HTML5 Canvas**, featuring spatial 3D scroll transitions, Light Sky 3D & Dark Cosmos 3D themes, an animated running character sprite (purple kurta & white vest matching your reference photo) traversing a pipeline footer, and a **dedicated Creative Reels page**.

---

## 🚀 Quick Start: How to Run

1. Open your terminal in the project directory (`c:\Users\nandi\Desktop\portfolio2.0`).
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌟 Key Features

### 1. **Multi-Page Navigation (Separate Pages)**
- **🎮 MAIN QUEST (Portfolio)**: Hero section, Skills Inventory, Technical Projects (KinSync & Yuva Saarthi), and Direct Contact Transmitter.
- **🎬 CREATIVE REELS (Separate Page)**: Dedicated page featuring your **Collab with Bigsmile Gaming Zone** spotlight and 2 Instagram Reel embed frames.

### 2. **Interactive 3D WebGL Background (Three.js)**
- ☀️ **Light Mode (Sky 3D)**: Procedural 3D low-poly clouds, daylight sunlight, sky fog, and floating sky cubes.
- 🌙 **Dark Mode (Cosmos 3D)**: Deep starry 3D space with 1800+ twinkling stars and floating glowing neon crystals.
- 📜 **3D Scroll Reaction**: As you scroll down the page, the 3D camera pans, tilts, and shifts in 3D spatial depth.

### 3. **Animated Character Sprite Running on Pipeline**
- Character design modeled after your reference photo (purple kurta + white vest, smiling, dark hair).
- Continuous HTML5 Canvas running sprite animation along the marquee pipeline footer.
- **Action Triggers**:
  - 😉 **Wink**: Mid-run winking pose + star sparkles & confetti.
  - 👇 **Point Down**: Character points downward to encourage scrolling.
  - 📸 **Camera Snap**: Character pulls camera, clicks photo with camera shutter flash overlay and audio FX.
  - ⚡ **Crazy Combo**: Cycles through all poses dynamically.

---

## ✏️ Input Guide (Where to Edit Your Content)

All input areas are clearly marked with visual badges in the UI and `<!-- 🌟 [INPUT REQUIRED HERE] -->` comments in the codebase:

### Technical Projects (`src/pages/MainPortfolio.jsx`)
- **KinSync Deployed Live Link**: Line ~130 (`href="YOUR_KINSYNC_DEPLOYED_URL"`)
- **KinSync Description**: Line ~120
- **Yuva Saarthi Description**: Line ~155
- **Yuva Saarthi Link**: Line ~165

### Creative Reels Showcase (`src/pages/CreativeReels.jsx`)
- **Bigsmile Gaming Zone Collab Reel Embed**: Line ~28 (Paste Instagram / YouTube embed code inside `.embed-container-placeholder`)
- **Instagram Reel 1 Embed**: Line ~58
- **Instagram Reel 2 Embed**: Line ~82

### Direct Contact Links (`src/pages/MainPortfolio.jsx`)
- **LinkedIn Profile**: Line ~188 (`href="https://linkedin.com/in/YOUR_PROFILE"`)
- **Instagram Profile**: Line ~197 (`href="https://instagram.com/YOUR_HANDLE"`)
- **Email Address**: Line ~206 (`href="mailto:YOUR_EMAIL"`)
