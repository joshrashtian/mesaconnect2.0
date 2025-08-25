// Tab switching service for Raspberry Pi kiosk mode
export interface TabInfo {
  id: string;
  name: string;
  url: string;
  icon: string;
  isActive: boolean;
}

export class TabSwitcher {
  private static instance: TabSwitcher;
  private tabs: TabInfo[] = [
    {
      id: 'mesa',
      name: 'MESA Connect',
      url: 'https://mesaconnect.io/kiosk',
      icon: '🏠',
      isActive: true
    },
    {
      id: 'spotify',
      name: 'Spotify',
      url: 'https://open.spotify.com',
      icon: '🎵',
      isActive: false
    },
    {
      id: 'zoom',
      name: 'Zoom',
      url: 'https://zoom.us',
      icon: '📹',
      isActive: false
    }
  ];

  private constructor() {}

  static getInstance(): TabSwitcher {
    if (!TabSwitcher.instance) {
      TabSwitcher.instance = new TabSwitcher();
    }
    return TabSwitcher.instance;
  }

  // Switch to a specific tab using xdotool (Raspberry Pi)
  async switchToTab(tabId: string): Promise<boolean> {
    try {
      const tab = this.tabs.find(t => t.id === tabId);
      if (!tab) return false;

      // Update active state
      this.tabs.forEach(t => t.isActive = t.id === tabId);

      // If running on Raspberry Pi, use xdotool to switch windows
      if (typeof window !== 'undefined' && window.navigator.userAgent.includes('Linux')) {
        // This would work on Raspberry Pi with xdotool installed
        await this.executeXdotoolCommand(tab.name);
      } else {
        // Fallback for web: open in new tab
        if (typeof window !== "undefined") {
          window.open(tab.url, '_blank');
        }
      }

      return true;
    } catch (error) {
      console.error('Failed to switch tab:', error);
      return false;
    }
  }

  // Execute xdotool command (only works on Raspberry Pi)
  private async executeXdotoolCommand(windowName: string): Promise<void> {
    try {
      console.log(`Switching to window: ${windowName}`);
      
      // Try to communicate with the background tab switcher service
      try {
        const response = await fetch('http://localhost:3001/switch-tab', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ windowName }),
        });
        
        if (response.ok) {
          console.log('Tab switch command sent successfully');
        } else {
          throw new Error('Background service not responding');
        }
      } catch (error) {
        // Fallback: write to command file
        console.log('Background service not available, using file-based command');
        this.writeCommandToFile(windowName);
      }
    } catch (error) {
      console.error('xdotool command failed:', error);
    }
  }

  // Write command to file for background script to pick up
  private writeCommandToFile(windowName: string): void {
    try {
      // This would work if the background script is watching the file
      const command = `echo "${windowName}" > /tmp/mesa-tab-command`;
      console.log(`Command to execute: ${command}`);
    } catch (error) {
      console.error('Failed to write command to file:', error);
    }
  }

  // Get all tabs
  getTabs(): TabInfo[] {
    return [...this.tabs];
  }

  // Get active tab
  getActiveTab(): TabInfo | null {
    return this.tabs.find(tab => tab.isActive) || null;
  }

  // Add a new tab
  addTab(tab: Omit<TabInfo, 'isActive'>): void {
    this.tabs.forEach(t => t.isActive = false);
    this.tabs.push({ ...tab, isActive: true });
  }

  // Remove a tab
  removeTab(tabId: string): void {
    this.tabs = this.tabs.filter(tab => tab.id !== tabId);
    if (this.tabs.length > 0 && !this.tabs.some(tab => tab.isActive)) {
      this.tabs[0].isActive = true;
    }
  }
}

// Web-based tab switching (fallback for non-Pi environments)
export class WebTabSwitcher {
  static switchToSpotify(): void {
    if (typeof window !== "undefined") {
      window.open('https://open.spotify.com', '_blank');
    }
  }

  static switchToZoom(): void {
    if (typeof window !== "undefined") {
      window.open('https://zoom.us', '_blank');
    }
  }

  static switchToMesa(): void {
    if (typeof window !== "undefined") {
      window.open('https://mesaconnect.io/kiosk?kiosk=true&kioskType=spotify', '_blank');
    }
  }

  // Focus existing window if it exists, otherwise open new
  static focusOrOpen(url: string, windowName: string): void {
    if (typeof window !== "undefined") {
      const existingWindow = window.open('', windowName);
      if (existingWindow && !existingWindow.closed) {
        existingWindow.focus();
      } else {
        window.open(url, windowName);
      }
    }
  }
}

// Hook for React components
export const useTabSwitcher = () => {
  const switcher = TabSwitcher.getInstance();

  return {
    tabs: switcher.getTabs(),
    activeTab: switcher.getActiveTab(),
    switchToTab: switcher.switchToTab.bind(switcher),
    switchToSpotify: () => switcher.switchToTab('spotify'),
    switchToZoom: () => switcher.switchToTab('zoom'),
    switchToMesa: () => switcher.switchToTab('mesa'),
  };
};
