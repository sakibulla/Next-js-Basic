# Testing Checklist

## Prerequisites
- [ ] Both servers running (Next.js on :3000, Express on :5000)
- [ ] Browser with cookies enabled
- [ ] Browser console open for debugging

## 1. Landing Page Tests (/)

### Navigation
- [ ] Visit http://localhost:3000
- [ ] Verify Navbar appears with ShopHub logo
- [ ] Verify links: Home, Items, Login
- [ ] Click each nav link and verify navigation works

### Sections (Must have exactly 7)
- [ ] **Section 1**: Hero section with gradient background
- [ ] **Section 2**: Features section (3 cards: Fast Delivery, Quality, Secure Payment)
- [ ] **Section 3**: Categories section (4 categories: Electronics, Fashion, Home, Sports)
- [ ] **Section 4**: Stats section (4 stats: 10K+ customers, 5K+ products, etc.)
- [ ] **Section 5**: Testimonials section (3 customer reviews)
- [ ] **Section 6**: Newsletter section (email subscription form)
- [ ] **Section 7**: CTA section (call-to-action with gradient)

### Footer
- [ ] Footer appears at bottom
- [ ] 3 columns: About, Quick Links, Contact
- [ ] Copyright notice present

### Responsive Design
- [ ] Resize browser to mobile width
- [ ] Verify layout adapts properly
- [ ] Test on tablet width
- [ ] Test on desktop width

## 2. Login Page Tests (/login)

### Page Load
- [ ] Navigate to /login
- [ ] Form displays with email and password fields
- [ ] Demo credentials box visible

### Valid Login
- [ ] Enter: admin@example.com
- [ ] Enter: 123456
- [ ] Click Login button
- [ ] Verify redirect to /items
- [ ] Check browser cookies (isAuthenticated=true)

### Invalid Login
- [ ] Enter wrong email: wrong@example.com
- [ ] Enter wrong password: wrong
- [ ] Click Login button
- [ ] Verify error message appears
- [ ] Verify stays on login page

### Form Validation
- [ ] Try submitting empty form
- [ ] Verify HTML5 validation works
- [ ] Try invalid email format

## 3. Items List Page Tests (/items)

### Page Load
- [ ] Navigate to /items
- [ ] Verify loading spinner appears briefly
- [ ] Verify items load from API

### Items Display
- [ ] Verify 4 default items display
- [ ] Each item shows: image, name, description, price
- [ ] "View Details" button on each card
- [ ] "Add New Item" button in header

### Item Cards
- [ ] Verify images load from Unsplash
- [ ] Hover over cards (shadow effect)
- [ ] Verify prices formatted correctly ($XX.XX)
- [ ] Verify descriptions truncated (line-clamp-2)

### Error Handling
- [ ] Stop Express server
- [ ] Refresh /items page
- [ ] Verify error message appears
- [ ] Restart Express server
- [ ] Refresh and verify items load

## 4. Item Details Page Tests (/items/[id])

### Valid Item
- [ ] Click "View Details" on first item
- [ ] Verify URL is /items/1
- [ ] Verify large image displays
- [ ] Verify full description shows
- [ ] Verify price displays
- [ ] Verify product details list

### Navigation
- [ ] Click "Back to Items" button
- [ ] Verify returns to /items
- [ ] Navigate to /items/2
- [ ] Verify different item loads

### Invalid Item
- [ ] Navigate to /items/999
- [ ] Verify error message appears
- [ ] Verify "Back to Items" button works

### Additional Info Cards
- [ ] Verify 3 info cards at bottom
- [ ] Free Shipping card
- [ ] Easy Returns card
- [ ] Secure Payment card

## 5. Protected Route Tests (/add-item)

### Without Authentication
- [ ] Clear browser cookies
- [ ] Navigate to /add-item directly
- [ ] Verify redirect to /login
- [ ] Verify middleware protection works

### With Authentication
- [ ] Login with valid credentials
- [ ] Navigate to /add-item
- [ ] Verify page loads successfully
- [ ] Verify form displays

