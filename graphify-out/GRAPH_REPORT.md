# Graph Report - .  (2026-06-18)

## Corpus Check
- Corpus is ~27,456 words - fits in a single context window. You may not need a graph.

## Summary
- 297 nodes · 307 edges · 40 communities detected
- Extraction: 86% EXTRACTED · 14% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_shadcnui Component Library|shadcn/ui Component Library]]
- [[_COMMUNITY_App Core & Features|App Core & Features]]
- [[_COMMUNITY_Admin & Data Operations|Admin & Data Operations]]
- [[_COMMUNITY_Page Routing|Page Routing]]
- [[_COMMUNITY_Auth & Theme System|Auth & Theme System]]
- [[_COMMUNITY_Reflections & Utilities|Reflections & Utilities]]
- [[_COMMUNITY_Carousel Component|Carousel Component]]
- [[_COMMUNITY_Toast Notification System|Toast Notification System]]
- [[_COMMUNITY_Admin UI Components|Admin UI Components]]
- [[_COMMUNITY_Database & Migrations|Database & Migrations]]
- [[_COMMUNITY_Form Component System|Form Component System]]
- [[_COMMUNITY_Alert Dialog Components|Alert Dialog Components]]
- [[_COMMUNITY_Sidebar System|Sidebar System]]
- [[_COMMUNITY_Command & Dialog|Command & Dialog]]
- [[_COMMUNITY_Sidebar Provider & State|Sidebar Provider & State]]
- [[_COMMUNITY_Database Admin Schema|Database Admin Schema]]
- [[_COMMUNITY_Sparkles Component|Sparkles Component]]
- [[_COMMUNITY_Toggle Components|Toggle Components]]
- [[_COMMUNITY_Calendar Component|Calendar Component]]
- [[_COMMUNITY_Chart Component|Chart Component]]
- [[_COMMUNITY_useIsMobile Hook|useIsMobile Hook]]
- [[_COMMUNITY_ESLint Config (alias)|ESLint Config (alias)]]
- [[_COMMUNITY_Sidebar Menu Skeleton|Sidebar Menu Skeleton]]
- [[_COMMUNITY_Form Provider|Form Provider]]
- [[_COMMUNITY_Pagination (standalone)|Pagination (standalone)]]
- [[_COMMUNITY_Table Component|Table Component]]
- [[_COMMUNITY_Collapsible (standalone)|Collapsible (standalone)]]
- [[_COMMUNITY_Select Component|Select Component]]
- [[_COMMUNITY_Separator Component|Separator Component]]
- [[_COMMUNITY_Popover Component|Popover Component]]
- [[_COMMUNITY_Dialog Component|Dialog Component]]
- [[_COMMUNITY_NavigationMenu Component|NavigationMenu Component]]
- [[_COMMUNITY_Textarea Component|Textarea Component]]
- [[_COMMUNITY_HoverCard Component|HoverCard Component]]
- [[_COMMUNITY_Sonner Toaster|Sonner Toaster]]
- [[_COMMUNITY_Tooltip Component|Tooltip Component]]
- [[_COMMUNITY_Resizable Panels|Resizable Panels]]
- [[_COMMUNITY_Skeleton Component|Skeleton Component]]
- [[_COMMUNITY_cn Utility|cn Utility]]
- [[_COMMUNITY_404 Page|404 Page]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 45 edges
2. `كنزي في سورة الكهف App` - 21 edges
3. `كنزي في الكهف — Kanzi fi Kahf` - 13 edges
4. `toast()` - 11 edges
5. `Navbar` - 11 edges
6. `useToast()` - 10 edges
7. `useAuth()` - 10 edges
8. `ReflectionForm` - 7 edges
9. `Tailwind CSS Configuration` - 6 edges
10. `useFormField` - 6 edges

## Surprising Connections (you probably didn't know these)
- `كنزي في الكهف — Kanzi fi Kahf` --conceptually_related_to--> `غيمات الهدى (Quran study group)`  [INFERRED]
  README.md → src/pages/AboutPage.tsx
- `placeholder.svg (generic icon)` --conceptually_related_to--> `كنزي في الكهف — Kanzi fi Kahf`  [INFERRED]
  public/placeholder.svg → README.md
- `Index (Landing) Page` --references--> `Duaa Board Feature`  [INFERRED]
  src/pages/Index.tsx → README.md
- `Vite Build Configuration` --references--> `Lazy Loading Pattern`  [INFERRED]
  vite.config.ts → src/App.tsx
- `Vite Build Configuration` --references--> `PostCSS Configuration`  [INFERRED]
  vite.config.ts → postcss.config.js

## Hyperedges (group relationships)
- **App Rendering Pipeline** — kanzifi_app, kanzifi_routing_architecture, kanzifi_lazy_loading_pattern, kanzifi_theme_system, kanzifi_auth_system, kanzifi_components_Navbar, kanzifi_components_JumuahBanner, kanzifi_components_Sparkles, kanzifi_shadcn_ui [EXTRACTED 1.00]
- **Reflection Submission Pipeline** — kanzifi_components_ReflectionForm, kanzifi_surat_al_kahf_data, kanzifi_supabase_integration, kanzifi_data_reflections_table, kanzifi_data_participants_table, kanzifi_hooks_useToast, kanzifi_framer_motion [EXTRACTED 1.00]
- **Reflection Gallery Pipeline** — kanzifi_components_ReflectionGallery, kanzifi_supabase_integration, kanzifi_data_reflections_table, kanzifi_data_participants_table, kanzifi_rtl_support [EXTRACTED 1.00]
- **Build Toolchain** — kanzifi_vite_build, kanzifi_tailwind_config, kanzifi_postcss_config, kanzifi_eslint_config, kanzifi_vite_manual_chunks [EXTRACTED 1.00]
- **Sidebar Context + Cookie + Keyboard Shortcut System** — sidebar_SidebarProvider, sidebar_Sidebar, sidebar_useSidebar, sidebar_cookie_state, sidebar_keyboard_shortcut, sidebar_useIsMobile [EXTRACTED 1.00]
- **Carousel Embla Integration System** — carousel_Carousel, carousel_useCarousel, carousel_embla_lifecycle, carousel_keyboard_nav, carousel_CarouselContent, carousel_CarouselItem, carousel_CarouselPrevious, carousel_CarouselNext [EXTRACTED 1.00]
- **Form React Hook Form Integration** — form_FormField, form_useFormField, form_FormLabel, form_FormControl, form_FormMessage, form_FormDescription, form_FormItem, form_FormProvider [EXTRACTED 1.00]
- **Toast Toaster Rendering Pipeline** — toaster_Toaster, toast_ToastProvider, toast_Toast, toast_ToastClose, toast_ToastTitle, toast_ToastDescription, toast_ToastViewport [EXTRACTED 1.00]
- **Components Using cva Variant System from Button** — shadcn_cva_pattern, alert-dialog_AlertDialogAction, alert-dialog_AlertDialogCancel, pagination_PaginationLink [INFERRED 0.75]
- **Authentication System** — auth_provider, auth_protected_route, auth_login_form [EXTRACTED 1.00]
- **Admin Dashboard System** — admin_dashboard, admin_duaas_dashboard, auth_provider [EXTRACTED 1.00]
- **shadcn/ui Primitive Components (Radix-based)** — ui_collapsible, ui_select, ui_separator, ui_popover, ui_dialog, ui_nav_menu, ui_hover_card, ui_tooltip, ui_toggle, ui_toggle_group [INFERRED 0.90]
- **Admin Route Guard Pattern** — auth_protected_route, admin_dashboard, auth_provider [INFERRED 0.85]
- **Database Schema (tables + function)** — participants_table, reflections_table, admin_users_table, duaas_table, is_admin_function [EXTRACTED 1.00]
- **Application Features** — verse_reflection_feature, reflection_gallery_feature, duaa_board_feature, tafsir_page_feature, stats_dashboard_feature, admin_panel_feature, dark_mode_feature [EXTRACTED 1.00]
- **Database Migration Chain** — migration_create_tables, migration_fix_security, migration_add_admin, migration_add_admin_v2 [EXTRACTED 1.00]
- **Admin Authentication Flow** — admin_login_page, admin_page, admin_dashboard_page, admin_users_table, is_admin_function [INFERRED 0.80]
- **Reflection Data Flow (Submit → Store → Browse → Stats)** — submit_page, reflections_table, gallery_page, stats_page, import_export_tools_component [INFERRED 0.85]

## Communities (61 total, 25 thin omitted)

### Community 1 - "App Core & Features"
Cohesion: 0.07
Nodes (32): كنزي في سورة الكهف App, Arabic Font Support (Amiri/Lateef/Scheherazade), Authentication System, JumuahBanner, Navbar, ReflectionForm, ReflectionGallery, SparklesBackground (+24 more)

### Community 2 - "Admin & Data Operations"
Cohesion: 0.11
Nodes (16): exportToJSON(), exportToPDF(), fetchReflections(), handleDelete(), handleLogout(), handleToggleFeatured(), ImportExportTools(), ReflectionForm() (+8 more)

### Community 3 - "Page Routing"
Cohesion: 0.11
Nodes (24): AboutPage, AdminDashboardPage, AdminLoginPage, AdminPage, Admin Panel Feature, Dark Mode Feature, Duaa Board Feature, DuaaPage (+16 more)

### Community 4 - "Auth & Theme System"
Cohesion: 0.11
Nodes (8): useAuth(), ProtectedRoute(), JumuahBanner(), ThemeProvider(), useTheme(), AdminLoginPage(), AdminPage(), Toaster()

### Community 6 - "Carousel Component"
Cohesion: 0.25
Nodes (8): Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, Carousel Embla Lifecycle (on/off reInit+select), Carousel Keyboard Navigation (ArrowLeft/Right), useCarousel

### Community 7 - "Toast Notification System"
Cohesion: 0.25
Nodes (8): Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, Toaster, useToast Re-export Bridge

### Community 8 - "Admin UI Components"
Cohesion: 0.5
Nodes (8): AdminDashboard Component, DuaasAdminDashboard Component, LoginForm Component, ProtectedRoute Component, AuthProvider & useAuth Hook, Button Component, Label Component, Tabs Component Family

### Community 9 - "Database & Migrations"
Cohesion: 0.32
Nodes (8): ImportExportTools component, Migration: create participants & reflections, Migration: fix function security, participants DB table, reflections DB table, Statistics Dashboard Feature, StatsPage, Supabase client instance

### Community 10 - "Form Component System"
Cohesion: 0.29
Nodes (7): FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField

### Community 12 - "Alert Dialog Components"
Cohesion: 0.33
Nodes (6): AlertDialogAction, AlertDialogCancel, PaginationLink, PaginationNext, PaginationPrevious, shadcn/ui cva Variant Pattern

### Community 13 - "Sidebar System"
Cohesion: 0.4
Nodes (5): SheetContent, Sidebar, SidebarMenuButton, SidebarTrigger, useSidebar

### Community 14 - "Command & Dialog"
Cohesion: 0.4
Nodes (5): Command, CommandDialog, Dialog, DialogContent, Sheet

### Community 15 - "Sidebar Provider & State"
Cohesion: 0.67
Nodes (4): SidebarProvider, Sidebar Cookie State Persistence, Sidebar Keyboard Shortcut (Ctrl+B), useIsMobile

### Community 16 - "Database Admin Schema"
Cohesion: 0.83
Nodes (4): admin_users DB table, is_admin() DB function, Migration: add admin_users & is_featured, Migration: admin_users refinements

### Community 18 - "Toggle Components"
Cohesion: 0.67
Nodes (3): toggleVariants CVA Definition, Toggle Component, ToggleGroup Component Family

## Knowledge Gaps
- **68 isolated node(s):** `Toast Notification System`, `React Router Architecture`, `Tafsir As-Sa'di Data`, `useIsMobile Hook`, `ESLint Configuration` (+63 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `shadcn/ui Component Library` to `Admin & Data Operations`, `Pagination Components`, `Reflections & Utilities`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `Badge()` connect `Admin & Data Operations` to `Reflections & Utilities`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Why does `useAuth()` connect `Auth & Theme System` to `Admin & Data Operations`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `كنزي في سورة الكهف App` (e.g. with `Supabase Backend Integration` and `Animated Sparkle Background`) actually correct?**
  _`كنزي في سورة الكهف App` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `كنزي في الكهف — Kanzi fi Kahf` (e.g. with `غيمات الهدى (Quran study group)` and `placeholder.svg (generic icon)`) actually correct?**
  _`كنزي في الكهف — Kanzi fi Kahf` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 7 inferred relationships involving `toast()` (e.g. with `fetchReflections()` and `handleToggleFeatured()`) actually correct?**
  _`toast()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Toast Notification System`, `React Router Architecture`, `Tafsir As-Sa'di Data` to the rest of the system?**
  _68 weakly-connected nodes found - possible documentation gaps or missing edges._