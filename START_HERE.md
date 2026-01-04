# 🎯 YOUR NEXT 3 STEPS TO DEPLOY

## ✅ Step 1: Push to GitHub (RIGHT NOW - 1 minute)

Run this command in your terminal:

```bash
git push
```

This will upload all your deployment files to GitHub.

---

## 🚀 Step 2: Deploy Backend on Render (10 minutes)

### 2.1 Go to Render
Open: **https://render.com**

### 2.2 Sign in with GitHub
Click: **"Sign in with GitHub"** → Authorize Render

### 2.3 Create New Web Service
1. Click: **"New +"** (top right corner)
2. Select: **"Web Service"**
3. Click: **"Connect a repository"**
4. Find: **"AgriVision-AI-Powered-Plant-Disease-Detection-System"**
5. Click: **"Connect"**

### 2.4 Fill in these EXACT settings:

| Field | Value |
|-------|-------|
| **Name** | `agrivision-backend` |
| **Region** | `Oregon (US West)` |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn api.main:app --host 0.0.0.0 --port $PORT` |
| **Plan** | `Free` |

### 2.5 Add Environment Variable
Scroll down → Click **"Advanced"** → Click **"Add Environment Variable"**

| Key | Value |
|-----|-------|
| `PERPLEXITY_API_KEY` | Your API key from Perplexity |

### 2.6 Deploy!
Click: **"Create Web Service"**

Wait 5-10 minutes. You'll see build logs.

### 2.7 Get Your Backend URL
Once deployed, you'll see: `https://agrivision-backend-XXXX.onrender.com`

**📋 COPY THIS URL** - you need it for the next step!

---

## 🌐 Step 3: Deploy Frontend on Vercel (5 minutes)

### 3.1 Go to Vercel
Open: **https://vercel.com**

### 3.2 Sign in with GitHub
Click: **"Continue with GitHub"** → Authorize Vercel

### 3.3 Import Project
1. Click: **"Add New..."** → **"Project"**
2. Find: **"AgriVision-AI-Powered-Plant-Disease-Detection-System"**
3. Click: **"Import"**

### 3.4 Configure Settings

**Framework Preset:** Next.js ✅ (auto-detected)

**Root Directory:**
- Click: **"Edit"** next to Root Directory
- Type: `frontend`
- This is CRITICAL! ⚠️

**Environment Variables:**
Click **"Environment Variables"** section:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_API_URL` | Paste your Render backend URL |

Example: `https://agrivision-backend-abc123.onrender.com`

### 3.5 Deploy!
Click: **"Deploy"**

Wait 2-3 minutes.

### 3.6 Your App is LIVE! 🎉
You'll get: `https://agrivision-xyz.vercel.app`

**Click the link to test your app!**

---

## 🔧 Step 4: Fix CORS (2 minutes)

Your frontend needs permission to talk to the backend.

### 4.1 Update CORS in backend code

Open: `backend/api/main.py`

Find the CORS section and update it to include your Vercel URL:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://YOUR-VERCEL-URL.vercel.app",  # Replace with YOUR actual URL
        "https://*.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 4.2 Push the update

```bash
git add backend/api/main.py
git commit -m "Update CORS for production"
git push
```

Render will auto-deploy in ~3 minutes!

---

## ✅ Test Your Deployed App

1. **Open your Vercel URL** (e.g., `https://agrivision-xyz.vercel.app`)
2. **Click "Detect Disease"**
3. **Upload a plant leaf image**
4. **Check if prediction works!** ✨

### If it doesn't work:
- Wait 1-2 minutes (backend might be starting)
- Check Render logs for errors
- Verify environment variables are set correctly

---

## 📊 Monitoring (Optional)

### Check Backend Status:
Go to: `https://your-backend-url.onrender.com/health`

Should show: `{"status":"healthy","timestamp":"..."}`

### View Backend Logs:
Render Dashboard → Your Service → "Logs" tab

### View Frontend Deployments:
Vercel Dashboard → Your Project → "Deployments" tab

---

## 🎉 DONE! What's Next?

✅ Share on LinkedIn:
```
🚀 Excited to share my latest project!

Built AgriVision - an AI-powered plant disease detection system 
that helps farmers identify diseases with 96% accuracy.

Tech: PyTorch, FastAPI, Next.js, EfficientNet

Try it: [your-vercel-url]
Code: [your-github-url]

#AI #MachineLearning #Agriculture #WebDevelopment
```

✅ Update Your Resume:
```
AgriVision - AI Plant Disease Detection System
• Deployed production ML app serving 96% accurate predictions
• Tech: PyTorch, FastAPI, Next.js, Vercel, Render
• Live: [your-url]
```

✅ Update GitHub README:
Add at the top:
```markdown
## 🌐 Live Demo
**Frontend:** https://your-app.vercel.app
**Backend API:** https://your-backend.onrender.com
```

---

## 🆘 Need Help?

Common issues and solutions in: `DEPLOYMENT_GUIDE.md`

Or message me! Good luck! 🚀
