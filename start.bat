@echo off
setlocal enabledelayedexpansion

echo 🌱 AgriVision Quick Start
echo ========================

REM --- Backend Setup ---
echo.
echo 🔧 Setting up Backend...
cd backend

if not exist venv (
    echo    Creating Python virtual environment...
    python -m venv venv
)

call venv\Scripts\activate

echo    Installing backend dependencies...
pip install -r requirements.txt

if not exist .env (
    echo    Creating .env from example...
    copy .env.example .env >nul
    echo    ⚠️  NOTE: Add your PERPLEXITY_API_KEY to backend/.env for Chatbot features!
)

echo 🚀 Starting Backend Server (port 8000)...
REM Start backend in a new window, keeping venv activated
start "AgriVision Backend" cmd /k "call venv\Scripts\activate && python run.py"

REM --- Frontend Setup ---
echo.
echo 🔧 Setting up Frontend...
cd ..\frontend

echo    Installing frontend dependencies...
call npm install

if not exist .env.local (
    echo    Creating .env.local from example...
    copy .env.local.example .env.local >nul
)

REM --- Run ---
echo.
echo 🚀 Starting Frontend Server (port 3000)...
echo 🌐 The application will be available at http://localhost:3000
echo.

npm run dev