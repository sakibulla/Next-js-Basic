# Next.js 15/16 Full-Stack Application

A complete full-stack e-commerce application built with Next.js 15/16 App Router, Express.js backend, and JSX (no TypeScript).

## Features

- 🏠 Landing page with 7 sections
- 🔐 Cookie-based mock authentication
- 🛡️ Protected routes with middleware
- 📦 Item listing and details pages
- ➕ Add new items (protected route)
- 🎨 Responsive UI with Tailwind CSS
- 🔔 Toast notifications
- 🚀 Express.js REST API backend

## Tech Stack

- **Frontend**: Next.js 16.1.1, React 19, JSX
- **Styling**: Tailwind CSS, DaisyUI
- **Backend**: Express.js
- **Authentication**: Cookie-based (mock)
- **Notifications**: React Hot Toast

## Project Structure

```
├── middleware.js              # Route protection middleware
├── server/
│   └── index.js              # Express.js backend API
├── src/
│   ├── app/
│   │   ├── page.jsx          # Landing page (7 sections)
│   │   ├── layout.jsx        # Root layout
│   │   ├── login/
│   │   │   └── page.jsx      # Login page
│   │   ├── items/
│   │   │   ├── page.jsx      # Items list page
│   │   │   └── [id]/
│   │   │       └── page.jsx  # Item details page
│   │   └── add-item/
│   │       └── page.jsx      # Add item page (protected)
│   └── components/
│       ├── Navbar.jsx        # Navigation component
│       └── Footer.jsx        # Footer component
└── package.json
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Backend Server

In one terminal:

```bash
npm run server
```

The Express server will start on `http://localhost:5000`

### 3. Run the Next.js Development Server

In another terminal:

```bash
npm run dev
```

The Next.js app will start on `http://localhost:3000`

### Alternative: Run Both Servers Simultaneously

```bash
npm run dev:all
```

## API Endpoints

### Backend (Express.js - Port 5000)

- `GET /items` - Get all items
- `GET /items/:id` - Get single item by ID
- `POST /items` - Add new item (requires: name, description, price, image)

## Authentication

### Mock Login Credentials

- **Email**: admin@example.com
- **Password**: 123456

### How It Works

1. Login with credentials on `/login`
2. Cookie `isAuthenticated=true` is set
3. Access protected route `/add-item`
4. Middleware checks cookie and allows/denies access

## Pages

### 1. Landing Page (/)
- Hero section
- Features section
- Categories section
- Stats section
- Testimonials section
- Newsletter section
- CTA section

### 2. Login Page (/login)
- Email and password form
- Mock authentication
- Error handling
- Redirect to /items on success

### 3. Items Page (/items)
- Displays all items from API
- Item cards with image, name, description, price
- "View Details" button
- Loading and error states

### 4. Item Details Page (/items/[id])
- Full item information
- Large image display
- Product details
- Add to cart button (UI only)
- Additional info cards

### 5. Add Item Page (/add-item) - Protected
- Form with name, description, price, image URL
- POST to Express API
- Toast notification on success
- Redirect to /items
- Logout button

## Route Protection

The `/add-item` route is protected by `middleware.js`:
- Checks for `isAuthenticated` cookie
- Redirects to `/login` if not authenticated
- Allows access if authenticated

## Styling

- Tailwind CSS for utility-first styling
- DaisyUI for additional components
- Responsive design for mobile, tablet, and desktop
- Custom color scheme with blue primary color

## Notes

- This is a demo application with mock authentication
- Data is stored in-memory on the backend (resets on server restart)
- Images are loaded from Unsplash
- No database is used (can be extended with MongoDB)

## Development Tips

1. Make sure both servers are running (Next.js and Express)
2. Backend must be on port 5000
3. Frontend must be on port 3000
4. Check browser console for any CORS issues
5. Use React DevTools for debugging

## Future Enhancements

- Real authentication with JWT
- Database integration (MongoDB)
- Image upload functionality
- Shopping cart functionality
- User profile pages
- Order management
- Payment integration

## License

MIT
