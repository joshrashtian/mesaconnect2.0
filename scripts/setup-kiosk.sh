#!/bin/bash

# MESA Connect Kiosk Setup Script for Raspberry Pi
# This script configures the Pi for kiosk mode

echo "Setting up MESA Connect Kiosk on Raspberry Pi..."

# Install required packages
echo "Installing required packages..."
sudo apt-get update
sudo apt-get install -y chromium-browser x11-xserver-utils xdotool wmctrl xbindkeys

# Make scripts executable
chmod +x scripts/start-kiosk.sh
chmod +x scripts/setup-kiosk.sh
chmod +x scripts/light-tabs.sh
chmod +x scripts/tab-manager.sh
chmod +x scripts/quick-switch.sh

# Create autostart directory
mkdir -p ~/.config/autostart

# Copy autostart file
cp scripts/autostart-kiosk.desktop ~/.config/autostart/

# Disable screen saver and power management
echo "Configuring display settings..."
xset s off
xset -dpms
xset s noblank

# Add to .bashrc for persistence
echo "Adding display settings to .bashrc..."
echo "# Disable screen saver and power management" >> ~/.bashrc
echo "xset s off" >> ~/.bashrc
echo "xset -dpms" >> ~/.bashrc
echo "xset s noblank" >> ~/.bashrc

# Configure Chrome to start in kiosk mode
echo "Configuring Chrome settings..."
mkdir -p ~/.config/chromium/Default
cat > ~/.config/chromium/Default/Preferences << EOF
{
  "browser": {
    "show_home_button": false,
    "show_tab_strip": false
  },
  "profile": {
    "default_content_setting_values": {
      "notifications": 2
    }
  },
  "session": {
    "restore_on_startup": 4,
    "startup_urls": ["https://mesaconnect.io/kiosk?kiosk=true&kioskType=default"]
  }
}
EOF

echo "Kiosk setup complete!"
echo "The kiosk will start automatically on next boot."
echo "To start now, run: ./scripts/start-kiosk.sh"
