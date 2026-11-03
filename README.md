# Satria Divo Praditya: Engineering Portfolio

Personal portfolio website showcasing engineering projects, academic research publications, technical certifications, and an interactive pixel pet companion. Built using Vite, React 19, Tailwind CSS 4, and Motion.

## Overview

- **Minimalist Industrial Aesthetic**: Clean typography, sharp borders, high-contrast palette, and responsive design.
- **Interactive Pixel Companion (Pia)**: Custom Canvas 2D animated pixel pet with speech bubble interactions, custom actions, and a collapsible widget state.
- **Verified Credentials & Research**: Direct verification links for Credly badges and peer-reviewed conference publications.
- **Single-Page Architecture**: Fast navigation with smooth scroll anchors and decoupled component state.

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime & Bundler | Vite 6 |
| Frontend Library | React 19 |
| Styling Engine | Tailwind CSS 4 (`@tailwindcss/typography`) |
| Animations | Motion (`motion/react`) |
| Iconography | Lucide React |
| Interactive Pet | HTML5 Canvas 2D Spritesheet Engine |
| Typography | Space Grotesk, Inter, JetBrains Mono |

## Project Structure

```
├── public/
│   ├── pia/                     # Spritesheet and frame definitions for Pia
│   │   ├── pet.json             # Animation states and frame rectangles
│   │   └── spritesheet.webp     # Pixel art spritesheet
│   └── *.png                    # Project previews and diagrams
├── src/
│   ├── components/              # Modular UI components
│   │   ├── Achievements.tsx     # Publications and competition achievements
│   │   ├── Certifications.tsx   # Credly badges and professional certifications
│   │   ├── Contact.tsx          # Direct communication and social links
│   │   ├── Experience.tsx       # Professional timeline and organizational history
│   │   ├── FocusAreas.tsx       # Technical skills grouped by domain
│   │   ├── Hero.tsx             # System thesis, availability, and key metrics
│   │   ├── NavBar.tsx           # Sticky navigation header with anchor links
│   │   ├── PiaPet.tsx           # Interactive Canvas-based pixel companion
│   │   ├── Projects.tsx         # Featured engineering case studies
│   │   ├── ScrollTop.tsx        # Scroll-to-top floating button
│   │   └── Section.tsx          # Reusable section layout wrapper
│   ├── data/
│   │   └── portfolio.ts         # Portfolio data schema, credentials, and projects
│   ├── App.tsx                  # Main portfolio container
│   ├── index.css                # Design tokens and Tailwind configuration
│   └── main.tsx                 # React DOM mount point
├── package.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js (version 18 or newer recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/SatriaDivo/satriadivo-portfolio.git
cd satriadivo-portfolio

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will run locally at `http://localhost:3000`.

### Production Build

```bash
# Type check and build bundle
npm run build

# Preview production build locally
npm run preview
```

## Portfolio Sections

1. **SYS_INIT (Hero)**: Introduction, engineering focus, and core metrics.
2. **01: Selected Works (`#projects`)**: Featured engineering projects (HERA, AgriSense, E-Logbook, CocoaSense, IoTKit Studio).
3. **02: Technical Focus (`#focus`)**: Categorized technical competencies and skill proficiency.
4. **03: Experience (`#experience`)**: Professional track record and leadership roles.
5. **04: Achievements (`#achievements`)**: International conference proceedings and competition honors.
6. **05: Verified Badges (`#certifications`)**: AWS, Cisco CCNA/CCNP, MikroTik, and IBM professional credentials.
7. **06: Connect (`#contact`)**: Direct email outreach and professional social profiles.

## Interactive Pixel Companion (Pia)

The application includes an interactive pixel-art companion ("Pia") positioned in the bottom-left corner of the viewport:
- **Canvas Rendering**: Uses `imageRendering: pixelated` for crisp pixel-art scaling.
- **Animation States**: Handles idle looping, jumping, waving, and review animations driven by a JSON spritesheet.
- **Dialogue System**: Displays responsive speech bubbles on interaction and click.
- **Collapsible State**: Minimizes into a compact pill button so it does not obstruct reading on smaller screens.

## Design Tokens

- **Background (Paper)**: `#FFFFFF`
- **Surface**: `#FAFAFA`
- **Tech Node**: `#F3F4F6`
- **Ink Primary**: `#111827`
- **Ink Secondary**: `#4B5563`
- **Ink Muted**: `#9CA3AF`
- **Accent**: `#2563EB`
- **Border**: `#E5E7EB`

## Author

**Satria Divo Praditya**  
Data Scientist Intern at PT Makerindo Prima Solusi  
Undergraduate in Internet Engineering Technology, Politeknik Negeri Lampung

- **GitHub**: [github.com/satriaDivo](https://github.com/satriaDivo)
- **LinkedIn**: [linkedin.com/in/satria-divo-praditya](https://www.linkedin.com/in/satria-divo-praditya)
- **Credly**: [credly.com/users/satria-divo-praditya](https://www.credly.com/users/satria-divo-praditya/badges/credly)
- **Email**: satriadivop354@gmail.com
