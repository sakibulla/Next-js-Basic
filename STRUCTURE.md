# Complete Project Structure

```
scic-12-next-js/
│
├── .git/                          # Git repository
├── .next/                         # Next.js build output (auto-generated)
├── node_modules/                  # Dependencies (auto-generated)
│
├── public/                        # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── server/                        # Backend Express.js API
│   └── index.js                   # Express server with REST API endpoints
│
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── layout.jsx             # Root layout with metadata
│   │   ├── page.jsx               # Landing page (7 sections)
│   │   ├── globals.css            # Global styles
│   │   ├── favicon.ico            # Site favicon
│   │   │
│   │   ├── login/                 # Login route
│   │   │   └── page.jsx           # Login page with mock auth
│   │   │
│   │   ├── items/                 # Items routes
│   │   │   ├── page.jsx           # Items list page (public)
│   │   │   └── [id]/              # Dynamic route for item details
│   │   │       └── page.jsx       # Item details page (public)
│   │   │
│   │   └── add-item/              # Protected route
│   │       └── page.jsx           # Add item form (requires auth)
│   │
│   ├── components/                # Reusable React components
│   │   ├── Navbar.jsx             # Navigation bar
│   │   └── Footer.jsx             # Footer component
│   │
│   └── lib/                       # Utility functions
│       └── dbConnect.js           # Database connection (existing)
│
├── .gitignore                     # Git ignore rules
├── eslint.config.mjs              # ESLint configuration
├── jsconfig.json                  # JavaScript configuration
├── middleware.js                  # Next.js middleware for route protection
├── next.config.mjs                # Next.js configuration
├── package.json                   # Dependencies and scripts
├── package-lock.json              # Locked dependency versions
├── postcss.config.mjs             # PostCSS configuration
├── README.md                      # Project documentation
├── QUICKSTART.md                  # Quick start guide
└── STRUCTURE.md                   # This file
```

## File Descriptions

### Root Configuration Files

- **middleware.js**: Protects `/add-item` route, redirects unauthenticated users to `/login`
- **next.config.mjs**: Next.js config with image domains for Unsplash
- **package.json**: Dependencies (Express, React Hot Toast, CORS, etc.) and npm scripts
- **eslint.config.mjs**: ESLint rules for code quality
- **jsconfig.json**: JavaScript path aliases and compiler options
- **postcss.config.mjs**: PostCSS configuration for Tailwind CSS

### Backend (server/)

- **server/index.js**: Express.js REST API
  - GET /items - Fetch all items
  - GET /items/:id - Fetch single item
  - POST /items - Add new item
  - In-memory data storage
  - CORS enabled

### Frontend (src/app/)

#### Pages

1. **page.jsx** (Landing Page)
   - Hero section
   - Features section (3 cards)
   - Categories section (4 categories)
   - Stats section (4 stats)
   - Testimonials section (3 reviews)
   - Newsletter section
   - CTA section
   - Total: 7 sections + Navbar + Footer

2. **login/page.jsx** (Authentication)
   - Email/password form
   - Mock authentication (admin@example.com / 123456)
   - Sets cookie on success
   - Redirects to /items
   - Error handling

3. **items/page.jsx** (Items List)
   - Fetches items from Express API
   - Displays item cards (grid layout)
   - Shows: image, name, description, price
   - "View Details" button for each item
   - Loading and error states
   - Public access

4. **items/[id]/page.jsx** (Item Details)
   - Dynamic route with item ID
   - Fetches single item from API
   - Large image display
   - Full product details
   - Additional info cards
   - Back button
   - Public access

5. **add-item/page.jsx** (Add Item - Protected)
   - Protected by middleware
   - Form fields: name, description, price, image URL
   - POST to Express API
   - Toast notification on success
   - Redirects to /items
   - Logout button
   - Requires authentication

#### Components

- **Navbar.jsx**: Navigation with Home, Items, Login links
- **Footer.jsx**: Footer with 3 columns (About, Quick Links, Contact)

#### Layout

- **layout.jsx**: Root layout with metadata and font configuration
- **globals.css**: Global Tailwind CSS styles

## Routes Overview

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page with 7 sections |
| `/login` | Public | Mock authentication page |
| `/items` | Public | List all items from API |
| `/items/[id]` | Public | View single item details |
| `/add-item` | Protected | Add new item (requires login) |

## Authentication Flow

1. User visits `/login`
2. Enters credentials (admin@example.com / 123456)
3. Cookie `isAuthenticated=true` is set
4. Redirected to `/items`
5. Can now access `/add-item`
6. Middleware checks cookie on protected routes
7. Logout clears cookie

## API Data Flow

```
Frontend (Next.js)  <-->  Backend (Express.js)
     :3000                      :5000

1. GET /items          →  Returns all items
2. GET /items/:id      →  Returns single item
3. POST /items         →  Adds new item
```

## Tech Stack Summary

- **Frontend Framework**: Next.js 16.1.1 (App Router)
- **UI Library**: React 19.2.3
- **Language**: JSX (no TypeScript)
- **Styling**: Tailwind CSS 4, DaisyUI
- **Backend**: Express.js 4.21.2
- **HTTP Client**: Fetch API
- **Notifications**: React Hot Toast
- **Authentication**: Cookie-based (mock)
- **Middleware**: Next.js middleware.js
- **Image Optimization**: Next.js Image component

## Development Scripts

```bash
npm run dev        # Start Next.js dev server (port 3000)
npm run server     # Start Express backend (port 5000)
npm run dev:all    # Start both servers concurrently
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Key Features

✅ 7-section landing page
✅ Cookie-based authentication
✅ Protected routes with middleware
✅ REST API with Express.js
✅ CRUD operations (Create, Read)
✅ Toast notifications
✅ Responsive design
✅ Loading states
✅ Error handling
✅ Image optimization
✅ Clean code structure
✅ JSX only (no TypeScript)
