#!/bin/bash

# Troubleshooting script for server connectivity issues

echo "=== Portfolio Server Troubleshooting ==="
echo

# Check Node.js version
echo "Checking Node.js version..."
NODE_VERSION=$(node -v)
REQUIRED_VERSION="v18.0.0"

if [[ "$NODE_VERSION" < "$REQUIRED_VERSION" ]]; then
  echo "❌ Node.js version is too old: $NODE_VERSION (required: $REQUIRED_VERSION or higher)"
  echo "Run ./upgrade-node.sh to upgrade Node.js"
else
  echo "✅ Node.js version is compatible: $NODE_VERSION"
fi

echo

# Check if PM2 is installed
echo "Checking PM2 installation..."
if command -v pm2 &> /dev/null; then
  echo "✅ PM2 is installed"
  
  # Check if the application is running
  echo "Checking if portfolio application is running..."
  if pm2 list | grep -q "portfolio"; then
    echo "✅ Portfolio application is running in PM2"
    
    # Get application status
    echo "Application status:"
    pm2 show portfolio | grep -E "status|cpu|memory|uptime"
  else
    echo "❌ Portfolio application is not running in PM2"
    echo "Start it with: pm2 start ecosystem.config.js --env production"
  fi
else
  echo "❌ PM2 is not installed"
  echo "Install it with: npm install -g pm2"
fi

echo

# Check if the port is in use
echo "Checking if port 3000 is in use..."
if command -v netstat &> /dev/null; then
  if netstat -tuln | grep -q ":3000 "; then
    echo "✅ Port 3000 is in use"
    echo "Process using port 3000:"
    if command -v lsof &> /dev/null; then
      lsof -i :3000
    else
      netstat -tuln | grep ":3000 "
    fi
  else
    echo "❌ Port 3000 is not in use"
    echo "The application may not be running correctly"
  fi
else
  echo "❓ Cannot check port (netstat not available)"
fi

echo

# Check firewall status
echo "Checking firewall status..."
if command -v ufw &> /dev/null; then
  echo "UFW firewall status:"
  sudo ufw status | grep 3000 || echo "No rule found for port 3000"
  echo "To allow port 3000: sudo ufw allow 3000/tcp"
elif command -v firewall-cmd &> /dev/null; then
  echo "Firewalld status:"
  sudo firewall-cmd --list-ports | grep 3000 || echo "No rule found for port 3000"
  echo "To allow port 3000: sudo firewall-cmd --permanent --add-port=3000/tcp && sudo firewall-cmd --reload"
else
  echo "❓ Cannot determine firewall type"
fi

echo

# Check local connectivity
echo "Checking local connectivity..."
if curl -s http://localhost:3000 > /dev/null; then
  echo "✅ Server is accessible locally"
else
  echo "❌ Server is not accessible locally"
fi

echo

# Check public IP connectivity
echo "Checking public IP connectivity..."
if curl -s http://13.204.47.235:3000 > /dev/null; then
  echo "✅ Server is accessible from public IP"
else
  echo "❌ Server is not accessible from public IP"
  echo "This could be due to:"
  echo "1. The server is not running"
  echo "2. The firewall is blocking port 3000"
  echo "3. The IP address is not correctly configured"
fi

echo
echo "=== Troubleshooting Complete ==="
echo "For more detailed logs, run: pm2 logs portfolio"