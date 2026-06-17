# AGENTS.md — kanzi-fi-kahf-1.41

React 18 + TypeScript SPA (Vite 5 SWC). Arabic-language Quran study companion for Surah Al-Kahf. Supabase backend, Tailwind CSS, shadcn/ui.

## Quick commands

```bash
npm run dev        # dev server → http://localhost:8080
npm run build      # production build (code-split → chunks under 500 KB)
npm run lint       # ESLint flat config
```

## Architecture

- **Entry point**: `src/main.tsx` → `<App />` (providers stack)
- **Routes** in `src/App.tsx`: 10 routes via React Router DOM v6. All pages except `/` are `React.lazy()` with a spinner `Suspense` fallback.
- **Theme**: custom `ThemeProvider` (`src/hooks/useTheme.tsx`), supports `dark` / `light` / `blush`, default is `dark`, key is `kahf-theme` in localStorage. NOT next-themes despite README.
- **Auth**: `AuthProvider` (context) + `ProtectedRoute` wrapper. Uses Supabase email/password auth. Admin routes: `/admin/login`, `/admin/dashboard`.
- **Data layer**: `@tanstack/react-query` for server state. Supabase client at `src/integrations/supabase/client.ts` — credentials are **hardcoded** (no `.env` file needed).
- **Build**: Vite `manualChunks` split vendor libs → `vendor`, `supabase`, `motion`, `query`, `icons` chunks.
- **Types**: `tsconfig.json` has `strictNullChecks: false`, `noImplicitAny: false`. Not fully strict.

## RTL & Arabic conventions

- `index.html`: `<html lang="ar" dir="rtl">`
- Arabic font stack: `Amiri`, `Lateef`, `Scheherazade New` (serif). Loaded from Google Fonts in `index.html`.
- Navbar labels, page content, and UI text are all in Arabic.
- `space-x-reverse` utility used for correct RTL spacing in flex layouts.

## Directory layout

```
src/
├── pages/          # 10 page components, one per route
├── components/
│   ├── ui/         # 25+ shadcn/ui wrappers (Radix primitives)
│   ├── auth/       # AuthProvider, LoginForm, ProtectedRoute
│   └── admin/      # AdminDashboard, DuaasAdminDashboard, ImportExportTools
├── hooks/          # useTheme, use-toast, use-mobile
├── data/           # ayahs.ts (110 ayahs), tafsir.ts (Tafsir As-Sa'di)
├── integrations/
│   └── supabase/   # client.ts + types.ts
└── lib/utils.ts    # cn() utility (clsx + tailwind-merge)
```

## Notable quirks

- **No test runner, no CI, no pre-commit hooks.** `build` is the only verification step.
- **No .env file.** Supabase URL and anon key are embedded in `src/integrations/supabase/client.ts`.
- **shadcn/ui components** are checked in (not dynamically generated). Modify them directly.
- **lovable-tagger** plugin runs in dev mode only (`src/vite.config.ts:14`).
- **Graphify knowledge graph** available at `graphify-out/graph.html` (open in browser) for exploring codebase relationships.
