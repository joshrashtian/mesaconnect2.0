#!/bin/bash

# MESA Connect Quick Switch Script
# This script provides keyboard shortcuts for switching between tabs

echo "MESA Connect Quick Switch"
echo "========================="
echo "Keyboard shortcuts:"
echo "  Ctrl+Alt+1 - Switch to MESA Connect"
echo "  Ctrl+Alt+2 - Switch to Spotify"
echo "  Ctrl+Alt+3 - Switch to Zoom"
echo "  Ctrl+Alt+Q - Quit"
echo ""
echo "Starting quick switch mode..."
echo "Press Ctrl+C to stop"

# Function to switch to MESA Connect
switch_to_mesa() {
    xdotool search --name "MESA Connect" windowactivate
}

# Function to switch to Spotify
switch_to_spotify() {
    xdotool search --name "Spotify" windowactivate
}

# Function to switch to Zoom
switch_to_zoom() {
    xdotool search --name "Zoom" windowactivate
}

# Function to quit
quit_script() {
    echo "Exiting quick switch mode..."
    exit 0
}

# Set up keyboard shortcuts
xbindkeys -f /dev/null -x
xbindkeys -k

# Bind keys
xdotool keydown ctrl+alt+1 && switch_to_mesa
xdotool keydown ctrl+alt+2 && switch_to_spotify
xdotool keydown ctrl+alt+3 && switch_to_zoom
xdotool keydown ctrl+alt+q && quit_script

# Keep script running
while true; do
    sleep 1
done
