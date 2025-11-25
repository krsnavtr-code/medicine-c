#!/bin/bash

PROJECT_DIR="/var/www/ayushaushadhi"
CLIENT_DIR="$PROJECT_DIR/client/medicine-c"
SERVER_DIR="$PROJECT_DIR/server/medicine-s"

echo "🚀 AyushAushadhi — Deployment Started"
echo "-------------------------------------"

echo ""
echo "-------------------------------------"
echo "⚙️  Updating Server Dependencies"
echo "-------------------------------------"

# 3. Server update
cd $SERVER_DIR
echo "📥 Pulling server(Backend) latest code..."
git pull
echo "📥 Code Pull Done"

echo "Install Node Modules"
npm install
echo "Modules Install Done"

echo " Restarting Server with PM2..."
pm2 restart ayush-backend
echo "Server Restart Done"

echo ""
echo "-------------------------------------"
echo "🖥 Updating Client"
echo "-------------------------------------"

# 4. Client update
cd $CLIENT_DIR
echo "📥 Pulling client(Frontend) latest code..."
git pull
echo "📥 Code Pull Done"

echo "Install Node Modules"
npm install
echo "Modules Install Done"

echo "📦 Building Next.js project..."
npm run build
echo "Build Done"

echo ""
echo "♻️ Reloading PM2..."
pm2 restart ayush-frontend
echo "Client Restart Done

echo ""
echo "-------------------------------------"
echo "🎉 Deployment Completed Successfully!"
echo "-------------------------------------"
