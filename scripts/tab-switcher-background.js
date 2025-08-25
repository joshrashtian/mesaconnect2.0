#!/usr/bin/env node

// Background tab switcher for Raspberry Pi
// This script listens for tab switching commands and executes xdotool commands

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class TabSwitcherBackground {
  constructor() {
    this.windowMap = {
      'MESA Connect': 'mesaconnect',
      'Spotify': 'spotify',
      'Zoom': 'zoom'
    };
    
    this.setupEventListeners();
    this.startWebSocketServer();
  }

  setupEventListeners() {
    // Listen for custom events from the web interface
    process.on('message', (message) => {
      if (message.type === 'switchTab') {
        this.switchToWindow(message.windowName);
      }
    });

    // Also listen for file-based commands (alternative method)
    this.watchCommandFile();
  }

  startWebSocketServer() {
    // Simple HTTP server to receive commands from web interface
    const http = require('http');
    
    const server = http.createServer((req, res) => {
      if (req.method === 'POST' && req.url === '/switch-tab') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            this.switchToWindow(data.windowName);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
          } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
          }
        });
      } else {
        res.writeHead(404);
        res.end();
      }
    });

    server.listen(3001, () => {
      console.log('Tab switcher server running on port 3001');
    });
  }

  watchCommandFile() {
    const commandFile = '/tmp/mesa-tab-command';
    
    // Create the file if it doesn't exist
    if (!fs.existsSync(commandFile)) {
      fs.writeFileSync(commandFile, '');
    }

    // Watch for changes to the command file
    fs.watch(commandFile, (eventType, filename) => {
      if (eventType === 'change') {
        try {
          const command = fs.readFileSync(commandFile, 'utf8').trim();
          if (command) {
            this.switchToWindow(command);
            // Clear the command file
            fs.writeFileSync(commandFile, '');
          }
        } catch (error) {
          console.error('Error reading command file:', error);
        }
      }
    });
  }

  async switchToWindow(windowName) {
    console.log(`Switching to window: ${windowName}`);
    
    try {
      // Try to find the window by name
      const searchCommand = `xdotool search --name "${windowName}"`;
      
      exec(searchCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error searching for window: ${error}`);
          return;
        }

        const windowIds = stdout.trim().split('\n').filter(id => id);
        
        if (windowIds.length > 0) {
          // Activate the first matching window
          const activateCommand = `xdotool windowactivate ${windowIds[0]}`;
          
          exec(activateCommand, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error activating window: ${error}`);
            } else {
              console.log(`Successfully switched to ${windowName}`);
            }
          });
        } else {
          console.log(`No window found with name: ${windowName}`);
        }
      });
    } catch (error) {
      console.error('Error in switchToWindow:', error);
    }
  }

  // List all available windows
  listWindows() {
    exec('xdotool search --name ".*"', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error listing windows: ${error}`);
        return;
      }

      const windowIds = stdout.trim().split('\n').filter(id => id);
      
      windowIds.forEach(id => {
        exec(`xdotool getwindowname ${id}`, (error, name) => {
          if (!error && name.trim()) {
            console.log(`Window ${id}: ${name.trim()}`);
          }
        });
      });
    });
  }
}

// Start the tab switcher
const tabSwitcher = new TabSwitcherBackground();

// Handle process termination
process.on('SIGINT', () => {
  console.log('Tab switcher shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Tab switcher shutting down...');
  process.exit(0);
});

console.log('MESA Connect Tab Switcher Background Service Started');
console.log('Listening for tab switching commands...');
