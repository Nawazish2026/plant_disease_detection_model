#!/bin/bash

# Exit on error
set -e

echo "🌱 AgriVision Quick Start"
echo "========================"

# Function to handle cleanup of background processes
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    if [ -n "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
    fi
    exit
}

# Trap SIGINT (Ctrl+C) and EXIT
trap cleanup SIGINT SIGTERM EXIT

# --- Backend Setup ---
echo "🔧 Setting up Backend..."
cd backend

if [ ! -d "venv" ]; then
    echo "   Creating Python virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate

echo "   Installing backend dependencies..."
pip install -r requirements.txt > /dev/null

if [ ! -f ".env" ]; then
    echo "   Creating .env from example..."
    cp .env.example .env
    echo "   ⚠️  NOTE: Add your PERPLEXITY_API_KEY to backend/.env for Chatbot features!"
fi

echo "🚀 Starting Backend Server (port 8000)..."
python run.py &
BACKEND_PID=$!

# --- Frontend Setup ---
echo ""
echo "🔧 Setting up Frontend..."
cd ../frontend

echo "   Installing frontend dependencies..."
npm install > /dev/null

echo "🚀 Starting Frontend Server (port 3000)..."
echo "🌐 Open http://localhost:3000 in your browser"
npm run dev