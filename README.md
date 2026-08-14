# Charmi Padh — Portfolio

Personal portfolio site. React 19 + TypeScript + Vite 7, styled with Tailwind CSS v4
and animated with Framer Motion.

## Layout

```
.
├── README.md
├── .gitignore
└── client/                     # the web app (all app code lives here)
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── eslint.config.js
    ├── tsconfig.json           # solution file → app + node configs
    ├── tsconfig.app.json       # src/ (browser)
    ├── tsconfig.node.json      # vite.config.ts (node)
    ├── public/                 # static assets served from /
    │   ├── achievements/
    │   ├── certificates/
    │   ├── projects/
    │   └── resume/
    └── src/
        ├── main.tsx            # entry point
        ├── App.tsx             # section composition
        ├── index.css           # theme tokens + global keyframes
        ├── types.ts            # shared data-shape types
        ├── components/         # reusable UI (Navbar, Hero, Footer, backgrounds)
        └── sections/           # page sections (About, Skills, … Contact)
```

The app is a single page; navigation is anchor-based (`#about`, `#skills`, …) with an
`IntersectionObserver` driving the active nav state. There is no router.

## Getting started

All commands run from `client/`.

```bash
cd client
npm install
npm run dev
```

## Scripts

| Script              | Does                                          |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Vite dev server with HMR                      |
| `npm run build`     | `tsc -b` typecheck, then production build     |
| `npm run typecheck` | Typecheck only                                |
| `npm run lint`      | ESLint (typescript-eslint + React rules)      |
| `npm run preview`   | Serve the production build locally            |

## Content

Section content is plain typed data at the top of each section file — edit the arrays,
not the markup:

| Content         | File                             | Type              |
| --------------- | -------------------------------- | ----------------- |
| Education       | `src/sections/About.tsx`         | `JourneyItem[]`   |
| Skills          | `src/sections/Skills.tsx`        | `SkillGroup[]`    |
| Experience      | `src/sections/Experience.tsx`    | `ExperienceItem[]`|
| Projects/research | `src/sections/Projects.tsx`    | `Project[]`       |
| Achievements    | `src/sections/Achievements.tsx`  | `Achievement[]`   |

Types live in `src/types.ts`. Images referenced by these arrays are paths under
`client/public/`.
