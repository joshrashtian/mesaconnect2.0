#!/bin/bash

# MESA Connect Tab Manager
# This script helps manage tabs for kiosk mode

echo "MESA Connect Tab Manager"
echo "========================"
echo "1. Start MESA Connect Kiosk"
echo "2. Start Spotify"
echo "3. Start Zoom"
echo "4. Start All (MESA + Spotify + Zoom)"
echo "5. Switch to MESA Connect tab"
echo "6. Switch to Spotify tab"
echo "7. Switch to Zoom tab"
echo "8. List current tabs"
echo "9. Close all tabs"
echo "0. Exit"
echo ""

read -p "Choose an option (0-9): " choice

case $choice in
    1)
        echo "Starting MESA Connect Kiosk..."
        chromium-browser --app="https://mesaconnect.io/kiosk?kiosk=true&kioskType=default" &
        ;;
    2)
        echo "Starting Spotify..."
        chromium-browser --app="https://open.spotify.com" &
        ;;
    3)
        echo "Starting Zoom..."
        chromium-browser --app="https://zoom.us" &
        ;;
    4)
        echo "Starting all applications..."
        chromium-browser --app="https://mesaconnect.io/kiosk?kiosk=true&kioskType=default" &
        sleep 2
        chromium-browser --app="https://open.spotify.com" &
        sleep 2
        chromium-browser --app="https://zoom.us" &
        ;;
    5)
        echo "Switching to MESA Connect tab..."
        xdotool search --name "MESA Connect" windowactivate
        ;;
    6)
        echo "Switching to Spotify tab..."
        xdotool search --name "Spotify" windowactivate
        ;;
    7)
        echo "Switching to Zoom tab..."
        xdotool search --name "Zoom" windowactivate
        ;;
    8)
        echo "Current tabs:"
        wmctrl -l | grep -i "chromium\|chrome"
        ;;
    9)
        echo "Closing all Chrome tabs..."
        pkill -f chromium
        pkill -f chrome
        ;;
    0)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid option. Please choose 0-9."
        ;;
esac
