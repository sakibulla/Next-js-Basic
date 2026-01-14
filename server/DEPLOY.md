# Backend Deployment Guide

## Prerequisites
- Your code pushed to GitHub
- Account on your chosen platform

---

## Option 1: Railway (Recommended - Easiest)

### Steps:
1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway will auto-detect the Express app

### Configuration:
- **Root Directory**: `/server`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Environment Variables:
Add these in Railway dashboard:
```
PORT=5000
CLIENT_URL=https://your-frontend-url.vercel.app
NODE_ENV=production
```

### Get Your URL:
- Railway provides a URL like: `https://your-app.railway.app`
- Copy this URL for frontend configuration

---

## Option 2: Render

### Steps:
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: express-backend
   - **Root Directory**: `server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Environment Variables:
Add in Render dashboard:
```
CLIENT_URL=https://your-frontend-url.vercel.app
NODE_ENV=production
```

### Get Your URL:
- Render provides a URL like: `https://your-app.onrender.com`
- Copy this URL for frontend configuration

---

## Option 3: Fly.io

### Steps:
1. Install Fly CLI:
```bash
# Windows (PowerShell)
iwr https://fly.io/install.ps1 -useb | iex
```

2. Login and launch:
```bash
cd server
fly auth login
fly launch
```

3. Follow prompts:
   - Choose app name
   - Select region
   - Don't add PostgreSQL or Redis

### Environment Variables:
```bash
fly secrets set CLIENT_URL=https://your-frontend-url.vercel.app
fly secrets set NODE_ENV=production
```

### Deploy:
```bash
fly deploy
```

---

## Option 4: Heroku

### Steps:
1. Install Heroku CLI:
```bash
# Windows
# Download from: https://devcenter.heroku.com/articles/heroku-cli
```

2. Login and create app:
```bash
cd server
heroku login
heroku create your-app-name
```

3. Deploy:
```bash
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a your-app-name
git push heroku main
```

### Environment Variables:
```bash
heroku config:set CLIENT_URL=https://your-frontend-url.vercel.app
heroku config:set NODE_ENV=production
```

---

## Testing Your Deployment

Once deployed, test your API:

```bash
# Health check
curl https://your-backend-url.com/

# Get items
curl https://your-backend-url.com/items

# Get single item
curl https://your-backend-url.com/items/1
```

---

## Next Steps

After backend is deployed:
1. Copy your backend URL
2. Update frontend environment variables
3. Deploy frontend to Vercel

---

## Troubleshooting

### CORS Issues
Make sure `CLIENT_URL` environment variable is set to your frontend URL

### Port Issues
Railway/Render automatically set PORT. Don't hardcode it.

### Build Failures
Check that `server/package.json` exists and has correct dependencies

### API Not Responding
Check logs in your platform's dashboard
