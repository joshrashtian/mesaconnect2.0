#!/bin/bash

# MESA Connect Kiosk Startup Script for Raspberry Pi
# This script launches Chrome in full kiosk mode with hidden UI

# Kill any existing Chrome processes
pkill -f chromium
pkill -f chrome

# Wait a moment for processes to close
sleep 2

# Launch Chrome in kiosk mode with hidden UI
chromium-browser \
  --kiosk \
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
  --disable-ipc-flooding-protection \
  --disable-background-timer-throttling \
  --disable-renderer-backgrounding \
  --disable-backgrounding-occluded-windows \
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
  --disable-ipc-flooding-protection \
  --disable-background-timer-throttling \
  --disable-renderer-backgrounding \
  --disable-backgrounding-occluded-windows \
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
  --user-data-dir=/tmp/chrome-kiosk \
  --data-path=/tmp/chrome-kiosk-data \
  --disk-cache-dir=/tmp/chrome-kiosk-cache \
  --disk-cache-size=104857600 \
  --memory-pressure-off \
  --max_old_space_size=4096 \
  "https://mesaconnect.io/kiosk?kiosk=true&kioskType=default"
