#!/bin/bash

# MESA Connect Light Tabs Mode
# This script launches Chrome with minimal UI for debugging

# Kill any existing Chrome processes
pkill -f chromium
pkill -f chrome

# Wait a moment for processes to close
sleep 2

# Launch Chrome with light tabs (minimal UI)
chromium-browser \
  --new-window \
  --app="https://mesaconnect.io/kiosk?kiosk=true&kioskType=default" \
  --app="https://open.spotify.com" \
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
  --user-data-dir=/tmp/chrome-light \
  --data-path=/tmp/chrome-light-data \
  --disk-cache-dir=/tmp/chrome-light-cache \
  --disk-cache-size=104857600 \
  --memory-pressure-off \
  --max_old_space_size=4096 \
  --window-size=1920,1080 \
  --start-maximized
