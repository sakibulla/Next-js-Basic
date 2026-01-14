# Authentication Redirect Flow

## Overview
The application now implements a smart redirect flow that remembers where users were trying to go before being asked to log in.

## How It Works

### Scenario 1: User Tries to Access Protected Route Without Login

```
1. User clicks "Add Item" link (or navigates to /add-item)
   ↓
2. Middleware checks authentication cookie
   ↓
3. Cookie not found → User is NOT authenticated
   ↓
4. Middleware redirects to: /login?returnUrl=/add-item
   ↓
5. User sees login page
   ↓
6. User enters credentials and logs in
   ↓
7. Login page reads returnUrl from query params
   ↓
8. After successful login, redirects to: /add-item
   ↓
9. User lands on the page they originally wanted!
```

### Scenario 2: User Logs In Directly

```
1. User clicks "Login" link
   ↓
2. User navigates to: /login (no returnUrl)
   ↓
3. User enters credentials and logs in
   ↓
4. No returnUrl found, defaults to: /items
   ↓
5. User lands on items page
```

## Implementation Details

### 1. Middleware (middleware.js)
```javascript
// When user tries to access protected route without auth
if (!isAuthenticated) {
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('returnUrl', request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}
```

**What it does:**
- Checks if user is authenticated
- If not, creates login URL with `returnUrl` query parameter
- Redirects to login page with the original destination saved

### 2. Login Page (src/app/login/page.jsx)
```javascript
// Read returnUrl from query params
const returnUrl = searchParams.get('returnUrl') || '/items';

// After successful login
router.push(returnUrl);
```

**What it does:**
- Reads `returnUrl` from URL query parameters
- Falls back to `/items` if no returnUrl is provided
- Redirects to the appropriate page after login

## Examples

### Example 1: Protected Route Access
```
User Action: Navigate to /add-item (not logged in)
URL Flow:    /add-item → /login?returnUrl=/add-item → /add-item
Result:      User ends up on /add-item after login
```

### Example 2: Direct Login
```
User Action: Click "Login" link
URL Flow:    /login → /items
Result:      User ends up on /items after login
```

### Example 3: Multiple Protected Routes
```
User Action: Try to access /add-item, then /profile (future route)
URL Flow:    /add-item → /login?returnUrl=/add-item → /add-item
Result:      Each protected route preserves its own return URL
```

## Benefits

1. **Better UX**: Users don't lose their place when asked to log in
2. **Intuitive Flow**: Users land where they intended to go
3. **Flexible**: Works with any protected route
4. **Secure**: Middleware enforces authentication before access

## Testing the Flow

### Test 1: Protected Route Redirect
1. Make sure you're logged out (clear cookies)
2. Click "Add Item" in navbar (or navigate to /add-item)
3. You should be redirected to login page
4. Check URL: should be `/login?returnUrl=/add-item`
5. Log in with: admin@example.com / 123456
6. You should land on `/add-item` page

### Test 2: Direct Login
1. Make sure you're logged out
2. Click "Login" in navbar
3. Check URL: should be `/login` (no returnUrl)
4. Log in with credentials
5. You should land on `/items` page

### Test 3: Already Logged In
1. Make sure you're logged in
2. Click "Add Item" in navbar
3. You should go directly to `/add-item` (no redirect to login)

## Code Changes Summary

### Files Modified:
1. **middleware.js**
   - Added `returnUrl` query parameter to login redirect
   
2. **src/app/login/page.jsx**
   - Added `useSearchParams` hook
   - Read `returnUrl` from query params
   - Redirect to `returnUrl` after successful login

### No Breaking Changes:
- Existing login flow still works
- Default redirect to `/items` is preserved
- All other functionality remains the same

## Future Enhancements

Potential improvements:
- Store return URL in session storage for persistence
- Support deep linking with query parameters
- Add return URL validation to prevent open redirects
- Show message like "Please log in to continue"

---

**Status**: ✅ Implemented and Working
**Version**: 1.0
**Last Updated**: January 14, 2026
