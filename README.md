# 📖 Kanzi fi Kahf - كنزي في الكهف

A modern web application built with React, TypeScript, and Supabase, featuring a comprehensive UI component library powered by shadcn/ui and Radix UI.

## ✨ Features

- 🎨 **Modern UI Components** - Built with shadcn/ui and Radix UI primitives
- 🔐 **Backend Integration** - Powered by Supabase for authentication and data management
- 🎭 **Smooth Animations** - Framer Motion for fluid user interactions
- 📱 **Responsive Design** - Tailwind CSS for mobile-first responsive layouts
- 🌙 **Theme Support** - Dark mode and custom theming with next-themes
- 📊 **Data Visualization** - Charts and graphs using Recharts
- 📄 **PDF Export** - Generate PDFs with jsPDF and html2canvas
- 🔍 **Form Validation** - React Hook Form with Zod schema validation

## 🚀 Tech Stack

### Core
- **React 18.3** - Modern UI library
- **TypeScript 5.5** - Type-safe development
- **Vite 5.4** - Fast build tool and dev server

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library

### Backend & Data
- **Supabase** - Backend as a Service (BaaS)
- **TanStack Query** - Data fetching and caching
- **React Router DOM** - Client-side routing

### Form & Validation
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun runtime
- npm, yarn, or bun package manager

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

Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Start development server**
```bash
npm run dev
# or
bun run dev
```

The app will be available at `http://localhost:5173`

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📁 Project Structure

```
kanzi-fi-kahf-1.41/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── data/            # Data files and constants
│   ├── integrations/    # Third-party integrations (Supabase)
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── public/              # Static assets
├── supabase/            # Supabase configuration
└── index.html           # HTML template
```

## 🎨 UI Components

This project includes a comprehensive set of pre-built components:

- **Layout**: Accordion, Tabs, Collapsible, Resizable Panels
- **Navigation**: Menu Bar, Navigation Menu, Dropdown Menu
- **Forms**: Input, Select, Checkbox, Radio Group, Switch, Slider
- **Feedback**: Toast, Alert Dialog, Progress, Tooltip
- **Data Display**: Avatar, Card, Separator, Scroll Area
- **Overlays**: Dialog, Popover, Hover Card, Context Menu

## 🔧 Configuration Files

- **vite.config.ts** - Vite configuration
- **tailwind.config.ts** - Tailwind CSS customization
- **tsconfig.json** - TypeScript compiler options
- **components.json** - shadcn/ui components configuration
- **eslint.config.js** - ESLint rules

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed for public use.

## 🔗 Links

- **Lovable Project**: [https://lovable.dev/projects/03e35563-ed8f-4e30-835d-3d1d789b455a](https://lovable.dev/projects/03e35563-ed8f-4e30-835d-3d1d789b455a)
- **Repository**: [https://github.com/bmo1177/kanzi-fi-kahf-1.41](https://github.com/bmo1177/kanzi-fi-kahf-1.41)

---

Built with ❤️ using [Lovable](https://lovable.dev)
```
