#!/bin/bash
set -e

echo "🚀 Deploying HVU App..."

# 1. Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# 2. Check for .env
if [ ! -f .env ]; then
  echo "❌ Error: .env file missing!"
  echo "Please create a .env file with DATABASE_URL, NEXTAUTH_SECRET, etc."
  exit 1
fi

# 3. Build Docker image
echo "📦 Building Docker image..."
docker build -t hvu-app .

# 4. Stop existing container
echo "🛑 Stopping old container..."
docker stop hvu-app || true
docker rm hvu-app || true

# 5. Run new container
# We use --network host so the container can access the Postgres DB running on localhost:5432
echo "▶️ Starting new container..."
docker run -d \
  --restart unless-stopped \
  --name hvu-app \
  --network host \
  --env-file .env \
  hvu-app

echo "✅ Deployment complete! App should be running on http://YOUR_SERVER_IP:3000"
