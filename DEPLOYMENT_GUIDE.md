# 🚀 AgriVision Deployment Guide

This guide covers multiple deployment strategies for the AgriVision Plant Disease Detection System.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Deployment Options](#deployment-options)
3. [Option 1: Vercel + Render (Recommended)](#option-1-vercel--render-recommended)
4. [Option 2: Railway (All-in-One)](#option-2-railway-all-in-one)
5. [Option 3: Docker + Any Cloud Provider](#option-3-docker--any-cloud-provider)
6. [Environment Variables](#environment-variables)
7. [Post-Deployment Testing](#post-deployment-testing)
8. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

Before deploying, ensure you have:

- ✅ **GitHub Account** (for code hosting)
- ✅ **Perplexity API Key** (for AI chatbot)
- ✅ **Git installed** locally
- ✅ **Repository pushed to GitHub**
- ✅ **Model file** (`best_model_pytorch.pth`) in `ml-training/models/`

### Push to GitHub (if not done already)

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - AgriVision project"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/AgriVision.git
git branch -M main
git push -u origin main
```

> ⚠️ **Important**: Ensure your model file is tracked with Git LFS (Large File Storage) due to its size (~21MB)

```bash
# Install Git LFS
git lfs install

# Track model files
git lfs track "*.pth"
git lfs track "*.h5"

# Add and commit
git add .gitattributes
git commit -m "Track large model files with Git LFS"
git push
```

---

## 🎯 Deployment Options

| Option | Best For | Difficulty | Cost | Features |
|--------|----------|------------|------|----------|
| **Vercel + Render** | Production, Best Performance | Easy | Free tier available | Auto-scaling, CDN |
| **Railway** | Quick deployment, All-in-one | Easiest | $5/month (500hrs free) | Single platform |
| **Docker + Cloud** | Custom setup, Enterprise | Advanced | Varies | Full control |

---

## ⭐ Option 1: Vercel + Render (Recommended)

### Architecture
- **Frontend**: Vercel (Next.js optimized, automatic deployments)
- **Backend**: Render (Python FastAPI, ML model hosting)

### Step 1: Deploy Backend to Render

#### 1.1 Create `render.yaml` in backend folder

Create `backend/render.yaml`:

```yaml
services:
  - type: web
    name: agrivision-backend
    env: python
    region: oregon
    plan: free
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn api.main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: PERPLEXITY_API_KEY
        sync: false
      - key: PYTHON_VERSION
        value: 3.11.0
```

#### 1.2 Update `requirements.txt` for production

Add these lines to `backend/requirements.txt`:

```
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-multipart==0.0.6
torch==2.5.1+cpu
torchvision==0.20.1+cpu
numpy==1.24.3
Pillow==10.1.0
httpx==0.25.1
python-dotenv==1.0.0
pydantic==2.5.0
```

> Note: Using `torch==2.5.1+cpu` for smaller deployment size (no CUDA)

#### 1.3 Deploy to Render

1. **Go to**: [https://render.com](https://render.com)
2. **Sign up/Login** with GitHub
3. **Click**: "New +" → "Web Service"
4. **Select**: Your GitHub repository
5. **Configure**:
   - **Name**: `agrivision-backend`
   - **Region**: Oregon (or nearest)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn api.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free
6. **Environment Variables**: Click "Advanced" and add:
   - `PERPLEXITY_API_KEY`: Your API key
7. **Click**: "Create Web Service"

⏳ **Wait 5-10 minutes** for deployment. You'll get a URL like: `https://agrivision-backend.onrender.com`

#### 1.4 Test Backend

```bash
# Test health endpoint
curl https://agrivision-backend.onrender.com/health

# Expected response
{"status":"healthy","timestamp":"..."}
```

---

### Step 2: Deploy Frontend to Vercel

#### 2.1 Update Frontend API Configuration

Update `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=https://agrivision-backend.onrender.com
```

Also update `frontend/src/lib/api.ts` to use environment variable:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
```

#### 2.2 Deploy to Vercel

1. **Go to**: [https://vercel.com](https://vercel.com)
2. **Sign up/Login** with GitHub
3. **Click**: "Add New..." → "Project"
4. **Import**: Your GitHub repository
5. **Configure**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
6. **Environment Variables**: Add:
   - `NEXT_PUBLIC_API_URL`: `https://agrivision-backend.onrender.com`
7. **Click**: "Deploy"

⏳ **Wait 2-3 minutes**. You'll get a URL like: `https://agrivision-xyz.vercel.app`

#### 2.3 Update CORS in Backend

Update `backend/api/main.py` to allow your Vercel domain:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://agrivision-xyz.vercel.app",  # Add your Vercel URL
        "https://*.vercel.app",  # Allow all Vercel preview deployments
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Commit and push changes - Render will auto-deploy!

---

## 🚂 Option 2: Railway (All-in-One)

Railway can host both frontend and backend on a single platform.

### Step 1: Create Railway Account

1. **Go to**: [https://railway.app](https://railway.app)
2. **Sign up** with GitHub

### Step 2: Deploy Backend

1. **Click**: "New Project" → "Deploy from GitHub repo"
2. **Select**: Your repository
3. **Click**: "Add variables" and add:
   - `PERPLEXITY_API_KEY`: Your API key
   - `PORT`: `8000`
4. **Settings**:
   - **Root Directory**: `backend`
   - **Start Command**: `uvicorn api.main:app --host 0.0.0.0 --port $PORT`
5. **Deploy**

You'll get a URL like: `https://agrivision-backend.up.railway.app`

### Step 3: Deploy Frontend

1. **In same project**: Click "New Service" → "GitHub Repo"
2. **Select**: Same repository
3. **Add variable**:
   - `NEXT_PUBLIC_API_URL`: `https://agrivision-backend.up.railway.app`
4. **Settings**:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. **Deploy**

You'll get a URL like: `https://agrivision-frontend.up.railway.app`

### Railway Pricing
- **Free Tier**: 500 hours/month (~$5 credit)
- **Pro**: $20/month for unlimited

---

## 🐳 Option 3: Docker + Any Cloud Provider

Perfect for AWS, GCP, Azure, or DigitalOcean.

### Step 1: Create Dockerfiles

#### Backend Dockerfile

Create `backend/Dockerfile`:

```dockerfile
# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run application
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Frontend Dockerfile

Create `frontend/Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built application
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Run application
CMD ["npm", "start"]
```

### Step 2: Create docker-compose.yml (for local testing)

Create `docker-compose.yml` in root:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - PERPLEXITY_API_KEY=${PERPLEXITY_API_KEY}
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    depends_on:
      - backend
    restart: unless-stopped
```

### Step 3: Test Locally

```bash
# Build and run
docker-compose up --build

# Test
open http://localhost:3000
```

### Step 4: Deploy to Cloud

#### AWS ECS
```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker build -t agrivision-backend ./backend
docker tag agrivision-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/agrivision-backend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/agrivision-backend:latest
```

#### Google Cloud Run
```bash
# Build and deploy
gcloud builds submit --tag gcr.io/PROJECT-ID/agrivision-backend ./backend
gcloud run deploy agrivision-backend --image gcr.io/PROJECT-ID/agrivision-backend --platform managed
```

#### DigitalOcean App Platform
1. Connect GitHub repository
2. Select `backend` as root directory
3. Auto-detects Dockerfile
4. Click Deploy

---

## 🔐 Environment Variables

### Backend (.env)
```env
PERPLEXITY_API_KEY=your_perplexity_api_key_here
PORT=8000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

---

## ✅ Post-Deployment Testing

### 1. Backend Health Check
```bash
curl https://your-backend-url.com/health
```

### 2. Test Prediction API
```bash
curl -X POST "https://your-backend-url.com/api/predict/" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@test_image.jpg"
```

### 3. Test Chat API
```bash
curl -X POST "https://your-backend-url.com/api/chat/" \
  -H "Content-Type: application/json" \
  -d '{"message":"How to treat tomato blight?","language":"en"}'
```

### 4. Frontend E2E Test
1. Open your frontend URL
2. Navigate to `/predict`
3. Upload a plant image
4. Verify prediction works
5. Test chatbot

---

## 🐛 Troubleshooting

### Issue: Backend deployment fails with "torch too large"

**Solution**: Use CPU-only PyTorch
```txt
# In requirements.txt
torch==2.5.1+cpu
torchvision==0.20.1+cpu
```

### Issue: CORS errors in browser

**Solution**: Update CORS origins in `backend/api/main.py`:
```python
allow_origins=[
    "https://your-frontend.vercel.app",
    "https://*.vercel.app",
]
```

### Issue: Model file not found

**Solution**: Ensure model is committed with Git LFS
```bash
git lfs track "*.pth"
git add ml-training/models/best_model_pytorch.pth
git commit -m "Add model file"
git push
```

### Issue: Slow cold starts on Render (Free tier)

**Explanation**: Free tier spins down after inactivity. First request takes 30-60s.

**Solutions**:
1. Upgrade to paid tier ($7/month - always on)
2. Use a cron job to ping every 10 minutes
3. Accept cold start for free tier

### Issue: Environment variables not loading

**Solution**: 
- Render: Add in Dashboard → Environment
- Vercel: Add in Project Settings → Environment Variables
- Redeploy after adding variables

### Issue: Build timeout on Vercel

**Solution**: Increase timeout in `vercel.json`:
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next",
      "config": { "maxLambdaSize": "50mb" }
    }
  ]
}
```

---

## 📊 Deployment Comparison

| Feature | Vercel + Render | Railway | Docker |
|---------|----------------|---------|---------|
| **Setup Time** | 15 mins | 10 mins | 30 mins |
| **Free Tier** | ✅ Yes (both) | ✅ 500hrs/mo | ❌ Depends on cloud |
| **Auto Deploy** | ✅ Yes | ✅ Yes | ⚠️ Setup required |
| **Custom Domain** | ✅ Easy | ✅ Easy | ✅ Depends on provider |
| **Scaling** | ✅ Auto | ✅ Auto | ⚠️ Manual |
| **Best For** | Production | Quick demos | Enterprise |

---

## 🎯 Recommended Deployment Path

### For Portfolio/Demo
1. **Quick Start**: Railway (easiest, 1 platform)
2. **Budget**: Vercel (frontend free) + Render (backend free tier)

### For Production
1. **Best Performance**: Vercel + Render (paid tiers)
2. **Enterprise**: Docker on AWS/GCP/Azure

---

## 📝 Next Steps After Deployment

1. ✅ **Custom Domain**: Connect your own domain
2. ✅ **Analytics**: Add Google Analytics
3. ✅ **Monitoring**: Setup Sentry for error tracking
4. ✅ **CI/CD**: Configure automated testing
5. ✅ **SSL**: Enable HTTPS (auto on Vercel/Render)

---

## 🆘 Need Help?

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **FastAPI Deployment**: https://fastapi.tiangolo.com/deployment

---

**🎉 Congratulations on deploying AgriVision!**

Share your deployed app:
- LinkedIn: "Deployed my AI plant disease detection system! 🌱"
- GitHub: Update README with live demo link
- Resume: Add live project URL

---

**Built with ❤️ for farmers and agriculture**
