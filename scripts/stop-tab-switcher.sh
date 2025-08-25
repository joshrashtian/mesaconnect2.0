#!/bin/bash

# Stop MESA Connect Tab Switcher Background Service

echo "Stopping MESA Connect Tab Switcher Background Service..."

# Check if PID file exists
if [ -f "/tmp/mesa-tab-switcher.pid" ]; then
    PID=$(cat /tmp/mesa-tab-switcher.pid)
    
    # Check if process is still running
    if ps -p $PID > /dev/null; then
        echo "Stopping process with PID: $PID"
        kill $PID
        
        # Wait for process to stop
        sleep 2
        
        # Check if process stopped
        if ps -p $PID > /dev/null; then
            echo "Process still running, force killing..."
            kill -9 $PID
        fi
        
        echo "Tab switcher service stopped"
    else
        echo "Process with PID $PID is not running"
    fi
    
    # Remove PID file
    rm -f /tmp/mesa-tab-switcher.pid
else
    echo "PID file not found, killing any tab-switcher processes..."
    pkill -f tab-switcher-background
fi

echo "Tab switcher service stopped"
