#!/bin/bash

# Start MESA Connect Tab Switcher Background Service
# This script starts the background service that handles tab switching

echo "Starting MESA Connect Tab Switcher Background Service..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Installing..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Check if the background script exists
if [ ! -f "scripts/tab-switcher-background.js" ]; then
    echo "Error: tab-switcher-background.js not found!"
    exit 1
fi

# Make the script executable
chmod +x scripts/tab-switcher-background.js

# Kill any existing tab switcher processes
pkill -f tab-switcher-background

# Wait a moment
sleep 2

# Start the background service
echo "Starting background service..."
node scripts/tab-switcher-background.js &

# Save the process ID
echo $! > /tmp/mesa-tab-switcher.pid

echo "Tab switcher background service started with PID: $(cat /tmp/mesa-tab-switcher.pid)"
echo "Service is listening on port 3001"
echo ""
echo "To stop the service, run: ./scripts/stop-tab-switcher.sh"
echo "To check status, run: ./scripts/status-tab-switcher.sh"
