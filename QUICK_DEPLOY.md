# ⚡ Quick Deploy Checklist - AgriVision

Follow these steps to deploy your app in **under 20 minutes**!

## 🎯 Recommended: Vercel (Frontend) + Render (Backend)

### ✅ Prerequisites Checklist

- [ ] GitHub account created
- [ ] Git installed locally
- [ ] Perplexity API key obtained
- [ ] Code pushed to GitHub repository
- [ ] Model file tracked with Git LFS

---

## 📦 Step 1: Prepare Repository (5 mins)

### 1.1 Check if Git is initialized
```bash
cd d:\Dev\AIML\AgriVision-AI-Powered-Plant-Disease-Detection-System
git status
```

### 1.2 Setup Git LFS for model files (IMPORTANT!)
```bash
# Install Git LFS (one-time setup)
git lfs install

# Track model files
git lfs track "*.pth"
git lfs track "*.h5"

# Add gitattributes
git add .gitattributes

# Verify tracking
git lfs ls-files
```

### 1.3 Add and commit all files
```bash
# Add all files
git add .

# Commit
git commit -m "Ready for deployment with all config files"

# Check if remote exists
git remote -v
```

### 1.4 Create GitHub Repository (if not exists)
1. Go to: https://github.com/new
2. Repository name: `AgriVision-AI-Powered-Plant-Disease-Detection-System`
3. Keep it **PUBLIC** (easier for free deployments)
4. Click "Create repository"
5. Copy the remote URL

### 1.5 Push to GitHub
```bash
# Add remote (replace with your username)
git remote add origin https://github.com/YOUR_USERNAME/AgriVision-AI-Powered-Plant-Disease-Detection-System.git

# Push
git branch -M main
git push -u origin main
```

---

## 🚀 Step 2: Deploy Backend to Render (7 mins)

### 2.1 Sign up for Render
1. Go to: https://render.com
2. Click "Get Started" or "Sign In"
3. Choose "Sign in with GitHub"
4. Authorize Render

### 2.2 Create Web Service
1. Click "New +" button (top right)
2. Select "Web Service"
3. Choose "Connect a repository"
4. Find and select your `AgriVision-AI-Powered-Plant-Disease-Detection-System` repo
5. Click "Connect"

### 2.3 Configure Service
Fill in these settings:

**Basic Settings:**
- **Name**: `agrivision-backend`
- **Region**: Oregon (US West) or closest to you
- **Branch**: `main`
- **Root Directory**: `backend`

**Build & Deploy:**
- **Runtime**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn api.main:app --host 0.0.0.0 --port $PORT`

**Plan:**
- **Instance Type**: `Free`

### 2.4 Add Environment Variables
Click "Advanced" → Add Environment Variable:

| Key | Value |
|-----|-------|
| `PERPLEXITY_API_KEY` | Your Perplexity API key |
| `PYTHON_VERSION` | `3.11.0` |

### 2.5 Deploy
1. Click "Create Web Service"
2. ⏳ Wait 5-10 minutes for deployment
3. You'll see build logs in real-time
4. Once deployed, you'll get a URL like: `https://agrivision-backend.onrender.com`

### 2.6 Test Backend
Click on the URL and add `/health`:
```
https://agrivision-backend.onrender.com/health
```

You should see:
```json
{"status":"healthy","timestamp":"..."}
```

✅ **Copy your backend URL** - you'll need it for frontend!

---

## 🎨 Step 3: Deploy Frontend to Vercel (5 mins)

### 3.1 Sign up for Vercel
1. Go to: https://vercel.com
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel

### 3.2 Import Project
1. Click "Add New..." → "Project"
2. Find your `AgriVision-AI-Powered-Plant-Disease-Detection-System` repo
3. Click "Import"

### 3.3 Configure Project
**Framework Preset:** Next.js (auto-detected)

**Build Settings:**
- **Root Directory**: `frontend` (⚠️ IMPORTANT!)
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `.next` (auto-filled)
- **Install Command**: `npm install` (auto-filled)

### 3.4 Add Environment Variable
Click "Environment Variables" section:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_API_URL` | `https://agrivision-backend.onrender.com` |

⚠️ Replace with YOUR backend URL from Step 2.6

### 3.5 Deploy
1. Click "Deploy"
2. ⏳ Wait 2-3 minutes
3. You'll get a URL like: `https://agrivision-xyz.vercel.app`

### 3.6 Test Frontend
1. Click the deployment URL
2. Navigate to "Detect Disease" page
3. Try uploading a plant image
4. ✅ Check if prediction works!

---

## 🔧 Step 4: Update CORS Settings (2 mins)

Your frontend needs permission to access the backend.

### 4.1 Update backend CORS
Open `backend/api/main.py` locally and update CORS:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://agrivision-xyz.vercel.app",  # ⚠️ Replace with YOUR Vercel URL
        "https://*.vercel.app",  # Allows all Vercel preview deployments
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 4.2 Push changes
```bash
git add backend/api/main.py
git commit -m "Update CORS for production"
git push
```

Render will **auto-deploy** the update in ~3 minutes! ✨

---

## 🎉 Step 5: Verify Deployment

### Test all features:
- ✅ Homepage loads
- ✅ Upload image → Get prediction
- ✅ Camera capture works
- ✅ Chatbot responds
- ✅ Language switching (English ↔️ Hindi)

---

## 🌐 Optional: Custom Domain (5 mins)

### Vercel (Frontend)
1. Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Render (Backend)
1. Settings → Custom Domain
2. Add subdomain (e.g., `api.yoursite.com`)
3. Update DNS records

---

## 📊 Monitoring Your App

### Render Dashboard
- View logs: Click "Logs" tab
- Check health: Click "Health" tab
- See usage: Click "Metrics"

### Vercel Dashboard
- View deployments: Click project → "Deployments"
- Check analytics: "Analytics" tab
- Monitor performance: "Speed Insights"

---

## 🐛 Common Issues & Fixes

### ❌ Backend Error: "Model file not found"
**Fix:** Ensure model is pushed with Git LFS
```bash
git lfs ls-files
# Should show: ml-training/models/best_model_pytorch.pth
```

### ❌ Frontend Error: "Network Error"
**Fix:** Check CORS settings and backend URL in Vercel environment variables

### ❌ "Perplexity API error"
**Fix:** Verify API key is correct in Render environment variables

### ❌ Render "Service Unavailable"
**Fix:** Free tier spins down after 15 mins inactivity. First request takes 30-60s.

---

## 💰 Cost Breakdown

| Service | Free Tier | Usage |
|---------|-----------|-------|
| **Vercel** | 100GB bandwidth/mo | Frontend hosting |
| **Render** | 750hrs/mo (sleeps after 15min) | Backend API |
| **Total** | **$0/month** | ✅ Completely free! |

### To avoid sleep (optional):
- Upgrade Render to $7/month for always-on backend
- Use UptimeRobot to ping every 5 mins (keeps it awake on free tier)

---

## 🎯 Next Steps After Deployment

1. ✅ Share your app on LinkedIn
2. ✅ Add live demo link to resume
3. ✅ Update GitHub README with deployment URL
4. ✅ Get feedback from friends/farmers
5. ✅ Monitor usage and errors

---

## 🆘 Need Help?

**Render Support:**
- Docs: https://render.com/docs
- Community: https://community.render.com

**Vercel Support:**
- Docs: https://vercel.com/docs
- Community: https://github.com/vercel/next.js/discussions

**Or check:** `DEPLOYMENT_GUIDE.md` for detailed troubleshooting

---

**🚀 Ready to deploy? Let's go!**

Start with **Step 1** above ⬆️