### Add Item Form
- [ ] Fill in Name: "Test Product"
- [ ] Fill in Description: "This is a test product description"
- [ ] Fill in Price: 99.99
- [ ] Fill in Image URL: https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop
- [ ] Click "Add Item" button
- [ ] Verify toast notification appears
- [ ] Verify redirect to /items
- [ ] Verify new item appears in list

### Form Validation
- [ ] Try submitting empty form
- [ ] Verify all fields required
- [ ] Try negative price
- [ ] Try invalid URL format

### Logout
- [ ] Click "Logout" button on /add-item
- [ ] Verify redirect to /login
- [ ] Verify cookie cleared
- [ ] Try accessing /add-item again
- [ ] Verify redirect to /login

## 6. API Tests (Backend)

### GET /items
```bash
curl http://localhost:5000/items
```
- [ ] Returns JSON with success: true
- [ ] Returns array of items
- [ ] Each item has: id, name, description, price, image

### GET /items/:id
```bash
curl http://localhost:5000/items/1
```
- [ ] Returns single item
- [ ] Returns 404 for invalid ID

### POST /items
```bash
curl -X POST http://localhost:5000/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Test Product",
    "description": "Added via API",
    "price": 149.99,
    "image": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop"
  }'
```
- [ ] Returns success: true
- [ ] Returns created item with ID
- [ ] Item appears in GET /items
- [ ] Item appears in frontend /items page

### CORS
- [ ] Verify no CORS errors in browser console
- [ ] Verify API accessible from frontend

## 7. Middleware Tests

### Protected Routes
- [ ] Logout (clear cookies)
- [ ] Try /add-item → redirects to /login ✓
- [ ] Try /items → accessible ✓
- [ ] Try /items/1 → accessible ✓
- [ ] Try / → accessible ✓

### After Login
- [ ] Login successfully
- [ ] Try /add-item → accessible ✓
- [ ] Cookie present in browser ✓

## 8. UI/UX Tests

### Loading States
- [ ] Slow down network (DevTools)
- [ ] Verify loading spinners appear
- [ ] Verify loading text displays

### Error States
- [ ] Stop backend server
- [ ] Verify error messages display
- [ ] Verify error styling (red background)

### Toast Notifications
- [ ] Add new item
- [ ] Verify toast appears top-right
- [ ] Verify success message
- [ ] Verify auto-dismiss

### Responsive Design
- [ ] Test all pages on mobile (375px)
- [ ] Test all pages on tablet (768px)
- [ ] Test all pages on desktop (1920px)
- [ ] Verify grid layouts adapt
- [ ] Verify images scale properly

## 9. Code Quality Tests

### JSX Only (No TypeScript)
- [ ] Verify all files use .jsx extension
- [ ] No .tsx or .ts files present
- [ ] No TypeScript syntax in code

### ESLint
```bash
npm run lint
```
- [ ] No ESLint errors
- [ ] No ESLint warnings

### Console Errors
- [ ] Open browser console
- [ ] Navigate through all pages
- [ ] Verify no console errors
- [ ] Verify no console warnings

## 10. Build Tests

### Development Build
```bash
npm run dev
```
- [ ] Builds successfully
- [ ] No build errors
- [ ] Hot reload works

### Production Build
```bash
npm run build
```
- [ ] Builds successfully
- [ ] No build errors
- [ ] No warnings

### Production Start
```bash
npm run start
```
- [ ] Starts successfully
- [ ] All pages work in production mode

## Test Results Summary

| Category | Tests Passed | Tests Failed | Notes |
|----------|--------------|--------------|-------|
| Landing Page | __ / __ | __ / __ | |
| Login | __ / __ | __ / __ | |
| Items List | __ / __ | __ / __ | |
| Item Details | __ / __ | __ / __ | |
| Add Item | __ / __ | __ / __ | |
| API | __ / __ | __ / __ | |
| Middleware | __ / __ | __ / __ | |
| UI/UX | __ / __ | __ / __ | |
| Code Quality | __ / __ | __ / __ | |
| Build | __ / __ | __ / __ | |

## Known Issues
- [ ] List any issues found during testing

## Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)

## Performance
- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] No memory leaks
- [ ] Smooth animations

---

**Testing Date**: ___________
**Tested By**: ___________
**Status**: ⬜ Pass | ⬜ Fail | ⬜ Partial
