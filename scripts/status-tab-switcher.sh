#!/bin/bash

# Check status of MESA Connect Tab Switcher Background Service

echo "MESA Connect Tab Switcher Status"
echo "================================"

# Check if PID file exists
if [ -f "/tmp/mesa-tab-switcher.pid" ]; then
    PID=$(cat /tmp/mesa-tab-switcher.pid)
    
    # Check if process is running
    if ps -p $PID > /dev/null; then
        echo "✅ Tab switcher service is RUNNING"
        echo "   PID: $PID"
        echo "   Port: 3001"
        
        # Check if port is listening
        if netstat -tuln | grep ":3001 " > /dev/null; then
            echo "   Port 3001: LISTENING"
        else
            echo "   Port 3001: NOT LISTENING"
        fi
        
        # Show process info
        echo ""
        echo "Process Info:"
        ps -p $PID -o pid,ppid,cmd,etime
    else
        echo "❌ Tab switcher service is NOT RUNNING"
        echo "   PID file exists but process is dead"
        rm -f /tmp/mesa-tab-switcher.pid
    fi
else
    echo "❌ Tab switcher service is NOT RUNNING"
    echo "   No PID file found"
fi

echo ""
echo "To start the service: ./scripts/start-tab-switcher.sh"
echo "To stop the service: ./scripts/stop-tab-switcher.sh"
