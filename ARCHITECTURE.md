# Application Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js Application                      │
│                      (Port 3000)                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP Requests
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Express.js Backend                         │
│                      (Port 5000)                             │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              In-Memory Data Store                     │  │
│  │  [Item1, Item2, Item3, Item4, ...]                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    Navbar Component                     │ │
│  │         [Home] [Items] [Login]                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    Page Content                         │ │
│  │                                                         │ │
│  │  Routes:                                               │ │
│  │  • / (Landing - 7 sections)                           │ │
│  │  • /login (Authentication)                            │ │
│  │  • /items (List all items)                            │ │
│  │  • /items/[id] (Item details)                         │ │
│  │  • /add-item (Add new item - Protected)              │ │
│  │                                                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    Footer Component                     │ │
│  │         [About] [Links] [Contact]                      │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  Browser Cookies                        │ │
│  │         isAuthenticated: true/false                    │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Request Flow

### 1. Landing Page Flow
```
User → http://localhost:3000/
  ↓
Next.js Router
  ↓
src/app/page.jsx
  ↓
Renders:
  • Navbar
  • 7 Sections (Hero, Features, Categories, Stats, Testimonials, Newsletter, CTA)
  • Footer
```

### 2. Login Flow
```
User → /login
  ↓
src/app/login/page.jsx
  ↓
User enters credentials
  ↓
Check: email === "admin@example.com" && password === "123456"
  ↓
  ├─ Valid → Set cookie: isAuthenticated=true
  │          Redirect to /items
  │
  └─ Invalid → Show error message
               Stay on /login
```

### 3. Items List Flow
```
User → /items
  ↓
src/app/items/page.jsx
  ↓
useEffect() triggers
  ↓
fetch('http://localhost:5000/items')
  ↓
Express API: GET /items
  ↓
Returns: { success: true, data: [...items] }
  ↓
Update state: setItems(data.data)
  ↓
Render item cards with:
  • Image
  • Name
  • Description
  • Price
  • "View Details" button
```

### 4. Item Details Flow
```
User clicks "View Details" on item
  ↓
Navigate to /items/[id]
  ↓
src/app/items/[id]/page.jsx
  ↓
Extract ID from params
  ↓
fetch(`http://localhost:5000/items/${id}`)
  ↓
Express API: GET /items/:id
  ↓
Returns: { success: true, data: {...item} }
  ↓
Render full item details
```

### 5. Protected Route Flow
```
User → /add-item
  ↓
middleware.js intercepts
  ↓
Check cookie: isAuthenticated
  ↓
  ├─ true → Allow access to /add-item
  │         src/app/add-item/page.jsx renders
  │
  └─ false → Redirect to /login
```

### 6. Add Item Flow
```
User fills form on /add-item
  ↓
Submit form
  ↓
fetch('http://localhost:5000/items', {
  method: 'POST',
  body: JSON.stringify(formData)
})
  ↓
Express API: POST /items
  ↓
Validate data
  ↓
Add to in-memory array
  ↓
Returns: { success: true, data: newItem }
  ↓
Show toast notification
  ↓
Redirect to /items
```

## Component Hierarchy

```
App
├── Navbar
│   ├── Logo (Link to /)
│   └── Nav Links
│       ├── Home (/)
│       ├── Items (/items)
│       └── Login (/login)
│
├── Page Content (Dynamic based on route)
│   │
│   ├── / (Landing Page)
│   │   ├── Hero Section
│   │   ├── Features Section
│   │   ├── Categories Section
│   │   ├── Stats Section
│   │   ├── Testimonials Section
│   │   ├── Newsletter Section
│   │   └── CTA Section
│   │
│   ├── /login
│   │   ├── Login Form
│   │   │   ├── Email Input
│   │   │   ├── Password Input
│   │   │   └── Submit Button
│   │   └── Demo Credentials Box
│   │
│   ├── /items
│   │   ├── Header
│   │   │   ├── Title
│   │   │   └── "Add New Item" Button
│   │   └── Items Grid
│   │       └── Item Card (repeated)
│   │           ├── Image
│   │           ├── Name
│   │           ├── Description
│   │           ├── Price
│   │           └── "View Details" Button
│   │
│   ├── /items/[id]
│   │   ├── Back Button
│   │   ├── Item Details
│   │   │   ├── Large Image
│   │   │   ├── Name
│   │   │   ├── Price
│   │   │   ├── Description
│   │   │   ├── Product Details
│   │   │   └── Action Buttons
│   │   └── Info Cards
│   │       ├── Free Shipping
│   │       ├── Easy Returns
│   │       └── Secure Payment
│   │
│   └── /add-item (Protected)
│       ├── Header
│       │   ├── Title
│       │   └── Logout Button
│       └── Add Item Form
│           ├── Name Input
│           ├── Description Textarea
│           ├── Price Input
│           ├── Image URL Input
│           ├── Submit Button
│           └── Cancel Button
│
└── Footer
    ├── About Column
    ├── Quick Links Column
    ├── Contact Column
    └── Copyright
```

## Data Flow

### State Management
```
Component State (useState)
  ↓
User Interaction
  ↓
Event Handler
  ↓
API Call (fetch)
  ↓
Update State
  ↓
