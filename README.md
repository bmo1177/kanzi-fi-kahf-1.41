# 📖 كنزي في الكهف — Kanzi fi Kahf

**My Treasure in the Cave** — An interactive Quran study companion for Surah Al-Kahf, built for a girls' Quran study group under the supervision of teacher Noor Al-Iman.

Select any verse from Surah Al-Kahf, reflect on its meaning, and share your "treasure" — the spiritual insight or lesson you discovered. Browse reflections from fellow participants, read Tafsir Al-Sa'di, post supplications, and explore statistics on group engagement.

---

## ✨ Features

- **🕌 Verse Reflection** — Choose any of the 110 ayahs of Surah Al-Kahf (or get a random one), write your reflection with a symbolic title, and submit it to the group gallery
- **🖼️ Reflection Gallery** — Browse all submitted reflections in a beautiful card grid with a featured "Treasure of the Week"
- **🤲 Duaa Board** — Post supplications and encouraging messages; new submissions require admin approval before appearing publicly
- **📜 Tafsir Al-Sa'di** — Read the full tafsir (exegesis) of Surah Al-Kahf by Imam Al-Sa'di, sourced inline
- **📊 Statistics Dashboard** — View total reflections, most-reflected verses (top 3), a word cloud from symbolic titles, and a bar chart of reflection distribution
- **🔐 Admin Panel** — Authenticate via Supabase email/password; approve/reject duaas, toggle featured items, delete content, and export reflections to JSON or beautifully formatted PDF (RTL, gold borders, Arabic calligraphy styling)
- **🌙 Dark Mode** — Elegant dark-by-default theme with Arabic RTL layout and Amiri font
- **📱 Responsive Design** — Mobile-first layout built with Tailwind CSS
- **🎨 Animations** — Framer Motion for smooth transitions and sparkle effects

---

## 🚀 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 18.3, TypeScript 5.5, Vite 5.4 (SWC) |
| **Styling** | Tailwind CSS 3.4, tailwindcss-animate |
| **UI Library** | shadcn/ui (Radix UI primitives — 25+ components) |
| **Icons** | Lucide React |
| **Animations** | Framer Motion 12 |
| **Backend** | Supabase (PostgreSQL, Auth, Row-Level Security) |
| **Data Fetching** | TanStack Query (React Query) |
| **Routing** | React Router DOM v6 |
| **Forms** | React Hook Form + Zod |
| **Charts** | Recharts |
| **PDF Export** | jsPDF + html2canvas |
| **Theme** | next-themes |
| **Other** | date-fns, embla-carousel, vaul, sonner, cmdk |

---

## 📦 Installation

### Prerequisites

- Node.js 18+ or [Bun](https://bun.sh) runtime
- npm, yarn, pnpm, or bun

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/bmo1177/kanzi-fi-kahf-1.41.git
   cd kanzi-fi-kahf-1.41
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Configure Supabase**

   Create a `.env` file in the project root:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   > 💡 The project includes a Supabase configuration directory (`supabase/`) with database migrations for the `reflections`, `participants`, and `duaas` tables. Run these migrations against your Supabase project to set up the schema.

4. **Start the development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

   The app runs at **`http://localhost:8080`** (configured in `vite.config.ts`).

---

## 🛠️ Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (port 8080) |
| `npm run build` | Build for production |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 📁 Project Structure

```
kanzi-fi-kahf-1.41/
├── src/
│   ├── components/        # Reusable UI components (shadcn/ui)
│   ├── pages/             # Page components
│   │   ├── Index.tsx      # Landing / home
│   │   ├── Submit.tsx     # Submit a reflection
│   │   ├── Gallery.tsx    # Reflection gallery
│   │   ├── Duaa.tsx       # Duaa board
│   │   ├── Tafsir.tsx     # Tafsir page
│   │   ├── Stats.tsx      # Statistics dashboard
│   │   └── admin/         # Admin panel (login, dashboard)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── data/              # Data files
│   │   ├── ayahs.ts       # All 110 ayahs of Surah Al-Kahf
│   │   └── tafsir.ts      # Tafsir Al-Sa'di content
│   ├── integrations/      # Supabase client & queries
│   ├── App.tsx            # Root component with routing & providers
│   └── main.tsx           # Application entry point
├── public/                # Static assets
├── supabase/              # Supabase config & migrations
├── index.html             # HTML entry (RTL Arabic, Amiri font)
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS customization
├── tsconfig.json          # TypeScript configuration
├── components.json        # shadcn/ui configuration
└── eslint.config.js       # ESLint rules
```

---

## 🧭 Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Index | Landing page with app overview |
| `/submit` | Submit Reflection | Select an ayah, write your reflection |
| `/gallery` | Gallery | Browse all reflections in a card grid |
| `/duaa` | Duaa Board | Read and post supplications |
| `/tafsir` | Tafsir | Read Tafsir Al-Sa'di for Surah Al-Kahf |
| `/stats` | Statistics | Group engagement insights and charts |
| `/admin/login` | Admin Login | Supabase email/password authentication |
| `/admin/dashboard` | Admin Dashboard | Moderate content and export data |

---

## 🎨 UI Components

The project includes a comprehensive set of pre-built components from shadcn/ui:

- **Layout**: Accordion, Tabs, Collapsible, Resizable panels
- **Navigation**: Menu bar, Navigation menu, Dropdown menu
- **Forms**: Input, Select, Checkbox, Radio group, Switch, Slider
- **Feedback**: Toast, Alert dialog, Progress, Tooltip, Sonner
- **Data Display**: Avatar, Card, Separator, Scroll area, Badge
- **Overlays**: Dialog, Popover, Hover card, Context menu, Drawer (vaul), Sheet
- **Utility**: Command palette (cmdk), Carousel (embla)

---

## 🔧 Configuration

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite build config (port, SWC plugin, path aliases) |
| `tailwind.config.ts` | Custom theme colors, dark mode, Amiri font |
| `tsconfig.json` | TypeScript strict mode, path aliases |
| `components.json` | shadcn/ui component registry |
| `eslint.config.js` | ESLint flat config |
| `supabase/config.toml` | Supabase project configuration |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📝 License

This project is licensed for public use.

---

## 🔗 Links

- **Repository**: [github.com/bmo1177/kanzi-fi-kahf-1.41](https://github.com/bmo1177/kanzi-fi-kahf-1.41)
- **Lovable Project**: [lovable.dev/projects/03e35563-ed8f-4e30-835d-3d1d789b455a](https://lovable.dev/projects/03e35563-ed8f-4e30-835d-3d1d789b455a)

---

<div align="center">Built with ❤️ using <a href="https://lovable.dev">Lovable</a></div>
