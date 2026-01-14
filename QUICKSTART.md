# Quick Start Guide

## Prerequisites
- Node.js installed (v18 or higher)
- npm or yarn package manager

## Installation & Running

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Backend Server
Open a terminal and run:
```bash
npm run server
```
Backend will run on http://localhost:5000

### Step 3: Start Next.js Development Server
Open another terminal and run:
```bash
npm run dev
```
Frontend will run on http://localhost:3000

### Alternative: Run Both Servers Together
```bash
npm run dev:all
```

## Testing the Application

### 1. Visit Landing Page
- Open http://localhost:3000
- You'll see 7 sections: Hero, Features, Categories, Stats, Testimonials, Newsletter, CTA

### 2. Browse Items
- Click "Items" in navbar or "Browse Items" button
- View all products from the API

### 3. View Item Details
- Click "View Details" on any item
- See full product information

### 4. Try Login
- Click "Login" in navbar
- Use credentials:
  - Email: admin@example.com
  - Password: 123456
- You'll be redirected to /items after successful login

### 5. Add New Item (Protected Route)
- After logging in, click "Add New Item" button on items page
- Fill out the form:
  - Name: Test Product
  - Description: This is a test product
  - Price: 99.99
  - Image URL: https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop
- Submit the form
- You'll see a success toast and be redirected to items page

### 6. Test Route Protection
- Logout from add-item page
- Try to access http://localhost:3000/add-item directly
- You'll be redirected to /login (middleware protection)

## API Endpoints

### GET /items
```bash
curl http://localhost:5000/items
```

### GET /items/:id
```bash
curl http://localhost:5000/items/1
```

### POST /items
```bash
curl -X POST http://localhost:5000/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "image": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop"
  }'
```

## Troubleshooting

### CORS Error
- Make sure backend server is running on port 5000
- Check that CORS is enabled in server/index.js

### Images Not Loading
- Check next.config.mjs has images.unsplash.com in remotePatterns
- Verify image URLs are valid

### Authentication Not Working
- Check browser cookies (should see isAuthenticated=true)
- Clear cookies and try again

### Backend Connection Error
- Ensure Express server is running: `npm run server`
- Check console for port conflicts

## Project Structure
```
├── middleware.js              # Route protection
├── server/
│   └── index.js              # Express API
├── src/
│   ├── app/
│   │   ├── page.jsx          # Landing (7 sections)
│   │   ├── login/page.jsx    # Login page
│   │   ├── items/
│   │   │   ├── page.jsx      # Items list
│   │   │   └── [id]/page.jsx # Item details
│   │   └── add-item/page.jsx # Add item (protected)
│   └── components/
│       ├── Navbar.jsx
│       └── Footer.jsx
```

## Features Checklist
- ✅ Landing page with 7 sections
- ✅ Navbar with Home, Items, Login links
- ✅ Mock authentication with cookies
- ✅ Protected /add-item route
- ✅ Items list page (public)
- ✅ Item details page (public)
- ✅ Add item form with toast notification
- ✅ Express.js REST API
- ✅ Responsive design with Tailwind CSS
- ✅ JSX only (no TypeScript)

Enjoy building with Next.js 15/16! 🚀