Re-render Component
```

### Example: Items List
```
ItemsPage Component
  │
  ├─ State: items = []
  ├─ State: loading = true
  └─ State: error = ''
      │
      ├─ useEffect()
      │   └─ fetchItems()
      │       └─ fetch('/items')
      │           └─ setItems(data)
      │               └─ setLoading(false)
      │
      └─ Render
          ├─ if loading → Show spinner
          ├─ if error → Show error
          └─ else → Show items grid
```

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Authentication State                      │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
         Not Authenticated      Authenticated
                │                       │
                ▼                       ▼
        ┌──────────────┐        ┌──────────────┐
        │   /login     │        │  Cookie Set  │
        │              │        │              │
        │ Enter Creds │        │ Can access:  │
        │              │        │ • /add-item  │
        └──────────────┘        │ • All pages  │
                │               └──────────────┘
                │                       │
                ▼                       │
        Valid credentials?              │
                │                       │
        ┌───────┴────────┐             │
        │                │             │
       Yes              No             │
        │                │             │
        ▼                ▼             │
   Set Cookie      Show Error         │
        │                              │
        └──────────────────────────────┘
                    │
                    ▼
            Redirect to /items
```

## Middleware Protection

```
Request to /add-item
        │
        ▼
middleware.js
        │
        ├─ Extract cookie: isAuthenticated
        │
        ├─ Check value
        │
        ┌─┴─────────────────┐
        │                   │
    true                false
        │                   │
        ▼                   ▼
  Allow access      Redirect to /login
        │
        ▼
src/app/add-item/page.jsx
```

## API Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Express.js Server                          │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   Middleware                            │ │
│  │  • cors()                                              │ │
│  │  • express.json()                                      │ │
│  └────────────────────────────────────────────────────────┘ │
│                            │                                 │
│                            ▼                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   Routes                                │ │
│  │                                                         │ │
│  │  GET  /items      → getAllItems()                      │ │
│  │  GET  /items/:id  → getItemById()                      │ │
│  │  POST /items      → createItem()                       │ │
│  │                                                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                            │                                 │
│                            ▼                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                Data Store                               │ │
│  │                                                         │ │
│  │  let items = [                                         │ │
│  │    { id, name, description, price, image },           │ │
│  │    ...                                                 │ │
│  │  ]                                                     │ │
│  │                                                         │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## File System Architecture

```
Project Root
│
├── Configuration Layer
│   ├── middleware.js (Route protection)
│   ├── next.config.mjs (Next.js config)
│   ├── package.json (Dependencies)
│   └── eslint.config.mjs (Linting)
│
├── Backend Layer
│   └── server/
│       └── index.js (Express API)
│
├── Frontend Layer
│   └── src/
│       ├── app/ (Pages - App Router)
│       │   ├── layout.jsx (Root layout)
│       │   ├── page.jsx (Landing)
│       │   ├── login/page.jsx
│       │   ├── items/page.jsx
│       │   ├── items/[id]/page.jsx
│       │   └── add-item/page.jsx
│       │
│       └── components/ (Reusable)
│           ├── Navbar.jsx
│           └── Footer.jsx
│
└── Documentation Layer
    ├── README.md
    ├── QUICKSTART.md
    ├── STRUCTURE.md
    ├── TESTING.md
    ├── SUMMARY.md
    └── ARCHITECTURE.md (This file)
```

## Technology Stack Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                        │
│                  React 19 Components                         │
│                  Tailwind CSS Styling                        │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                   Application Layer                          │
│                  Next.js 16 App Router                       │
│                  Client/Server Components                    │
│                  Middleware Protection                       │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                      API Layer                               │
│                   Express.js REST API                        │
│                   CORS Middleware                            │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                     Data Layer                               │
│                  In-Memory Array Store                       │
│              (Can be replaced with DB)                       │
└─────────────────────────────────────────────────────────────┘
```

## Deployment Architecture

```
Development Environment:
┌──────────────────────────────────────────────────────────┐
│  Terminal 1: npm run dev (Next.js :3000)                 │
│  Terminal 2: npm run server (Express :5000)              │
└──────────────────────────────────────────────────────────┘

Production Environment:
┌──────────────────────────────────────────────────────────┐
│  Frontend: Vercel/Netlify (Next.js)                      │
│  Backend: Heroku/Railway/Render (Express)                │
│  Database: MongoDB Atlas (if added)                      │
└──────────────────────────────────────────────────────────┘
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Layers                           │
│                                                              │
│  1. Middleware Protection                                   │
│     └─ Checks authentication cookie                         │
│                                                              │
│  2. Cookie-Based Auth                                       │
│     └─ HttpOnly cookies (can be enhanced)                   │
│                                                              │
│  3. CORS Configuration                                      │
│     └─ Allows frontend origin                               │
│                                                              │
│  4. Input Validation                                        │
│     └─ Form validation on client & server                   │
│                                                              │
│  5. HTTPS (Production)                                      │
│     └─ Encrypted communication                              │
└─────────────────────────────────────────────────────────────┘
```

## Performance Optimization

```
┌─────────────────────────────────────────────────────────────┐
│                  Performance Features                        │
│                                                              │
│  • Next.js Image Optimization                               │
│  • React 19 Compiler                                        │
│  • Code Splitting (App Router)                              │
│  • Static Asset Caching                                     │
│  • Lazy Loading Components                                  │
│  • Optimized Tailwind CSS                                   │
└─────────────────────────────────────────────────────────────┘
```

---

This architecture provides a solid foundation for a full-stack Next.js application with clear separation of concerns, scalability, and maintainability.
