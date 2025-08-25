#!/bin/bash

# MESA Connect Spotify + Zoom Kiosk
# This script launches MESA Connect with Spotify and Zoom tabs for easy switching

echo "Starting MESA Connect with Spotify and Zoom integration..."

# Kill any existing Chrome processes
pkill -f chromium
pkill -f chrome

# Wait a moment for processes to close
sleep 2

# Launch MESA Connect kiosk first (main interface)
echo "Launching MESA Connect Kiosk..."
chromium-browser \
  --app="https://mesaconnect.io/kiosk?kiosk=true&kioskType=spotify" \
  --disable-web-security \
  --disable-features=VizDisplayCompositor \
  --disable-background-timer-throttling \
  --disable-renderer-backgrounding \
  --disable-backgrounding-occluded-windows \
  --disable-ipc-flooding-protection \
  --disable-background-networking \
  --disable-default-apps \
  --disable-extensions \
  --disable-sync \
  --disable-translate \
  --hide-scrollbars \
  --mute-audio \
  --no-first-run \
  --no-default-browser-check \
  --disable-component-update \
  --disable-domain-reliability \
  --disable-features=TranslateUI \
  --user-data-dir=/tmp/chrome-mesa \
  --data-path=/tmp/chrome-mesa-data \
  --disk-cache-dir=/tmp/chrome-mesa-cache \
  --disk-cache-size=104857600 \
  --memory-pressure-off \
  --max_old_space_size=4096 \
  --window-size=1920,1080 \
  --start-maximized &

# Wait for MESA Connect to load
sleep 5

# Launch Spotify in app mode
echo "Launching Spotify..."
chromium-browser \
  --app="https://open.spotify.com" \
  --disable-web-security \
  --disable-features=VizDisplayCompositor \
  --disable-background-timer-throttling \
  --disable-renderer-backgrounding \
  --disable-backgrounding-occluded-windows \
  --disable-ipc-flooding-protection \
  --disable-background-networking \
  --disable-default-apps \
  --disable-extensions \
  --disable-sync \
  --disable-translate \
  --hide-scrollbars \
  --mute-audio \
  --no-first-run \
  --no-default-browser-check \
  --disable-component-update \
  --disable-domain-reliability \
  --disable-features=TranslateUI \
  --user-data-dir=/tmp/chrome-spotify \
  --data-path=/tmp/chrome-spotify-data \
  --disk-cache-dir=/tmp/chrome-spotify-cache \
  --disk-cache-size=104857600 \
  --memory-pressure-off \
  --max_old_space_size=4096 \
  --window-size=1920,1080 \
  --start-maximized &

# Wait for Spotify to load
sleep 3

# Launch Zoom in app mode
echo "Launching Zoom..."
chromium-browser \
  --app="https://zoom.us" \
  --disable-web-security \
  --disable-features=VizDisplayCompositor \
  --disable-background-timer-throttling \
  --disable-renderer-backgrounding \
  --disable-backgrounding-occluded-windows \
  --disable-ipc-flooding-protection \
  --disable-background-networking \
  --disable-default-apps \
  --disable-extensions \
  --disable-sync \
  --disable-translate \
  --hide-scrollbars \
  --mute-audio \
  --no-first-run \
  --no-default-browser-check \
  --disable-component-update \
  --disable-domain-reliability \
  --disable-features=TranslateUI \
  --user-data-dir=/tmp/chrome-zoom \
  --data-path=/tmp/chrome-zoom-data \
  --disk-cache-dir=/tmp/chrome-zoom-cache \
  --disk-cache-size=104857600 \
  --memory-pressure-off \
  --max_old_space_size=4096 \
  --window-size=1920,1080 \
  --start-maximized &

echo "All applications launched!"
echo ""
echo "Keyboard shortcuts for switching:"
echo "  Alt+Tab - Switch between windows"
echo "  Ctrl+Alt+1 - Switch to MESA Connect"
echo "  Ctrl+Alt+2 - Switch to Spotify"
echo "  Ctrl+Alt+3 - Switch to Zoom"
echo ""
echo "To manage tabs, run: ./scripts/tab-manager.sh"
